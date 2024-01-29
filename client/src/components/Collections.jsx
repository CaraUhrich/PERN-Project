import { useGetCollectionsQuery } from "../redux/nonantumGalleryApi"
import Collection from "./Collection"

export default function Collections () {
    const { data = {}, isError, error, isLoading } = useGetCollectionsQuery()

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error loading collections: {error.error}</div>
    }

    return (<div className="category-container">
    {
        data.map((collection) => (<div className="collections" key={collection.id}>
            <Collection id={collection.id} size='small' />
            <br />
        </div>))
    }
</div>)
}