import React from 'react'
import EditorProvider from '@/providers/editor-provider'
import { ConnectionsProvider } from '@/providers/connection-providers'
import EditorCanvas from './_components/editor-canvas'


type Props = {}

function Page(props: Props) {
  return (
    <div className='h-full'>
      <EditorProvider>
        <ConnectionsProvider>
          <EditorCanvas />
        </ConnectionsProvider>
      </EditorProvider>

    </div>
  )
}

export default Page