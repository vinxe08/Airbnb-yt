import { useEffect, useState } from 'react';
import Head from 'next/head'
import Banner from '../components/Banner'
import Footer from '../components/Footer';
import Header from '../components/Header'
import LargeCard from '../components/LargeCard';
import MediumCard from '../components/MediumCard';
import SmallCard from '../components/SmallCard';
import { motion } from 'framer-motion';

export default function Home({ exploreData, cardsData }) {
  const [ scrollPosition, setScrollPosition ] = useState(false)
  const [ medCardPosition, setMedCardPosition ] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const yPos = window.scrollY;

      const position = yPos > 170;
      setScrollPosition(position)

      const mediumCardScroll = yPos > 600;
      setMedCardPosition(mediumCardScroll)

    }

    window.addEventListener("scroll", handleScroll, false)

    return () => {
      window.removeEventListener("scroll", handleScroll, false)
    }
  })

  return (
    <div className="">
      <Head>
        <title>Airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header home />
      <Banner />

      <main className="max-w-full mx-auto">
        <section className="px-8 pt-6 sm:px-16 overflow-hidden">
          <h2 className="text-4xl font-semibold pb-5">Explore Nerby</h2>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            animate={{ x: scrollPosition ? 0 : -100, opacity: scrollPosition ? 1 : 0 }}
            transition={{ duration: .6, ease:"easeInOut" }}
            >
          {exploreData?.map(({img, distance, location}) => (
            <SmallCard 
              key={img}
              img={img}
              distance={distance}
              location={location}
            />
            )) }
          </motion.div>
        </section>

        <section className="px-8 sm:px-16 overflow-hidden">
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>

          <motion.div 
            className="flex space-x-3 overflow-x-scroll scrollbar-hide p-3"
            animate={{ x: medCardPosition ? 0 : 300, opacity: medCardPosition ? 1 : 0 }}
            transition={{ duration: .7 , ease: "easeInOut" }}
            >
            {cardsData?.map(({img, title}) => (
              <MediumCard key={img} img={img} title={title} />
            ))}
          </motion.div>
        </section>

          <LargeCard 
            img="https://links.papareact.com/4cj"
            title="The Greatest Outdoors"
            description="Wishlists curated by Airbnb."
            buttonText="Get Inspired"
          />

          <Footer />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch('https://links.papareact.com/pyp')
  .then(
    (res) => res.json()
  );

  const cardsData = await fetch("https://links.papareact.com/zp1")
  .then((res) => 
    res.json()
  );

  return {
    props: {
      exploreData,
      cardsData,
    }
  }
}
