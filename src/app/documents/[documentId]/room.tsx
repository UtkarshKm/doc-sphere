"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
	LiveblocksProvider,
	RoomProvider,
	ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { Loader } from "@/components/loader";
import { getDocuments, getUsers } from "./action";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";
type Users = {
	id: string;
	name: string;
	avatar: string;
};

export function Room({ children }: { children: ReactNode }) {
	const params = useParams();
	const [users, setUsers] = useState<Users[]>([]);

	const fetchUsers = useMemo(
		() => async () => {
			try {
				const list = await getUsers();
				setUsers(list);
			} catch (error) {
				toast.error("Error fetching users");
				console.error(error);
			}
		},
		[]
	);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);
	return (
		<LiveblocksProvider
			throttle={16}
			authEndpoint={async () => {
				const endpoint = "/api/liveblocks-auth";
				const room = params.documentId as string;
				const response = await fetch(endpoint, {
					method: "POST",
					body: JSON.stringify({
						room,
					}),
				});
				return await response.json();
			}}
			resolveMentionSuggestions={({ text }) => {
				let filteredUsers = users;
				if (text) {
					filteredUsers = users.filter((user) =>
						user.name.toLowerCase().includes(text.toLowerCase())
					);
				}
				return filteredUsers.map((user) => user.id);
			}}
			resolveRoomsInfo={async({roomIds}) => {
				const documents = await getDocuments(roomIds as Id<"documents">[]);
				return documents.map((document) => ({
					id: document.id,
					name: document.name,
				}));
			}}
			resolveUsers={({ userIds }) => {
				return userIds.map((userId) =>
					users.find((user) => user.id === userId)
				);
			}}
		>
			<RoomProvider id={params.documentId as string}>
				<ClientSideSuspense fallback={<Loader label="Room loading" />}>
					{children}
				</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	);
}
