import React, { useEffect } from 'react'
import { profileView } from '../API/API'

const ProfileViewCom = () => {

  useEffect(() => {
    profileView()
  }, [])

  return (
    <div className='flex items-center justify-center'>
      <div>
      <img className='w-24 h-24 rounded-full' src="" alt="" />
      <h1>Profile Name</h1>
      <h1>Name</h1>
      <h1>Email</h1>
      </div>

    </div>
  )
}

export default ProfileViewCom
