import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateToken } from '../redux/tokenSlice'
import { nonantumGalleryApi } from '../redux/nonantumGalleryApi'

export default function Navbar () {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    
    const token = useSelector((it) => it.state.token)

    function logout () {
        if (location.pathname === '/users/account') {
            navigate('/')
        }

        console.log('logging out')
        dispatch(updateToken(''))
        dispatch(nonantumGalleryApi.util.invalidateTags('User'))
    }

    return(<nav>
        <h1>Nonantum Gallery</h1>
        <div className='links'>
            <Link to={'/'}>Paintings</Link>
            <Link to={'/artists'}>Artists</Link>
            <Link to={'/collections'}>Collections</Link>
            {
                token ?
                <Link to={'/users/account'}>Account</Link> :
                <Link to={'/users'}>Login</Link>
            }
            {token && (
                <a onClick={() => logout()}>Logout</a>
            )}
        </div>
    </nav>)
}