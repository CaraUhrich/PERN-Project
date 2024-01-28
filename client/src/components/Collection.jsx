import RenderPaintings from "./RenderPaintings"
import { useNavigate, useParams } from "react-router-dom"
import { useGetSingleCollectionQuery } from "../redux/nonantumGalleryApi"

export default function Collection ({ id, size }) {
    const navigate = useNavigate()
    const params = useParams()
    if (!id) {
        id = params.id
    }

    const { data = {}, isError, error, isLoading } = useGetSingleCollectionQuery(id)

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error loading collection: {error.error}</div>
    }

    let paintingSize = 'small'
    if (size === 'large') {
        paintingSize = 'medium'
    }

    return (<div className={`category-${size}`} key={id}>
        <h3>{data.title}</h3>
        {
            size === 'small' && (
                <button onClick={() => navigate(`/collections/${id}`)}>Go to Collection</button>
            )
        }
        <RenderPaintings paintings={data.paintings} size={paintingSize}/>
    </div>)
}