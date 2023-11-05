import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import * as PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import request from '../../Utils/request'

dayjs.extend(relativeTime)

function ArticleContent({ data }) {
    const navigate = useNavigate()
    return <div className="card-header border-0 pb-0">
        <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">

                <div
                    className="avatar avatar-story me-2"
                    role={'button'}
                    onClick={() => navigate(`/profile/${data.userId}`)}
                >
                    <span><img
                        className="avatar-img rounded-circle"
                        src={
                            'http://localhost:8000' + data.userAvatarUrl
                        }
                        alt=""
                    /></span>
                </div>

                <div>
                    <div className="nav nav-divider">
                        <h6 className="nav-item card-title mb-0">
                            <a href="#!">{
                                data.userEmail
                            }</a></h6>
                        <span className="nav-item small"> {
                            dayjs(data.createdAt).fromNow()
                        }</span>
                    </div>
                    <p className="mb-0 small">Web Developer at Webestica</p>
                </div>
            </div>

            {/*TODO*/}
            <div className="dropdown">
                <a
                    href="#"
                    className="text-secondary btn btn-secondary-soft-hover py-1 px-2"
                    id="cardFeedAction"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <i className="bi bi-three-dots"></i>
                </a>

                <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="cardFeedAction"
                >
                    <li><a className="dropdown-item" href="#">
                        <i className="bi bi-bookmark fa-fw pe-2"></i>Save post</a>
                    </li>
                    <li><a className="dropdown-item" href="#">
                        <i className="bi bi-person-x fa-fw pe-2"></i>Unfollow lori
                        ferguson </a></li>
                    <li><a className="dropdown-item" href="#">
                        <i className="bi bi-x-circle fa-fw pe-2"></i>Hide post</a>
                    </li>
                    <li><a className="dropdown-item" href="#">
                        <i className="bi bi-slash-circle fa-fw pe-2"></i>Block</a>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li><a className="dropdown-item" href="#">
                        <i className="bi bi-flag fa-fw pe-2"></i>Report post</a>
                    </li>
                </ul>
            </div>

        </div>
    </div>
}

function ArticleComment({ data }) {
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

    const userInfo = useSelector(state => state.userInfo.info)
    const treeComments = useMemo(() => list2Tree(data.comments || []), [data.comments])


    return <>
        <div className="card-body">
            <p
                dangerouslySetInnerHTML={{
                    __html: data.content,
                }}
            ></p>

            <ul className="nav nav-stack py-3 small">
                <li className="nav-item">
                    <a
                        className="nav-link"
                        href="#!"
                        data-bs-container="body"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-html="true"
                        data-bs-custom-className="tooltip-text-start"
                        data-bs-title="Frances Guerrero<br> Lori Stevens<br> Billy Vasquez<br> Judy Nguyen<br> Larry Lawson<br> Amanda Reed<br> Louis Crawford"
                    > <i className="bi bi-hand-thumbs-up-fill pe-1"></i>Likes ({
                        data.likes.length
                    })</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#!">
                        <i className="bi bi-chat-fill pe-1"></i>Comments ({
                        data.comments.length
                    })</a>
                </li>

                {/*TODO*/}
                {/*<li className="nav-item dropdown ms-sm-auto">
                    <a
                        className="nav-link mb-0"
                        href="#"
                        id="cardShareAction"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <i className="bi bi-reply-fill flip-horizontal ps-1"></i>Share
                        (3)
                    </a>

                    <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="cardShareAction"
                    >
                        <li><a className="dropdown-item" href="#">
                            <i className="bi bi-envelope fa-fw pe-2"></i>Send via
                            Direct Message</a></li>
                        <li><a className="dropdown-item" href="#">
                            <i className="bi bi-bookmark-check fa-fw pe-2"></i>Bookmark
                        </a></li>
                        <li><a className="dropdown-item" href="#">
                            <i className="bi bi-link fa-fw pe-2"></i>Copy link to
                            post</a></li>
                        <li><a className="dropdown-item" href="#">
                            <i className="bi bi-share fa-fw pe-2"></i>Share post via
                            …</a></li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><a className="dropdown-item" href="#">
                            <i className="bi bi-pencil-square fa-fw pe-2"></i>Share
                            to News Feed</a></li>
                    </ul>
                </li>*/}

            </ul>

            {/*<div className="d-flex mb-3">

                <div className="avatar avatar-xs me-2">
                    <a href="#!"> <img
                        className="avatar-img rounded-circle"
                        src={
                            'http://localhost:8000' + userInfo.avatarUrl
                        }
                        alt=""
                    /> </a>
                </div>

                <form className="nav nav-item w-100 position-relative">
                    <textarea
                        data-autoresize=""
                        className="form-control pe-5 bg-light"
                        rows="1"
                        placeholder="Add a comment..."
                    ></textarea>
                    <button
                        className="nav-link bg-transparent px-3 position-absolute top-50 end-0 translate-middle-y border-0"
                        type="submit"
                    >
                        <i className="bi bi-send-fill"> </i>
                    </button>
                </form>
            </div>*/}

            <ul className="comment-wrap list-unstyled d-flex flex-column gap-2">
                {
                    treeComments.map(item => <CommentItem data={item} key={item.id} />)
                }
            </ul>

        </div>
        {/*<div className="card-footer border-0 pt-0">

            <a
                href="#!"
                role="button"
                className="btn btn-link btn-link-loader btn-sm text-secondary d-flex align-items-center"
                data-bs-toggle="button"
                aria-pressed="true"
            >
                <div className="spinner-dots me-2">
                    <span className="spinner-dot"></span>
                    <span className="spinner-dot"></span>
                    <span className="spinner-dot"></span>
                </div>
                Load more comments
            </a>
        </div>*/}
    </>
}

