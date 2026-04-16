import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { supabase } from "./Supabase"

function ProtectedRoute({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const getSession = async () => {
            const { data } = await supabase.auth.getUser()
            setUser(data.user)
            setLoading(false)
        }

        getSession()

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null)
        })

        return () => listener.subscription.unsubscribe()

    }, [])

    if (loading) return <p className="p-5">Checking auth...</p>

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute