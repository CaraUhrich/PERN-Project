import { useGetArtistsQuery } from "../redux/nonantumGalleryApi"
import Artist from "./Artist"

export default function Artists () {
    const { data = {}, isError, error, isLoading } = useGetArtistsQuery()

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error loading artists: {error.error}</div>
    }

    return (<div className="category-container">
        {
            data.map((artist) => (<Artist id={artist.id} size='small' />))
        }
    </div>)
}