import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useGetCurrentUserQuery, useGetPaintingCommentsQuery, useCreateCommentMutation, useDeleteCommentMutation, useUpdateCommentMutation } from "../redux/nonantumGalleryApi"
import { useState } from "react"

export default function Comments () {
    const params = useParams()
    const paintingId = params.id
    const token = useSelector((it) => it.state.token)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [commentId, setCommentId] = useState(null)

    const comments = useGetPaintingCommentsQuery(paintingId)
    const user = useGetCurrentUserQuery(token)
    const [createComment, commentCreation] = useCreateCommentMutation()
    const [updateComment, commentUpdate] = useUpdateCommentMutation()
    const [deleteComment, commentDeletion] = useDeleteCommentMutation()

    if (user.isLoading || comments.isLoading || commentCreation.isLoading || commentDeletion.isLoading || commentUpdate.isLoading) {
        return <div>Loading...</div>
    }

    if(commentUpdate.isSuccess) {
        console.log(commentUpdate)
    }

    async function create () {
        try {
            const lastUpdated = new Date()
            const comment = { content, lastUpdated, edited: false, paintingId, userId: user.data.id}
            if (title) {
                comment.title = title
            }

            console.log(comment)
            await createComment(comment)
        } catch (error) {
            console.error(error)
        }
    }

    async function remove (id) {
        try {
            await deleteComment(id)
        } catch (error) {
            console.error(error)
        }
    }

    async function update (id) {
        try {
            const lastUpdated = new Date()
            const comment = { content, lastUpdated, edited: true }
            if (title) {
                comment.title = title
            }

            console.log(comment)

            const edited = await updateComment(id, comment)
            console.log(edited)
        } catch (error) {
            console.error(error)
        }
    }

    function startUpdate (id) {
        const comment = comments.data.find((comment) => comment.id === id)
        setCommentId(id)
        setContent(comment.content)
        if (comment.title) {
            setTitle(comment.title)
        }
    }

    function endUpdate () {
        setCommentId(null)
        setContent('')
        setTitle('')
    }

    function handleSubmit (event) {
        event.preventDefault()

        if (commentId) {
            update(commentId)
        } else {
            create()
        }
    }

    return (<div>
        <form title="comment" onSubmit={handleSubmit}>
            {commentId ?
                <>
                    <h3>Update Your Comment</h3>
                    <button onClick={() => endUpdate()}>Start a New Comment</button>
                    <button type="submit">Save Changes</button>
                </>
                : <>
                    <h3>Leave a comment</h3>
                    <button type="submit">Submit</button>
                </>
            }
            <label>Title:
                <input
                    value={title}
                    onChange={(event) => {setTitle(event.target.value)}}
                />
            </label>
            <label>Comment:
                <input
                    value={content}
                    onChange={(event) => {setContent(event.target.value)}}
                />
            </label>
        </form>
        {comments.data.length && (
            <div className="comment-containter">
                {comments.data.map((comment) => {
                    return (<div className="comment" key={comment.id}>
                        {comment.title && <h5>{comment.title}</h5>}
                        <p>{comment.content}</p>
                        {comment.edited ?
                            <p>last edited: {comment.lastUpdated}</p>
                            : <p>posted: {comment.lastUpdated}</p>
                        }
                        {comment.userId === user.data.id && (<>
                            <button onClick={() => startUpdate(comment.id)}>Update</button>
                            <button onClick={() => remove(comment.id)}>Delete</button>
                        </>)}
                    </div>)
                })}
            </div>)}
    </div>)
}