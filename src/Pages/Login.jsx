import React, { useEffect, useState } from 'react'
import { supabase } from '../Services/Supabase'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser()
            if (data.user) navigate("/")
        }
        checkUser()
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        navigate("/")
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <form
                onSubmit={handleLogin}
                className='bg-white p-8 rounded-2xl shadow w-full max-w-sm flex flex-col gap-4'
            >
                <h2 className='text-2xl font-bold text-center text-orange-600'>Ranipet District Admin</h2>

                <input
                    type='email'
                    placeholder='Email'
                    className='p-3 rounded-xl border outline-none'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type='password'
                    placeholder='Password'
                    className='p-3 rounded-xl border outline-none'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className='text-red-500 text-sm'>{error}</p>}

                <button
                    type='submit'
                    disabled={loading}
                    className='bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700'
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    )
}

export default Login