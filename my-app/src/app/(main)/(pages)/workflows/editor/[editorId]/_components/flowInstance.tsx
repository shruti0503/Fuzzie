'use client'

import React from 'react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

type Props = {
    children: React.ReactNode
    edges:any[]
    nodes:any[]
}

const FlowInstance = ({ children, edges, nodes }: Props) => {
    const pathname = usePathname()
  const [isFlow, setIsFlow] = useState([])
 // const { nodeConnection } = useNodeConnections()


 const onAutomateFlow = async () => {
    const flows: any = []
    const connectedEdges = edges.map((edge) => edge.target)
    connectedEdges.map((target) => {
      nodes.map((node) => {
        if (node.id === target) {
          flows.push(node.type)
        }
      })
    })

    setIsFlow(flows)
  }
  return (
    <div className="flex flex-col gap-2">
       <div className="flex gap-3 p-4">
        <Button
          //onClick={onFlowAutomation}
          disabled={isFlow.length < 1}
        >
          Save
        </Button>
        <Button
          disabled={isFlow.length < 1}
         // onClick={onPublishWorkflow}
        >
          Publish
        </Button>
      </div>
    </div>
  )
}

export default FlowInstance