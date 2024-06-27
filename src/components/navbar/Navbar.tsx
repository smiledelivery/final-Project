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
            <div className='h-screen w-[20%] left-0 top-0 p-10 flex flex-col gap-16 bg-blue-400 shadow-xl max-lg:hidden'>
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
            <div className='flex items-center justify-between'>
                <Image src='/logo.png' alt='logo' width={50} height={50} className='rounded-full m-2' />
                <div className='static top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-400 shadow-xl max-md:hidden'>

                    <div className='flex gap-4'>
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
                <div className='relative flex gap-4 justify-between items-center mr-4'>
                    <Menu
                        className='cursor-pointer text-white md:hidden'
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

        </div>

    )
}

export default Navbar
