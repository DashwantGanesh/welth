import React, { Suspense } from 'react'
import DashboardPage from './page'
import { BarLoader } from 'react-spinners'

const DashboardLayout = () => {
  return (
    <div>
        <h1 className='text-6xl gradient-title mb-2'>Dashboard</h1>
        {/* to display loaders */}
        <Suspense fallback={<BarLoader className='mt-4' width={"100%"} color='#9333ea' />}>                           
            <DashboardPage />
        </Suspense>
        
    </div>
  )
}

export default DashboardLayout