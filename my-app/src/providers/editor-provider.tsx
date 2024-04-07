'use client'
import { EditorActions, EditorNodeType } from "@/lib/types"
import { Dispatch, createContext, useContext, useEffect, useReducer } from "react"

export type EditorNode=EditorNodeType

export type Editor={
    elements:EditorNode[] // edior node is an object , and Editor accepts array of object 
    edges:{
        id:string
        source:string 
        target:string

    }[]
    selectedNode:EditorNodeType

}

export type HistoryState = {
    history: Editor[]
    currentIndex: number
  }

export type EditorState={
    editor:Editor 
    history:HistoryState
}