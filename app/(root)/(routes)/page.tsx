"use client"

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";
import { on } from "events";
import { useEffect } from "react";

// This function sets up the page by opening a modal if it is not already open
export default function SetupPage() {
  // Get the onOpen and isOpen functions from the useStoreModal hook
  const onOpen = useStoreModal((state) => state.onOpen)
  const isOpen = useStoreModal((state) => state.isOpen)

  // Call the onOpen function if the modal is not open
  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  // Return null as this function does not render any UI
  return null
}
