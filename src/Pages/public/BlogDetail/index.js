import Article from './Article'
import Comments from './Comments'


export default () => {


    return <main>

        <div className="container">
            <div className="row g-4">

                <div className="col-lg-8 mx-auto">
                    <div className="vstack gap-4">
                        <Article />
                        <Comments />
                    </div>
                </div>

            </div>
        </div>

    </main>
}
