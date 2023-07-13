import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');

    const usenavigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);


    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            ///implentation
            // console.log('proceed');
            fetch("http://localhost:9999/user/" + email).then((res) => {
                return res.json();
            }).then((resp) => {
                //console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error('Please Enter valid email');
                } else {
                    if (resp.passWord === passWord) {
                        toast.success('Success');
                        sessionStorage.setItem('Email', email);
                        sessionStorage.setItem('userrole', resp.role);
                        usenavigate('/')
                    } else {
                        toast.error('Please Enter valid credentials');
                    }
                }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }



    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            ///implentation
            // console.log('proceed');
            let inputobj = {
                "email": email,
                "password": passWord
            };
            fetch("http://localhost:9999/users", {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error('Login failed, invalid credentials');
                } else {
                    toast.success('Success');
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('jwttoken', resp.jwtToken);
                    usenavigate('/')
                }
               
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }
    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (passWord === '' || passWord === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }



    return (
        <div className="background_login d-flex justify-content-center align-items-center " >
            <form style={{ backgroundColor: 'white', marginTop: '100px', padding: '80px', borderRadius: '20px' }} onSubmit={ProceedLogin}>
                <h1 style={{ textAlign: 'center', paddingBottom: '30px', textTransform: 'uppercase' }}>
                    Login
                </h1>
                <div className="form-outline mb-4">
                    <label className="form-label" for="form2Example1">Email address</label>
                    <input type="email" id="form2Example1" class="form-control"
                        value={email} onChange={e => setEmail(e.target.value)} />

                </div>


                <div className="form-outline mb-4">
                    <label class="form-label" for="form2Example2" >Password</label>
                    <input type="password" id="form2Example2" class="form-control"  
                    value={passWord} onChange={e => setPassWord(e.target.value)} />

                </div>


                <div className="row mb-4">
                    <div class="col d-flex justify-content-center">

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                            <label class="form-check-label" for="form2Example31"> Remember me </label>
                        </div>
                    </div>

                    <div className="col">
                        <a href="#!">Forgot password?</a>
                    </div>
                </div>

                <button type="button" className="btn btn-primary btn-block mb-4">Sign in</button>


                <div className="text-center">
                    <p>Not a member? <a href="/Sign_up">Register</a></p>

                </div>
            </form>

        </div>
    );
}

export default Login;