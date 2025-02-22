"use client"

import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react";
export default function ShowToast({text = ''}) {
  const { toast } = useToast()

 useEffect(()=>{
  toast({
    description: text,
  })
 }, [])
  return(<></>);
}
