import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { defaultAvatarUrl } from '../../Store/UserInfoSlice'
import request from '../../Utils/request'

export default function WhoToFollow() {
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.userInfo.info)
    const [list, setList] = useState([])
    useEffect(() => {
        userInfo.id && getList()
    }, [userInfo.id])
    const getList = async() => {
        const resp = await request.get('/v1/user/list/random', {
            params: {
                pageNum: 1,
                pageSize: 3,
                userId: userInfo.id,
            },
        })
        setList(resp.data.rows)
    }

    const handleFollow = async({ id: toUserId, isFollow: id }) => {
        if (id) {
            await request.delete(`/v1/follower/${id}`)
        } else {
            await request.post(`/v1/follower`, {
                fromUserId: userInfo.id,
                toUserId,
            })
        }
        getList()
    }
    if (!userInfo.id) return null

    return <div className="card">

        <div className="card-header pb-0 border-0">
            <h5 className="card-title mb-0">Who to follow</h5>
        </div>

        <div className="card-body">

            {
                list.map(item => <div key={item.id} className="hstack gap-2 mb-3">

                    <div className="avatar" role={'button'} onClick={() => navigate(`/profile/${item.id}`)}>
                        <span><img
                            className="avatar-img rounded-circle"
                            src={
                                item.avatarUrl
                                    ? ('http://localhost:8000' + item.avatarUrl)
                                    : defaultAvatarUrl
                            }
                            alt=""
                        /></span>
                    </div>

                    <div className="overflow-hidden">
                        <a className="h6 mb-0" href="#!">{
                            item.email
                        }</a>
                        <p className="mb-0 small text-truncate">{
                            item.description
                        }</p>
                    </div>

                    <button
                        onClick={() => handleFollow(item)}
                        className={`btn btn-primary${item.isFollow ? '' : '-soft'} rounded-circle icon-md ms-auto`}
                    >
                        <i
                            className={item.isFollow ? 'bi bi-person-check-fill' : 'fa-solid fa-plus'}
                        > </i></button>
                </div>)
            }
            <div className="d-grid mt-3"><a className="btn btn-sm btn-primary-soft" href="#!">View more</a></div>
        </div>
    </div>
}
