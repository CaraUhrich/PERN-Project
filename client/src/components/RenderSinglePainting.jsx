import { useNavigate } from "react-router-dom"
import { useGetSinglePaintingQuery } from "../redux/nonantumGalleryApi"

export default function RenderSinglePainting ({ paintingId }) {
    const navigate = useNavigate()

    const { data = {}, isError, error, isLoading } = useGetSinglePaintingQuery(paintingId)

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error loading painting: {error.data.message}</div>
    }

    return (<> 
        <img src={data.image} alt={data.description} />
        <h4>{data.title}</h4>
        <button
            onClick={() => {
                navigate(`/paintings/${paintingId}`)
            }}
        >Details</button>
    </>)
}