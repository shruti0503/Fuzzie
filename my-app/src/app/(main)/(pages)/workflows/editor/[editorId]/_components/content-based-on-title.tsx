
import { AccordionContent } from '@/components/ui/accordion'
//import { ConnectionProviderProps } from '@/providers/connections-provider'
import { ConnectionProviderProps } from '@/providers/connection-providers'
import { EditorState } from '@/providers/editor-provider'
import { nodeMapper } from '@/lib/types'
import React, { useEffect, useState } from 'react'
import { getUser } from '@/app/(main)/(pages)/connectionUtil'
import { onUserConnections } from '@/app/(main)/(pages)/connectionUtil'
import { getUserData } from '@/app/(main)/(pages)/connections/_actions/get-user'
import { getDiscordConnectionUrl } from '@/app/(main)/(pages)/connections/_actions/discord-connection'
import { getSlackConnection } from '@/app/(main)/(pages)/connections/_actions/slack-connection'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import GoogleFileDetails from './google-file-details'
import { Input } from '@/components/ui/input'
import { onContentChange } from '@/lib/editor-utils'
import { toast } from 'sonner'
import axios from 'axios'
import GoogleDriveFiles from './google-drive-files'
import ActionBtn from './action-btn'
import { currentUser } from '@clerk/nextjs'
import { getNotionConnection } from '@/app/(main)/(pages)/connections/_actions/notion-connection'
export interface Option {
  value: string
  label: string
  disable?: boolean
  /** fixed option that can't be removed. */
  fixed?: boolean
  /** Group the options by providing key. */
  [key: string]: string | boolean | undefined
}
interface GroupOption {
  [key: string]: Option[]
}

type Props = {
  nodeConnection: ConnectionProviderProps
  newState: EditorState
  file: any
  setFile: (file: any) => void
  selectedSlackChannels: Option[]
  setSelectedSlackChannels: (value: Option[]) => void
}

const ContentBasedOnTitle = ({
  nodeConnection,
  newState,
  file,
  setFile,
  selectedSlackChannels,
  setSelectedSlackChannels,
}: Props) => {
  const { selectedNode } = newState.editor
  const [title, setTitle]=useState('');
 

  useEffect(()=>{
    console.log("title is of selectedNode", selectedNode)
    setTitle( selectedNode.data.title)

  },[selectedNode])


  useEffect(() => {
    const reqGoogle = async () => {
      try{
        const response: { data: { message: { files: any } } } = await axios.get(
          '/api/drive'
        )
        if (response) {
          console.log(response.data.message.files[0])
          toast.message("Fetched File")
          setFile(response.data.message.files[0])
        } else {
          toast.error('Something went wrong')
        }

      }
      catch(err){
        console.log(err);
      }
     
    
    }
    reqGoogle()
    setConnections();
  }, [])

  const setConnections=async()=>{
    console.log("setConnections")
   //const user= await getUser(); 
   //console.log("userk", user)
   //@ts-ignore
   // const user_info=await getUserData(user?.id);
    //console.log("user_info in compritl", user_info)
  }

  const setDiscNode= async()=>{
       const url=await getDiscordConnectionUrl();
      nodeConnection.setDiscordNode(url);
      console.log("after setting",nodeConnection.discordNode)
      const slackurl=await getSlackConnection();
      nodeConnection.setSlackNode(slackurl);
      console.log("sklack node",nodeConnection.slackNode);
      const  notionUrl=await getNotionConnection();
      nodeConnection.setNotionNode(notionUrl);
      console.log("notion node", nodeConnection.notionNode)


  }
    

  console.log("dic",nodeConnection.discordNode)

  useEffect(()=>{
   console.log("mm", nodeConnection, newState, file,
   //setFile,
  // selectedSlackChannels,
   //setSelectedSlackChannels,
   
   ) 
   setDiscNode()
 
 


  },[])
  console.log("cmapping",nodeMapper[title])
  //@ts-ignore
  const nodeConnectionType: any = nodeConnection[nodeMapper[title]]
  console.log("nodeCOnnection",nodeConnectionType)
  //if (!nodeConnectionType) return <p>Not connected</p>

  //const url = await getDiscordConnectionUrl();
  //console.log("url is", url)





  // const isConnected =
  //   title === 'Google Drive'  ? !nodeConnection?.isLoading : nodeConnectionType[
  //         `${
  //           title === 'Slack'
  //             ? 'slackAccessToken'
  //             : title === 'Discord'
  //             ? 'webhookURL'
  //             : title === 'Notion'
  //             ? 'accessToken'
  //             : ''
  //         }`
  //       ]

  //       console.log("isconnected", isConnected)

  //if (!isConnected) return <p>Not connected</p>

  return (
    <AccordionContent>
      <Card>
        {title == 'Discord' && (
          <CardHeader>
            <CardTitle>{nodeConnectionType.webhookName}</CardTitle>
            <CardDescription>{nodeConnectionType.guildName}</CardDescription>
          </CardHeader>
        )}
        <div className="flex flex-col gap-3 px-6 py-3 pb-20">
          <p>{title === 'Notion' ? 'Values to be stored' : 'Message'}</p>

         
  
          <Input
            type="text"
            value={nodeConnectionType?.content}
            onChange={(event) => onContentChange(nodeConnection, title, event)}
          />

          {JSON.stringify(file) !== '{}' && title !== 'Google Drive' && (
            <Card className="w-full">
              <CardContent className="px-2 py-3">
                <div className="flex flex-col gap-4">
                  <CardDescription>Drive File</CardDescription>
                  <div className="flex flex-wrap gap-2">
                    <GoogleFileDetails
                      nodeConnection={nodeConnection}
                      title={title}
                      gFile={file}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {title == 'Google Drive' && <GoogleDriveFiles />}
          <ActionBtn
            currentService={title}
            nodeConnection={nodeConnection}
            channels={selectedSlackChannels}
            setChannels={setSelectedSlackChannels}
          />
        </div>
      </Card>
    </AccordionContent>
  )
}

export default ContentBasedOnTitle