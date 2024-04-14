'use server'
import {db} from '@/lib/db'
import { useCallback } from 'react'
import { auth, currentUser } from '@clerk/nextjs'


export const getGoogleListener=async()=>{
    const {userId}=auth();
    if (userId) {
        const listener = await db.user.findUnique({
          where: {
            clerkId: userId,
          },
          select: {
            googleResourceId: true,
          },
        })
    
        if (listener) return listener
      }
      
}


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

export const onGetNodesEdges = async (flowId: string) => {
    const nodesEdges = await db.workflows.findUnique({
      where: {
        id: flowId,
      },
      select: {
        nodes: true,
        edges: true,
      },
    })
    if (nodesEdges?.nodes && nodesEdges?.edges) return nodesEdges
  }


