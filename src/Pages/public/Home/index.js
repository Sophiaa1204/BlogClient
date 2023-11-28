import WhoToFollow from '../../../Components/WhoToFollow'
import TagList from './TagList'
import RecommendList from '../../../Components/RecommendList'
import ArticleList from './ArticleList'


export default () => {
    return <main>
        <div className="container">
            <div className="row g-4">

                <div className="col-lg-8">
                    <div className="bg-mode p-4">
                        <h1 className="h4 mb-4">Latest blogs</h1>
                        <ArticleList />
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="row g-4">

                        <div className="col-sm-6 col-lg-12">
                            <RecommendList />
                        </div>

                        <div className="col-sm-6 col-lg-12">
                            <TagList />

                        </div>

                        <div className="col-sm-6 col-lg-12">
                            <WhoToFollow />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </main>
}
