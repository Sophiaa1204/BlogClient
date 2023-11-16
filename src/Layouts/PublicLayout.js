import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import { removeToken } from '../Store/UserInfoSlice'

function UserMenu() {
    const userInfo = useSelector(state => state.userInfo.info)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSignOut = () => {
        dispatch(removeToken())
        navigate('/')
    }
    return <li className="nav-item ms-2 dropdown">
        <a
            className="nav-link btn icon-md p-0"
            href="#"
            id="profileDropdown"
            role="button"
            data-bs-auto-close="outside"
            data-bs-display="static"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            <img
                className="avatar-img rounded-2"
                src={userInfo.avatarUrl}
                alt=""
            />
        </a>
        <ul
            className="dropdown-menu dropdown-animation dropdown-menu-end pt-3 small me-md-n3"
            aria-labelledby="profileDropdown"
        >

            <li className="px-3">
                <div className="d-flex align-items-center position-relative">

                    <div className="avatar me-3">
                        <img
                            className="avatar-img rounded-circle"
                            src={userInfo.avatarUrl}
                            alt="avatar"
                        />
                    </div>
                    <div>
                        <Link className="h6 stretched-link" to="/profile/myProfile">{
                            userInfo.email
                        }</Link>
                        {/*TODO*/}
                        <p className="small m-0">Web Developer</p>
                    </div>
                </div>
                <Link
                    className="dropdown-item btn btn-primary-soft btn-sm my-2 text-center"
                    to="/profile/myProfile"
                >View profile</Link>
            </li>

            <li><Link className="dropdown-item" to="/profile/accountSettings"><i
                className="bi bi-gear fa-fw me-2"
            ></i>Settings &amp; Privacy</Link></li>
            <li className="dropdown-divider"></li>
            <li>
                <button
                    onClick={() => handleSignOut()}
                    className="dropdown-item bg-danger-soft-hover"
                >
                    <i className="bi bi-power fa-fw me-2"></i>Sign Out
                </button>
            </li>
        </ul>
    </li>
}

