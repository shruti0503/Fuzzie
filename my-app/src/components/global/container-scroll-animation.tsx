import React, {use, useRef} from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import Image from 'next/image'

//This is a prop expected by the ContainerScroll component
// or content that will be rendered as the title within the scroll container.

//titleComponent: string | React.ReactNode: This line specifies the type of the titleComponent prop.
// If titleComponent is a string, it represents plain text that will be rendered as the title.
// If titleComponent is a React node, it can be any valid React element, such as another component, JSX expression, or fragment.

export const ContainerScroll=({titleComponent}:{titleComponent: String | React.ReactNode})=>{
    const containerRef=useRef<any>(null)
    const {scrollYProgress}=useScroll({target:containerRef})

    const [isMobile, setIsMobile]=React.useState(false)

    React.useEffect(()=>{
        const checkMobile=()=>{
            setIsMobile(window.innerWidth<=768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile);
        return ()=>{
            window.removeEventListener('resize', checkMobile);
        }
    },[])

}