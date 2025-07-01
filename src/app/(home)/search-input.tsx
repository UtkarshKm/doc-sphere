"use client";
import { Button } from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useSearchParams } from "@/hooks/use-search-parma";

export const SearchInput = () => {
	const [search, setSearch] = useSearchParams("search");
	const [value, setValue] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handleClear = () => {
		setValue("");
		inputRef.current?.blur();
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSearch(value);
		inputRef.current?.blur();
	};


	return (
		<div className="flex items-center justify-center flex-1">
			<form
				className="relative w-full max-w-[720px]"
				onSubmit={handleSubmit}
				
			>
				<Input
				value={value}
				onChange={handleChange}
				ref={inputRef}
					placeholder="search"
					className=" md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#F0F4F8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white"
				/>
				<Button 
					type="submit"
					variant="ghost"
					size="icon"

				className="absolute left-3 top-1/2 -translate-y-1/2 [&_ svg]:size-5 rounded-full">
					<SearchIcon  />
					
				</Button>
				{value && (
					<Button
						type="button"
						variant="ghost"
						size="icon"
						onClick={handleClear}
						className="absolute right-3 top-1/2 -translate-y-1/2 [&_ svg]:size-5 rounded-full"
					
					>
						<XIcon />
					</Button>
				)}
			</form>
		</div>
	);
};
