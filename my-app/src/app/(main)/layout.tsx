import React from 'react'
import MenuOptions from '@/components/sidebar'
import InfoBar from '@/components/infobar'

type Props = {children:React.ReactNode}
// React.ReactNode is a TypeScript type that represents any valid React node, such as JSX elements, strings, or arrays of JSX elements.

const Layout = (props: Props) => {
  return (
    <div className='flex overflow-hidden h-screen'>
      <MenuOptions />
        <div className='w-full'><InfoBar/>{props.children}</div>
    </div>
  )
}
export default Layout