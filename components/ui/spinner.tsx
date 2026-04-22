import { cn } from "@/lib/utils"
import { AiOutlineLoading3Quarters } from "react-icons/ai";


function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <AiOutlineLoading3Quarters role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />
  )
}

export { Spinner }
