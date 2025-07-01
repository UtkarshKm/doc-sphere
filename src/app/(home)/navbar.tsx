import Link from "next/link";
import Image from "next/image";
import {SearchInput} from "./search-input";

export const Navbar = () => {
	return (
		<nav className="flex items-center justify-between h-full w-full pl-4 pr-4">
			<div className="flex items-center gap-3 pr-6 ">
				<Link href="/">
					<Image
						src="/logoText.svg"
						alt="Doc Sphere logo"
						width={171}
						height={32}
						priority
					/>
				</Link>
			</div>
			<SearchInput />
            <div>
                empty space
            </div>
		</nav>
	);
};
