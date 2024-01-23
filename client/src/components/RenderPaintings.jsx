import { useNavigate } from "react-router-dom"

export default function RenderPaintings ({ paintings, size }) {
    const navigate = useNavigate()

    return (<div className="painting-container">
        {paintings.map((painting) => {
            return (<div className={`painting-${size}`} key={painting.id}> 
                <img src={painting.image} alt={painting.description} />
                <h4>{painting.title}</h4>
                <button
                    onClick={() => {
                        navigate(`/paintings/${painting.id}`)
                    }}
                >Details</button>
            </div>)
        })}
    </div>)
}