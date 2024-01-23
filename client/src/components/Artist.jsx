import RenderPaintings from "./RenderPaintings"
import { useNavigate, useParams } from "react-router-dom"
import { useGetSingleArtistQuery } from "../redux/nonantumGalleryApi"

export default function Artist ({ id, size }) {
    const navigate = useNavigate()
    const params = useParams()
    if (!id) {
        id = params.id
    }

    const { data = {}, isError, error, isLoading } = useGetSingleArtistQuery(id)

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error loading artist: {error.data.message}</div>
    }

    let paintingSize = 'small'
    if (size === 'large') {
        paintingSize = 'medium'
    }
    
    return (<div className={`category-${size}`} key={id}>
        <h3>{data.name}</h3>
        <img src={data.image} alt={data.name} />
        {
            size === 'small' ?
                <button onClick={() => navigate(`/artists/${id}`)}>Details</button>
                : <>
                    <p>{data.bio}</p>
                    {data.link && (<a href={data.link}>External Artist Link</a>)}
                </>
        }
        <RenderPaintings paintings={data.paintings} size={paintingSize}/>
    </div>)
} 