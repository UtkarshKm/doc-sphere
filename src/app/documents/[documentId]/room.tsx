"use client";

import {ReactNode, useEffect, useMemo, useState} from "react";
import {
	LiveblocksProvider,
	RoomProvider,
	ClientSideSuspense,
} from "@liveblocks/react/suspense";
import {useParams} from "next/navigation";
import {Loader} from "@/components/loader";
import {getUsers} from "./action";
import {toast} from "sonner";
type Users = {
	id: string;
	name: string;
	avatar: string;
};

export function Room({children}: {children: ReactNode}) {
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
			authEndpoint="/api/liveblocks-auth"
			resolveMentionSuggestions={({text}) => {
				let filteredUsers = users;
				if (text) {
					filteredUsers = users.filter((user) =>
						user.name.toLowerCase().includes(text.toLowerCase())
					);
				}
				return filteredUsers.map((user) => user.id);
			}}
			resolveRoomsInfo={()=>[]}
			resolveUsers={({userIds}) => {
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
