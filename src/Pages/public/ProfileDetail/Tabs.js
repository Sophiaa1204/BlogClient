export default function Tabs({ followerCount, tab, onTabChange }) {
    return <div className="card-footer mt-3 pt-2 pb-0">

        <ul className="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
            <li className="nav-item">
                <button
                    onClick={() => onTabChange(1)}
                    className={`nav-link ${tab === 1 ? 'active' : ''}`}
                > Blogs
                </button>
            </li>
            <li className="nav-item">
                <button
                    onClick={() => onTabChange(2)}
                    className={`nav-link ${tab === 2 ? 'active' : ''}`}
                > Following <span className="badge bg-success bg-opacity-10 text-success small"> {
                    followerCount.totalFollowing
                }</span>
                </button>
            </li>
            <li className="nav-item">
                <button
                    onClick={() => onTabChange(3)}
                    className={`nav-link ${tab === 3 ? 'active' : ''}`}
                > Followers <span className="badge bg-success bg-opacity-10 text-success small"> {
                    followerCount.totalFollower
                }</span>
                </button>
            </li>

            <li className="nav-item">
                <button
                    onClick={() => onTabChange(4)}
                    className={`nav-link ${tab === 4 ? 'active' : ''}`}
                > Connections <span className="badge bg-success bg-opacity-10 text-success small"> {
                    followerCount.totalConnection
                }</span>
                </button>
            </li>
        </ul>
    </div>
}
