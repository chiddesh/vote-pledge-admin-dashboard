import React from 'react'
import { FaUsers } from "react-icons/fa";
import { MdHowToVote } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { useFilterPledge } from '../hooks/useFilterPledge';

function DataProgress() {

    const { data = [], isLoading } = useFilterPledge()

    const total = data.length

    const today = new Date().toDateString()
    const todayCount = data.filter(p =>
        new Date(p.created_at).toDateString() === today
    ).length

    const completed = data.filter(p => p.will_vote).length
    const completion = total ? ((completed / total) * 100).toFixed(1) : 0

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            <div className='bg-white p-5 rounded-2xl shadow flex items-center gap-4'>
                <div className='bg-blue-100 p-4 rounded-xl text-blue-600 text-2xl'>
                    <FaUsers />
                </div>
                <div>
                    <p className='text-gray-500 text-sm'>Total Pledge</p>
                    <p className='text-2xl font-bold'>{isLoading ? "..." : total}</p>
                </div>
            </div>

            <div className='bg-white p-5 rounded-2xl shadow flex items-center gap-4'>
                <div className='bg-blue-100 p-4 rounded-xl text-blue-600 text-2xl'>
                    <MdHowToVote />
                </div>
                <div>
                    <p className='text-gray-500 text-sm'>Per Day Pledge</p>
                    <p className='text-2xl font-bold'>{isLoading ? "..." : todayCount}</p>
                </div>
            </div>

            <div className='bg-white p-5 rounded-2xl shadow flex flex-col gap-4'>

                <div className='flex items-center gap-4'>
                    <div className='bg-blue-100 p-4 rounded-xl text-blue-600 text-2xl'>
                        <FaUsers />
                    </div>
                    <div>
                        <p className='text-gray-500 text-sm'>Completion</p>
                        <p className='text-2xl font-bold'>{isLoading ? "..." : `${completion}%`}</p>
                    </div>
                </div>
                <div className='w-full bg-gray-200 h-2 rounded-full'>
                    <div className='bg-purple-600 h-2 rounded-full' style={{ width: `${completion}%` }}></div>
                </div>
            </div>
        </div>
    )
}

export default DataProgress