import { useEditor } from '@/providers/editor-provider'
import React, { CSSProperties } from 'react'
import { Handle, HandleProps, useStore } from 'reactflow'

type Props = HandleProps & { style?: CSSProperties }

const selector = (s: any) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
})


const CustomHandle = (props: Props) => {
  const { state } = useEditor()

  return (
    // represents a draggable handle that can be connected to other elements in a flow diagram.
    <Handle
      {...props} //pass all props received by the CustomHandle component to the Handle component.
      //This prop defines a function that determines whether a connection from this handle to another element is valid.
    //The function receives an object e as an argument, which contains information about the connection being attempted (such as the source and target elements).
      isValidConnection={(e) => {
        // calculating the number of connections originating from the Handle's source element
        //  (sourcesFromHandleInState) by filtering the edges in the edior state and counting those with the same source id
        const sourcesFromHandleInState = state.editor.edges.filter(
          (edge) => edge.source === e.source
        ).length
        // finds the source node (sourceNode) in the editor state based
        // on the source ID of the current connection attempt.
        const sourceNode = state.editor.elements.find(
          (node) => node.id === e.source
        )
        //target
        // calculating the number of connections targeting the handle's target element by filtering the edges in the editor state
        // and counting those with the same targetId as the current connection attempt (e.target)
        const targetFromHandleInState = state.editor.edges.filter(
          (edge) => edge.target === e.target
        ).length
       //If there is already one connection targeting the handle's target element, it returns false to prevent multiple connections to the same target.
        if (targetFromHandleInState === 1) return false
       // If the source node's type is 'Condition', it returns true to allow connections regardless of existing connections from the source handle.
        if (sourceNode?.type === 'Condition') return true
        //If there are fewer than one source connection from the handle, it returns true to allow a new connection.
        if (sourcesFromHandleInState < 1) return true
        // it returns false to indicate that the connection is not valid.
        return false
      }}
      className="!-bottom-2 !h-4 !w-4 dark:bg-neutral-800"
    />
  )
}

export default CustomHandle