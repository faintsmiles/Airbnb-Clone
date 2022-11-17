import React from 'react'

export default function FooterExpanded() {
  return (
    // bottom padding is for when the condensed reserve form is displayed
    <footer className=' bg-slate-100 pt-12 pb-20 md:pb-12 text-sm border'>
        <div className='listing-page-container mx-auto px-8 flex flex-col lg:flex-row lg:justify-between'>
          <section className=' border-b lg:border-0 pb-8 '>
            <div className='font-bold pb-3'>Support</div>
            <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-3 '>
              <li className='hover:underline'><a href="/">Help Center</a></li>
              <li className='hover:underline'><a href="/">AirCover</a></li>
              <li className='hover:underline'><a href="/">Safety Information</a></li>
              <li className='hover:underline'><a href="/">Supporting people with disabilities</a></li>
              <li className='hover:underline'><a href="/">Cancellation options</a></li>
              <li className='hover:underline'><a href="/">Our COVID-19 Response</a></li>
              <li className='hover:underline'><a href="/">Report a neighborhood concern</a></li>
            </ul>
          </section>
          <section className='border-b lg:border-0 py-4'>
            <div className='font-bold pb-3'>Community</div>
            <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-3 '>
              <li className='hover:underline'><a href="/">Airbnb.org: disaster relief housing</a></li>
              <li className='hover:underline'><a href="/">Support Afghan refugees</a></li>
              <li className='hover:underline'><a href="/">Combatting discrimination</a></li>
            </ul>
          </section>
          <section className='border-b lg:border-0 py-4'>
            <div className='font-bold pb-3'>Hosting</div>
            <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-3 '>
              <li className='hover:underline'><a href="/">Try Hosting</a></li>
              <li className='hover:underline'><a href="/">AirCover for Hosts</a></li>
              <li className='hover:underline'><a href="/">Explore hosting resources</a></li>
              <li className='hover:underline'><a href="/">Visit our community forum</a></li>
              <li className='hover:underline'><a href="/">How to host responsibly</a></li>
            </ul>
          </section>
          <section className='py-4'>
            <div className='font-bold pb-3'>Airbnb</div>
            <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-3 '>
              <li className='hover:underline'><a href="/">Newsroom</a></li>
              <li className='hover:underline'><a href="/">Learn about new features</a></li>
              <li className='hover:underline'><a href="/">Letter from our founders</a></li>
              <li className='hover:underline'><a href="/">Careers</a></li>
              <li className='hover:underline'><a href="/">Investors</a></li>
              <li className='hover:underline'><a href="/">Gift cards</a></li>
            </ul>
          </section>
        </div>
    </footer>
  )
}
