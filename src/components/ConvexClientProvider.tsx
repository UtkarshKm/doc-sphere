"use client";

import {
	ConvexReactClient,
	Authenticated,
	Unauthenticated,
	AuthLoading,
} from "convex/react";
import {ReactNode} from "react";
import {ClerkProvider, useAuth, SignIn} from "@clerk/nextjs";
import {ConvexProviderWithClerk} from "convex/react-clerk";
import {Loader} from "./loader";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({children}: {children: ReactNode}) {
	return (
		<ClerkProvider
			publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
		>
			<ConvexProviderWithClerk
				client={convex}
				useAuth={useAuth}
			>
				<Authenticated>{children}</Authenticated>
				<Unauthenticated>
					<div className="flex justify-center items-center min-h-screen">
						<SignIn routing="hash" />
					</div>
				</Unauthenticated>
				<AuthLoading>
					<Loader label="Auth Loading..." />
				</AuthLoading>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}
