import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { defaultAvatarUrl } from '../../../Store/UserInfoSlice'
import request from '../../../Utils/request'

export default function Connects({ userId, onSeeAll }) {
    const navigate = useNavigate()
    const [pageNum, setPageNum] = useState(1)
    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [total, setTotal] = useState(0)
    useEffect(() => {
        userId && getList()
    }, [userId])
    const getList = async() => {
        setIsLoading(true)
        try {
            const resp = await request.get(`v1/follower/list/connection`, {
                params: {
                    pageNum,
                    pageSize: 4,
                    userId: userId,
                },
            })
            setList(prev => [...prev, ...resp.data.rows])
            setTotal(resp.data.total)
        } finally {
            setIsLoading(false)
        }
    }

    return <div className="col-md-6 col-lg-12">
        <div className="card">

            <div className="card-header d-sm-flex justify-content-between align-items-center border-0">
                <h5 className="card-title">Friends <span className="badge bg-danger bg-opacity-10 text-danger">{total}</span>
                </h5>
                <button className="btn btn-primary-soft btn-sm" onClick={onSeeAll}> See all
                    friends
                </button>
            </div>

            <div className="card-body position-relative pt-0">
                <div className="row g-3">

                    {
                        list.length > 0 ? list.map(item => <div className="col-6">

                            <div className="card shadow-none text-center">

                                <div className="card-body p-2" onClick={() => navigate(`/profile/${item.toUserId}`)}>
                                    <div className="avatar avatar-story avatar-xl">
                                        <span><img
                                            className="avatar-img rounded-circle"
                                            src={
                                                item.toUserAvatarUrl ? `http://localhost:8000${item.toUserAvatarUrl}` : defaultAvatarUrl
                                            }
                                            alt=""
                                        /></span>
                                    </div>
                                    <h6 className="card-title mb-1 mt-3">
                                        <span>{
                                            item.toUserEmail
                                        }</span></h6>
                                </div>

                                {/*<div className="card-footer p-2 border-0">
                                    <button
                                        className="btn btn-sm btn-primary"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        aria-label="Send message"
                                        data-bs-original-title="Send message"
                                    ><i className="bi bi-chat-left-text"></i></button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        aria-label="Remove friend"
                                        data-bs-original-title="Remove friend"
                                    ><i className="bi bi-person-x"></i></button>
                                </div>*/}
                            </div>

                        </div>) : <><figure className="m-0">
                            <img src={'./img.png'} />
                        </figure>
                            <h1 className="mb-2 display-5 mt-5 text-center">No data</h1></>
                    }

                </div>
            </div>

        </div>
    </div>
}
