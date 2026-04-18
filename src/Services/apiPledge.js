const fetchFilteredData = async (filters = {}, page = 0) => {
  const pageSize = 1000

  let query = supabase
    .from("your_table")
    .select("*", { count: "exact" })

  /* ================= AGE ================= */
  if (filters.age === "40+") {
    query = query.gt("age", 40)
  }

  /* ================= CATEGORY ================= */
  if (filters.category && filters.category.trim() !== "") {
    query = query.eq("category", filters.category)
  }

  /* ================= COMPLETION ================= */
  if (filters.Completion === "Completed") {
    query = query.eq("will_vote", true)
  } else if (filters.Completion === "Not Completed") {
    query = query.eq("will_vote", false)
  }

  /* ================= FIRST TIME VOTER ================= */
  if (
    filters.first_time_voter !== undefined &&
    filters.first_time_voter !== null &&
    filters.first_time_voter !== ""
  ) {
    const value =
      filters.first_time_voter === true ||
      filters.first_time_voter === "true"

    query = query.eq("first_time_voter", value)
  }

  /* ================= ULB ================= */
  if (filters.ulb && filters.ulb.trim() !== "") {
    query = query.eq("ulb", filters.ulb)
  }

  /* ================= BLOCK ================= */
  if (filters.block && filters.block.trim() !== "") {
    query = query.eq("block", filters.block)
  }

  /* ================= PAGINATION ================= */
  const from = page * pageSize
  const to = from + pageSize - 1

  const { data, error, count } = await query.range(from, to)

  if (error) {
    console.error("Supabase Error:", error)
    return { data: [], count: 0 }
  }

  return { data: data || [], count: count || 0 }
}