import Head  from 'next/head'

import Header from '../components/Header'
import Content from '../components/Content'
import ListMapControl from '../components/ListMapControl'
import Footer from '../components/Footer'

import { useState, useEffect } from 'react'

export default function Home({data}) {

  const [ mapToggle, setMapToggle] = useState(false);
  // const [data, setData] = useState(null);
  // const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   // setLoading(true)
  //   fetch('/api/hello')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data)
  //       // setLoading(false)
  //     })
  // }, [])

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

        <Content data={data}  showMap={mapToggle} />
 
        <div className='fixed bottom-0 w-full flex flex-col items-center bg-grey'>
            <ListMapControl isMapActive={mapToggle} toggleMap={setMapToggle} />
            { !mapToggle && <Footer  />  }
        </div>

      </main>
    </div>
  )
}

export async function getServerSideProps (context) {
  // inefficient to call the nextjs api which then calls supporting API, but we're aiming to hide the OpenData API url 
  // Check this later in network tab. may also need to reduce data size in the future or modify api url
  const res = await fetch ( 'http://localhost:3000' + '/api/hello')
  const data = await res.json();
  console.log('API CALL');
  return { props: { data } }
}