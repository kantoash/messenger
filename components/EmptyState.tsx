import Image from 'next/image'
import React from 'react'

const EmptyState = () => {
  return (
    <div className='h-full flex justify-center items-center'>
      <Image src={'/images/logo.png'} alt='logo' height={100} width={100} />
    </div>
  )
}

export default EmptyState