import React from 'react'
import Image from 'next/image'
import medicalImage from '../../../public/assets/Images/medical.jpg'
export const AuthLeftContainer = () => {
  return (
    <div className='w-1/2 h-full max-h-full '>
        <Image src={medicalImage} className='w-full h-full' alt='Image not found' />
    </div>
  )
}
