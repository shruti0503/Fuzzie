import { listBotChannels } from "@/app/(main)/(pages)/connections/_actions/slack-connection";
import { EditorCanvasCardType } from "./types";
import { ConnectionProviderProps } from "@/providers/connection-providers";
import { Option } from "@/components/ui/multiple-selector";
import { EditorCanvasDefaultCardTypes } from "./constants/constants";
export const onDragStart=(event:any, nodeType:EditorCanvasCardType['type'])=>{
    console.log("DragStart", nodeType)
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed='move'
    console.log("card", Object.entries(EditorCanvasDefaultCardTypes))
}

export const onSlackContent=(nodeConnection:ConnectionProviderProps, event:React.ChangeEvent<HTMLInputElement>)=>{
    nodeConnection.setSlackNode((prev:any)=>({
        ...prev,
        content:event.target.value
    }))
}

export const onDiscordContent = (
    nodeConnection: ConnectionProviderProps,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    nodeConnection.setDiscordNode((prev: any) => ({
      ...prev,
      content: event.target.value,
    }))
  }

  export const onNotionContent = (
    nodeConnection: ConnectionProviderProps,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    nodeConnection.setNotionNode((prev: any) => ({
      ...prev,
      content: event.target.value,
    }))
  }


export const onContentChange = (
    nodeConnection: ConnectionProviderProps,
    nodeType: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (nodeType === 'Slack') {
      onSlackContent(nodeConnection, event)
    } else if (nodeType === 'Discord') {
      onDiscordContent(nodeConnection, event)
    } else if (nodeType === 'Notion') {
      onNotionContent(nodeConnection, event)
    }
  }

  export const onAddTemplate=(nodeConnection:ConnectionProviderProps, title:String, template:string)=>{

    if(title==='Slack'){
        onAddTemplateSlack(nodeConnection, template);
    }
    else if(title==='Discord'){
        onAddTemplateDiscord(nodeConnection, template);
    }

  }

  export const onAddTemplateSlack = (
    nodeConnection: ConnectionProviderProps,
    template: string
  ) => {
    nodeConnection.setSlackNode((prev: any) => ({
      ...prev,
      content: `${prev.content} ${template}`,
    }))
  }
  
  export const onAddTemplateDiscord = (
    nodeConnection: ConnectionProviderProps,
    template: string
  ) => {
    nodeConnection.setDiscordNode((prev: any) => ({
      ...prev,
      content: `${prev.content} ${template}`,
    }))
  }

  export const fetchBotSlackChannels = async (
    token: string,
    setSlackChannels: (slackChannels: Option[]) => void
  ) => {
    await listBotChannels(token)?.then((channels) => setSlackChannels(channels))
  }
