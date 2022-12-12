## Airbnb Clone - [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
Basic project focusing on front end development and learning NextJS + TailwindCSS


## Getting Started

Clone project
```bash
git clone https://github.com/FaintSmiles/Airbnb-Clone.git
```
Paste Google Maps API key in .env (optional see [notes](#Notes))
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="_key_"
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
navigate to ```localhost:3000```
##

# Frameworks / Libraries Used 

NextJS/ReactJS

Google Maps API

Tailwindcss

Fontawesome

# Dependencies

React-google-maps/api 

react-dates

momentjs

uuid

## API / Dataset 

https://public.opendatasoft.com/explore/dataset/airbnb-listings

## Notes

Google maps key is optional in development, but searching and updating location will not be functional as it uses both google's Places and Geocoding API.
Additionally, if the project is to be pushed to production, the maps API key will be ```visible``` on the client. 
This is required and expected, as the library is client sided. 
It is recommended you restrict this key to avoid abuse and unauthorized use. 
https://developers.google.com/maps/documentation/javascript/get-api-key#restrict_key 
