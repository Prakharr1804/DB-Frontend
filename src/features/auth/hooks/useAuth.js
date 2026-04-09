import { useContext, useState } from "react"
import { AuthContext } from "../app.context"
import { register, sendOTP, login, verifyOtp } from "../services/auth.api"

export const useAuth = () => {
    const context = useContext(AuthContext)
    const [registrationToken, setregistrationToken] = useState(null)

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
            //setregistrationToken(response.registrationToken)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOtp = async ({email, otp}) => {
        setLoading(true)
        try {
            const response = await verifyOtp({email, otp})
            if(response?.data?.success || response?.success){
                const token = response?.data?.registrationToken || response?.registrationToken;
                setregistrationToken(token)
                return true;
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return false;
    }

    const handleRegister = async ({email, password, role, attributes}) => {
        try {
            const response = await register({email, password, role, attributes, registrationToken})
            setUser(response.user)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        loading,
        user,
        handleLogin,
        handleSendOTP,
        handleRegister,
        handleVerifyOtp
    }
}
