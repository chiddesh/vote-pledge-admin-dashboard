import React from 'react'

function PledgeItem({ p }) {

    const capitalize = (text) => {
        if (!text) return ""
        return text.charAt(0).toUpperCase() + text.slice(1)
    }

    const capitalizeWords = (text) => {
        if (!text) return ""
        return text.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    }


    return (
        <div className="min-w-[800px] grid grid-cols-8 gap-4 sm:gap-4 lg:gap-8 p-4 text-sm items-center bg-white rounded-2xl mb-3 shadow">

            <p className='font-bold px-2 sm:px-4 py-1 text-center rounded-2xl bg-blue-200 text-blue-500 truncate max-w-[120px] sm:max-w-[160px] lg:max-w-[200px]'>{capitalizeWords(p?.name)}</p>

            <p className='font-bold text-blue-500'>{p?.age}</p>
            <p className={`font-bold ${p?.gender == "male" ? "text-blue-500" : "text-pink-500"}`}>{capitalize(p?.gender)}</p>
            <p className='font-bold text-blue-500'>{capitalize(p?.area_type)}</p>
            <p className='font-bold text-blue-500'>{capitalize(p?.block)}</p>
            <p className='font-bold text-blue-500 truncate'>{capitalize(p?.category)}</p>
            <p className='font-bold text-blue-500'>{p?.constituency}</p>

            {/* Status Badge */}
            <span className={`px-2 sm:px-4 py-1 py-1 rounded-full text-xs w-fit font-extrabold
                ${p?.will_vote === true ? "bg-green-200 text-green-500" : "bg-red-500"}`}>
                Completed
            </span>

        </div>
    )
}

export default PledgeItem