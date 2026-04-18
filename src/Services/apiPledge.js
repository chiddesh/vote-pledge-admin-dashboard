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