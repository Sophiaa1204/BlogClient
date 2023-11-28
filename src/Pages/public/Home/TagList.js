import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import request from '../../../Utils/request'

export default function TagList() {
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        getCategoryList()
    }, [])
    const getCategoryList = async() => {
        const resp = await request.get('/v1/category/list/get')
        setCategoryList(resp.data.rows)
    }
    return <div className="card">

        <div className="card-header pb-0 border-0">
            <h5 className="card-title mb-0">Tags</h5>
        </div>

        <div className="card-body">

            <ul className="list-inline mb-0 d-flex flex-wrap gap-2">
                {
                    categoryList.map(item => <li className="list-inline-item m-0">
                        <Link className="btn btn-outline-light btn-sm" to={`/category/${item.id}`}>{item.name}</Link>
                    </li>)
                }
            </ul>

        </div>
    </div>
}

