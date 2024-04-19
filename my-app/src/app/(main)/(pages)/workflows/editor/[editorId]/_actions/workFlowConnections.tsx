'use server'
import {db} from '@/lib/db'
import { useCallback } from 'react'
import { auth, currentUser } from '@clerk/nextjs'
import { Option } from '@/components/ui/multiple-selector'

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

  export const onCreateNodeTemplate = async (
    content: string,
    type: string,
    workflowId: string,
    channels?: Option[],
    accessToken?: string,
    notionDbId?: string
  ) => {
    if (type === 'Discord') {
      const response = await db.workflows.update({
        where: {
          id: workflowId,
        },
        data: {
          discordTemplate: content,
        },
      })
  
      if (response) {
        return 'Discord template saved'
      }
    }
    if (type === 'Slack') {
      const response = await db.workflows.update({
        where: {
          id: workflowId,
        },
        data: {
          slackTemplate: content,
          slackAccessToken: accessToken,
        },
      })
  
      if (response) {
        const channelList = await db.workflows.findUnique({
          where: {
            id: workflowId,
          },
          select: {
            slackChannels: true,
          },
        })
  
        if (channelList) {
          //remove duplicates before insert
          const NonDuplicated = channelList.slackChannels.filter(
            (channel) => channel !== channels![0].value
          )
  
          NonDuplicated!
            .map((channel) => channel)
            .forEach(async (channel) => {
              await db.workflows.update({
                where: {
                  id: workflowId,
                },
                data: {
                  slackChannels: {
                    push: channel,
                  },
                },
              })
            })
  
          return 'Slack template saved'
        }
        channels!
          .map((channel) => channel.value)
          .forEach(async (channel) => {
            await db.workflows.update({
              where: {
                id: workflowId,
              },
              data: {
                slackChannels: {
                  push: channel,
                },
              },
            })
          })
        return 'Slack template saved'
      }
    }
  
    if (type === 'Notion') {
      const response = await db.workflows.update({
        where: {
          id: workflowId,
        },
        data: {
          notionTemplate: content,
          notionAccessToken: accessToken,
          notionDbId: notionDbId,
        },
      })
  
      if (response) return 'Notion template saved'
    }
  }
  
  