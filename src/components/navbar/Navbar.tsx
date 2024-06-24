'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/lib/NavIcon'
import React, { useState } from 'react'
import { Menu } from 'lucide-react'

const Navbar = () => {
    const pathname = usePathname()
    const [dropdownMenu, setDropdownMenu] = useState(false)
    return (
        <div>
            <div className='h-screen left-0 top-0 p-10 flex flex-col gap-16 bg-blue-400 shadow-xl max-lg:hidden'>
                <Image src='/logo.png' alt='' width={150} height={70} className='rounded-full' />
                <div className='flex flex-col gap-12'>
                    {navLinks.map((link) => (
                        <Link
                            href={link.url}
                            key={link.label}
                            className={`flex gap-4 font-medium ${pathname === link.url ? "text-blue-800" : "text-gray-500"}`}
                        >
                            {link.icon} <p>{link.label}</p>
                        </Link>
                    ))}
                </div>
                <div className='flex gap-4 font-medium items-center'>
                    <UserButton />
                    <p>Edit Profile</p>
                </div>

            </div>
            <div className='static top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-400 shadow-xl lg:hidden'>
                    <Image src='/logo.png' alt='logo' width={150} height={70} className='rounded-full' />
                    <div>
                        {navLinks.map((link) => (
                            <Link
                            href={link.url}
                            key={link.label}
                            className={`flex gap-4 font-medium ${pathname === link.url ? "text-blue-800" : "text-gray-500"}`}
                            >
                            <p>{link.label}</p>
                            </Link>
                        ))}
                    </div>
            </div>
            <div className='relative flex gap-4 items-center'>
                        <Menu 
                        className='cursor-pointer md:hidden'
                        onClick={() => setDropdownMenu(!dropdownMenu)}
                        />
                        {dropdownMenu && (
                            <div className='absolute top-10 right-6 flex flex-col gap-8 p-5 bg-orange-400 shadow-xl rounded-lg'>
                                {navLinks.map((link) => (
                                    <Link
                                    href={link.url}
                                    key={link.label}
                                    className='flex gap-4 font-medium'
                                    >
                                    {link.icon}
                                    <p>{link.label}</p>
                                    </Link>
                                ))}
                            </div>
                            )}
                            <UserButton />
            </div>
        </div>

    )
}

export default Navbar
