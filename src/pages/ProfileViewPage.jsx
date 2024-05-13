import React, { Suspense, lazy } from 'react'
import MainLayOut from '../layout/MainLayOut'
import Loader from '../components/Loader'

const ProfileViewCom = lazy(() => import('../components/ProfileViewCom'))

const ProfileViewPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <MainLayOut>
        <ProfileViewCom/>
      </MainLayOut>
    </Suspense>
  )
}

export default ProfileViewPage
