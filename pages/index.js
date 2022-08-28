import Head  from 'next/head'

import Header from '../components/Header'
import Content from '../components/Content'
import ListMapControl from '../components/ListMapControl'
import Footer from '../components/Footer'

import { useState, useEffect } from 'react'

export default function Home() {

  const [ mapToggle, setMapToggle] = useState(false);

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [data])

  return (
    <div>
      {console.log('rerender main')}
      <Head>
        <title>Airbnb Clone</title>
        <meta name="description" content="Airbnb clone created with NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <Header/>

        <Content data={data} isLoading={isLoading} showMap={mapToggle} />
 
        <div className='fixed bottom-0 w-full z-10 flex flex-col items-center '>
            <ListMapControl isMapActive={mapToggle} toggleMap={setMapToggle} />
            { !mapToggle && <Footer  />  }
        </div>

      </main>
    </div>
  )
}
