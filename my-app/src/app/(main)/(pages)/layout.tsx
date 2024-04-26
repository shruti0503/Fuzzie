'use client'
import React from 'react'
import MenuOptions from '@/components/sidebar'
type Props = { children: React.ReactNode }
import { Spin } from 'antd';
import { LoadingState ,LoadingStore} from '@/store'

const Layout = ({ children }: Props) => {
  const {loader}=LoadingStore();
  return (
    <div className="border-l-[1px] border-t-[1px] pb-20 h-screen rounded-l-3xl border-muted-foreground/20 overflow-scroll ">
      {loader? <Spin /> : children}
    </div>
  )
}

export default Layout