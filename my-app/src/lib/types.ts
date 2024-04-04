import { StringValidation, z } from "zod"
import { ConnectionProviderProps } from "@/providers/connection-providers"

export const EditUserProfileSchema=z.object({
    email:z.string().email('Required'),
    name:z.string().min(1,'Required'),
})

export type ConnectionTypes= 'Google Drive' | 'Notion' | 'Slack' | 'Discord'

export type Connection={
    title:ConnectionTypes
    description: string
    image: string
    connectionKey: keyof ConnectionProviderProps
    accessTokeKey?: String
    alwaysTrue?: boolean
    slackSpecial?:boolean
}