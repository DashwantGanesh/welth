import React from 'react'
import DashboardPage from './page'

const DashboardLayout = () => {
  return (
    <div>
        <h1 className='text-6xl gradient-title mb-2'>Dashboard</h1>
        <DashboardPage />
    </div>
  )
}

export default DashboardLayout