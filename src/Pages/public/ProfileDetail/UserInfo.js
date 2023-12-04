import dayjs from 'dayjs'
import { defaultAvatarUrl } from '../../../Store/UserInfoSlice'

export default function UserInfo({ user, followerCount }) {
    return <div className="card-body py-0">
        <div className="d-sm-flex align-items-start text-center text-sm-start">
            <div>

                <div className="avatar avatar-xxl mt-n5 mb-3">
                    <img
                        className="avatar-img rounded-circle border border-white border-3"
                        src={
                            user.avatarUrl ? `http://localhost:8000${user.avatarUrl}` : defaultAvatarUrl
                        }
                        alt=""
                    />
                </div>
            </div>
            <div className="ms-sm-4 mt-sm-3">

                <h1 className="mb-0 h5">{user.email}<i className="bi bi-patch-check-fill text-success small mx-2"></i>
                </h1>
                <p>250 connections</p>
            </div>

            <div className="d-flex mt-3 justify-content-center ms-sm-auto">
                <button className="btn btn-danger-soft me-2" type="button"><i
                    className="bi bi-pencil-fill pe-1"
                ></i> Edit profile
                </button>
                <div className="dropdown">

                    <button
                        className="icon-md btn btn-light"
                        type="button"
                        id="profileAction2"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <i className="bi bi-three-dots"></i>
                    </button>

                    <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="profileAction2"
                    >
                        <li><a className="dropdown-item" href="#">
                            <i className="bi bi-bookmark fa-fw pe-2"></i>Share
                            profile in a message</a></li>
                        <li><a className="dropdown-item" href="#">
                            <i className="bi bi-file-earmark-pdf fa-fw pe-2"></i>Save
                            your profile to PDF</a></li>
                        <li><a className="dropdown-item" href="#">
                            <i className="bi bi-lock fa-fw pe-2"></i>Lock
                            profile</a></li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><a className="dropdown-item" href="#">
                            <i className="bi bi-gear fa-fw pe-2"></i>Profile
                            settings</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <ul className="list-inline mb-0 text-center text-sm-start mt-3 mt-sm-0">
            <li className="list-inline-item">
                <i className="bi bi-person-check me-1"></i>
                {followerCount.totalFollowing} Following
            </li>
            <li className="list-inline-item">
                <i className="bi bi-person-hearts me-1"></i>
                {followerCount.totalFollower} Followers
            </li>
            <li className="list-inline-item">
                <i className="bi bi-calendar2-plus me-1"></i> Joined
                on {dayjs(user.createdAt).format('MMM DD, YYYY')}
            </li>

        </ul>
    </div>
}
