import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import request from '../../Utils/request'

dayjs.extend(relativeTime)

export default function Index() {
    const [list, setList] = useState([])
    useEffect(() => {
        getList()
    }, [])
    const getList = async() => {
        const resp = await request.get('v1/article/list/recommend', {
            params: {
                pageNum: 1,
                pageSize: 4,
            },
        })
        const { rows } = resp.data
        setList(rows)
    }
    return <div className="card">

        <div className="card-header pb-0 border-0">
            <h5 className="card-title mb-0">Recommend blogs</h5>
        </div>

        <div className="card-body">

            {
                list.map(item => <div className="mb-3" key={item.articleId}>
                    <h6 className="mb-0"><Link to={`/blogDetail/${item.articleId}`}>{
                        item.article.title
                    }</Link></h6>
                    <small>
                        {
                            dayjs(item.article.createdAt).fromNow()
                        }
                    </small>
                </div>)
            }

            <Link
                to="/category"
                className="btn btn-link btn-link-loader btn-sm text-secondary d-flex align-items-center"
            >
                <div className="spinner-dots me-2">
                    <span className="spinner-dot"></span>
                    <span className="spinner-dot"></span>
                    <span className="spinner-dot"></span>
                </div>
                View all latest blogs
            </Link>
        </div>

    </div>
}
