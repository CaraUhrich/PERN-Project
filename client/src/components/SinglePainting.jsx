import { useParams, useNavigate, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useGetSinglePaintingQuery, useCreateSaveMutation, useDeleteSaveMutation } from "../redux/nonantumGalleryApi"
import Comments from "./Comments"

export default function SinglePainting () {
    const navigate = useNavigate()
    const { id } = useParams()
    const token = useSelector((it) => it.state.token)

    const [user, setUser] = useState({})
    let isSaved = false
    let saveId = 0

    const painting = useGetSinglePaintingQuery(id)
    const [createSave, saveCreation] = useCreateSaveMutation()
    const [deleteSave, saveDeletion] = useDeleteSaveMutation()

    async function fetchUser() {
        try {
            const res = await fetch('http://localhost:8080/api/users', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                } 
            })
            const data = await res.json()
            setUser(data)
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        fetchUser()
    }, [token])

    if (token && painting.isSuccess && user.id) {
        painting.data.saves.forEach(save => {
            if(save.userId === user.id) {
                isSaved = true
                saveId = save.id
            }
        })
    }    

    if (painting.isLoading || saveCreation.isLoading || saveDeletion.isLoading) {
        return <div>Loading...</div>
    }

    if (painting.isError) {
        return <div>Error loading painting {painting.error.error}</div>
    }

    async function addSave () {
        try {
            await createSave({ paintingId: id, userId: user.id, token })
        } catch (error) {
            console.error(error)
        }
    }

    async function unSave () {
        try {
            await deleteSave({ id: saveId, token })
        } catch (error) {
            console.error(error) 
        }
    }

    return (<div className="single-img">
        <img src={painting.data.image} alt={painting.data.description} />
        <div className="info">
            <h3>Title: {painting.data.title}</h3>
            <p>{painting.data.description}</p>
            <p>Artist: <Link to={`/artists/${painting.data.artistId}`} >{painting.data.artist.name}</Link>
            </p>
            {painting.data.collectionId && (
                <p>Collection: <Link to={`/collections/${painting.data.collectionId}`} >{painting.data.collection.title}</Link></p>
            )}
            {!token ?
            <button onClick={() => navigate('/users')} >Log in to save and comment</button> 
            : <>
                {isSaved ?
                    <button onClick={() => unSave()} >Remove from Saves</button>
                    : <button onClick={() => addSave()}>Save</button>
                }
            </>
        }
        </div>
        <Comments />
    </div>)
}