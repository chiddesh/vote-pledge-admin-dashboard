import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import DataProgress from '../Components/DataProgress'
import FilterBtn from '../Components/FilterBtn'
import PledgeItem from '../Components/PledgeItem'
import { useFilterPledge } from '../hooks/useFilterPledge'

function Home() {

    const filtersConfig = [
        { type: "dropdown", label: "gender", options: ["male", "female", "trans"] },
        { type: "dropdown", label: "age", options: ["18-25", "26-40", "40+"] },
        { type: "button", label: "rural" },
        { type: "button", label: "urban" },
        { type: "dropdown", label: "category", options: ["College/Institution", "SHG Members", "General Public", "Industries Employee", "Government Employees"] },
        { type: "dropdown", label: "Completion", options: ["Completed", "Not Completed"] },
        { type: "dropdown", label: "first_time_voter", options: ["YES", "NO"] },
        {
            type: "dropdown", label: "ulb", options: [
                "Ammoor TP",
                "Kalavai TP",
                "Kaveripakkam TP",
                "Nemili TP",
                "Panapakkam TP",
                "Thakkolam TP",
                "Thimiri TP",
                "Vilapakkam TP",
                "Arakkonam MP",
                "Arcot MP",
                "Melvisharam MP",
                "Ranipet MP",
                "Sholinghur MP",
                "Wallajah MP"
            ]
        },
        {
            type: "dropdown", label: "block", options: [
                "Arakkonam",
                "Arcot",
                "Kaveripakkam",
                "Nemili",
                "Sholingur",
                "Thimiri",
                "Walaja"
            ]
        },
        {
            type: "dropdown", label: "constituency", options: [
                "Arakkonam",
                "Sholingur",
                "Ranipet",
                "Arcot",
                "Katpadi"
            ]
        }
    ]

    const [filters, setFilters] = useState({})

    const handleFilter = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: prev[key] === value ? null : value
        }))
    }

    const resetFilters = () => setFilters({})

    const { data, isLoading, error } = useFilterPledge(filters)
    console.log(data)

    return (
        <>
            <Navbar />

            <div className='p-3 sm:p-5 flex flex-col bg-gray-100 min-h-screen gap-4'>

                <DataProgress />

                <div className='bg-white p-3 sm:p-5 rounded-2xl flex gap-3 overflow-x-auto sm:flex-wrap'>

                    {filtersConfig.map((f, index) => {

                        if (f.type === "button") {
                            return (
                                <FilterBtn
                                    key={index}
                                    label={f.label}
                                    active={filters.area_type === f.label}
                                    onClick={() => handleFilter("area_type", f.label)}
                                />
                            )
                        }

                        if (f.type === "dropdown") {
                            return (
                                <select
                                    key={index}
                                    value={filters[f.label] || ""}
                                    className="px-3 py-2 rounded-xl bg-blue-100 text-blue-700 outline-0 min-w-[140px]"
                                    onChange={(e) => handleFilter(f.label, e.target.value)}
                                >
                                    <option value="">Select {f.label}</option>
                                    {f.options.map((opt, i) => (
                                        <option key={i} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            )
                        }

                        return null
                    })}

                    {Object.keys(filters).length > 0 && (
                        <button
                            onClick={resetFilters}
                            className='px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 whitespace-nowrap'
                        >
                            Reset
                        </button>
                    )}
                </div>

                <div className='bg-white rounded-2xl overflow-hidden'>

                    <div className='overflow-x-auto'>
                        <div className='min-w-[800px] grid grid-cols-8 gap-6 sm:gap-10 p-3 sm:p-4 bg-white border-b font-semibold text-xs sm:text-sm'>
                            <p>NAME</p>
                            <p>AGE</p>
                            <p>GENDER</p>
                            <p>AREA TYPE</p>
                            <p>BLOCK</p>
                            <p>CATEGORY</p>
                            <p>CONSTITUENCY</p>
                            <p>STATUS</p>
                        </div>

                        {isLoading && <p className='p-4'>Loading...</p>}
                        {error && <p className='p-4 text-red-500'>Error Loading data</p>}

                        {!isLoading && data && data.length === 0 && (
                            <p className='text-center py-5 text-gray-500'>No data found</p>
                        )}

                        <div className='flex flex-col gap-2 p-2 sm:p-3'>
                            {data && data.map((p) => (
                                <PledgeItem key={p.id} p={p} />
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Home