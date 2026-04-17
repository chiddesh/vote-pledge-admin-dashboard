import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { RiHome2Fill } from "react-icons/ri"
import { TbReportAnalytics } from "react-icons/tb"
import { BsBank, BsEar } from "react-icons/bs"
import { MdOutlineHowToVote } from "react-icons/md"
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri"
import { supabase } from '../Services/Supabase'
import { IoLogOutOutline } from 'react-icons/io5'

function SideBar() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut()
            navigate("/")
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className={`flex flex-col text-white transition-all duration-300 ease-in-out max-sm:w-16 bg-blue-950 min-h-screen 
        ${collapsed ? 'w-26' : 'w-60'}`}>

            <div className={`flex items-center p-5 border-b border-blue-800 gap-3 ${collapsed ? 'justify-center' : 'justify-between'}`}>

                <BsBank className={`text-2xl ml-0 shrink-0 ${!collapsed ? 'sm:hidden' : 'text-3xl'}`} />

                <div className={`flex items-center gap-3 overflow-hidden transition-all duration-100 ${collapsed ? 'hidden' : 'hidden sm:flex'}`}>
                    <BsBank className='text-2xl shrink-0' />
                    <div className='leading-tight whitespace-nowrap'>
                        <p className='font-extrabold text-lg'>Ranipet</p>
                        <p className='text-xs text-blue-300'>District Admin</p>
                    </div>
                </div>


                <button
                    onClick={() => setCollapsed(prev => !prev)}
                    className='hidden sm:flex shrink-0 items-center justify-center w-8 h-8 rounded hover:bg-blue-800 transition-colors'
                    aria-label={collapsed ? "Expand sidebar" : "Collapse Sidebar"}
                >
                    {collapsed ? <RiMenuUnfoldLine className="text-lg" /> : <RiMenuFoldLine className='text-lg' />}
                </button>
            </div>

            <div className='flex flex-col gap-1 p-2 mt-10 flex-1'>
                <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg text-lg font-medium transition-colors duration-150
                        ${isActive ? 'bg-blue-800 text-white' : 'text-blue-200 hover:text-white hover:bg-blue-800'}
                        ${collapsed ? 'justify-center' : ''}
                    `}

                >
                    <span className='text-xl flex items-center shrink-0'><RiHome2Fill /></span>
                    {!collapsed && (
                        <span className='whitespace-nowrap overflow-hidden transition-all duration-300'>
                            Home
                        </span>
                    )}
                </NavLink>
                <NavLink
                    to={"/reports"}
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg text-lg font-medium transition-colors duration-150 
                        ${isActive ? 'bg-blue-800 text-white' : 'text-blue-200 hover:text-white hover:bg-blue-800'}
                        ${collapsed ? 'justify-center' : ''}
                    `}

                >
                    <span className='text-xl flex items-center shrink-0'><TbReportAnalytics /></span>
                    {!collapsed && (
                        <span className='whitespace-nowrap overflow-hidden transition-all duration-300'>
                            Reports
                        </span>
                    )}
                </NavLink>
                <a
                    href="https://www.ranipetpledge.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Pledge"
                    className={`flex items-center gap-3 p-3 rounded-lg text-lg font-medium text-blue-200
                                hover:bg-blue-800 hover:text-white transition-colors duration-150
                                ${collapsed ? 'justify-center' : ''}`}
                >
                    <span className="text-xl shrink-0"><MdOutlineHowToVote /></span>
                    {!collapsed && (
                        <span className="whitespace-nowrap overflow-hidden transition-all duration-300">
                            Pledge
                        </span>
                    )}
                </a>
                <button
                    onClick={handleLogout}
                    className={`
                        flex items-center bg-red-400 gap-3 p-3 rounded-lg text-lg font-medium text-white-200
                                hover:bg-red-500 hover:text-white transition-colors duration-150
                                ${collapsed ? 'justify-center' : ''}`}
                >
                    <span className='text-xl shrink-0 '><IoLogOutOutline /></span>
                    {!collapsed && (
                        <span className='whitespace-nowrap overflow-hidden transition-all duration-300'>Logout</span>
                    )}
                </button>
            </div>

        </div >
    )
}

export default SideBar