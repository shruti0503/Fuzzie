'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, {useEffect, useState} from 'react'

// items-> aray of objects _. to be displayes in the infinte moving cards, 
//each object in the array must have a href propert of type string

// direction (optional , default left )
// speed -> optional default fast
// pauseOnHover (optional, default:"true) -> indicates wheter the movemoent of cards should pause when hovring
// over them , 
// className : optional css property , 
//allows passing additonal css classes to cutsomise the styling of the component

//Each prop is defined with a name followed by a colon and its type.
export const InfiniteMovingCards = ({
    items,
    direction = 'left',
    speed = 'fast',
}: {
    items: {
        href: string;
    }[];
    direction?: 'left' | 'right';
    speed?: 'fast' | 'normal' | 'slow';
    className?: string
}) => {

// Both containerRef and scrollerRef are initialized with null because they don't initially reference any specific DOM elements. They are placeholders for future references that will be assigned later, possibly during the component's lifecycle or when certain conditions are met.
    const containerRef=React.useRef<HTMLDivElement>(null)
    const scrollerRef=React.useRef<HTMLUListElement>(null)
    //scrollerRef is initialized as a ref to a <ul> element (HTMLUListElement)

    useEffect(()=>{
        addAnimation()

    },[])

    const [start, setStart]=useState(false);

    function addAnimation(){
        if(containerRef.current && scrollerRef.current){
            const scrollerContent=Array.from(scrollerRef.current.children)

            scrollerContent.forEach((item)=>{
                const duplicatedItem
            })
        }

    }





    return (
        <>
           
        </>
    );
};
