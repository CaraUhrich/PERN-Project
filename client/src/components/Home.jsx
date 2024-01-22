import { useGetPaintingsQuery } from "../redux/nonantumGalleryApi"
import RenderPaintings from "./RenderPaintings"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Home () {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const { data = {}, error, isLoading, isSuccess } = useGetPaintingsQuery()

    if (isLoading) {
        return <div>Loading...</div>
    }

    function filter(event) {
        event.preventDefault()

        if (search) {
            setSearch(search.toLowerCase())
            navigate(`/painting/${search}`)
        }
    }

    return ( <>
        <form onSubmit={filter}>
            <input
                value={search}
                placeholder="Search Titles"
                onChange={(event) => {setSearch(event.target.value)}} 
            />
            <button type="submit">Search</button>
        </form>
        {
            isSuccess ?
                <RenderPaintings paintings={data} type="large" />
                : <div>Error: {error.data.message}</div>
        }
    </> )
}