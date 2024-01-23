import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateToken } from '../redux/tokenSlice'
import { useState, useEffect } from 'react'
import { useLoginUserMutation } from '../redux/nonantumGalleryApi'

export default function Login () {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, {
        data,
        isSuccess,
        isError,
        error
    }] = useLoginUserMutation()

    async function handleSubmit(event) {
        event.preventDefault()
        await login({ username, password })
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(updateToken(data.token))
            navigate('/users/account')
        }
    }, [isSuccess])

    return (
            <form title='Login Form' onSubmit={handleSubmit}>
                <h3>Sign In</h3>
                {isError && <p>{error.data.message}</p>}
                <label>Username: 
                        <input
                        value={username} 
                        onChange={(event) => {setUsername(event.target.value)}}
                        />
                    </label>
                    <br/>
                <label>Password: 
                    <input
                        value={password}
                        type='password'
                        onChange={(event) => {setPassword(event.target.value)}}
                    />
                </label>
                <br/>
                <button type="submit">Sign in</button>
            </form>
        )
}