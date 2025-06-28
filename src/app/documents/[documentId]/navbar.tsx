"use client";
import Image from "next/image";
import Link from "next/link";
import {DocumentInput} from "./document-input";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarTrigger,
	MenubarSubTrigger,
	MenubarSubContent,
} from "@/components/ui/menubar";
import {
	FileIcon,
	FileJsonIcon,
	FilePenIcon,
	FilePlusIcon,
	FileTextIcon,
	GlobeIcon,
	PrinterIcon,
	RedoIcon,
	TrashIcon,
	UndoIcon,
	BoldIcon,
	ItalicIcon,
	UnderlineIcon,
	StrikethroughIcon,
	RemoveFormattingIcon,
} from "lucide-react";
import {BsFilePdf} from "react-icons/bs";

export function Navbar() {
	return (
		<nav className=" flex items-center justify-start ">
			<div className=" flex gap-2 items-center">
				<Link href="/">
					<Image
						src="/logo.svg"
						alt="Doc Sphere logo"
						width={40}
						height={40}
						priority
					/>
				</Link>
			</div>
			<div className="flex flex-col justify-between gap-2">
				<DocumentInput />
				<Menubar className="border-none bg-transparent shadow-none h-auto p-0">
					<MenubarMenu>
						<MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
							File
						</MenubarTrigger>
						<MenubarContent className="print:hidden">
							<MenubarSub>
								<MenubarSubTrigger>
									<FileIcon className="size-4 mr-2" />
									Save
								</MenubarSubTrigger>
								<MenubarSubContent>
									<MenubarItem>
										<FileJsonIcon className=" size-4 mr-2" />
										JSON
									</MenubarItem>
									<MenubarItem>
										<GlobeIcon className=" size-4 mr-2" />
										HTML
									</MenubarItem>
									<MenubarItem>
										<BsFilePdf className=" size-4 mr-2" />
										PDF
									</MenubarItem>
									<MenubarItem>
										<FileTextIcon className=" size-4 mr-2" />
										TEXT
									</MenubarItem>
								</MenubarSubContent>
							</MenubarSub>
							<MenubarItem>
								<FilePlusIcon className="size-4 mr-2" />
								New Document
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem>
								<FilePenIcon className="size-4 mr-2" />
								Rename
							</MenubarItem>
							<MenubarItem>
								<TrashIcon className="size-4 mr-2" />
								Remove
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem onClick={() => window.print()}>
								<PrinterIcon className="size-4 mr-2" />
								Print
								<MenubarShortcut>⌘p</MenubarShortcut>
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
							Edit
						</MenubarTrigger>
						<MenubarContent className="print:hidden">
							<MenubarItem>
								<UndoIcon className="size-4 mr-2" />
								Undo
								<MenubarShortcut>⌘Z</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								<RedoIcon className="size-4 mr-2" />
								Redo
								<MenubarShortcut>⌘⇧Z</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem>
								Cut
								<MenubarShortcut>⌘X</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								Copy
								<MenubarShortcut>⌘C</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								Paste
								<MenubarShortcut>⌘V</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem>
								Select All
								<MenubarShortcut>⌘A</MenubarShortcut>
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
							Insert
						</MenubarTrigger>
						<MenubarContent className="print:hidden">
							<MenubarSub>
								<MenubarSubTrigger>Table</MenubarSubTrigger>
								<MenubarSubContent>
									<MenubarItem>1 x 1</MenubarItem>
									<MenubarItem>2 x 3</MenubarItem>
									<MenubarItem>3 x 3</MenubarItem>
									<MenubarItem>4 x 3</MenubarItem>
									<MenubarItem>5 x 3</MenubarItem>
								</MenubarSubContent>
							</MenubarSub>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
							Format
						</MenubarTrigger>
						<MenubarContent className="print:hidden">
							<MenubarSub>
								<MenubarSubTrigger>TEXT</MenubarSubTrigger>
								<MenubarSubContent>
									<MenubarItem>
										<BoldIcon className="size-4 mr-2" />
										Bold
									</MenubarItem>
									<MenubarItem>
										<ItalicIcon className="size-4 mr-2" />
										Italic
									</MenubarItem>
									<MenubarItem>
										<UnderlineIcon className="size-4 mr-2" />
										Underline
									</MenubarItem>
									<MenubarItem>
										<StrikethroughIcon className="size-4 mr-2" />
										Strikethrough
									</MenubarItem>
								</MenubarSubContent>
							</MenubarSub>
							<MenubarItem>
								<RemoveFormattingIcon className="size-4 mr-2" />
								Clear Formatting
							</MenubarItem>

						</MenubarContent>
					</MenubarMenu>
				</Menubar>
			</div>
		</nav>
	);
}

