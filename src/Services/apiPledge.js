import {supabase} from "./Supabase"
export const filterPledge = async(filters={})=>
{
let query = supabase.from("voters").select("*")

<<<<<<< HEAD
export const filterPledge = async (filters = {}, page = 1) => {

    const limit = 100
    const from = (page - 1) * limit
    const to = from + limit - 1

    let query = supabase
        .from("voters")
        .select("*")
        .range(from, to)

    if (filters.gender) {
        query = query.eq("gender", filters.gender)
    }

    if (filters.area_type) {
        query = query.eq("area_type", filters.area_type)
    }

    if (filters.age === "18-25") {
        query = query.gte("age", 18).lte("age", 25)
    }

    if (filters.age === "26-40") {
        query = query.gte("age", 26).lte("age", 40)
    }

    if (filters.age === "40+") {
        query = query.gt("age", 40)
    }

    if (filters.category) {
        query = query.eq("category", filters.category)
    }

    if (filters.Completion === "Completed") {
        query = query.eq("will_vote", true)
    }

    if (filters.Completion === "Not Completed") {
        query = query.eq("will_vote", false)
    }

    if (filters.first_time_voter) {
        query = query.eq("first_time_voter", filters.first_time_voter)
    }

    if (filters.ulb) {
        query = query.eq("ulb", filters.ulb)
    }

    if (filters.block) {
        query = query.eq("block", filters.block)
    }

    if (filters.constituency) {
        query = query.eq("constituency", filters.constituency)
    }

    const { data, error } = await query

    if (error) throw new Error(error.message)

    return data
}

export const getStats = async () => {

    // TOTAL COUNT
    const { count: total } = await supabase
        .from("voters")
        .select("*", { count: "exact", head: true })

    // TODAY COUNT
    const today = new Date().toISOString().split("T")[0]

    const { count: todayCount } = await supabase
        .from("voters")
        .select("*", { count: "exact", head: true })
        .gte("created_at", `${today}T00:00:00`)
        .lte("created_at", `${today}T23:59:59`)

    // COMPLETED COUNT
    const { count: completed } = await supabase
        .from("voters")
        .select("*", { count: "exact", head: true })
        .eq("will_vote", true)

    const completion = total ? ((completed / total) * 100).toFixed(1) : 0

    return {
        total,
        todayCount,
        completion
    }
=======
if(filters.gender){
query=query.eq("gender",filters.gender)
}

if(filters.area_type){
query=query.eq("area_type",filters.area_type)
}
/* AGE */

if (filters.age === "18-25") {
query=query.gte("age", 18).lte("age", 25)
}
if (filters.age=== "26-40") {
query=query.gte("age", 26).lte("age", 40)
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


/* FIRST TIME VOTER */  
if(filters.first_time_voter){  
    query = query.eq("first_time_voter", filters.first_time_voter)  
}  

/* ULB */  
if(filters.ulb){  
    query = query.eq("ulb",filters.ulb)  
}  

/* BLOCK */  
if(filters.block){  
    query = query.eq("block",filters.block)
>>>>>>> 420b5dd99cda723a5b377ef3562648a8ce1baf69
}