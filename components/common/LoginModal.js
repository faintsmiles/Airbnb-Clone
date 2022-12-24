import React, {useState} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faMobileScreen } from '@fortawesome/free-solid-svg-icons'


export default function LoginModal({setShowLoginModal}) {

    const [ showEmailLabel, setShowEmailLabel] = useState(false)

  return (
    // Modal container
    <div className='fixed h-full w-full top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 p-1 md:p-8' onClick={()=> setShowLoginModal(false)} >
        {/* Login form */}
        <div className='relative flex flex-col w-full h-full md:h-max md:max-w-xl top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/4 bg-white rounded-xl overflow-auto overflow-y-visible z-50 no-scrollbar' onClick={(e) => e.stopPropagation()} >
          {/* Form Header */}
            <header className='bg-white py-5 flex justify-center border-b z-10'>
                <h1 className='text-base font-bold'>Log in or sign up</h1>
                <button className='absolute top-4 left-3 p-1 px-3 hover:bg-gray-100 rounded-full' onClick={()=> setShowLoginModal(false)}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </header>
            {/* Form */}
            <form className='flex flex-col gap-4 h-full py-8 px-5' >
                {/* Title */}
                <div className='text-2xl'>
                    Welcome to Airbnb
                </div>
                {/* Email input */}
                <div className='relative'>
                    <input name='login-email' type="email" placeholder='Email' className='p-3 w-full border border-gray-400 rounded' onFocus={()=> setShowEmailLabel(true)} onBlur={(e)=> { e.target.value === "" ? setShowEmailLabel(false) : null}} />
                    <label for='login-email' className={`absolute left-0 px-3 py-0.5 text-sm text-gray-400 ${showEmailLabel ? '' : 'hidden'}`}>Email</label>
                </div>
                <button className='p-3 text-white font-bold text-lg bg-brand-dark rounded cursor-pointer' disabled>Continue</button>
                <br></br>
                {/* or */}
                <div className='w-full flex items-center gap-4'>
                    <span className='w-full h-0 border-b border-gray-200' />
                    <span className='text-xs '>or</span>
                    <span className='w-full h-0 border-b border-gray-200' />
                </div>

                <br/>

                {/* Options log in buttons */}
                <div className='flex flex-col gap-4 text-sm font-medium'>
                    {/* Facebook */}
                    <form className='flex justify-between px-6 py-3 text-semibold rounded cursor-pointer border border-black text-center'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill='blue' width="24" height="24" viewBox="0 0 24 24">
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
                            </svg>
                        </span>
                        <button className='cursor-pointer' disabled>Continue with Facebook</button>
                        <span></span>
                    </form>
                    {/* Google */}
                    <form className='flex justify-between px-6 py-3 text-semibold rounded cursor-pointer border border-black text-center'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill='green' width="24" height="24" viewBox="0 0 24 24">
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.917 16.083c-2.258 0-4.083-1.825-4.083-4.083s1.825-4.083 4.083-4.083c1.103 0 2.024.402 2.735 1.067l-1.107 1.068c-.304-.292-.834-.63-1.628-.63-1.394 0-2.531 1.155-2.531 2.579 0 1.424 1.138 2.579 2.531 2.579 1.616 0 2.224-1.162 2.316-1.762h-2.316v-1.4h3.855c.036.204.064.408.064.677.001 2.332-1.563 3.988-3.919 3.988zm9.917-3.5h-1.75v1.75h-1.167v-1.75h-1.75v-1.166h1.75v-1.75h1.167v1.75h1.75v1.166z"/>
                            </svg>
                        </span>
                        <button className='cursor-pointer' disabled>Continue with Google</button>
                        <span></span>
                    </form>
                    {/* Apple */}
                    <form className='flex justify-between px-6 py-3 text-semibold rounded cursor-pointer border border-black text-center'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm2.787 4c.18 1.637-1.283 3.345-2.806 3.226-.188-1.43 1.157-3.159 2.806-3.226zm-.2 13.981c-.938.018-1.238-.556-2.311-.556-1.071 0-1.406.539-2.293.574-1.5.057-3.816-3.4-3.816-6.414 0-2.769 1.93-4.142 3.615-4.167.903-.016 1.758.609 2.31.609.554 0 1.592-.752 2.682-.642.455.019 1.736.184 2.561 1.387-2.185 1.424-1.845 4.403.499 5.498-.459 1.331-1.832 3.686-3.247 3.711z"/>
                            </svg>
                        </span>
                        <button className='cursor-pointer' disabled>Continue with Apple</button>
                        <span></span>
                    </form>
                    {/* Phone */}
                    <form className='flex justify-between px-6 py-3 text-semibold rounded cursor-pointer border border-black text-center'>
                        <FontAwesomeIcon className='h-6 w-6' icon={faMobileScreen}/>
                        <button className='cursor-pointer' disabled>Continue with Phone</button>
                        <span></span>
                    </form>
                </div>
            </form>
        </div>
    </div>
  )
}
