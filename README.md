## Airbnb Clone - [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
Basic project focusing on front end development and learning NextJS + TailwindCSS
<br />
<br />

## Getting Started

Clone project
```bash
git clone https://github.com/FaintSmiles/Airbnb-Clone.git
```
Paste Google Maps API key in .env file (optional see [notes](#Notes))
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
Navigate to ```localhost:3000```
<br />
<br />

# Frameworks / Libraries Used 

NextJS/ReactJS

Google Maps Platform (Maps, Places, and Geocoding APIs)

TailwindCSS

FontAwesome

# Dependencies

React-google-maps/api 

React-dates

Momentjs

Uuid

## API / Dataset 

https://public.opendatasoft.com/explore/dataset/airbnb-listings

## Notes

A Google Maps key is optional in development, but searching and updating location will not be functional as it uses google's Places and Geocoding APIs.<br />
Additionally, if the project is to be pushed to production, the maps API key will be ``visible`` on the client. <br />
This is required and expected, as the library is client sided. <br />
It is recommended you restrict this key to avoid abuse and unauthorized use. <br />
https://developers.google.com/maps/documentation/javascript/get-api-key#restrict_key <br />
