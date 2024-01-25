import { useParams, useNavigate, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useGetSinglePaintingQuery, useCreateSaveMutation, useGetCurrentUserQuery, useDeleteSaveMutation } from "../redux/nonantumGalleryApi"
import Comments from "./Comments"

export default function SinglePainting () {
    const navigate = useNavigate()
    const { id } = useParams()
    const token = useSelector((it) => it.state.token)
    let isSaved = false
    let saveId = false

    const painting = useGetSinglePaintingQuery(id)
    const user = useGetCurrentUserQuery(token)
    const [createSave, saveCreation] = useCreateSaveMutation()
    const [deleteSave, saveDeletion] = useDeleteSaveMutation()

    if (user.isSuccess && painting.isSuccess) {
        painting.data.saves.forEach(save => {
            if(save.userId === user.data.id) {
                isSaved = true
                saveId = save.id
            }
        })
    }    

    if (painting.isLoading || user.isLoading || saveCreation.isLoading || saveDeletion.isLoading) {
        return <div>Loading...</div>
    }

    if (painting.isError) {
        return <div>Error loading painting {painting.error.error}</div>
    }

    async function addSave () {
        try {
            await createSave({ paintingId: id, userId: user.data.id })
        } catch (error) {
            console.error(error)
        }
    }

    async function unSave () {
        try {
            await deleteSave(saveId)
        } catch (error) {
            console.error(error) 
        }
    }

    return (<div className="single-painting">
        <img src={painting.data.image} alt={painting.data.description} />
        <div className="info">
            <h3>Title: {painting.data.title}</h3>
            <p>{painting.data.description}</p>
            <p>Artist: <Link to={`/artists/${painting.data.artistId}`} >{painting.data.artist.name}</Link></p>
            {painting.data.collectionId && (
                <p>Collection: <Link to={`/collections/${painting.data.collectionId}`} >{painting.data.collection.title}</Link></p>
            )}
        </div>
        {!token ?
            <button onClick={() => navigate('/users')} >Log in to save and comment</button> 
            : <>
                {isSaved ?
                    <button onClick={() => unSave()} >Remove from Saves</button>
                    : <button onClick={() => addSave()}>Save</button>
                }
            </>}
        <Comments />        
    </div>)
}