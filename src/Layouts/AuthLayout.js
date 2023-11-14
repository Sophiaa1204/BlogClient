import { Outlet } from 'react-router'

export default () => {

  return <div>

    <Outlet></Outlet>
    <footer className="pt-5 pb-2 pb-sm-4 position-relative bg-mode">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-10 col-md-8 col-lg-6">
            <div className="d-grid d-sm-flex justify-content-center justify-content-sm-between align-items-center mt-3">
              <ul className="nav">
                <li className="nav-item"><a className="nav-link fw-bold ps-0 pe-2" href="#">Terms</a></li>
                <li className="nav-item"><a className="nav-link fw-bold px-2" href="#">Privacy</a></li>
                <li className="nav-item"><a className="nav-link fw-bold px-2" href="#">Cookies</a></li>
              </ul>
              <ul className="nav justify-content-center justify-content-sm-end">
                <li className="nav-item">
                  <a className="nav-link px-2 fs-5" href="#"><i className="fa-brands fa-facebook-square"></i></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-2 fs-5" href="#"><i className="fa-brands fa-twitter-square"></i></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-2 fs-5" href="#"><i className="fa-brands fa-linkedin"></i></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-2 fs-5" href="#"><i className="fa-brands fa-youtube-square"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
}
