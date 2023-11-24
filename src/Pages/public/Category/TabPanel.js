import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

function TabEmpty() {

    return <div className="col-lg-4 mx-auto">
        <figure className="m-0">
            <img src={'./img.png'} />
        </figure>

        <h1 className="mb-2 display-5 mt-5 text-center">No data</h1>
    </div>
}

function ArticleItem({ article }) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/blogDetail/${article.id}`)
    }
    return <div className="col-sm-6 col-lg-4" onClick={handleClick}>

        <div className="card h-100">

            <img
                className="card-img-top"
                src={`http://localhost:8000` + article.thumbnailUrl}
                alt="Post"
            />

            <div className="card-body">

                <a className="text-body" href="post-details.html">{article.title}</a>

                <ul className="nav nav-stack flex-wrap small mt-3">
                    <li className="nav-item">
                        <a className="nav-link" href="#!">
                            <i className="bi bi-hand-thumbs-up-fill pe-1"></i>({
                            article.likes.length
                        })</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#!">
                            <i className="bi bi-chat-fill pe-1"></i>({
                            article.comments.length
                        })</a>
                    </li>
                    <li className={'nav-item dropdown ms-sm-auto'}>
                        <a className="nav-link" href="#!">
                            <i className="bi bi-calendar-date pe-1"></i>
                            {
                                dayjs(article.createdAt).format('MMM DD, YYYY')
                            }

                        </a>
                    </li>
                    {/*<li className="nav-item dropdown ms-sm-auto">
                        <a
                            className="nav-link mb-0"
                            href="#"
                            id="cardShareAction"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="bi bi-reply-fill flip-horizontal ps-1"></i>(3)
                        </a>

                        <ul
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="cardShareAction"
                        >
                            <li><a className="dropdown-item" href="#"> <i
                                className="bi bi-envelope fa-fw pe-2"
                            ></i>Send via Direct Message</a></li>
                            <li><a className="dropdown-item" href="#"> <i
                                className="bi bi-bookmark-check fa-fw pe-2"
                            ></i>Bookmark </a></li>
                            <li><a className="dropdown-item" href="#"> <i
                                className="bi bi-link fa-fw pe-2"
                            ></i>Copy link to post</a></li>
                            <li><a className="dropdown-item" href="#"> <i
                                className="bi bi-share fa-fw pe-2"
                            ></i>Share post via …</a></li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li><a className="dropdown-item" href="#"> <i
                                className="bi bi-pencil-square fa-fw pe-2"
                            ></i>Share to News Feed</a></li>
                        </ul>
                    </li>*/}

                </ul>

            </div>

        </div>

    </div>
}

export default function TabPanel({ data }) {
    return <div className="tab-content mb-0 pb-0">
        <div className="tab-pane fade show active" id="tab-1" role="tabpanel">
            {
                data.length
                    ? <div className="row g-4">
                        {data.map(article => <ArticleItem article={article} />)}
                    </div>
                    : <TabEmpty />
            }

        </div>
    </div>
}
