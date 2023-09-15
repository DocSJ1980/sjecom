"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { set } from "zod";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandInput, CommandSeparator } from "./ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[]
}

export default function StoreSwitcher({
    className,
    items = []
}: StoreSwitcherProps) {

    const storeModal = useStoreModal()
    const params = useParams()
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id
    }))
    const currentStore = formattedItems.find((item) => item.value === params.storeId)
    const onStoreSelect = (store: { label: string, value: string }) => {
        setOpen(false)
        router.push(`/${store.value}`)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    size="sm"
                    role="combo"
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={cn("w-[200px] justify-between ", className)}
                >
                    <StoreIcon className="mr-2 w-4 h-4" />
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto w-4 h-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search Store ..." />
                        <CommandEmpty>No Store Found</CommandEmpty>
                        <CommandGroup heading="Stores" >
                            {formattedItems.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    onSelect={() => onStoreSelect(item)}
                                >
                                    <StoreIcon className="mr-2 w-4 h-4" />
                                    {item.label}
                                    <Check
                                        className={cn("ml-auto w-4 h-4", currentStore?.value === item.value ? "opacity-100" : "opacity-0")}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup  >
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false)
                                    storeModal.onOpen()
                                }}
                            >
                                <PlusCircle className="mr-2 w-5 h-5" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}