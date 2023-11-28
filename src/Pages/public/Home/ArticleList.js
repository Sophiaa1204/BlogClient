import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import { Link } from 'react-router-dom'
import request from '../../../Utils/request'

function ArticleItem({ data }) {
    return <>
        <div className="card bg-transparent border-0">
            <div className="row g-3">
                <div className="col-4">

                    <img
                        className="rounded" src={
                        'http://localhost:8000' + data.thumbnailUrl
                    } alt=""
                    />
                </div>
                <div className="col-8">

                    <Link to="/category" className="badge bg-danger bg-opacity-10 text-danger mb-2 fw-bold">{
                        data.categoryName
                    }</Link>
                    <h5><Link to={`/blogDetail/${data.id}`} className="btn-link stretched-link text-reset fw-bold">{
                        data.title
                    }</Link></h5>
                    <div className="d-none d-sm-inline-block">
                        <a className="small text-secondary" href="#!"> <i className="bi bi-calendar-date pe-1"></i>
                            {
                                dayjs(data.createdAt).format('MMM DD, YYYY')
                            }
                        </a>
                    </div>
                    <div className="d-none d-sm-inline-block mx-2">
                        <a className="small text-secondary" href="#!"> <i className="bi bi-hand-thumbs-up-fill pe-1"></i>
                            ({
                                data.likes.length
                            })
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <hr className="my-4" />
    </>
}

function Pagination({ pagination, onChange }) {
    const totalPage = useMemo(() => {
        return Math.ceil(pagination.total / pagination.pageSize)
    }, [pagination.total, pagination.pageSize])
    const pages = useMemo(() => {
        if (totalPage <= 4) {
            return Array.from({ length: totalPage }, (v, i) => i + 1)
        } else {
            if (pagination.pageNum <= 2) {
                return [1, 2, 3, 4]
            } else if (pagination.pageNum >= totalPage - 1) {
                return [totalPage - 3, totalPage - 2, totalPage - 1, totalPage]
            } else {
                return [pagination.pageNum - 1, pagination.pageNum, pagination.pageNum + 1]
            }
        }
    }, [totalPage, pagination.pageNum])
    return <div className="mt-4">
        <nav aria-label="navigation">
            <ul className="pagination pagination-light d-inline-block d-md-flex justify-content-center">
                <li className={`page-item ${pagination.pageNum === 1 ? 'disabled' : ''}`}>
                    <button onClick={() => onChange(pagination.pageNum - 1)} className="page-link">Prev</button>
                </li>
                {
                    pages.map(item => <li
                        onClick={() => onChange(item)}
                        key={item}
                        className={`page-item ${pagination.pageNum === item ? 'active' : ''}`}
                    >
                        <button className="page-link">{item}</button>
                    </li>)
                }
                <li className={`page-item ${pagination.pageNum === totalPage ? 'disabled' : ''}`}>
                    <button onClick={() => onChange(pagination.pageNum + 1)} className="page-link">Next</button>
                </li>
            </ul>
        </nav>
    </div>
}

export default function ArticleList() {
    const [list, setList] = useState([])
    const [pagination, setPagination] = useState({
        pageNum: 1,
        pageSize: 10,
        total: 0,
    })
    useEffect(() => {
        getList()
    }, [pagination.pageNum])
    const handlePaginationChange = pageNum => {
        setPagination(prev => ({ ...prev, pageNum }))
    }
    const getList = async() => {
        const resp = await request.get('v1/article/list/get', {
            params: {
                pageNum: pagination.pageNum,
                pageSize: pagination.pageSize,
            },
        })
        const {
            rows, ...paginationConfig
        } = resp.data
        setList(rows)
        setPagination({
            pageNum: Number(paginationConfig.pageNum),
            pageSize: Number(paginationConfig.pageSize),
            total: Number(paginationConfig.total),
        })
    }

    return <>
        {
            list.map(item => <ArticleItem data={item} key={item.id} />)
        }
        <Pagination pagination={pagination} onChange={handlePaginationChange} />
    </>
}
