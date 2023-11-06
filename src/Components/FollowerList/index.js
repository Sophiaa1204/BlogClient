import { useEffect, useState } from 'react'
import { defaultAvatarUrl } from '../../Store/UserInfoSlice'
import request from '../../Utils/request'

function FollowerItem({ type, data, onRemove, disabled }) {
    const userAvatarUrl = type === 'follower' ? data.fromUserAvatarUrl : data.toUserAvatarUrl
    const userEmail = type === 'follower' ? data.fromUserEmail : data.toUserEmail
    const userDescription = type === 'follower' ? data.fromUserDescription : data.toUserDescription
    const userGender = type === 'follower' ? data.fromUserGender : data.toUserGender
    return <div className="d-md-flex align-items-center mb-4">
        <div className="avatar me-3 mb-3 mb-md-0">
            <span>
                <img
                    className="avatar-img rounded-circle"
                    src={userAvatarUrl ? `http://localhost:8000${userAvatarUrl}` : defaultAvatarUrl}
                    alt=""
                />
            </span>
        </div>
        <div className="w-100">
            <div className="d-sm-flex align-items-start">
                <h6 className="mb-0"><a href="#!">{
                    userEmail
                }</a></h6>
                <p className="small ms-sm-2 mb-0">{
                    userGender
                }</p>
            </div>
            <ul className="avatar-group mt-1 list-unstyled align-items-sm-center">
                <li className="small">{
                    userDescription
                }
                </li>
            </ul>
        </div>
        <div className="ms-md-auto d-flex">
            {!disabled && <button
                className="btn btn-danger-soft btn-sm mb-0 me-2"
                onClick={() => onRemove(data.id)}
            > Remove</button>}
            {/*<button className="btn btn-primary-soft btn-sm mb-0"> Message</button>*/}
        </div>
    </div>
}

export default ({ userId, onLoaded, type, disabled }) => {
    const [pageNum, setPageNum] = useState(1)
    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const getList = async() => {
        setIsLoading(true)
        try {
            const resp = await request.get(`v1/follower/list/${type}`, {
                params: {
                    pageNum,
                    pageSize: 3,
                    userId: userId,
                },
            })
            setList(resp.data.rows)
            onLoaded && onLoaded(resp.data.rows)
            setTotal(resp.data.total)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        userId && getList()
    }, [userId, pageNum])

    const handleRemove = async(id) => {
        await request.delete(`v1/follower/${id}`)
        getList()
    }
    return <div className="card">
        <div className="card-header border-0 pb-0">
            <h5 className="card-title">{{
                follower: 'Followers',
                following: 'Following',
                connection: 'Connections',
            }[type]}</h5>
        </div>
        {
            list.length > 0 ? <div className="card-body">
                    {
                        list.map(item => <FollowerItem
                            onRemove={handleRemove}
                            type={type}
                            disabled={disabled}
                            data={item}
                            key={item.id}
                        />)
                    }

                    <div className="d-grid">
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

                    </div>

                </div>
                : <div className="card-body">
                    <div className="col-lg-4 mx-auto">
                        <figure className="m-0">
                            <img src={'./img.png'} />
                        </figure>
                        <h1 className="mb-2 display-5 mt-5 text-center">No data</h1>
                    </div>
                </div>
        }
    </div>
}
