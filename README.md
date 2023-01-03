## Airbnb Clone 
Airbnb Clone built with [NextJS](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/), and [Google Maps Platform](https://mapsplatform.google.com/). 
<br /> 
Listing data provided by [Opendatasoft](https://opendatasoft.com/)
<br/>

## Showcase 

https://airbnb-clone-faintsmiles.vercel.app/

## Getting Started

Clone project
```bash
git clone https://github.com/FaintSmiles/Airbnb-Clone.git
```
Paste Google Maps API key in .env file ([optional](#Notes))
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="__key__"
```

Navigate into project directory
```bash
cd Airbnb-Clone
```
Run development server
```bash
npm run dev
```
or 
```bash
yarn dev
```
Navigate to 
```http://localhost:3000```
<br />

# Tech Stack 

NextJS

TailwindCSS

Google Maps Platform APIs (Maps, Places, and Geocoding)


# Dependencies

React-google-maps/api 

React-dates

MomentJS

FontAwesome

Uuid

# API 

https://public.opendatasoft.com/explore/dataset/airbnb-listings

# Icons

icons8 - https://icons8.com/

## Notes

A Google Maps API key is optional in development. 
<br />
However, searching and updating the current location through the searchbar will not be possible without it. 
<br />
As it uses Google's Autocomplete and Geocoding APIs, to validate locations and recenter maps prior to fetching new listings.
<br />
<br />
Additionally, if the project is to be pushed to production, the maps API key will be **``visible``** on the client. 
<br />
This is **required and expected**, as the library is client sided.
<br />
<br />
It is highly recommended you restrict this key to avoid abuse and unauthorized use. 
<br />
https://developers.google.com/maps/api-security-best-practices#restrict_apikey
<br />
<br />

