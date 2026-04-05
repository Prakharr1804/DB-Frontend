import { useContext } from "react"
import { AuthContext } from "../app.context"
import { register, sendOTP, login } from "../services/auth.api"

export const useAuth = () => {
    const context = useContext(AuthContext)

    const {loading, setLoading, user, setUser} = context

    const handleLogin = async ({email, password}) => {
        setLoading(true)
        try {
            const response = await login({email, password})
            setUser(response.user)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleSendOTP = async ({email}) => {
        setLoading(true)
        try {
            const response = await sendOTP({email})
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({email, password, role, attributes}) => {
        try {
            const response = await register({email, password, role, attributes})
            setUser(response.user)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        loading,
        user,
        handleLogin,
        handleSendOTP,
        handleRegister
    )
}
