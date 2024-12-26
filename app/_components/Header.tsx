"use client"
import React, { useState } from 'react'
import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@nextui-org/navbar";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { UserButton, useUser } from '@clerk/nextjs';

function Header() {

    const {user,isSignedIn}=useUser();

    const MenuList = [
        { id: 1, name: "Home", path: "/" },
        { id: 2, name: "Create Story", path: "/create-story" },
        { id: 3, name: "Explore Story", path: "/explore" },
        { id: 4, name: "Contact Us", path: "/contact-us" },
      ];
      

    const [isMenuOpen,setIsMenuOpen]=useState(false);


  return (
    <Navbar maxWidth='full' onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
            <NavbarMenuToggle  className='sm:hidden' aria-label={isMenuOpen?"close menu":"open menu"}/>
            <NavbarBrand>
                <Image src={'/logo.svg'} alt='logo' width={40} height={40}/>
                <h2 className='font-bold text-2xl text-primary-500 ml-3'>Kidso story</h2>
            </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify='center' className='hidden sm:flex'>
            {MenuList.map((item,index)=>(
                <NavbarItem
                key={index} 
                className='text-xl text-primary font-medium hover:underline mx-2'>
                    <Link href={item.path}> 
                     {item.name}
                    </Link>
                </NavbarItem>
            ))}
        </NavbarContent>
        <NavbarContent justify='end'>
            <Link href={'/dashboard'}>
            <Button color='primary'>
                {
                    isSignedIn?
                    'Dashboard':'Get Started'
                    
                }
               
            </Button>
            <UserButton />
            </Link>
        </NavbarContent>
        <NavbarMenu>
            {MenuList.map((item,index)=>(
                <NavbarMenuItem key={item.id} >
                    <Link href={item.path} >
                    {item.name}
                    </Link>
                </NavbarMenuItem>
            ))}
        </NavbarMenu>
    </Navbar>
)
}

export default Header