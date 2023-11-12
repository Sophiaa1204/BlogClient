import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useMatch, useMatches } from 'react-router-dom'
import request from '../../Utils/request'


export default function UserProfile() {
    const matchedPath = useMatches()

    const isMatch = (path) => {
        return matchedPath.some(item => item.pathname === path)
    }
    const userInfo = useSelector(state => state.userInfo.info)
    const [overall, setOverall] = useState({
        article: 0,
        follower: '21.3k',
        following: '532',
    })
    useEffect(() => {
        userInfo.id && getArticleCounts()
    }, [userInfo.id])
    const getArticleCounts = async() => {
        const resp = await request.get(`/v1/article/user/count?userId=${userInfo.id}`)
        setOverall(prev => ({
            ...prev,
            article: resp.data,
        }))

    }
    return <>
        <div className="d-flex align-items-center d-lg-none">
            <button
                className="border-0 bg-transparent"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasSideNavbar"
                aria-controls="offcanvasSideNavbar"
            >
                <span className="btn btn-primary"><i className="fa-solid fa-sliders-h"></i></span>
                <span className="h6 mb-0 fw-bold d-lg-none ms-2">My profile</span>
            </button>
        </div>

        <nav className="navbar navbar-expand-lg mx-0">
            <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="offcanvasSideNavbar"
            >

                <div className="offcanvas-header">
                    <button
                        type="button"
                        className="btn-close text-reset ms-auto"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>

                <div className="offcanvas-body d-block px-2 px-lg-0">

                    <div className="card overflow-hidden">

                        <div
                            className="h-50px"
                            style={
                                {
                                    backgroundImage: 'url(https://social.webestica.com/assets/images/bg/01.jpg)',
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                }
                            }
                        ></div>

                        <div className="card-body pt-0">
                            <div className="text-center">

                                <div className="avatar avatar-lg mt-n5 mb-3">
                                    <a href="#!"><img
                                        className="avatar-img rounded border border-white border-3"
                                        src={userInfo.avatarUrl}
                                        alt=""
                                    /></a>
                                </div>

                                <h5 className="mb-0"><a href="#!">{userInfo.email}</a></h5>
                                <small>Web Developer at Webestica</small>
                                <p className="mt-3">{userInfo.description}</p>

                                <div className="hstack gap-2 gap-xl-3 justify-content-center">

                                    <div>
                                        <h6 className="mb-0">{
                                            overall.article
                                        }</h6>
                                        <small>Post</small>
                                    </div>

                                    <div className="vr"></div>

                                    <div>
                                        <h6 className="mb-0">{
                                            overall.follower
                                        }</h6>
                                        <small>Followers</small>
                                    </div>

                                    <div className="vr"></div>

                                    <div>
                                        <h6 className="mb-0">{
                                            overall.following
                                        }</h6>
                                        <small>Following</small>
                                    </div>
                                </div>

                            </div>

                            <hr />

                            <ul className="nav nav-link-secondary flex-column fw-bold gap-2">
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            isMatch('/profile/myProfile') ? 'active' : ''
                                        }`} to={'/profile/myProfile'}
                                    > <img
                                        className="me-2 h-20px fa-fw"
                                        src="https://social.webestica.com/assets/images/icon/home-outline-filled.svg"
                                        alt=""
                                    /><span>Home </span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            isMatch('/profile/myFollowing') ? 'active' : ''
                                        }`} to={'/profile/myFollowing'}
                                    > <img
                                        className="me-2 h-20px fa-fw"
                                        src="https://social.webestica.com/assets/images/icon/star-outline-filled.svg"
                                        alt=""
                                    /><span>Following </span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            isMatch('/profile/myFollower') ? 'active' : ''
                                        }`} to={'/profile/myFollower'}
                                    > <img
                                        className="me-2 h-20px fa-fw"
                                        src="https://social.webestica.com/assets/images/icon/like-outline-filled.svg"
                                        alt=""
                                    /><span>Followers </span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            isMatch('/profile/createArticle') ? 'active' : ''
                                        }`} to="/profile/createArticle"
                                    >
                                        <img
                                            className="me-2 h-20px fa-fw"
                                            src="https://social.webestica.com/assets/images/icon/chat-alt-outline-filled.svg"
                                            alt=""
                                        /><span>Post blog </span></Link>
                                </li>
                                <li
                                    className="nav-item"
                                    data-bs-dismiss="offcanvas"
                                    role="presentation"
                                >
                                    <Link
                                        className={`nav-link d-flex mb-0 ${
                                            isMatch('/profile/accountSettings') ? 'active' : ''
                                        }`}
                                        to="/profile/accountSettings"
                                    > <img
                                        className="me-2 h-20px fa-fw"
                                        src="https://social.webestica.com/assets/images/icon/person-outline-filled.svg"
                                        alt=""
                                    /><span>Account </span></Link>
                                </li>
                            </ul>

                        </div>

                        <div className="card-footer text-center py-2">
                            {/*TODO */}
                            <a className="btn btn-link btn-sm" href="my-profile.html">Sign out</a>
                        </div>
                    </div>

                    <ul className="nav small mt-4 justify-content-center lh-1">
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="my-profile-about.html"
                            >About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="settings.html">Settings</a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                target="_blank"
                                href="https://support.webestica.com/login"
                            >Support </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                target="_blank"
                                href="docs/index.html"
                            >Docs </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="help.html">Help</a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="privacy-and-terms.html"
                            >Privacy &amp; terms</a>
                        </li>
                    </ul>

                    <p className="small text-center mt-1">©2023 <a
                        className="text-reset"
                        target="_blank"
                        href="https://www.webestica.com/"
                    > Webestica </a></p>
                </div>
            </div>
        </nav>
    </>
}
