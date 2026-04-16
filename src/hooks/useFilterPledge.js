import { useQuery } from "@tanstack/react-query"
import { filterPledge } from "../Services/apiPledge"

export const useFilterPledge = (filters) => {
    return useQuery({
        queryKey: ["pledges", filters],
        queryFn: () => filterPledge(filters),
        refetchOnWindowFocus: false
    })
}