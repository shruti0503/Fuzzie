'use client'

import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useNodeConnections } from '@/providers/connection-providers'

//actions
import { onCreateNodesEdges } from '../_actions/workFlowConnections'
import { onFlowPublish } from '../_actions/workFlowConnections'
import path from 'path'
import { Toast } from '@/components/ui/toast'

type Props = {
    children: React.ReactNode
    edges:any[]
    nodes:any[]
}

const FlowInstance = ({ children, edges, nodes }: Props) => {
    const pathname = usePathname()
  const [isFlow, setIsFlow] = useState([])
  const { nodeConnection } = useNodeConnections()
 
//responsible for initiating the process of creating or updating nodes and edges in the workflow
 const onFlowAutomation=useCallback(async()=>{
    const flow=await onCreateNodesEdges(
        pathname.split('/').pop()!,
        JSON.stringify(nodes),
        JSON.stringify(edges),
        JSON.stringify(isFlow)
    )

    if(flow) Toast.message(flow.message)

 },[nodeConnection])

 const onPublishWorkflow = useCallback(async()=>{
    const response=await onFlowPublish(pathname.split('/').pop()!, true)
    if(response) Toast.message(response)

 },[])

 const onAutomateFlow = async () => {
    const flows: any = [] // empty array 'flows ' to store the types of nodes -> connected in the workflow 
    // mapping over edges to extractthe target property of each edge 
    //edges.map((edge)=> edge.taregt)-> will give out an array and we will store it in connecyted Edges
    const connectedEdges = edges.map((edge) => edge.target)
    // for each target , seahces thright the nodes array to find the -> node with same id 
    connectedEdges.map((target) => {
      nodes.map((node) => {
        if (node.id === target) { // if the id matches 
          flows.push(node.type) // retrive its type property and push it into flows array
        }
      })
    })
   // finally setting the 'isFlow;' state, updating it woith the types of nodes that are connectedin the workflow
    setIsFlow(flows)
  }

  useEffect(()=>{
    onAutomateFlow();

  },[edges])

  //effect runs onAutomateFlow whenever the edges prop changes, ensuring that the 
  //isFlow state is updated whenever the connections between nodes change.
  return (
    <div className="flex flex-col gap-2">
       <div className="flex gap-3 p-4">
        <Button
          onClick={onFlowAutomation}
          disabled={isFlow.length < 1}
        >
          Save
        </Button>
        <Button
          disabled={isFlow.length < 1}
         onClick={onPublishWorkflow}
        >
          Publish
        </Button>
      </div>
    </div>
  )
}

export default FlowInstance