import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
        <Image src={'/sign-in.webp'} alt='login-img' width={1500} height={1200} className='h-full m-8 mb-5 '/>
        </div>
        <div className='flex justify-center items-center h-screen order-first md:order-last'>
            <SignIn />
        </div>
    </div>
  )
}