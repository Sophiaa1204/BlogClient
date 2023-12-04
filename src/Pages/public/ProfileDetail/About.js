export default function About({ user }) {
    return <div className="col-md-6 col-lg-12">
        <div className="card">
            <div className="card-header border-0 pb-0">
                <h5 className="card-title">About</h5>

            </div>

            <div className="card-body position-relative pt-0">
                <p>{
                    user.description
                }</p>

                <ul className="list-unstyled mt-3 mb-0">
                    <li className="mb-2">
                        <i className="bi bi-calendar-date fa-fw pe-1"></i> Gender: <strong> {
                        user.gender
                    } </strong></li>

                    <li>
                        <i className="bi bi-envelope fa-fw pe-1"></i> Email: <strong> {user.email} </strong>
                    </li>
                </ul>
            </div>

        </div>
    </div>
}
