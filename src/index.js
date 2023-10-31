import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Error404 from './Pages/Error/Error404'
import MyFollower from './Pages/public/Profile/MyFollower'
import MyFollowing from './Pages/public/Profile/MyFollowing'
import ProfileLayout from './Layouts/ProfileLayout'
import { initToken } from './Store/UserInfoSlice'
import Store from './Store'
import AccountSettings from './Pages/public/Profile/AccountSettings'
import BlogDetail from './Pages/public/BlogDetail'
import Profile from './Pages/public/ProfileDetail'
import Register from './Pages/auth/Register'
import AuthLayout from './Layouts/AuthLayout'
import Login from './Pages/auth/Login'
import Home from './Pages/public/Home'
import Category from './Pages/public/Category'
import MyProfile from './Pages/public/Profile/MyProfile'
import CreateArticle from './Pages/public/Profile/CreateArticle'


import PublicLayout from './Layouts/PublicLayout'
import reportWebVitals from './reportWebVitals'
import { Provider, useDispatch } from 'react-redux'

const router = createHashRouter([
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'category/:id?',
                element: <Category />,
            },
            {
                path: 'blogDetail/:id',
                element: <BlogDetail />,
            },
            {
                path: 'profile',
                element: <ProfileLayout />,
                children: [
                    {
                        path: 'myProfile',
                        element: <MyProfile />,
                    },
                    {
                        path: 'myFollowing',
                        element: <MyFollowing />,
                    },
                    {
                        path: 'myFollower',
                        element: <MyFollower />,
                    },
                    {
                        path: 'createArticle',
                        element: <CreateArticle />,
                    },
                    {
                        path: 'accountSettings',
                        element: <AccountSettings />,
                    },
                ],
            },
            {
                path: 'profile/:id',
                element: <Profile />,
            },

        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login></Login>,
            },
            {
                path: 'register',
                element: <Register />,
            },
        ],
    },
    {
        path: '*',
        element: <Error404 />,
    },
])
const root = ReactDOM.createRoot(document.getElementById('root'))
const InitStorage = ({ children }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initToken())
    }, [])
    return children
}
root.render(
    <Provider store={Store}>
        <InitStorage>
            <RouterProvider router={router} />
        </InitStorage>
    </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
