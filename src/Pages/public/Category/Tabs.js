export default function Tabs({ data, value, onChange }) {
    return <div className="row g-4">
        <div className="col-12">

            <ul
                className="nav nav-tabs nav-tabs-white justify-content-center border-0"
                role="tablist"
            >
                {
                    data.map(item => <li
                        key={item.id}
                        className={`nav-item`}
                        style={{ cursor: 'pointer' }}
                        role="presentation"
                        onClick={() => onChange(item.id)}
                    ><span
                        className={`nav-link ${item.id === value ? 'active' : ''}`}
                        data-bs-toggle="tab"
                        aria-selected="true"
                        role="tab"
                    >{item.name}</span>
                    </li>)
                }
            </ul>

        </div>
    </div>
}
