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
            className="bg-[#1D57C7] text-[16px] text-white font-semibold w-[126px] h-[39px] rounded-[4px] transition-all duration-500  ease-linear cursor-pointer border border-[#1D57C7] hover:text-[#1D57C7] hover:bg-white "
            onClick={BackLogin}
          >Back to Log In</Button>
  )
}
export default BackHome;
                                                                                                     
                                                                                                     