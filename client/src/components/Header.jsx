import { Link } from "react-router-dom";

export function Header () {
    const userLoggedIn = false;

    const publicMenu = (
        <div className="col-md-3 text-end">
            <Link to='/login' className="btn btn-outline-primary me-2">Login</Link>
            <Link to='register' className="btn btn-primary">Sign-up</Link>
        </div>
    );

    const userMenu = (
      <div class="col-md-3 text-end">
          <Link to="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
          </Link>
          <ul className="dropdown-menu text-small">
              <li><Link className="dropdown-item" to="/">New project...</Link></li>
              <li><Link className="dropdown-item" to="/">Settings</Link></li>
              <li><Link className="dropdown-item" to="/">Profile</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><Link className="dropdown-item" to="/">Sign out</Link></li>
          </ul>
      </div>
    );
 
    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <div className="col-md-3 mb-2 mb-md-0">
                    <Link to="/" class="d-inline-flex link-body-emphasis text-decoration-none">
                        {/* <svg class="bi" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg> */}
                        LOGO SVG
                    </Link>
                </div>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><Link to="/" class="nav-link px-2 link-secondary">Home</Link></li>
                    <li><Link to="/" class="nav-link px-2">Features</Link></li>
                    <li><Link to="/" class="nav-link px-2">Pricing</Link></li>
                    <li><Link to="/" class="nav-link px-2">FAQs</Link></li>
                    <li><Link to="/" class="nav-link px-2">About</Link></li>
                </ul>

                {userLoggedIn ? userMenu : publicMenu}
            </header>
        </div>
    );
}