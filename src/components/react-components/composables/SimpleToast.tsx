"use client"

import { useToast } from "@/hooks/use-toast"
import type { ReactNode } from "react"

type ToastProps = {
    children : ReactNode,
    text : string
}
export default function SimpleToast({children, text} : ToastProps) {
  const { toast } = useToast()

  return (
    <div
      onClick={() => {
        toast({
          description: text,
        })
      }}
    >
      {children}
    </div>
  )
}
