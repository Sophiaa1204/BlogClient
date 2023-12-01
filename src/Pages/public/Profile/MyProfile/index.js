import { useState } from 'react'
import { useSelector } from 'react-redux'
import WhoToFollow from '../../../../Components/WhoToFollow'
import ArticleList from '../../../../Components/ArticleList'
import LikeList from '../../../../Components/LikeList'

import RecommendList from '../../../../Components/RecommendList'

export default () => {
    const userInfo = useSelector(state => state.userInfo.info)
    const [loaded, setLoaded] = useState({
        article: false,
        like: false,
    })
    return <>
        <div className="col-md-8 col-lg-6 vstack gap-4">
            {/*<ArticleSummary />*/}
            {
                (!loaded.article) && (!loaded.like) && <div className="col-lg-4 mx-auto">
                    <figure className="m-0">
                        <img src={'./img.png'} />
                    </figure>
                    <h1 className="mb-2 display-5 mt-5 text-center">No data</h1>
                </div>
            }
            <ArticleList
                userId={userInfo.id}
                onLoaded={(data) => setLoaded(prev => ({ ...prev, article: !!data.length }))}
            />
            <LikeList user={userInfo} onLoaded={(data) => setLoaded(prev => ({ ...prev, like: !!data.length }))} />
        </div>
        <div className="col-lg-3">
            <div className="row g-4">

                <div className="col-sm-6 col-lg-12">
                    <WhoToFollow />
                </div>

                <div className="col-sm-6 col-lg-12">
                    <RecommendList />
                </div>

            </div>
        </div>
    </>
}
