'use client'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'
import { useModal } from '@/providers/modal-providers'
import CustomModal from '@/components/global/custom-modal'
import WorkflowForm from '@/components/forms/workflow-form'

type Props={
   

}

function WorkFlowBtn(props:Props){
    const {setOpen, setClose}=useModal()
  const handleClick=()=>{

    setOpen(
        <CustomModal
        title="Create a workflow automation"
         subheading="workflows are a powerful that help you automate tasks">
            <WorkflowForm />

        </CustomModal>
    )

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