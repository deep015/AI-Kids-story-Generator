import { Button } from '@nextui-org/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Hero() {
  return (
    <div className='px-10 md:px-28 lg:px-44 mt-10 h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-2'>
          <div className=''>
            <h2 className='text-[70px] text-primary font-extrabold py-10'>
              Craft Magical Stories for Kids in Minutes
            </h2>
            <p className='text-2xl text-primary font-light '>
            Craft exciting, personalized stories that turn your child's adventures into unforgettable reading moments—all in the blink of an eye!
            </p>
            <Link href={'/create-story'}>
            <Button size='lg' color='primary' className='mt-5 font-bold text-2xl p-8'>
              Create Story
            </Button>
            </Link>
           
          </div>
          <div>
            <Image src={'/hero_enhanced.png'} alt='hero' width={800} height={500} />
          </div>
      </div>
    </div>
  )
}

export default Hero