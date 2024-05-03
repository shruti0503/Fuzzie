import React, { useEffect } from 'react'
import ConnectionCard from '@/app/(main)/(pages)/connections/_components/connection-card'
import { AccordionContent } from '@/components/ui/accordion'
import { Connection } from '@/lib/types'
import { useNodeConnections } from '@/providers/connection-providers'
import { EditorState } from '@/providers/editor-provider'
import { fetchBotSlackChannels } from '@/lib/editor-utils'

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
  } from '@/components/ui/command'

  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from '@/components/ui/popover'

  import { CheckIcon, ChevronsUpDown } from 'lucide-react'
  import { Button } from '@/components/ui/button'
  import { cn } from '@/lib/utils'
import MultipleSelector from '@/components/ui/multiple-selector'

  const frameworks = [
    {
      value: 'next.js',
      label: 'Next.js',
    },
    {
      value: 'sveltekit',
      label: 'SvelteKit',
    },
    {
      value: 'nuxt.js',
      label: 'Nuxt.js',
    },
    {
      value: 'remix',
      label: 'Remix',
    },
    {
      value: 'astro',
      label: 'Astro',
    },
  ]

type Props = {connection: Connection, state: EditorState}
import { useFuzzieStore } from '@/store'

const RenderConnectionAccordian = ({
    connection,
    state,
  }: {
    connection: Connection
    state: EditorState
  })=> {

    const {
        title,
        image,
        description,
        connectionKey,
        //@ts-ignore
        accessTokenKey,
        alwaysTrue,
        slackSpecial,
      } = connection


      
      const { nodeConnection } = useNodeConnections()
      const [open, setOpen] = React.useState(false)
      const [value, setValue] = React.useState('')
      const {slackChannels, selectedSlackChannels, setSelectedSlackChannels}=useFuzzieStore()
      const [slackSpecialstate, setSlackSpecialState]=React.useState();
      const [icConnState, setIsConnState]=React.useState(false);
      const  {googleFile, setSlackChannels}=useFuzzieStore();
      
     useEffect(()=>{
      console.log("slack channeks", slackChannels)
      console.log("slackSpecial",slackSpecial)
      console.log("slack channeks", slackChannels.length)


     },[])

      // WIP : salck channel fuxzie store

      const connectionData = (nodeConnection as any)[connectionKey]
      console.log("nodeConnection[connectionKey]",nodeConnection[connectionKey])

   console.log("connectionData", connectionData)
   console.log("connectionKey",connectionKey)
   console.log("connectionCheck",connection)
   
      const isConnected =
        alwaysTrue ||
        (nodeConnection[connectionKey] &&
          accessTokenKey &&
          connectionData[accessTokenKey!] || connectionData[accessTokenKey])

      console.log("slack conn", isConnected)
      console.log("slackSpecial && isConnected",(slackSpecial && isConnected))

    useEffect(()=>{
      //@ts-ignore
      setSlackSpecialState(slackSpecial)
      setIsConnState(isConnected)

    },[isConnected, slackSpecial])

    useEffect(()=>{
      if(nodeConnection.slackNode.slackAccessToken){

       fetchBotSlackChannels(nodeConnection.slackNode.slackAccessToken, setSlackChannels)
      }
    },[])

 
      return (
        <AccordionContent key={title}>
          {state.editor.selectedNode.data.title === title && (
            <>
              <ConnectionCard
                title={title}
                icon={image}
                description={description}
                type={title}
                connected={{ [title]: isConnected }}
              />
              {slackSpecialstate && icConnState && (
                <div className="p-6">
                  { 
                  slackChannels?.length ? (
                    <>
                      <div className="mb-4 ml-1">
                        Select the slack channels to send notification and messages:
                      </div>
                      <MultipleSelector
                        value={selectedSlackChannels}
                        onChange={setSelectedSlackChannels}
                        defaultOptions={slackChannels}
                        placeholder="Select channels"
                        emptyIndicator={
                          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            no results found.
                          </p>
                        }
                      />
                    </>
                  ) : (
                    'No Slack channels found. Please add your Slack bot to your Slack channel'
                  )}
                </div>
              )}
            </>
          )}
        </AccordionContent>
      )
    }
 export default RenderConnectionAccordian