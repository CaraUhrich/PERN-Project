import Login from "./Login"
import CreateAccount from "./CreateAccount"
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"

export default function Users () {
    const navigate = useNavigate()
    const token = useSelector((it) => it.state.token)

    if (token) {
        navigate('/users/account')
    }

    return(<>
        <h2>Sign in or Create a User Account</h2>
        <Login />
        <CreateAccount />
    </>)
}