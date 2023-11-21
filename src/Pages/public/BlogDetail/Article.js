import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import request from '../../../Utils/request'

function ArticleHeader({ data, onClick, status }) {
    const navigate = useNavigate()
    return <div className="d-sm-flex justify-content-between align-items-center mb-3">
        <div className="d-flex mb-2 mb-sm-0">
            <div
                className="flex-shrink-0 avatar me-2"
                role={'button'}
                onClick={() => navigate(`/profile/${data.userId}`)}
            >
                <img
                    className="avatar-img rounded-circle" src={
                    'http://localhost:8000' + data.userAvatarUrl
                } alt=""
                />
            </div>
            <div className="d-block flex-grow-1">
                <h6 className="mb-0 mt-1">{
                    data.userEmail
                }</h6>
                <div className="small text-secondary"><i className="fa-solid fa-circle text-success me-1"></i>Online
                </div>
            </div>
        </div>
        <div className="d-flex align-items-center">
            <button
                onClick={onClick}
                className={`icon-md rounded-circle btn ${status ? 'btn-danger' : `btn-outline-danger`} me-2 px-2`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Audio call"
                data-bs-original-title="Audio call"
            >
                <i style={{ lineHeight: 3 }} className={`bi bi-heart`}></i>
            </button>
        </div>
    </div>
}

export default function Article() {
    const userInfo = useSelector(state => state.userInfo.info)
    const { id } = useParams()
    const [article, setArticle] = useState({})
    const [like, setLike] = useState([])
    const isLike = useMemo(() => like.find(item => item.userId === userInfo.id), [like, userInfo.id])
    const getInfo = async() => {
        const resp = await request.get(`v1/article/${id}`)
        setArticle({
            ...resp.data,
            createdAt: dayjs(resp.data.createdAt).format('MMM DD, YYYY'),
            updatedAt: dayjs(resp.data.updatedAt).format('MMM DD, YYYY'),
        })
    }
    const getLikeInfo = async() => {
        const resp = await request.get(`v1/like/${id}/getByArticle`)
        setLike(resp.data)
    }
    useEffect(() => {
        getInfo()
        getLikeInfo()
    }, [])
    const createLike = async() => {
        const resp = await request.post(`v1/like`, {
            articleId: id,
            userId: userInfo.id,
        })
        setLike([...like, resp.data])
    }
    const deleteLike = async() => {
        await request.delete(`v1/like/${isLike.id}`)
    }
    const handleLike = async() => {
        isLike ? await deleteLike() : await createLike()
        getLikeInfo()
    }
    return <div className="card card-body">
        <ArticleHeader data={article} onClick={handleLike} status={isLike} />
        <img
            className="rounded"
            src={'http://localhost:8000' + article.thumbnailUrl}
            alt=""
        />
        <div className="mt-4">

            <a
                href="#"
                className="badge bg-danger bg-opacity-10 text-danger mb-2 fw-bold"
            >{article.categoryName}</a>

            <h1 className="mb-2 h2">{article.title}</h1>
            <ul className="nav nav-stack gap-3 align-items-center">
                <li className="nav-item">
                    <div className="nav-link">
                        by <a href="#" className="text-reset btn-link">{article.userEmail}</a>
                    </div>
                </li>
                <li className="nav-item">
                    <i className="bi bi-calendar-date pe-1"></i>{article.createdAt}
                </li>
                <li className="nav-item">
                    <i className="bi bi-clock pe-1"></i>{article.updatedAt}
                </li>
            </ul>
            <br />
            <div
                dangerouslySetInnerHTML={{
                    __html: article.content,
                }}
            ></div>
        </div>
    </div>
}
