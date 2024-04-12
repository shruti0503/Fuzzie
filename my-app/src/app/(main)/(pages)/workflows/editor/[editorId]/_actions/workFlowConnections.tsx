'use server'
import {db} from '@/lib/db'
import { useCallback } from 'react'

export const onCreateNodesEdges=async(
    flowId:string,
    nodes:string,
    edges:string,
    flowPath:string

)=>{

    console.log(flowId, nodes, edges, flowPath)

    const flow=await db.workflows.update({
        where:{
            id:flowId
        },
        data:{
            nodes,
            edges,
            flowPath:flowPath

        },
    })

    if(flow) return {message:'flow saved'}

}


export const onFlowPublish=async(
    workflowId:string,
    state:boolean
)=>{
    console.log(state)

    const published=await db.workflows.update({
        where:{
            id:workflowId,
        },
        data:{
            publish:state,
        },
    })

    if(published.publish) return 'workflow published'
    return 'workflow unpublished'

}

