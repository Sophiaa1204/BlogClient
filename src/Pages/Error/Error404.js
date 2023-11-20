import { Link } from 'react-router-dom'

export default () => {

    return <main className="py-5">

        <div className="container">
            <div className="h-100px d-none d-lg-block"></div>
            <div className="row align-items-center text-center py-sm-5">
                <div className="col-lg-8 mx-auto">
                    <figure className="m-0 pt-5 pt-md-0">
                        <img src={'./img_1.png'} />
                    </figure>
                    <h1 className="display-1 mt-4">404</h1>
                    <h2 className="mb-2 h1">Page Not Found!</h2>
                    <p>Either something went wrong or this page doesn't exist anymore.</p>
                    <Link className="btn btn-primary-soft btn-sm" to="/">Got to home page</Link>
                </div>
            </div>
            <div className="h-100px d-none d-lg-block"></div>
        </div>

    </main>
}
