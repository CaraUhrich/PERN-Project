import { useGetPaintingsQuery } from "../redux/nonantumGalleryApi"
import RenderPaintings from "./RenderPaintings"
import { useParams, useNavigate } from "react-router-dom"

export default function Filter() {
    const { search } = useParams()
    const navigate = useNavigate()
    const { data = {} } =useGetPaintingsQuery()
    const filteredPaintings = []

    data.forEach((painting) => {
        if (painting.title.toLowerCase().includes(search)) {
            filteredPaintings.push(painting)
        }
    })

    return (<div>
        { 
            filteredPaintings.length ? 
                <>
                    <h3>Painting titles containing: {search}</h3>
                    <button onClick={() => navigate('/')}>Back to All Paintings</button>
                    <RenderPaintings paintings={filteredPaintings} size='large' />
                </>
                : <>
                    <h3>No painting titles were found containing: {search}</h3>
                    <button onClick={() => navigate('/')}>Back to All Paintings</button>
                </>
        }
        
    </div>)
}