export default function Search({ value, onChange }) {
    return <div
        className="py-5"
        style={
            {
                backgroundImage: 'url(https://social.webestica.com/assets/images/bg/06.jpg)',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }
        }
    >
        <div className="container">
            <div className="row justify-content-center py-5">
                <div className="col-md-6 text-center">

                    <h1 className="text-white">Change your social presence.</h1>
                    <p className="mb-4 text-white">For who thoroughly her boy estimating
                        conviction.</p>

                    <form className="rounded position-relative">
                        <input
                            className="form-control form-control-lg ps-5"
                            type="search"
                            placeholder="Search..."
                            aria-label="Search"
                            value={value}
                            onChange={e => onChange(e.target.value)}
                        />
                        <button
                            className="btn bg-transparent px-2 py-0 position-absolute top-50 start-0 translate-middle-y"
                            type="submit"
                        ><i className="bi bi-search fs-5 ps-1"> </i></button>
                    </form>

                </div>
            </div>
        </div>
    </div>
}
