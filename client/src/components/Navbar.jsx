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
            navigate('/users')
        }

        console.log('logging out')
        dispatch(updateToken(''))
        dispatch(nonantumGalleryApi.util.invalidateTags('User'))
    }

    return(<nav>
        <div className='links'>
            <Link to={'/'}>Home</Link>
            <br />
            <Link to={'/paintings'}>Paintings</Link>
            <br />
            <Link to={'/artists'}>Artists</Link>
            <br />
            <Link to={'/collections'}>Collections</Link>
            <br />
            {
                token ? <>
                    <Link to={'/users/account'}>Account</Link>
                    <br />
                    <a onClick={() => logout()}>Logout</a>
                </>
                : <Link to={'/users'}>Login</Link>
            }
        </div>
        <h1>Nonantum Gallery</h1>
    </nav>)
}