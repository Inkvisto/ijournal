
import * as yup from "yup";

const LoginSchema = yup.object().shape({
    email: yup.string().email('Wrong email').required('Email is required'),
    password: yup.string().min(6,'Length must be more than 6 ').required('Password is required')
})

export default LoginSchema