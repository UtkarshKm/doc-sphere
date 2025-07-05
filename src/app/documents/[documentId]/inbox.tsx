"use client";

import { ClientSideSuspense } from "@liveblocks/react/suspense";
import {
	useInboxNotifications,
	useUnreadInboxNotificationsCount,
	useMarkAllInboxNotificationsAsRead,
} from "@liveblocks/react/suspense";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import { Button } from "@/components/ui/button"; // 🌟 shadcn/ui Button
import { BellIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Inbox = () => {
	return (
		<ClientSideSuspense
			fallback={
				<>
					<Button variant="ghost" className="relative" size="icon" disabled>
						<BellIcon className="size-5" />
					</Button>
					<Separator orientation="vertical" className="h-6" />
				</>
			}
		>
			<InboxMenu />
		</ClientSideSuspense>
	);
};

const InboxMenu = () => {
	const { inboxNotifications } = useInboxNotifications();
	const { count } = useUnreadInboxNotificationsCount();
	const markAll = useMarkAllInboxNotificationsAsRead();

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="relative" size="icon">
						<BellIcon className="size-5" />
						{count > 0 && (
							<span className="absolute -top-1 -right-1 size-4 rounded-full bg-sky-500 text-white text-xs flex items-center justify-center">
								{count}
							</span>
						)}
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" className="w-[400px]">
					{inboxNotifications.length > 0 ?
						<>
							<div className="flex justify-end px-2 py-1">
								<Button variant="outline" size="sm" onClick={() => markAll()}>
									Mark all as read
								</Button>
							</div>
							<InboxNotificationList>
								{inboxNotifications.map((n) => (
									<InboxNotification key={n.id} inboxNotification={n} />
								))}
							</InboxNotificationList>
						</>
					:	<div className="p-2 w-full text-center text-sm text-muted-foreground">
							No notifications
						</div>
					}
				</DropdownMenuContent>
			</DropdownMenu>
			<Separator orientation="vertical" className="h-6" />
		</>
	);
};
