import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useGetPaintingCommentsQuery, useCreateCommentMutation, useDeleteCommentMutation, useUpdateCommentMutation } from "../redux/nonantumGalleryApi"
import { useEffect, useRef, useState } from "react"

export default function Comments () {
    const params = useParams()
    const paintingId = params.id
    const token = useSelector((it) => it.state.token)
    let hasComments = false
    const form = useRef()
    const dateType = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}

    const [updating, setUpdating] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [commentId, setCommentId] = useState(0)
    const [user, setUser] = useState({})

    const comments = useGetPaintingCommentsQuery(paintingId)
    const [createComment, commentCreation] = useCreateCommentMutation()
    const [updateComment, commentUpdate] = useUpdateCommentMutation()
    const [deleteComment, commentDeletion] = useDeleteCommentMutation()
    
    async function fetchUser() {
        try {
            const res = await fetch('https://nonantumgallery.onrender.com/api/users', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                } 
            })
            const data = await res.json()
            setUser(data)
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        fetchUser()
    }, [token])

    if (comments.isLoading || commentCreation.isLoading || commentDeletion.isLoading || commentUpdate.isLoading) {
        return <div>Loading...</div>
    }

    if (comments.isSuccess && comments.data.length) {
        hasComments = true
    }

    async function create () {
        try {
            const lastUpdated = new Date()
            const comment = { content, lastUpdated, edited: false, paintingId, userId: user.id, token}
            if (title) {
                comment.title = title
            }

            await createComment(comment)
        } catch (error) {
            console.error(error)
        }
    }

    async function remove (id) {
        try {
            await deleteComment({ id, token })
        } catch (error) {
            console.error(error)
        }
    }

    async function update () {
        try {
            const lastUpdated = new Date()
            const comment = { content, lastUpdated, edited: true, token, id: commentId }
            if (title) {
                comment.title = title
            }

            await updateComment(comment)
        } catch (error) {
            console.error(error)
        }
    }

    function startUpdate (id) {
        setCommentId(id)
        setUpdating(true)

        const comment = comments.data.find((commentObj) => commentObj.id === id)

        setContent(comment.content)
        if (comment.title) {
            setTitle(comment.title)
        } else {
            setTitle('')
        }
        
        form.current.focus()
    }

    function endUpdate () {
        setUpdating(false)
        setCommentId(0)
        setContent('')
        setTitle('')
    }

    function handleSubmit (event) {
        event.preventDefault()

        if (updating) {
            update()
        } else {
            create()
        }

        endUpdate()
    }

    function parseDate(timestamp) {
        const date = new Date(timestamp)

        return date.toLocaleDateString(undefined, dateType)
    }

    return (<div className="comments-container">
        {token && (<div className="comment-form-container">
            {updating ?
                <>
                    <h3>Update Your Comment</h3>
                    <button onClick={() => endUpdate()}>Start a New Comment</button>
                </>
                : <h3>Leave a comment</h3>
            }
            <form title="comment" onSubmit={handleSubmit}>
                <label>Title: <input
                        ref={form}
                        value={title}
                        onChange={(event) => {setTitle(event.target.value)}}
                    />
                </label>
                <br />
                <label>Comment: <textarea
                        rows={3}
                        cols={25}
                        maxLength={255}
                        value={content}
                        onChange={(event) => {setContent(event.target.value)}}
                    />
                </label>
                <br />
                {updating ?
                    <button type="submit">Save Changes</button>
                    : <button type="submit">Submit</button>
                }
            </form>
        </div>)}
        {hasComments && (
            <div className="comment-containter" >
                {comments.data.map((comment) => {
                    return (<div className="comment" key={comment.id}>
                        {comment.title && <h5>{comment.title}</h5>}
                        <p>{comment.content}  -{comment.userName}</p>
                        {comment.edited ?
                            <p>last edited: {parseDate(comment.lastUpdated)}</p>
                            : <p>posted: {parseDate(comment.lastUpdated)}</p>
                        }
                        {comment.userId === user.id && (<>
                            <button onClick={() => startUpdate(comment.id)}>Update</button>
                            <button onClick={() => remove(comment.id)}>Delete</button>
                        </>)}
                    </div>)
                })}
            </div>)}
    </div>)
}