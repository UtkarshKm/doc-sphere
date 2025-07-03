"use client";

import {ReactNode} from "react";
import {
	LiveblocksProvider,
	RoomProvider,
	ClientSideSuspense,
} from "@liveblocks/react/suspense";
import {useParams} from "next/navigation";

export function Room({children}: {children: ReactNode}) {
    const params = useParams();
	return (
		<LiveblocksProvider
			publicApiKey={
				"pk_dev_W1K1LH75VbAMNHHQTlTJhjIkE-zD0HS_ucWwsOPVlnqfQyOX0vkp_IxAprpRk-_O"
			}
		>
			<RoomProvider id={params.documentId as string}>
				<ClientSideSuspense fallback={<div>Loading…</div>}>
					{children}
				</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	);
}
