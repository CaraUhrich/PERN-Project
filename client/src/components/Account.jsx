import { useGetCurrentUserQuery, useGetUserSavesQuery, useDeleteSaveMutation  } from "../redux/nonantumGalleryApi"
import RenderSinglePainting from "./RenderSinglePainting"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Account () {
    const navigate = useNavigate()
    const token = useSelector((it) => it.state.token)

    console.log(token)

    if (!token) {
        navigate('/users')
    }

    const account = useGetCurrentUserQuery(token)
    const saves = useGetUserSavesQuery(token)
    const [deleteSave, saveDeletion] = useDeleteSaveMutation()

    if (account.isLoading || saves.isLoading || saveDeletion.isLoading) {
        return <div>Loading...</div>
    }

    async function removeSave(saveId) {
        await deleteSave({ id: saveId, token })
    }

    return (<div>
        <h2>Welcome {account.data.name}!</h2>
        {saves.data.length ?
            <>
                <h3>Your current saves:</h3>
                <div className="painting-container">
                    {saves.data.map((save) => {
                        return (<div key={save.id} className="painting-medium">
                            <RenderSinglePainting paintingId={save.paintingId} />
                            <button onClick={() => removeSave(save.id)}>Remove From Saves</button>
                        </div>)
                    })}
                </div>
                
            </>
            : <>
                <h3>You currently have no saves</h3>
                <button onClick={() => navigate('/')}>Back to All Paintings</button>
            </>
        }
    </div>)
}