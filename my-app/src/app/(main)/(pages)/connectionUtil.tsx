'use server'

import { onDiscordConnect } from "./connections/_actions/discord-connection"
import { onSlackConnect } from "./connections/_actions/slack-connection"
import { onNotionConnect } from "./connections/_actions/notion-connection"
import { getUserData } from "./connections/_actions/get-user"
import { currentUser } from '@clerk/nextjs'

import { useNodeConnections } from "@/providers/connection-providers"

type Props = {
    searchParams?: { [key: string]: string | undefined }
  }

  export const getUser=async()=>{
    const user =await currentUser();
    return user;
    

  }

export const onUserConnections = async (
    props: Props
) => {
    const {
        webhook_id,
        webhook_name,
        webhook_url,
        guild_id,
        guild_name,
        channel_id,
        access_token,
        workspace_name,
        workspace_icon,
        workspace_id,
        database_id,
        app_id,
        authed_user_id,
        authed_user_token,
        slack_access_token,
        bot_user_id,
        team_id,
        team_name,
      } = props.searchParams ?? {
        webhook_id: '',
        webhook_name: '',
        webhook_url: '',
        guild_id: '',
        guild_name: '',
        channel_id: '',
        access_token: '',
        workspace_name: '',
        workspace_icon: '',
        workspace_id: '',
        database_id: '',
        app_id: '',
        authed_user_id: '',
        authed_user_token: '',
        slack_access_token: '',
        bot_user_id: '',
        team_id: '',
        team_name: '',
      }
      console.log("onUserConnections called")
    console.log(database_id)
    const {nodeConnection}=useNodeConnections();
    console.log("node connections in conntion utilk", nodeConnection)
    const user = await currentUser()
    if (!user) return null

   const ans= await onDiscordConnect(
      channel_id!,
      webhook_id!,
      webhook_name!,
      webhook_url!,
      user.id,
      guild_name!,
      guild_id!
    )
    console.log("ans is", ans)
    

    // const url=await getDiscordConnectionUrl();
    // nodeConnection?.setDiscordNode(url);
    // console.log("after setting",nodeConnection?.discordNode)

    await onNotionConnect(
      access_token!,
      workspace_id!,
      workspace_icon!,
      workspace_name!,
      database_id!,
      user.id
    )

    await onSlackConnect(
      app_id!,
      authed_user_id!,
      authed_user_token!,
      slack_access_token!,
      bot_user_id!,
      team_id!,
      team_name!,
      user.id
    )

    const connections: any = {}

    const user_info = await getUserData(user.id)
    console.log("user_info", user_info)

    //get user info with all connections
    user_info?.connections.map((connection) => {
      connections[connection.type] = true
      return (connections[connection.type] = true)
    })

    // Google Drive connection will always be true
    // as it is given access during the login process
    return { ...connections, 'Google Drive': true }
  }