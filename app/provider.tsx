"use client"
import {  ClerkProvider, useUser } from '@clerk/nextjs'
import { NextUIProvider } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';



function Provider({children}:{children: React.ReactNode}) {
 
  return (
    <ClerkProvider>
     <NextUIProvider>
      <Header />
        {children}
        <ToastContainer />
  </NextUIProvider> 
  </ClerkProvider>
 
  
)
}

export default Provider