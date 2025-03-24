import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
    type={type}
    data-slot="Email"
    className={cn(
      "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input focus:border-blue-500  focus:ring-blue-500 transition-all duration-300 ease-in-out flex h-9 w-80 min-w-0 rounded-b-xs border bg-transparent px-3 py-1 text-base shadow-xs outline-none file:inline-flex file:h-7 file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      className
     
    )}

  
      {...props}
    />
  );
}

export { Input };
