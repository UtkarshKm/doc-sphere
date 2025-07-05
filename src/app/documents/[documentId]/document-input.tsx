import { useRef, useState, useEffect } from "react";
import { BsCloudCheck } from "react-icons/bs";
import { Id } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useDebounceValue } from "usehooks-ts";
import { toast } from "sonner";

interface DocumentInputProps {
	title: string;
	id: Id<"documents">;
}

export function DocumentInput({ title, id }: DocumentInputProps) {
	const [value, setValue] = useState(title);
	const [debouncedValue, setDebouncedValue] = useDebounceValue(value, 1500);
	const [isSaving, setIsSaving] = useState(false);
	const [isError, setIsError] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const mutate = useMutation(api.document.updateDocumentById);
	const isDirty = value !== title;

	useEffect(() => {
		if (debouncedValue === title) return;

		const save = async () => {
			setIsSaving(true);
			setIsError(false);
			try {
				await mutate({ id, title: debouncedValue });
				toast.success("Title saved");
			} catch {
				setIsError(true);
				toast.error("Failed to save title");
			} finally {
				setIsSaving(false);
			}
		};

		save();
	}, [debouncedValue]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		setDebouncedValue(e.target.value);
	};

	const iconClass =
		isError ? "text-red-500"
		: isSaving ? "text-yellow-500 animate-pulse"
		: isDirty ? "text-yellow-500"
		: "text-green-500";

	return (
		<div className="flex items-center gap-2">
			<div className="relative w-fit max-w-[50ch]">
				<span className="invisible whitespace-pre px-1.5 text-lg">{value}</span>
				<input
					ref={inputRef}
					value={value}
					onChange={onChange}
					className="absolute inset-0 bg-transparent px-1.5 text-lg text-black truncate"
				/>
			</div>
			<BsCloudCheck className={iconClass}  />
		</div>
	);
}
