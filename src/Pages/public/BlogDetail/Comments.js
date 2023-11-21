import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import request from '../../../Utils/request'

const list2Tree = (list) => {
    const map = {}
    const roots = []
    list.forEach(item => {
        map[item.id] = item
        item.children = []
    })
    list.forEach(item => {
        if (item.parentId) {
            map[item.parentId].children.push(item)
        } else {
            roots.push(item)
        }
    })
    return roots
}
const CommentItem = ({ data, onClick, onCancel, isNested }) => {
    const navigate = useNavigate()
    return <>
        <div className={`my-4 d-flex ${isNested ? 'ps-5' : ''}`}>
            <div
                className="avatar float-start me-3"
                role={'button'}
                onClick={() => navigate(`/profile/${data.userId}`)}
            >
                <img
                    className="avatar-img rounded-circle "
                    src={'http://localhost:8000' + data.userAvatarUrl}
                    alt="avatar"
                />
            </div>

            <div>
                <div className="mb-2 d-sm-flex">
                    <h6 className="m-0 me-2">{data.userEmail}</h6>
                    {/*<span className="me-3 small">June 11, 2022 at 6:01 am </span>*/}
                    <span className="me-3 small">
                    {dayjs(data.createdAt).format('MMM DD, YYYY at hh:mm a')}
                </span>
                </div>
                <p>{data.content}</p>
                {
                    onCancel
                        ? <button onClick={() => onCancel()} className="btn btn-light btn-sm">Cancel</button>
                        : <button onClick={() => onClick(data.id)} className="btn btn-light btn-sm">Reply</button>}
            </div>
        </div>
        {
            !onCancel && data.children.map(item => <CommentItem isNested data={item} onClick={onClick} key={item.id} />)
        }
    </>
}
export default function Comments() {
    const { id } = useParams()
    const [comments, setComments] = useState([])
    const [content, setContent] = useState('')
    const [nestedCommentId, setNestedCommentId] = useState(null)
    const userInfo = useSelector(state => state.userInfo.info)
    const treeComments = useMemo(() => list2Tree(comments), [comments])
    const nestedComment = useMemo(() => comments.find(item => item.id === nestedCommentId), [nestedCommentId, comments])
    useEffect(() => {
        getComments()
    }, [])

    const getComments = async() => {
        const resp = await request.get(`v1/comment/list/getByArticleId?articleId=${id}`)
        setComments(resp.data)
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        await request.post('v1/comment', {
            articleId: id,
            content,
            userId: userInfo.id,
            commentId: nestedCommentId,
        })
        getComments()
        setContent('')
        setNestedCommentId(null)
    }
    const handleClickComment = (commentId) => {
        setNestedCommentId(commentId)
    }
    if (!userInfo.id) return null
    return <div className="card">
        {Boolean(comments.length) && <div className="card-header pb-0 border-0">
            <h4>{comments.length} comments</h4>
        </div>}
        <div className="card-body">
            {
                treeComments.map(item => <CommentItem data={item} onClick={handleClickComment} key={item.id} />)
            }
            {Boolean(comments.length) && <hr className="my-4" />}
            <div>
                <h4>Leave a comment</h4>
                <form onSubmit={handleSubmit} className="row g-3 mt-2">
                    {nestedCommentId && <div>
                        <label className="form-label">Related Comment</label>
                        <CommentItem data={nestedComment} onCancel={() => setNestedCommentId(null)} />
                    </div>}
                    <div className="col-12">
                        <label className="form-label">Your Comment *</label>
                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            required
                            className="form-control"
                            rows="3"
                        ></textarea>
                    </div>

                    {/*<div className="col-md-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                            >Save my name and email in this browser for the next
                                time I comment. </label>
                        </div>
                    </div>*/}

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Post
                            comment
                        </button>
                    </div>
                </form>
            </div>

        </div>
    </div>
}
