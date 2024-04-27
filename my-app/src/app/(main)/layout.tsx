'use client'
import React, { useEffect } from 'react'
import MenuOptions from '@/components/sidebar'
import InfoBar from '@/components/infobar'
import { LoadingState ,LoadingStore} from '@/store'
type Props = {children:React.ReactNode}
// React.ReactNode is a TypeScript type that represents any valid React node, such as JSX elements, strings, or arrays of JSX elements.
import { ConnectionsProvider } from '@/providers/connection-providers'
const Layout = (props: Props) => {
  const LoadingState=LoadingStore();

  // useEffect(()=>{
  //   console.log("loading state", LoadingState)

  // }, [])
  return (
    <ConnectionsProvider>
    <div className='flex overflow-hidden h-screen'>
      <MenuOptions />
        <div className='w-full'><InfoBar/>{props.children}</div>
    </div>
    </ConnectionsProvider>
  )
}
export default Layout