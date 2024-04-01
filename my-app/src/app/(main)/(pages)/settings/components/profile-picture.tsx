'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { UserMinusIcon, X } from 'lucide-react'
import UploadCareBtn from './uploadcare-btn'


type Props = {
    userImage: String | null
    onDelete?:any
    onUpload:any
}

const ProfilePicture = ({userImage, onDelete , onUpload}: Props) => {
    const router=useRouter()
    const onRemoveProfileImage=async()=>{
        const response=await onDelete()
        if(response){
            router.refresh()
        }
    }
  return (
    <div className='flex flex-col'>
        <p className='text-lg text-white'>Profile Picture</p>
        <div className='flex h-[-30vh] flex-col items-center justify-center'>
            {/* {
                userImage ? (
                    <>
                    </>
                )
            } */}

            <UploadCareBtn  onUpload={onUpload}/>


        </div>

    </div>
  )
}

export default ProfilePicture