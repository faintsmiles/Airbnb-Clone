import React from 'react';

export default function FilterModalMenuButtons({ id, title, options, optionSelected, setOptionSelected }) {
  return (
    <>
        <div className='mt-4 ml-2'>{title}</div>

        <ul id={id} className='mt-6 flex justify-start gap-2 lg:gap-4'>
        {options.map((item) => {
            return (
            <li key={ title + item}>
                <button
                type='button'
                className={`text-sm border py-2 px-6 rounded-full hover:border-black ${
                    optionSelected === item ? 'bg-black text-white' : ''
                }`}
                onClick={(e) => setOptionSelected(item)}
                >
                {item}
                </button>
            </li>
            );
        })}
        </ul>
    </>
  );
}
