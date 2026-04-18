import { useQuery } from "@tanstack/react-query"
import { filterPledge } from "../Services/apiPledge"

export const useFilterPledge = (filters, page) => {
    return useQuery({
        queryKey: ["pledges", filters, page],
        queryFn: () => filterPledge(filters, page),
        refetchOnWindowFocus: false
    })
}