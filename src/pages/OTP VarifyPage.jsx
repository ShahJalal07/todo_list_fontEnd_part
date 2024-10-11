import React, { Suspense, lazy } from 'react'

import Loader from '../components/Loader'
import MainLayOut from '../layout/MainLayOut'

const OTPVarifyCom = lazy(() => import('../components/OTP VarifyCom'))

const OTPVarifyPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      
      <OTPVarifyCom />
    </Suspense>
  )
}

export default OTPVarifyPage
