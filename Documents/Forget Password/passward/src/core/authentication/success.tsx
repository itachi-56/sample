"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const BackHome=()=>{
  const route=useRouter()
  const BackLogin=()=>{
    route.push("/")
  }

  return(
<Button
            className=" w-[126px] h-[39px] relative top-[6px] left-2  "
            onClick={BackLogin}
          >Back to Log In</Button>
  )
}
export default BackHome;
                                                                                                     
                                                                                                     