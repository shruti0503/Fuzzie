'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { menuOptions } from '@/lib/constants/constants'
import clsx from 'clsx'
import { Separator } from "@/components/ui/separator"
import { LucideMousePointerClick , GitBranch, Database} from 'lucide-react'
import { ModeToggle } from '../global/mode-toggle'
import { LoadingStore } from '@/store'
import { ConnectionsProvider,useNodeConnections } from '@/providers/connection-providers'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import path from 'path'
  
type Props = {}

const MenuOptions = (props: Props) => {
    const pathName = usePathname();
    const [path, setPath]=useState();
    const {nodeConnection}=useNodeConnections();
   // const {setLoader,loader}=LoadingStore();
    // const checkPath=(loc:any)=>{
    //     pathName===loc ? setLoader(false) : setLoader(true)
    // }
    // useEffect(()=>{
    //     console.log("connections on connections page", nodeConnection)

    // },[])


    return (
        <nav className='dark:bg-black h-screen overflow-scroll justify-between flex items-center flex-col gap-10 py-6 px-2'>
            <div className='flex items-center flex-col gap-8'>
                <Link className="flex font-bold flex-row" href="/">
                    fuzzie
                </Link>
                <TooltipProvider>
                    {menuOptions.map((menuItem) => (
                        <ul key={menuItem.name}>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger>
                                <li 
                                //@ts-ignore
                               // onClick={checkPath(menuItem.href)}
                                >
                                <Link href={menuItem.href} 
                                className={clsx('group h-8 w-8 flex items-center justify-center scale-[1.5] rounded-lg p-[-3px] cursor-pointer',{
                                 'dark:bg-[#2F0068] bg-[#EEE0FF]': pathName===menuItem.href
                                })}>
                                    <menuItem.Component

                                // in the pbject the menuItem has a jsx compoent as a value of an pbject

                                    selected={pathName===menuItem.href}



                                    />
                                   
                                </Link>
                              </li>
                                </TooltipTrigger>
                                <TooltipContent side='right' className='bg-black/10 background-blur-xl'>
                                  <p>{menuItem.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </ul>
                    ))}
                </TooltipProvider>


                <Separator />

                <div className='flex items-center flex-col gap-9 dark:bg-[#353346]/30 py-4 px-2 rounded-full  h-56 overflow-scroll border-[1px]'>

                    <div className='relative bark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px]  dark:border-t-[#353346]'>
                        <LucideMousePointerClick

                        className='dark:text-white'
                        size={18}
                        /> 
                        <div className='border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]'/>
                    </div>

                    <div className='relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]'>
                        <GitBranch
                        className="text-muted-foreground"
                        size={18}
                         />
                          <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"></div>
                    </div>

                    <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
                        <Database 
                        className="text-muted-foreground"
                        size={18}
                        />
                         <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"></div>
                    </div>

                    <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
                        <GitBranch
                          className="text-muted-foreground"
                          size={18}
                        />
                    </div>

                    </div>

            </div>
            <div className="flex items-center justify-center flex-col gap-8">
                <ModeToggle />
            </div>
        </nav>
    );
}


export default MenuOptions