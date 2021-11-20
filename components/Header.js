import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/solid'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/dist/client/router';

function Header({ placeholder, home }) {
  const [searchInput, setSearchInput] = useState("")
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [noOfGuests, setNoOfGuess] = useState(1)
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      }
    })
  }

  const selectionRange = {
    startDate,
    endDate,
    key: 'selection'
  }

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const yPos = window.scrollY;

      const searchBarPosition = yPos > 20;
      setScrolled(searchBarPosition)
    }

    window.addEventListener("scroll", handleScroll, false)

    return () => {
      window.removeEventListener('scroll', handleScroll, false)
    }
  })

  return (
    <header className={home && !scrolled ? "fixed top-0 z-50 grid grid-cols-3 bg-transparent py-5 w-screen transition duration-300 ease-in-out" : "fixed top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 w-screen transition duration-300 ease-in-out " }>
      <div 
        onClick={() => router.push("/")}
        className="relative flex items-center h-10 w-auto cursor-pointer my-auto ml-5 md:ml-10">
        <Image src="https://links.papareact.com/qd3" layout="fill" 
        objectFit="contain"
        objectPosition="left"
        />
      </div>
      <div className= "flex items-center justify-center md:border-2 rounded-full py-2 -ml-4 md:-ml-8  md:shadow-sm min-w-max">
        <input 
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className={home && !scrolled ? "flex-grow outline-none pl-5 bg-transparent text-white placeholder-white": "flex-grow outline-none pl-5 bg-transparent" }
          type="text" 
          placeholder={placeholder || "Start your search" } />
        <SearchIcon onClick={search} className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2 min-w-max " />
      </div>

      <div className={home && !scrolled ? "flex items-center space-x-4 justify-end text-white mr-5 md:mr-10": "flex items-center space-x-4 justify-end text-gray-500 mr-5 md:mr-10" }>
        <p className="hidden md:min-w-max md:inline cursor-pointer" >Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>
      {searchInput && (
        <div className="md:absolute md:left-0 md:top-16 flex items-center flex-col col-span-3 mx-auto mt-5 bg-white w-screen">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
            className="transform scale-[.8] sm:scale-100 sm:mt-9 w-max -ml-5 md:-ml-0 "
          />
          <div className="min-w-full px-5 flex items-center justify-between md:justify-around border-b">
            <h2 className="text-2xl font-semibold">
              Number of Guests
            </h2>
            <div className="flex items-center">
              <UsersIcon className="h-5" />
              <input 
                type="number"
                value={noOfGuests}
                min={1}
                onChange={e => setNoOfGuess(e.target.value)}
                className="w-12 pl-2 text-lg outline-none text-red-400"
              />
            </div>
          </div>
          <div className="flex min-w-full shadow-md py-4">
            <button onClick={() => setSearchInput('')} className="flex-grow text-gray-500 text-center ">Cancel</button>
            <button onClick={search} className="flex-grow text-red-400 text-center ">Search</button>
          </div>
        </div>       
      ) }
    </header>
  )
}

export default Header
