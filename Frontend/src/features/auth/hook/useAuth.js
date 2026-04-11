import { setError, setLoading, setUser } from "../state/auth.slice"
import { register, login } from "../service/auth.api"
import { useDispatch } from "react-redux"

export const useAuth = () => {

    const dispatch = useDispatch()

    async function handleRegister({ email, contact, password, fullname, isSeller = false }) {
        try {
            dispatch(setLoading(true))

            const data = await register({ email, contact, password, fullname, isSeller })

            dispatch(setUser(data.user))
            dispatch(setError(null))

            return data
        } catch (error) {

            let message = "Registration failed"

            if (error.response?.data?.message) {
                message = error.response.data.message
            } else if (error.response?.data?.errors) {
                message = error.response.data.errors[0]?.msg || "Validation error"
            }

            console.log("REGISTER ERROR:", error.response?.data)

            dispatch(setError(message))

            throw error
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true))

            const data = await login({ email, password })

            dispatch(setUser(data.user))
            dispatch(setError(null))

            return data
        } catch (error) {

            let message = "Login failed"

            if (error.response?.data?.message) {
                message = error.response.data.message
            } else if (error.response?.data?.errors) {
                message = error.response.data.errors[0]?.msg || "Validation error"
            }

            console.log("LOGIN ERROR:", error.response?.data)

            dispatch(setError(message))

            throw error
        } finally {
            dispatch(setLoading(false))
        }
    }

    return { handleRegister, handleLogin }
}