// enable real-time monitoring of changes in a user's Google Drive by setting up a webhook listener. 
// useful for applications that need to react to changes in Google Drive files or folders,
// such as syncing files, notifying users about updates, or triggering workflows based on file changes.

//1. OAuth2 Client Setup: It creates an OAuth2 client using the google.auth.OAuth2 constructor, providing it with the client ID, client secret, and redirect URI from environment variables.
//2. Authentication Check: It checks if there's a logged-in user by calling auth() from Clerk. If there's no logged-in user, it returns a JSON response with a message indicating that the user is not found.
//3. Retrieve Access Token: It retrieves the OAuth access token for the logged-in user from Clerk using clerkClient.users.getUserOauthAccessToken()
//4. Set OAuth2 Credentials: It sets the retrieved access token as the credentials for the OAuth2 client using oauth2Client.setCredentials().
//5. Initialize Google Drive API Client: It initializes the Google Drive API client using google.drive(), passing it the version and the authenticated OAuth2 client.
//6. Generate Channel ID: It generates a unique channel ID using uuidv4().
//7. Get Start Page Token: It retrieves the start page token from Google Drive using drive.changes.getStartPageToken()
//8. Watch for Changes: It sets up a webhook listener for changes in the user's Google Drive using drive.changes.watch(). It specifies the page token, webhook address, and other necessary parameters.
//9. Store Channel ID: If the webhook listener is successfully created, it stores the generated channel ID and the corresponding resource ID in the database using db.user.updateMany().
//10. Return Response: It returns a response indicating that the listener is set up and listening for changes, or an error message if something goes wrong.

import { google } from 'googleapis'
import { auth, clerkClient } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { db } from '@/lib/db'

export async function GET() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.OAUTH2_REDIRECT_URI
  )

  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ message: 'User not found' })
  }

  const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
    userId,
    'oauth_google'
  )

  const accessToken = clerkResponse[0].token
  oauth2Client.setCredentials({
    access_token: accessToken,
  })

  const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
  })
  
  const channelId = uuidv4()
//Get Start Page Token: It retrieves the start page token from Google Drive using drive.changes.getStartPageToken().
  const startPageTokenRes = await drive.changes.getStartPageToken({})
  const startPageToken = startPageTokenRes.data.startPageToken
  if (startPageToken == null) {
    throw new Error('startPageToken is unexpectedly null')
  }
  //Watch for Changes:It sets up a webhook listener for changes in the user's Google Drive using drive.changes.watch(). It specifies the page token, webhook address, and other necessary parameters.

  const listener = await drive.changes.watch({
    pageToken: startPageToken,
    supportsAllDrives: true,
    supportsTeamDrives: true,
    requestBody: {
      id: channelId,
      type: 'web_hook',
      address:
        `${process.env.NGROK_URI}/api/drive-activity/notification`,
      kind: 'api#channel',
    },
  })
  //Store Channel ID: If the webhook listener is successfully created, it stores the generated channel ID and the corresponding resource ID in the database using db.user.updateMany().

  if (listener.status == 200) {
    //if listener created store its channel id in db
    const channelStored = await db.user.updateMany({
      where: {
        clerkId: userId,
      },
      data: {
        googleResourceId: listener.data.resourceId,
      },
    })

    if (channelStored) {
      return new NextResponse('Listening to changes...')
    }
  }

  return new NextResponse('Oops! something went wrong, try again')
}