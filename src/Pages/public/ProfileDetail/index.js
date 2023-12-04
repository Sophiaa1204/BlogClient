import { useEffect, useState } from 'react'
import FollowerList from '../../../Components/FollowerList'
import ArticleList from '../../../Components/ArticleList'
import request from '../../../Utils/request'
import About from './About'
import Connects from './Connects'
import LikeList from '../../../Components/LikeList'
import UserInfo from './UserInfo'
import Tabs from './Tabs'
import { useParams } from 'react-router'


export default () => {
    const [tab, setTab] = useState(1)
    const { id } = useParams()
    const [userInfo, setUserInfo] = useState({})
    const [followerCount, setFollowerCount] = useState({
        totalFollower: 0,
        totalFollowing: 0,
        totalConnection: 0,
    })
    const [loaded, setLoaded] = useState({
        article: false,
        like: false,
    })

    useEffect(() => {
        id && getUserInfo()
        id && getUserFollower()
    }, [id])
    const getUserInfo = async() => {
        const resp = await request.get(`/v1/user/${id}`)
        setUserInfo(resp.data)
    }
    const getUserFollower = async() => {
        const resp = await request.get(`/v1/follower/user/count`, {
            params: {
                userId: id,
            },
        })
        setFollowerCount(resp.data)

    }
    const handleTabChange = (tab) => {
        setTab(tab)
    }
    return <main>
        <div className={'container'}>
            <div className={'row g-4'}>
                <div className="col-lg-8 vstack gap-4">

                    <div className="card">

                        <div
                            className="h-200px rounded-top"
                            style={{
                                backgroundImage: 'url(https://social.webestica.com/assets/images/bg/05.jpg)',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                        ></div>
                        <UserInfo user={userInfo} followerCount={followerCount} />
                        <Tabs tab={tab} onTabChange={handleTabChange} followerCount={followerCount} />
                    </div>
                    {
                        tab === 1 && <BlogContent id={id} loaded={loaded} setLoaded={setLoaded} userInfo={userInfo} />
                    }
                    {
                        tab === 2 && <FollowerList userId={userInfo.id} type={'following'} disabled />
                    }
                    {
                        tab === 3 && <FollowerList userId={userInfo.id} type={'follower'} disabled />
                    }

                    {
                        tab === 4 && <FollowerList userId={userInfo.id} type={'connection'} disabled />
                    }
                </div>
                <div className="col-lg-4">

                    <div className="row g-4">
                        <About user={userInfo} />
                        <Connects userId={userInfo.id} onSeeAll={() => handleTabChange(4)} />
                    </div>
                </div>

            </div>

        </div>
    </main>
}


const BlogContent = ({ id, userInfo, loaded, setLoaded }) => {

    return <>
        {
            (!loaded.article) && (!loaded.like) && <div className="col-lg-4 mx-auto">
                <figure className="m-0">
                    <img src={'./img.png'} />
                </figure>
                <h1 className="mb-2 display-5 mt-5 text-center">No data</h1>
            </div>
        }
        <ArticleList
            userId={id}
            onLoaded={(data) => setLoaded(prev => ({ ...prev, article: !!data.length }))}
        />
        <LikeList
            user={userInfo}
            onLoaded={(data) => setLoaded(prev => ({ ...prev, like: !!data.length }))}
        /></>
}
