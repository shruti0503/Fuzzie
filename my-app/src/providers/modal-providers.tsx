'use client'
import { createContext, useContext, useEffect, useState } from "react"

interface ModalProviderProps{
    children: React.ReactNode
}

export type ModalData={}

type ModalContextType={
    data: ModalData
    isOpen: boolean
    setOpen: (modal: React.ReactNode, fetchData? : ()=> Promise<any>)=> void
    setClose:()=>void
}

// the setOpen function can be used to 
// update the state of a modal (or any component) in a React application. 
// It accepts a modal parameter, which represents the content to be displayed in the modal,
//  and an optional fetchData parameter, which is a function that can be used to fetch data 
//  asynchronously.
//  After executing, the function doesn't return any value (void).

export const ModalContext= createContext<ModalContextType>({
    data:{},
    isOpen:false,
    setOpen:(modal:React.ReactNode, fetchData? : ()=> Promise<any>)=> {},
    setClose:()=>{}

})
// ModalProvider is a functional component ,that accepts props of type ModalProviderProps.
// {children} here?
//about seprate reducers
const ModalProvider:React.FC<ModalProviderProps>=({children})=>{

    const [isOpen, setIsOpen]=useState(false)
    const [data, setData]=useState<ModalData>({})
    const [showingModal,setShowingModal]=useState<React.ReactNode>(null)
    const [isMounted, setIsMounted]=useState(false)

    useEffect(()=>{
        setIsMounted(true)

    },[])

    const setOpen=async(
        modal:React.ReactNode,
        fetchData? : ()=> Promise<any>
    )=>{
        if(modal){
            if(fetchData){
                setData({...data,...(await fetchData())}|| {})
            }
            setShowingModal(modal)
           
            setIsOpen(true)
        }
    }

    const setClose=()=>{
        setIsOpen(false)
        setData({})
    }


    return (
        <ModalContext.Provider value={{data, setOpen, setClose, isOpen}}>
            {children}
            {showingModal}
        </ModalContext.Provider>
    )

}

// custom hook , provides access to the modal context created by ModalProvider.
// If useModal is used outside of a ModalProvider context, it throws an error to remind developers to use it within the appropriate context.
export const useModal=()=>{
    const context=useContext(ModalContext)
    if(!context){
        throw new Error('useModal must be used within the modal provider')
    }
    return context
}


export default ModalProvider

//The useModal hook is a custom hook that retrieves the modal context from the nearest ModalContext.Provider ancestor in the component tree.
// By calling useModal within a component, React automatically looks up the component tree to find the nearest ModalContext.Provider and extracts the modal context value provided by it.
// This allows components within the ModalProvider hierarchy to access the modal state and functions directly without needing to pass props down through the component tree manually.