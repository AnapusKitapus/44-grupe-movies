import { Link } from 'react-router-dom';
import style from './Auth.module.css';

export function Login() {
    return (
        <div className={`form-signin w-100 m-auto ${style.formSignIn}`}>
            <form>
                <h1 className="h1 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" />
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" />
                    <label htmlFor="password">Password</label>
                </div>
                
                <div className="form-check text-start my-3">
                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Remember me
                    </label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                <p className="my-3 text-center text-body-secondary">or</p>
                <Link to='/register' className="btn btn-outline-primary w-100 py-2">Sign up</Link>
            </form>
        </div>
    );
}