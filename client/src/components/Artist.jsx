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
        return <div>Error loading artist: {error.error}</div>
    }

    let paintingSize = 'small'
    let className = 'painting medium'
    if (size === 'large') {
        paintingSize = 'medium'
        className = 'home'
    }
    
    return (<div className={`category-${size}`} key={id}>
        <div className={className}>
            <img src={data.image} alt={data.name} />
            <div className="info">
                <h3>{data.name}</h3>
                {
                    size === 'small' ?
                        <button onClick={() => navigate(`/artists/${id}`)}>Go to Artist</button>
                        : <>
                            <p>{data.bio}</p>
                            {data.link && (<a href={data.link}>External Artist Link</a>)}
                        </>
                }
            </div>
        </div>
        <RenderPaintings paintings={data.paintings} size={paintingSize}/>
    </div>)
} 