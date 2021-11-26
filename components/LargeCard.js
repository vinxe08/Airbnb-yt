import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

function LargeCard({ img, title, description, buttonText }) {
  const [scrollPosition ,setScrollPosition] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const yPos = window.scrollY;

      const position = yPos > 1150;
      setScrollPosition(position)
    }

    window.addEventListener("scroll", handleScroll, false)
    return () => {
      window.removeEventListener("scroll", handleScroll, false)
    }

  })

  return (
    <motion.section 
      className="relative py-16 px-8 cursor-pointer sm:px-16"
      animate={{ 
        opacity: scrollPosition ? 1 : 0
       }}
       transition={{ duration: .4, ease: "easeInOut"}}
      >
      <div className="relative h-96 min-w-[300px]">
        <Image src={img} layout="fill" objectFit="cover" className="rounded-2xl" />
      </div>

      <div className="absolute top-32 left-14 sm:left-32" >
        <h3 className="text-4xl mb-3 w-64">{title}</h3>
        <p>{description}</p>
        <button className="text-sm text-white
         bg-gray-900 px-4 py-2 rounded-lg mt-5 hover:scale-105 active:scale-95 transition ease-out">{buttonText}</button>
      </div>

    </motion.section>
  )
}

export default LargeCard
