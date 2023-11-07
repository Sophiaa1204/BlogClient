import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { defaultAvatarUrl } from '../../Store/UserInfoSlice'
import request from '../../Utils/request'

export default function Likes({ user, onLoaded }) {
    const [pageNum, setPageNum] = useState(1)
    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const getList = async() => {
        setIsLoading(true)
        try {
            const resp = await request.get('v1/like/list/getByUser', {
                params: {
                    pageNum,
                    pageSize: 3,
                    userId: user.id,
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
        user.id && getList()
    }, [user.id, pageNum])

    return <>
        {
            list.map(item => <LikeItem data={item} key={item.id} user={user} />)
        }
        {
            (total > list.length) && <button
                className="btn btn-loader btn-primary-soft"
                onClick={() => setPageNum(prev => prev + 1)}
            >
                {!isLoading && <span className="load-text"> Load more </span>}
                {isLoading && <div className="load-icon">
                    <div className="spinner-grow spinner-grow-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}
            </button>
        }
    </>
}


const LikeItem = ({ data, user }) => {
    const navigate = useNavigate()
    return <div className="card">

        <div className="border-bottom">
            <p className="small mb-0 px-4 py-2">
                <i className="bi bi-heart-fill text-danger pe-1"></i>{user.email}</p>
        </div>

        <div className="card-header border-0 pb-0">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">

                    <div className="avatar me-2" onClick={() => navigate(`/profile/${data.userId}`)} role={'button'}>
                        <span><img
                            className="avatar-img rounded-circle"
                            src={
                                data.articleUserAvatarUrl
                                    ? `http://localhost:8000${data.articleUserAvatarUrl}`
                                    : defaultAvatarUrl
                            }
                            alt=""
                        /></span>
                    </div>

                    <div>
                        <h6 className="card-title mb-0"><a href="#!">{data.articleUserEmail}</a></h6>
                        <p className="mb-0 small">{
                            dayjs(data.createdAt).format('MMM DD at HH:mm:ss')
                        }</p>
                    </div>
                </div>

                <a
                    href="#"
                    className="text-secondary btn btn-secondary-soft-hover py-1 px-2"
                    id="cardShareAction5"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <i className="bi bi-three-dots"></i>
                </a>

                <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="cardShareAction5"
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

        <div className="card-body pb-0">
            <p dangerouslySetInnerHTML={{ __html: data.articleContent }}></p>

            <ul className="nav nav-stack pb-2 small">
                <li className="nav-item">
                    <a className="nav-link active text-secondary" href="#!"> <i
                        className="bi bi-heart-fill me-1 icon-xs bg-danger text-white rounded-circle"
                    ></i> {user.email} {data.likes.length <= 1 ? '' : `and ${data.likes.length - 1} others`}</a>
                </li>
                <li className="nav-item ms-sm-auto">
                    <a className="nav-link" href="#!">
                        <i className="bi bi-chat-fill pe-1"></i>Comments ({data.comments.length})</a>
                </li>
            </ul>

        </div>

    </div>
}