// TODO 

{/* <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
  <MenubarMenu>
    <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
      File
    </MenubarTrigger>
    <MenubarContent className="print:hidden">
      <MenubarItem>
        <FilePlusIcon className="size-4 mr-2" />
        New Document
        <MenubarShortcut>⌘N</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarSub>
        <MenubarSubTrigger>
          <FileIcon className="size-4 mr-2" />
          Save As
        </MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem>
            <FileJsonIcon className="size-4 mr-2" />
            JSON
          </MenubarItem>
          <MenubarItem>
            <GlobeIcon className="size-4 mr-2" />
            HTML
          </MenubarItem>
          <MenubarItem>
            <BsFilePdf className="size-4 mr-2" />
            PDF
          </MenubarItem>
          <MenubarItem>
            <FileTextIcon className="size-4 mr-2" />
            TEXT
          </MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
      <MenubarSeparator />
      <MenubarItem>
        <FilePenIcon className="size-4 mr-2" />
        Rename
      </MenubarItem>
      <MenubarItem>
        <TrashIcon className="size-4 mr-2" />
        Delete
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>
        <PrinterIcon className="size-4 mr-2" />
        Print
        <MenubarShortcut>⌘P</MenubarShortcut>
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  
  <MenubarMenu>
    <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
      Edit
    </MenubarTrigger>
    <MenubarContent className="print:hidden">
      <MenubarItem>
        <UndoIcon className="size-4 mr-2" />
        Undo
        <MenubarShortcut>⌘Z</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        <RedoIcon className="size-4 mr-2" />
        Redo
        <MenubarShortcut>⌘⇧Z</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>
        Cut
        <MenubarShortcut>⌘X</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        Copy
        <MenubarShortcut>⌘C</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        Paste
        <MenubarShortcut>⌘V</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>
        Select All
        <MenubarShortcut>⌘A</MenubarShortcut>
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  
  <MenubarMenu>
    <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
      Insert
    </MenubarTrigger>
    <MenubarContent className="print:hidden">
      <MenubarItem>
        <ImageIcon className="size-4 mr-2" />
        Image
      </MenubarItem>
      <MenubarItem>
        <TableIcon className="size-4 mr-2" />
        Table
      </MenubarItem>
      <MenubarItem>
        <LinkIcon className="size-4 mr-2" />
        Link
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>
        <CalendarIcon className="size-4 mr-2" />
        Date & Time
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  
  <MenubarMenu>
    <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
      Format
    </MenubarTrigger>
    <MenubarContent className="print:hidden">
      <MenubarItem>
        <BoldIcon className="size-4 mr-2" />
        Bold
        <MenubarShortcut>⌘B</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        <ItalicIcon className="size-4 mr-2" />
        Italic
        <MenubarShortcut>⌘I</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        <UnderlineIcon className="size-4 mr-2" />
        Underline
        <MenubarShortcut>⌘U</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarSub>
        <MenubarSubTrigger>
          <AlignLeftIcon className="size-4 mr-2" />
          Text Align
        </MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem>Left</MenubarItem>
          <MenubarItem>Center</MenubarItem>
          <MenubarItem>Right</MenubarItem>
          <MenubarItem>Justify</MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
    </MenubarContent>
  </MenubarMenu>
</Menubar> */}