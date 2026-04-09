import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})

export async function register({ email, password, role, attributes }) {
    try{
        const response = await axios.post('/auth/signup/complete', {
            email, password, role, attributes
        })

        return response
    }catch(err){
        console.log(err);
    }
} 

export async function sendOTP({email}) {
    try {
        const response = await axios.post('/auth/initiate', {
            email
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export async function verifyOtp({email, otp}) {
    try {
        const response = await axios.post('/auth/verifyOtp', {
            email, otp
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export async function login({email, password}) {
    try {

        const response = await axios.post('/auth/login', {
            email, password
        })

        return response
        
    } catch (error) {
        console.log(error)
    }
}