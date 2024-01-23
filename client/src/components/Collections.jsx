import { useGetCollectionsQuery } from "../redux/nonantumGalleryApi"
import Collection from "./Collection"

export default function Collections () {
    const { data = {}, isError, error, isLoading } = useGetCollectionsQuery()

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error loading collections: {error.data.message}</div>
    }

    return (<div className="category-container">
    {
        data.map((collection) => (<Collection id={collection.id} size='small' />))
    }
</div>)
}