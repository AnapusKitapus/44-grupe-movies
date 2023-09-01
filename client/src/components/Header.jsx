import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export function Header() {
    const ctx = useContext(UserContext);
    const userLoggedIn = ctx.user.loggedIn;
    const [menuVisibility, setMenuVisibility] = useState(false);

    const publicMenu = (
        <div className="col-md-3 text-end">
            <Link to='/login' className="btn btn-outline-primary me-2">Login</Link>
            <Link to='register' className="btn btn-primary">Sign-up</Link>
        </div>
    );

    const userMenu = (
        <div className="col-md-3 dropdown text-end">
            <div onClick={() => setMenuVisibility(!menuVisibility)} className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
            </div>
            <ul className={`dropdown-menu text-small ${menuVisibility ? 'show' : ''}`}
                style= {{
                  position: 'absolute',
                  inset: '0px 0px auto auto',
                  margin: '0px',
                  transform: 'translate3d(0px, 34.4px, 0px)',
                }}>
                <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                <li><Link className="dropdown-item" to="/movies">Movies</Link></li>
                <li><Link className="dropdown-item" to="/movies/add">New movie</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/logout">Sign out</Link></li>
            </ul>
        </div>
    );
 
    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <div className="col-md-3 mb-2 mb-md-0">
                    <Link to="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                        {/* <svg className="bi" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg> */}
                        LOGO SVG
                    </Link>
                </div>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><Link to="/" className="nav-link px-2 link-secondary">Home</Link></li>
                    <li><Link to="/" className="nav-link px-2">Features</Link></li>
                    <li><Link to="/" className="nav-link px-2">Pricing</Link></li>
                    <li><Link to="/" className="nav-link px-2">FAQs</Link></li>
                    <li><Link to="/" className="nav-link px-2">About</Link></li>
                </ul>

                {userLoggedIn ? userMenu : publicMenu}
            </header>
        </div>
    );
}