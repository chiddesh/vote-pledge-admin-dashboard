import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import FilterBtn from '../Components/FilterBtn'
import PledgeItem from '../Components/PledgeItem'
import { useFilterPledge } from '../hooks/useFilterPledge'
import * as XLSX from "xlsx"

function Reports() {

    const filtersConfig = [
        { type: "dropdown", label: "gender", options: ["male", "female", "trans"] },
        { type: "dropdown", label: "age", options: ["18-25", "26-40", "40+"] },
        { type: "button", label: "rural" },
        { type: "button", label: "urban" },
        { type: "dropdown", label: "category", options: ["College/Institution", "SHG Members", "General Public", "Industries Employee", "Government Employees"] },
        { type: "dropdown", label: "Completion", options: ["Completed", "Not Completed"] }
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

    const total = data?.length || 0
    const today = new Date().toDateString()
    const todayCount = data?.filter(p =>
        new Date(p.created_at).toDateString() === today
    ).length || 0

    const completed = data?.filter(p => p.will_vote).length || 0
    const completion = total ? ((completed / total) * 100).toFixed(1) : 0

    const downloadExcel = () => {
        if (!data || data.length === 0) return

        const summary = [
            {
                total_pledges: total,
                Today_pledges: todayCount,
                Completion_percentage: completion + "%"
            }
        ]

        const detailed = data.map(p => ({
            Name: p.name,
            Age: p.age,
            Gender: p.gender,
            AreaType: p.area_type,
            Block: p.block,
            Category: p.category,
            Constituency: p.constituency,
            Status: p.will_vote ? "Completed" : "Pending",
        }))

        const wb = XLSX.utils.book_new()
        const summarySheet = XLSX.utils.json_to_sheet(summary)
        const dataSheet = XLSX.utils.json_to_sheet(detailed)

        XLSX.utils.book_append_sheet(wb, summarySheet, "Summary")
        XLSX.utils.book_append_sheet(wb, dataSheet, "Pledges")

        XLSX.writeFile(wb, `Pledge_report_${Date.now()}.xlsx`)
    }

    return (
        <>
            <Navbar />

            <div className='p-3 sm:p-5 flex flex-col gap-4 bg-gray-100 min-h-screen'>

                <div className='bg-white p-3 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>

                    <div className='flex gap-3 overflow-x-auto sm:flex-wrap'>

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
                                        className="px-3 py-2 rounded-xl bg-blue-100 text-blue-700 min-w-[140px]"
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
                                className='px-4 py-2 bg-red-100 text-red-600 rounded-xl whitespace-nowrap'
                            >
                                Reset
                            </button>
                        )}
                    </div>

                    <button
                        onClick={downloadExcel}
                        disabled={!data || data.length === 0}
                        className='px-4 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 disabled:opacity-50'
                    >
                        Download Excel
                    </button>
                </div>

                <div className='bg-white rounded-2xl overflow-hidden'>

                    <div className='overflow-x-auto'>

                        <div className='min-w-[800px] grid grid-cols-8 gap-6 sm:gap-10 p-3 sm:p-4 bg-gray-100 font-semibold text-xs sm:text-sm'>
                            <p>NAME</p>
                            <p>AGE</p>
                            <p>GENDER</p>
                            <p>AREA TYPE</p>
                            <p>BLOCK</p>
                            <p>CATEGORY</p>
                            <p>CONSTITUENCY</p>
                            <p>STATUS</p>
                        </div>

                        {isLoading && <p className='p-4 text-center'>Loading...</p>}
                        {error && <p className='p-4 text-red-500 text-center'>Error loading data</p>}

                        {!isLoading && data?.length === 0 && (
                            <p className='text-center py-6 text-gray-500'>
                                No results match your filters
                            </p>
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

export default Reports