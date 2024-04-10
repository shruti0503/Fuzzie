'use client'
import { EditorCanvasCardType, EditorNodeType } from '@/lib/types'
import { useEditor } from '@/providers/editor-provider'
import React , {useCallback , useEffect, useMemo , useState} from 'react'
import ReactFlow, { Background ,
    Connection,
    Controls,
    Edge,
    EdgeChange,
    MiniMap,
    NodeChange,
    ReactFlowInstance,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge

} from 'reactflow'

import 'reactflow/dist/style.css'
import EditorCanvasCardSingle from './editor-canvas-card'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';


type Props = {}
const initialNodes:EditorNodeType[]=[]
const initialEdges:{id:string, source:string, target:string}[]=[]

function EditorCanvas(props: Props) {


    const {dispatch,state}=useEditor();
    const[ nodes, setNodes]=useState(initialNodes)
    const [edges, setEdges]=useState(initialEdges)
    const [isWorkFlowLoading, setIsWorkFlowLoading]=useState<boolean>(false)
    const [ReactFlowInstance, setReactFlowInstance]=useState<ReactFlowInstance>()
    const pathname=usePathname()

    const onDrop = useCallback(
        (event: any) => {
          event.preventDefault()
    
          const type: EditorCanvasCardType['type'] = event.dataTransfer.getData(
            'application/reactflow'
          )
    
          // check if the dropped element is valid
          if (typeof type === 'undefined' || !type) {
            return
          }
    
          const triggerAlreadyExists = state.editor.elements.find(
            (node) => node.type === 'Trigger'
          )
    
          if (type === 'Trigger' && triggerAlreadyExists) {
            toast('Only one trigger can be added to automations at the moment')
            return
          }
    
          // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
          // and you don't need to subtract the reactFlowBounds.left/top anymore
          // details: https://reactflow.dev/whats-new/2023-11-10
          if (!reactFlowInstance) return
          const position = reactFlowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
       })

       const newNode = {
        id: v4(),
        type,
        position,
        data: {
          title: type,
          description: EditorCanvasDefaultCardTypes[type].description,
          completed: false,
          current: false,
          metadata: {},
          type: type,
        },
      }
      //@ts-ignore
      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, state]
  )
    
    // to handle the dragover event. 
    //triggered when a draggable element is being dragged over a drop target, in this case, the editor canvas.
    const onDragOver = useCallback((event: any) => { //This object contains information about the dragover event, such as the coordinates of the mouse pointer.
        event.preventDefault()
        console.log("onDragPver", event)
        event.dataTransfer.dropEffect = 'move'
      }, []) //he onDragOver function ensures that the default behavior of disallowing dropping is prevented during a dragover event on the editor canvas. It also specifies the drop effect as 'move' to indicate that the draggable element can be moved when dropped onto the canvas.

     const  onNodesChange=useCallback((event:any)=>{

       // setNodes((nds)=>applyNodeChanges(changes,nds))

    },[setNodes])

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
          //@ts-ignore
          setNodes((nds) => applyNodeChanges(changes, nds))
        },
        [setNodes]
      )
    
      const onEdgesChange = useCallback(
        (changes: EdgeChange[]) =>
          //@ts-ignore
          setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
      )
    
      const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        []
      )






  return (
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel defaultSize={70}>
        <div className='flex h-full items-center justify-center'>
            <div  style={{ width: '100%', height: '100%', paddingBottom: '70px' }}
            className="relative">

               {
                  isWorkFlowLoading ? (

                    <div className='absolute flex h-full w-full'>

                    </div>

                  ) : (

                  )  
               }

            </div>

        </div>

    </ResizablePanel>

  </ResizablePanelGroup>
  )
}

export default EditorCanvas