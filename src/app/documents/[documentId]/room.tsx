"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
	LiveblocksProvider,
	RoomProvider,
	ClientSideSuspense,
	useRoom,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { Loader } from "@/components/loader";
import { getDocuments, getUsers } from "./action";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";

type Users = { id: string; name: string; avatar: string ; color: string };

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

	return (
		<LiveblocksProvider
			throttle={16}
			authEndpoint={async () => {
				const res = await fetch("/api/liveblocks-auth", {
					method: "POST",
					body: JSON.stringify({ room: params.documentId }),
				});
				return res.json();
			}}
			resolveMentionSuggestions={({ text }) => {
				const filtered =
					text ?
						users.filter((u) =>
							u.name.toLowerCase().includes(text.toLowerCase())
						)
					:	users;
				return filtered.map((u) => u.id);
			}}
			resolveRoomsInfo={({ roomIds }) =>
				getDocuments(roomIds as Id<"documents">[]).then((docs) =>
					docs.map((d) => ({ id: d.id, name: d.name }))
				)
			}
			resolveUsers={({ userIds }) =>
				userIds.map((id) => users.find((u) => u.id === id))
			}
		>
			<RoomProvider id={params.documentId as string}>
				<InnerRoom fetchUsers={fetchUsers}>{children}</InnerRoom>
			</RoomProvider>
		</LiveblocksProvider>
	);
}

function InnerRoom({
	children,
	fetchUsers,
}: {
	children: ReactNode;
	fetchUsers: () => Promise<void>;
}) {
	const room = useRoom(); // ✅ Enables real-time inbox and notifications

	useEffect(() => {
		if (room) {
			void fetchUsers();
		}
	}, [fetchUsers, room]);

	return (
		<ClientSideSuspense fallback={<Loader label="Room loading" />}>
			{children}
		</ClientSideSuspense>
	);
}
