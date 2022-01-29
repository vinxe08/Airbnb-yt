import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/solid'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/dist/client/router';
import { motion } from 'framer-motion'

function Header({ placeholder, home }) {
  const [searchInput, setSearchInput] = useState("")
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [noOfGuests, setNoOfGuess] = useState(1)
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [openDate, setOpenDate ] = useState(false)

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
    <header className={home && !scrolled ? "fixed top-0 z-50 grid grid-cols-3 bg-gray-900 md:bg-transparent py-5 w-screen transition duration-300 ease-in-out" : "fixed top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 w-screen transition duration-300 ease-in-out " }>
      <div
        className="relative flex items-center h-10 w-3/5 cursor-pointer my-auto ml-5 md:ml-7 hover:scale-110 transition ease-out active:scale-95 animate-fade1"
        >
        <Image src="https://links.papareact.com/qd3" layout="fill" 
        objectFit="contain"
        objectPosition="left"
        onClick={() => router.push("/")}
        />
      </div>
      <motion.div 
        className="flex items-center justify-center md:border-2 rounded-full py-2 -ml-5 md:-ml-12  md:shadow-sm min-w-max xl:ml-[-130px] animate-fade2 "
        animate={{ 
          y: home && !scrolled ? 20 : 0,
          color: home && !scrolled ? "white" : "black"
         }}
        transition={{ duration: .2, ease: "easeInOut" }}
        >
        <input 
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className={home && !scrolled ? "flex-grow outline-none pl-5 bg-transparent text-white placeholder-white": "flex-grow outline-none pl-5 bg-transparent" }
          type="text" 
          placeholder={placeholder || "Start your search" } />
        <div 
          className={home && !scrolled ? "hidden cursor-pointer xl:block px-6  text-[13px] hover:scale-[1.15] transition ease-out active:scale-95 " : "hidden"}
          onClick={() => 
            setOpenDate(!openDate)
          }
          >
          <h1>Check in</h1>
          <span className="text-gray-300">Add dates</span>
        </div>
        <div 
          className={home && !scrolled ? "hidden cursor-pointer xl:block px-6  text-[13px] hover:scale-[1.15] transition ease-out active:scale-95 " : "hidden"}
          onClick={() => setOpenDate(!openDate)}
          >
          <h1>Check out</h1>
          <span className="text-gray-300">Add dates</span>
        </div>
        <div className={home && !scrolled ? "hidden cursor-pointer xl:block px-6  text-[13px] hover:scale-[1.15] transition ease-out active:scale-95 " : "hidden"}>
          <h1>Guests</h1>
          <span className="text-gray-300">Add guest</span>
        </div>
        <SearchIcon onClick={search} className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2 min-w-max " />
      </motion.div>

      <div className={home && !scrolled ? "flex items-center space-x-4 justify-end text-white mr-5 md:mr-7 lg:mr-10 animate-fade3": "flex items-center space-x-4 justify-end text-gray-500 ml-1 mr-5 lg:mr-10 animate-fade3" }>
        <p className="hidden md:min-w-max md:inline cursor-pointer hover:scale-110 transition ease-out" >Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer hover:scale-110 transition ease-out" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer">
          <MenuIcon className="h-6 hover:scale-[1.2] transition ease-out" />
          <UserCircleIcon className="h-6 hover:scale-[1.2] transition ease-out" />
        </div>
      </div>
      { searchInput || openDate ? 
        ( <motion.div 
          className="md:absolute md:left-0 md:top-16 flex items-center flex-col col-span-3 mx-auto mt-5 bg-white w-screen"
          animate={{ y: home && !scrolled ? 50 : 0, scale: home && !scrolled ? 1.05 : 1 }}
          transition={{ ease: 'easeInOut', duration: .2 }}
          >
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
        </motion.div>       
      ) : null }
    </header>
  )
}

export default Header
