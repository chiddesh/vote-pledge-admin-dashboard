import React from 'react'
import { BsBank } from 'react-icons/bs'
import { supabase } from '../Services/Supabase'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate("/")
    }

    return (
        <div className='flex justify-between items-center text-lg gap-5 sm:text-2xl p-5 bg-neutral-50 shadow-2xl'>
            <div className='flex gap-3'>
                <BsBank size={30} />
                <h2>இராணிப்பேட்டை மாவட்டம் / Ranipet District</h2>
            </div>
            <div>
                <button className='text-sm px-4 py-2 bg-red-400 rounded-2xl cursor-pointer' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar