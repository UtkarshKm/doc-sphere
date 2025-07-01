import {Loader2} from "lucide-react";

interface LoaderProps {
	label: string;
}

export const Loader = ({label}: LoaderProps) => {
	return (
		<div
			className={"flex flex-col justify-center items-center min-h-screen"}
		>
			<Loader2 className="h-10 w-10 animate-spin text-primary" />
			{label && <p className="text-sm text-muted-foreground mt-4">{label}</p>}
		</div>
	);
};
