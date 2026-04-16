import React from 'react'
import { BsBank } from 'react-icons/bs'

function Navbar() {
    return (
        <div className='flex items-center text-lg gap-5 sm:text-2xl p-5 bg-neutral-50 shadow-2xl'>
            <BsBank size={30} />
            <h2>இராணிப்பேட்டை மாவட்டம் / Ranipet District</h2>
        </div>
    )
}

export default Navbar