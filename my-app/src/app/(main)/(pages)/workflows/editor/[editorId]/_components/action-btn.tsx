import React from 'react'
import { Option } from '@/components/ui/multiple-selector'
import { ConnectionProviderProps } from '@/providers/connection-providers'
import { usePathname } from 'next/navigation'
type Props = {
  currentService:string,
  nodeConnection:ConnectionProviderProps
  channels?:Option[]
  setChannels?:(value:Option[])=>void
}

const ActionBtn = ( {currentService, nodeConnection, channels, setChannels}:Props) => {
  const pathName=usePathname()
  
  const renderActionButton=()=>{
    switch(currentService){

    }
  }
}

export default ActionBtn