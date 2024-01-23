import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateToken } from '../redux/tokenSlice'
import { useState, useEffect } from 'react'
import { useCreateUserMutation } from '../redux/nonantumGalleryApi'

export default function CreateAccount () {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [createAccount, {
        data,
        isSuccess,
        isError,
        error
    }] = useCreateUserMutation()

    async function handleSubmit(event) {
        event.preventDefault()
        await createAccount({ name, username, password })
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(updateToken(data.token))
            navigate('users/account')
        }
    }, [isSuccess])

    return (
        <form title='Create Account Form' onSubmit={handleSubmit}>
                <h3>Create An Account</h3>
                {isError && <p>{error.data.message}</p>}
                <label>Name: 
                    <input
                        value={name}
                        onChange={(event) => {setName(event.target.value)}}
                    />
                </label>
                    <br/>
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