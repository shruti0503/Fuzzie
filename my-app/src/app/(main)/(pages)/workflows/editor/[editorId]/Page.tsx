import React from 'react'
import EditorProvider from '@/providers/editor-provider'
import { ConnectionsProvider } from '@/providers/connection-providers'


type Props = {}

function Page({}: Props) {
  return (
    <div className='h-full'>
      <EditorProvider>
        <ConnectionsProvider>
          <div>

          </div>
        </ConnectionsProvider>
      </EditorProvider>

    </div>
  )
}

export default Page