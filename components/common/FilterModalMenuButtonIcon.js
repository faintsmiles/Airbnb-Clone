import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBuilding, faHouseUser, faHotel } from '@fortawesome/free-solid-svg-icons';

export default function FilterModalMenuButtonIcon({type, property, setProperty, icon}) {


  return (
      <div 
        className={`flex-1 flex flex-col p-4 gap-8 border rounded-lg hover:border-black hover:cursor-pointer ${type === property ? 'bg-black text-white' : '' } `} 
        onClick={(e) => setProperty(type)}
      >
        <div>
          <FontAwesomeIcon className='w-8 h-8' icon={icon} />
        </div>
        <div>
          <span className='font-semibold'>{type}</span>
        </div>
      </div>
  )
}
