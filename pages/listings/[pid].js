import React from 'react'
import { useRouter } from 'next/router'


export default function listingPage({results}) {
  const router = useRouter();
  const { data } = router.query;
  // if router is not ready it'll return undefined which is falsy, in which case we set temp to empty string
  const temp = data ? JSON.parse(data) : "";


  return (
    <div>
        <h1>Hello</h1>
    </div>
  )
}
