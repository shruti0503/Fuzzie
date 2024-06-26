'use client'

import { EditorCanvasTypes, EditorNodeType } from "@/lib/types"
import { ConnectionsProvider, useNodeConnections } from "@/providers/connection-providers"
import { useEditor } from "@/providers/editor-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import React, {useCallback, useEffect} from "react"
import { Separator } from "@radix-ui/react-separator"
import { CONNECTIONS } from "@/lib/constants/constants"
import { EditorCanvasDefaultCardTypes } from "@/lib/constants/constants"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import EditorCanvasIconHelper from "./editor-canvas-card-icon-helper"
import { Accordion , AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"

import RenderConnectionAccordian from "./RenderConnectionAccordian"
import { Console } from "console"
import { onDragStart } from "@/lib/editor-utils"
//import RenderConnectionAccordian from "./RenderConnectionAccordian"
import { useFuzzieStore } from "@/store"
import RenderOutputAccordion from "./RenderOutputAccordian"
import { fetchBotSlackChannels } from "@/lib/editor-utils"

type Props={
    nodes:EditorNodeType[]
}

const EditorCanvasSidebar=({nodes}:Props)=>{
    const {state}=useEditor()
    const {nodeConnection}=useNodeConnections();
    const  {googleFile, setSlackChannels}=useFuzzieStore();

    useEffect(()=>{
      if(nodeConnection.slackNode.slackAccessToken){
        fetchBotSlackChannels(nodeConnection.slackNode.slackAccessToken, setSlackChannels)
      }
    },[])

    useEffect(()=>{
        console.log("Editor state", state)
       console.log("loaded")
       console.log("connections are", CONNECTIONS)
       console.log("entried",Object.entries(EditorCanvasDefaultCardTypes)) // returns an array of enteries like this:
       // Email: { description: 'Send and email to a user', type: 'Action' } => equal to 
       console.log(Object.entries(EditorCanvasDefaultCardTypes.Email)) // gives 2 array ['desc', 'send email'] ['type', 'action]
       console.log("anoyher",Object.entries(EditorCanvasDefaultCardTypes)
       .filter(
         ([_, cardType]) =>
           (!nodes.length && cardType.type == 'Trigger') ||
           (!nodes.length && cardType.type == 'Action')
       ))

       console.log("connections", CONNECTIONS)
       console.log( "edior", state.editor.selectedNode.data.title)

    },[])

   const DragDerect=useCallback(()=>{
    console.log("cards",Object.entries(EditorCanvasDefaultCardTypes)
    .filter(
      ([_, cardType]) =>
        (!nodes.length && cardType.type == 'Trigger') ||
        (!nodes.length && cardType.type == 'Action')
    ))


   },[Object.entries(EditorCanvasDefaultCardTypes)])



    return (
        <div>
            
            <Tabs  defaultValue="actions" className="h-screen overflow-scroll pb-24">
                <TabsList className="bg-transparent">
                    <TabsTrigger value="actions">Actions</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <Separator />
                <TabsContent  value="actions" className="flex flex-col gap-4 p-4">

                {Object.entries(EditorCanvasDefaultCardTypes)
            .filter(
              ([_, cardType]) =>
                ( cardType.type == 'Trigger') ||
                ( cardType.type == 'Action')
            )
            .map(([cardKey, cardValue]) => (
              <Card
                key={cardKey}
                draggable
                className="w-full cursor-grab border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
                onDragStart={(event) =>
                  onDragStart(event, cardKey as EditorCanvasTypes)
                }
              >
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                  <EditorCanvasIconHelper type={cardKey as EditorCanvasTypes} />
                  <CardTitle className="text-md">
                    {cardKey}
                    <CardDescription>{cardValue.description}</CardDescription>
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
                </TabsContent>

                <TabsContent value="settings" className="flex flex-col gap-4 p-4">
                <div className="px-2 py-4 text-center text-xl font-bold">
                    {state.editor.selectedNode.data.title}
                </div>
                <Accordion type="multiple">
            <AccordionItem
              value="Options"
              className="border-y-[1px] px-2"
            >
              <AccordionTrigger className="!no-underline">
                Account
              </AccordionTrigger>
              <AccordionContent>
                {CONNECTIONS.map((connection) => (
                  <RenderConnectionAccordian
                    key={connection.title}
                    state={state}
                    connection={connection}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="Expected Output"
              className="px-2"
            >
              <AccordionTrigger className="!no-underline">
                Action
              </AccordionTrigger>
              <RenderOutputAccordion
                state={state}
                nodeConnection={nodeConnection}
              />
            </AccordionItem>
          </Accordion>
                </TabsContent>
            </Tabs>

        </div>
    )
}
export default EditorCanvasSidebar