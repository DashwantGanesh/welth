import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col mx-auto px-4 text-center justify-center min-h-[100vh]'>
        <h1 className='text-6xl font-bold mb-2 gradient-title'>404</h1>
        <h2 className='text-2xl font-semibold mb-2'>Page not found</h2>
        <p className='text-gray-600 mb-2'>Oops! The page you're looking for doesn't exist or has been
        moved.</p>
        <Link href="/">
        <Button className="mt-4 hover:bg-gray-600 cursor-pointer">Return Home</Button>
        </Link>
    </div>
  )
}

export default NotFound