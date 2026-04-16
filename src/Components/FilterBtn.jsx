import React from 'react'

function FilterBtn({ label, active, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`px-5 py-2 rounded-2xl cursor-pointer transition
            ${active
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
        >
            <p className="capitalize">{label}</p>
        </div>
    )
}

export default FilterBtn