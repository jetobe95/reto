import Axios from 'axios';
const axios = Axios.create({
    baseURL: 'http://40.121.70.18:4000/api',
})
axios.interceptors.response.use(function (response) {
    return response.data
})

class Auth {
    async login({ email, password }) {
        try {
            const body = {
                email,
                password
            }
            const response = await axios.post('/login',body)
            return response
        } catch (error) {
            console.log(error);
        }
    }
    async register({ email, password }) {
        try {
            const body = {
                email,
                password
            }
            const response = await axios.post('/register',body)
            return response
        } catch (error) {
            console.log(error);
        }
    }
}
export default Auth;