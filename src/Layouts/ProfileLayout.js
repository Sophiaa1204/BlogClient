import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'
import UserProfile from '../Components/UserProfile'

export default () => {
    if (localStorage.getItem('token') === null) {
        return <Navigate to="/error" replace={true} />
    }
    return <main>
        <div className="container">
            <div className="row g-4">
                <div className="col-lg-3">
                    <UserProfile />
                </div>
                <Outlet />
            </div>

        </div>
    </main>
}
