'use client'
import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { X } from 'lucide-react'


type Props = {
    userImage: String | null
    onDelete?:any
    onUpload:any
}

const ProfilePicture = (props: Props) => {
  return (
    <div className='flex flex-col'>
        <p className='text-lg text-white'>Profile Picture</p>

    </div>
  )
}

export default ProfilePicture