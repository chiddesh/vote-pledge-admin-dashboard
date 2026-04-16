import { supabase } from "./Supabase"

export const filterPledge = async (filters = {}) => {
    let query = supabase.from("voters").select("*")

    /* GENDER */
    if (filters.gender) {
        query = query.eq("gender", filters.gender)
    }

    /* AREA TYPE */
    if (filters.area_type) {
        query = query.eq("area_type", filters.area_type)
    }
    
    /* AGE */
    if (filters.age === "18-25") {
        query = query.gte("age", 18).lte("age", 25)
    }

    if (filters.age === "26-40") {
        query = query.gte("age", 26).lte("age", 40)
    }

    if (filters.age === "40+") {
        query = query.gt("age", 40)
    }

    /* CATEGORY */
    if(filters.category){
        query = query.eq("category",filters.category)
    }


    /* COMPLETION */
    if(filters.Completion === "Completed"){
        query = query.eq("will_vote", true)
    }

    if(filters.Completion === "Not Completed"){
        query = query.eq("will_vote", false)
    }

    const { data, error } = await query

    if (error) throw new Error(error.message)

    return data
}