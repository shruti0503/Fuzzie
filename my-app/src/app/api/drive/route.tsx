// route handler -> to interact with the google drive api to list files for a user who has authenticated with Google OAuth2 through clerk
// first creating an OAuth2Clietn using the 'google.auth.)Auth2' constructor , providing -> CLIENTID , CLIENT SEECRET, AND REDIRECT URI
// 2. Authhenctication Check: checking if there is a logged in user by calling , auth() from clerk -> if no logged in user -> returns JSON response -> user not found
// 3. Retrive Access Token: retriveing the OAuth access token for thr logged-in user from Clerk using 'aclerkClient.users.getUserOauthAccessToken()'-> 
//    this access token -> USED TO AUTHENTICATE REQUESTS TO THE GOOGLE DRIVE API on behalf of the user
//4. Set OAuth2 Credentials: sets the retrived access token as the credentials for the OAuth2Client using oauth2Client.setCredentials().
// 5. IN itialise Google Drive API Client: It initializes the Google Drive API client using google.drive(), passing it the version and the authenticated OAuth2 client.
// 6. List Files: attempates to list files from the user's Google Drive using 'drive.files.list()' -> if successful , it returns a JSON response, indicating that no files were found or taht something went wrong

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
  
  try {
    const response = await drive.files.list()

    if (response) {
      return Response.json(
        {
          message: response.data,
        },
        {
          status: 200,
        }
      )
    } else {
      return Response.json(
        {
          message: 'No files found',
        },
        {
          status: 200,
        }
      )
    }
  } catch (error) {
    return Response.json(
      {
        message: 'Something went wrong',
      },
      {
        status: 500,
      }
    )
  }
}