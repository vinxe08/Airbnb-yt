import React from 'react'
import Image from 'next/image'
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/solid'

function Header() {
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 md:space-x-1 bg-white shadow-md py-5 px-5 ">

      <div className="relative flex items-center h-10 w-auto cursor-pointer my-auto">
        <Image src="https://links.papareact.com/qd3" layout="fill" 
        objectFit="contain"
        objectPosition="left"
        />
      </div>

      <div className="flex items-center justify-center md:border-2 rounded-full py-2 -ml-4  md:shadow-sm min-w-max ">
        <input className="flex-grow outline-none pl-5 bg-transparent" type="text" placeholder="Start your search" />
        <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2 min-w-max " />
      </div>

      <div className="flex items-center space-x-4 justify-end text-gray-500">
        <p className="hidden md:min-w-max md:inline cursor-pointer" >Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>
    </header>
  )
}

export default Header