export default () => {
    const userInfo = useSelector(state => state.userInfo.info)
    return <div>
        <header className="navbar-light fixed-top header-static bg-mode">

            <nav className="navbar navbar-expand-lg">
                <div className="container">

                    <a className="navbar-brand" href="index.html">
                        <img
                            className="light-mode-item navbar-brand-item"
                            src="https://social.webestica.com/assets/images/logo.svg"
                            alt="logo"
                        />
                        <img
                            className="dark-mode-item navbar-brand-item"
                            src="https://social.webestica.com/assets/images/logo.svg"
                            alt="logo"
                        />
                    </a>

                    <button
                        className="navbar-toggler ms-auto icon-md btn btn-light p-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
        <span className="navbar-toggler-animation">
          <span></span>
          <span></span>
          <span></span>
        </span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarCollapse">

                        <div className="nav mt-3 mt-lg-0 flex-nowrap align-items-center px-4 px-lg-0">
                            <div className="nav-item w-100">
                                <form className="rounded position-relative">
                                    <input
                                        className="form-control ps-5 bg-light"
                                        type="search"
                                        placeholder="Search..."
                                        aria-label="Search"
                                    />
                                    <button
                                        className="btn bg-transparent px-2 py-0 position-absolute top-50 start-0 translate-middle-y"
                                        type="submit"
                                    ><i className="bi bi-search fs-5"> </i></button>
                                </form>
                            </div>
                        </div>

                        <ul className="navbar-nav navbar-nav-scroll ms-auto">

                            {/*            <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="homeMenu"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >Demo</a>
                <ul className="dropdown-menu" aria-labelledby="homeMenu">
                  <li><a className="dropdown-item" href="index.html">Home
                    default</a></li>
                  <li><a className="dropdown-item" href="index-classic.html">Home
                    classic</a></li>
                  <li><a className="dropdown-item" href="index-post.html">Home
                    post</a></li>
                  <li><a className="dropdown-item" href="index-video.html">Home
                    video</a></li>
                  <li><a className="dropdown-item" href="index-event.html">Home
                    event</a></li>
                  <li><a className="dropdown-item" href="landing.html">Landing
                    page</a></li>
                  <li><a className="dropdown-item" href="app-download.html">App
                    download</a></li>
                  <li className="dropdown-divider"></li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="https://themes.getbootstrap.com/store/webestica/"
                      target="_blank"
                    >
                      <i className="text-success fa-fw bi bi-cloud-download-fill me-2"></i>Buy
                      Social!
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="pagesMenu"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >Pages</a>
                <ul className="dropdown-menu" aria-labelledby="pagesMenu">
                  <li><a className="dropdown-item" href="albums.html">Albums</a>
                  </li>
                  <li><a
                    className="dropdown-item"
                    href="celebration.html"
                  >Celebration</a></li>
                  <li><a
                    className="dropdown-item"
                    href="messaging.html"
                  >Messaging</a></li>

                  <li className="dropdown-submenu dropend">
                    <a
                      className="dropdown-item dropdown-toggle"
                      href="#!"
                    >Profile</a>
                    <ul className="dropdown-menu" data-bs-popper="none">
                      <li><a
                        className="dropdown-item"
                        href="my-profile.html"
                      >Feed</a></li>
                      <li><a
                        className="dropdown-item"
                        href="my-profile-about.html"
                      >About</a></li>
                      <li><a
                        className="dropdown-item"
                        href="my-profile-connections.html"
                      >Connections</a></li>
                      <li><a
                        className="dropdown-item"
                        href="my-profile-media.html"
                      >Media</a></li>
                      <li><a
                        className="dropdown-item"
                        href="my-profile-videos.html"
                      >Videos</a></li>
                      <li><a
                        className="dropdown-item"
                        href="my-profile-events.html"
                      >Events</a></li>
                      <li><a
                        className="dropdown-item"
                        href="my-profile-activity.html"
                      >Activity</a></li>
                    </ul>
                  </li>
                  <li><a className="dropdown-item" href="events.html">Events</a>
                  </li>
                  <li><a className="dropdown-item" href="events-2.html">Events
                    2</a></li>
                  <li><a className="dropdown-item" href="event-details.html">Event
                    details</a></li>
                  <li><a className="dropdown-item" href="event-details-2.html">Event
                    details 2</a></li>
                  <li><a className="dropdown-item" href="groups.html">Groups</a>
                  </li>
                  <li><a className="dropdown-item" href="group-details.html">Group
                    details</a></li>
                  <li><a className="dropdown-item" href="post-videos.html">Post
                    videos</a></li>
                  <li><a
                    className="dropdown-item"
                    href="post-video-details.html"
                  >Post video details</a></li>
                  <li><a className="dropdown-item" href="post-details.html">Post
                    details</a></li>
                  <li><a className="dropdown-item" href="video-details.html">Video
                    details</a></li>
                  <li><a className="dropdown-item" href="blog.html">Blog</a>
                  </li>
                  <li><a className="dropdown-item" href="blog-details.html">Blog
                    details</a></li>

                  <li className="dropdown-divider"></li>
                  <li className="dropdown-submenu dropend">
                    <a className="dropdown-item dropdown-toggle" href="#">Dropdown
                      levels</a>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      data-bs-popper="none"
                    >
                      <li><a className="dropdown-item" href="#">Dropdown
                        item</a></li>
                      <li><a className="dropdown-item" href="#">Dropdown
                        item</a></li>

                      <li className="dropdown-submenu dropstart">
                        <a className="dropdown-item dropdown-toggle" href="#">Dropdown
                          (start)</a>
                        <ul
                          className="dropdown-menu dropdown-menu-end"
                          data-bs-popper="none"
                        >
                          <li><a className="dropdown-item" href="#">Dropdown
                            item</a></li>
                          <li><a className="dropdown-item" href="#">Dropdown
                            item</a></li>
                        </ul>
                      </li>
                      <li><a className="dropdown-item" href="#">Dropdown
                        item</a></li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="postMenu"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >Account </a>
                <ul className="dropdown-menu" aria-labelledby="postMenu">
                  <li><a className="dropdown-item" href="create-page.html">Create
                    a page</a></li>
                  <li><a
                    className="dropdown-item"
                    href="settings.html"
                  >Settings</a></li>
                  <li><a
                    className="dropdown-item"
                    href="notifications.html"
                  >Notifications</a></li>
                  <li><a className="dropdown-item" href="help.html">Help
                    center</a></li>
                  <li><a className="dropdown-item" href="help-details.html">Help
                    details</a></li>

                  <li className="dropdown-submenu dropstart">
                    <a
                      className="dropdown-item dropdown-toggle"
                      href="#"
                    >Authentication</a>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      data-bs-popper="none"
                    >
                      <li><a className="dropdown-item" href="sign-in.html">Sign
                        in</a></li>
                      <li><a className="dropdown-item" href="sign-up.html">Sing
                        up</a></li>
                      <li><a
                        className="dropdown-item"
                        href="forgot-password.html"
                      >Forgot password</a></li>
                      <li className="dropdown-divider"></li>
                      <li><a
                        className="dropdown-item"
                        href="sign-in-advance.html"
                      >Sign in advance</a></li>
                      <li><a
                        className="dropdown-item"
                        href="sign-up-advance.html"
                      >Sing up advance</a></li>
                      <li><a
                        className="dropdown-item"
                        href="forgot-password-advance.html"
                      >Forgot password advance</a></li>
                    </ul>
                  </li>
                  <li><a className="dropdown-item" href="error-404.html">Error
                    404</a></li>
                  <li><a
                    className="dropdown-item"
                    href="offline.html"
                  >Offline</a></li>
                  <li><a
                    className="dropdown-item"
                    href="privacy-and-terms.html"
                  >Privacy &amp; terms</a></li>
                </ul>
              </li>*/}

                            <li className="nav-item">
                                <Link className="nav-link" to={'/'}>Home</Link>
                            </li>
                            <li className={'nav-item'}>
                                <Link className="nav-link" to={'/category'}>Category</Link>
                            </li>
                            {
                                !userInfo.id && <li className="nav-item">
                                    <Link className={'nav-link'} to={'/auth/register'}>Sign
                                        up</Link>
                                </li>
                            }
                        </ul>
                    </div>
                    {userInfo.id ? <ul className="nav flex-nowrap align-items-center ms-sm-3 list-unstyled">
                        <li className="nav-item ms-2">
                            <Link to={'/profile/createArticle'} className="nav-link bg-light icon-md btn btn-light p-0">
                                <i className="bi bi-pencil-fill"></i>
                            </Link>
                        </li>
                    </ul> : null}

                    <ul className="nav flex-nowrap align-items-center ms-sm-3 list-unstyled">

                        {
                            userInfo.id ? <UserMenu /> : <li className="nav-item">
                                <Link className={'btn btn-primary'} to={'/auth/login'}>Sign
                                    in</Link>
                            </li>
                        }
                    </ul>

                </div>
            </nav>

        </header>
        <Outlet></Outlet>
        <footer className="bg-mode py-3 sticky-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <ul className="nav justify-content-center justify-content-md-start lh-1">
                            <li className="nav-item">
                                <a className="nav-link" href="my-profile-about.html">About</a>
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
                                <a
                                    className="nav-link"
                                    href="privacy-and-terms.html"
                                >Privacy &amp; terms</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <p className="text-center text-md-end mb-0">©2023 <a
                            className="text-body"
                            target="_blank"
                            href="https://www.webestica.com"
                        > Webestica </a>All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
}
