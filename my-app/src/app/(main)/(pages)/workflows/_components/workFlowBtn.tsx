'use client'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'
import { useModal } from '@/providers/modal-providers'

type Props={

}

function WorkFlowBtn(props:Props){
    const {setOpen, setClose}=useModal()
  const handleClick=()=>{

  }


  return (
    <Button
    size={'icon'}
    onClick={handleClick}
     >
        <Plus />


    </Button>
    
  )
}

export default WorkFlowBtn