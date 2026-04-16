import React from 'react'
import SideBar from '../Components/SideBar'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
    return (
        <div className='flex min-h-screen bg-neutral-200'>
            <SideBar />
            <div className='flex-1 overflow-auto'>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout