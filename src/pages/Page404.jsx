import React, { Suspense, lazy } from 'react'
import Loader from '../components/Loader'

const Page404Com = lazy(() => import('../components/Page404Com'))

const Page404 = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Page404Com/>
    </Suspense>
  )
}

export default Page404