function CommentItem({ data, isNested }) {
    const navigate = useNavigate()
    return <>
        <li className="comment-item">
            <div className="d-flex position-relative">

                <div className="avatar avatar-xs" role={'button'} onClick={() => navigate(`/profile/${data.userId}`)}>
                    <span><img
                        className="avatar-img rounded-circle"
                        src={'http://localhost:8000' + data.userAvatarUrl}
                        alt=""
                    /></span>
                </div>
                <div className="ms-2">

                    <div className="bg-light rounded-start-top-0 p-3 rounded">
                        <div className="d-flex justify-content-between">
                            <h6 className="mb-1"><a href="#!">{
                                data.userEmail
                            }</a></h6>
                            <small className="ms-2">{
                                dayjs(data.createdAt).fromNow()
                            }</small>
                        </div>
                        <p className="small mb-0">{
                            data.content
                        }</p>
                    </div>
                </div>
            </div>

            {data.children && Boolean(data.children.length) &&
                <ul className="comment-item-nested list-unstyled mt-2">
                    {data.children.map(item => <CommentItem isNested data={item} key={item.id} />)}
                </ul>}

        </li>
    </>
}

function ArticleItem(props) {
    return <div className="card">
        <ArticleContent {...props} />
        <ArticleComment {...props} />
    </div>
}


export default function ArticleList({ userId, onLoaded }) {
    const [pageNum, setPageNum] = useState(1)
    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const getList = async() => {
        setIsLoading(true)
        try {
            const resp = await request.get('v1/article/user/list', {
                params: {
                    pageNum,
                    pageSize: 3,
                    userId: userId,
                },
            })
            setList(prev => [...prev, ...resp.data.rows])
            onLoaded && onLoaded(resp.data.rows)
            setTotal(resp.data.total)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        userId && getList()
    }, [userId, pageNum])
    return <>
        {
            list.map(item => <ArticleItem data={item} key={item.id} />)
        }

        {(total > list.length) && <button
            className="btn btn-loader btn-primary-soft"
            onClick={() => setPageNum(prev => prev + 1)}
        >
            {!isLoading && <span className="load-text"> Load more </span>}
            {isLoading && <div className="load-icon">
                <div className="spinner-grow spinner-grow-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>}
        </button>}
    </>
}
