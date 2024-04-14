import React from 'react'
import { AccordionContent } from '@/components/ui/accordion'
import { EditorState } from '@/providers/editor-provider'
import { nodeMapper } from '@/lib/types'
import { useEffect } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card'
  import { Input } from '@/components/ui/input'

  import { onContentChange } from '@/lib/editor-utils'
  import GoogleFileDetails from './google-file-details'
 // import GoogleDriveFiles from './google-drive-files
type Props = {}

const ComponentBasedOnTitle = (props: Props) => {
  return (
    <div>ComponentBasedOnTitle</div>
  )
}

export default ComponentBasedOnTitle