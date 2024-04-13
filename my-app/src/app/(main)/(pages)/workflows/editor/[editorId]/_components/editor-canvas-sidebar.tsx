'use client'

import { EditorCanvasTypes, EditorNodeType } from "@/lib/types"
import { ConnectionsProvider, useNodeConnections } from "@/providers/connection-providers"
import { useEditor } from "@/providers/editor-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import React, {useEffect} from "react"
import { Separator } from "@radix-ui/react-separator"
import { CONNECTIONS } from "@/lib/constants/constants"
import { EditorCanvasDefaultCardTypes } from "@/lib/constants/constants"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import EditorCanvasIconHelper from "./editor-canvas-card-icon-helper"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@radix-ui/react-accordion"

import RenderConnectionAccordian from "./RenderConnectionAccordian"
import { Console } from "console"
import { onDragStart } from "@/lib/editor-utils"




type Props={
    nodes:EditorNodeType[]
}

const EditorCanvasSidebar=({nodes}:Props)=>{
    const {state}=useEditor()
    const {nodeConnection}=useNodeConnections();

    useEffect(()=>{
        console.log("Editor state", state)
       console.log("loaded")
       console.log("entried",Object.entries(EditorCanvasDefaultCardTypes)) // returns an array of enteries like this:
       // Email: { description: 'Send and email to a user', type: 'Action' } => equal to 
       console.log(Object.entries(EditorCanvasDefaultCardTypes.Email)) // gives 2 array ['desc', 'send email'] ['type', 'action]
       console.log("anoyher",Object.entries(EditorCanvasDefaultCardTypes)
       .filter(
         ([_, cardType]) =>
           (!nodes.length && cardType.type == 'Trigger') ||
           (!nodes.length && cardType.type == 'Action')
       ))

    },[])



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
                (!nodes.length && cardType.type == 'Trigger') ||
                (!nodes.length && cardType.type == 'Action')
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
                  setting
                </TabsContent>
            </Tabs>

        </div>
    )
}
export default EditorCanvasSidebar