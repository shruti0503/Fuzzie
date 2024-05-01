import React, { useCallback } from 'react'
import { Option } from '@/components/ui/multiple-selector'
import { ConnectionProviderProps } from '@/providers/connection-providers'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { postContentToWebHook } from '@/app/(main)/(pages)/connections/_actions/discord-connection'
import { onCreateNodeTemplate } from '../_actions/workFlowConnections'
import path from 'path'
import { toast } from 'sonner'
import { render } from 'react-dom'
import { onCreateNewPageInDatabase } from '@/app/(main)/(pages)/connections/_actions/notion-connection'
import { postMessageToSlack  } from '@/app/(main)/(pages)/connections/_actions/slack-connection'
type Props = {
  currentService:string,
  nodeConnection:ConnectionProviderProps
  channels?:Option[]
  setChannels?:(value:Option[])=>void
}

const ActionBtn = ( {currentService, nodeConnection, channels, setChannels}:Props) => {
  const pathname=usePathname()
  
  const onSendDiscordMessage = useCallback(async () => {
    const response = await postContentToWebHook(
      nodeConnection.discordNode.content,
      //@ts-ignore WIP: idk y (workig only on )
      nodeConnection.discordNode.url
    )    

    if (response?.message == 'success') {
      nodeConnection.setDiscordNode((prev: any) => ({
        ...prev,
        content: '',
      }))
    }
  }, [nodeConnection.discordNode])

  const onCreateLocalNodeTemplate=useCallback(async()=>{

    if(currentService==='Discord'){
      const response=await onCreateNodeTemplate(
        nodeConnection.discordNode.content,
        currentService,
        pathname.split('/').pop()!
      )
    }

    if(currentService==='Slack'){
      const response=await onCreateNodeTemplate(
        nodeConnection.slackNode.content,
        currentService,
        pathname.split('/').pop()!,
        channels,
        nodeConnection.slackNode.slackAccessToken
      )

      if (response) toast.message(response)
    }

  },[nodeConnection, channels])


  const onStoreNotionContent = useCallback(async () => {
    console.log("jaa na", 
    nodeConnection.notionNode.databaseId,
    nodeConnection.notionNode.accessToken,
    nodeConnection.notionNode.content

    )
    const response = await onCreateNewPageInDatabase(
      nodeConnection.notionNode.databaseId,
      nodeConnection.notionNode.accessToken,
      nodeConnection.notionNode.content
    )
    if (response) {
      nodeConnection.setNotionNode((prev: any) => ({
        ...prev,
        content: '',
      }))
    }
  }, [nodeConnection.notionNode])

  const onStoreSlackContent = useCallback(async () => {
    const response = await postMessageToSlack(
      nodeConnection.slackNode.slackAccessToken,
      channels!,
      nodeConnection.slackNode.content
    )
    if (response.message == 'Success') {
      toast.success('Message sent successfully')
      nodeConnection.setSlackNode((prev: any) => ({
        ...prev,
        content: '',
      }))
      setChannels!([])
    } else {
      toast.error(response.message)
    }
  }, [nodeConnection.slackNode, channels])

  const renderActionButton=()=>{
    switch(currentService){
      case 'Discord':
        return(
          <>
          <Button variant="outline" onClick={onSendDiscordMessage}>
            Test Messages
          </Button>
          </>
        )

      case 'Notion':
        return (
          <>
          <Button variant="outline" onClick={onStoreNotionContent}>
            Test Messages
          </Button>

          <Button onClick={onCreateLocalNodeTemplate} variant='outline'>
            Save template
          </Button>

          </>
      )

      case 'Slack':
        return (
          <>
          <Button variant="outline" onClick={onStoreSlackContent}>
            Test Messages
          </Button>

          <Button onClick={onCreateLocalNodeTemplate} variant='outline'>
            Save Template
          </Button>

          </>
      )

      default:
        return null

    }
  }

  return renderActionButton()
}

export default ActionBtn