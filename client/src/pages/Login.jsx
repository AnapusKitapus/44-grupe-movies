import { Link } from 'react-router-dom';
import style from './Auth.module.css';
import { useState } from 'react'; 

export function Login() {
    const [formErr, setFormErr] = useState('');
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [pass, setPass] = useState('');
    const [passErr, setPassErr] = useState('');
    const [passValid, setPassValid] = useState(false);

    function isValidEmail(e) {
        const { value } = e.target;
        const minSize = 6;

        if (value.length < minSize) {
            setEmailErr(`Email per trumpas. Minimum ${minSize} simboliu.`);
            setEmailValid(false);
        } else {
            setEmailErr(false);
            setEmailValid(true);
        }
    }

    function isValidPass(e) {
        const { value } = e.target;
        const minSize = 6;

        if (value.length < minSize) {
            setPassErr(`Email per trumpas. Minimum ${minSize} simboliu.`);
            setPassValid(false);
        } else {
            setPassErr(false);
            setPassValid(true);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (emailValid && passValid) {
            fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password: pass,
                }),
            }).then(res => res.json())
                .then(data => {
                    if (data.status === 'err') {
                        setFormErr(data.msg);
                    }
                })
            .catch(err => console.error(err));
        }
    }

    return (
        <div className={`form-signin w-100 m-auto ${style.formSignIn}`}>
            <form onSubmit={handleSubmit}>
                <h1 className="h1 mb-3 fw-normal">Please sign in</h1>

                {
                    formErr && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            {formErr}
                            <button onClick={() => setFormErr('')} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    )
                }

                <div className="form-floating mb-3">
                    <input onChange={e => setEmail(e.target.value)} onBlur={isValidEmail}
                       type="email" id="email" value={email}
                       className={`form-control ${emailErr ? 'is-invalid' : ''} ${emailValid ? 'is-valid' : ''}`} />
                    <label htmlFor="email">Email address</label>
                    <div className="invalid-feedback">{emailErr}</div>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={e => setPass(e.target.value)} onBlur={isValidPass}
                        type="password" id="password" value={pass}
                        className={`form-control ${passErr ? 'is-invalid' : ''} ${passValid ? 'is-valid' : ''}`} />
                    <label htmlFor="password">Password</label>
                    <div className="invalid-feedback">{passErr}</div>
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