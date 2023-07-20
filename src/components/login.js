import { useState, useEffect } from "react";

import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        sessionStorage.clear();
    }, []);


    useEffect(() => {

        fetch(" http://localhost:9999/users").then((res) => res.json())
            .then((data) => {
                setUsers(data)
            }).catch(err => {
                console.log(err.message)
            })
    }, [])

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {

            let temp = [...users];
            let currentUser = temp.filter(user => user.email === email)
            
            if (currentUser.length == 0 || currentUser === undefined) {
                toast.error('Email does not exist! ')
                setPassWord('')
            } else {
                fetch("http://localhost:9999/users/" + currentUser[0].id).then((res) => {

                    return res.json();
                }).then((resp) => {

                    if (Object.keys(resp).length === 0) {
                        toast.error('Please Enter valid email');
                    } else {
                        if (resp.passWord === passWord) {
                            toast.success('Success');
                            sessionStorage.setItem('email', email);
                            sessionStorage.setItem('userrole', resp.rId);
                            sessionStorage.setItem('uName',resp.uName);
                            sessionStorage.setItem('uid',resp.id)

                            navigate('/')
                            window.location.reload();
                        } else {
                            setPassWord('')
                            toast.error('Please Enter valid credentials');
                        }
                    }
                }).catch((err) => {
                    toast.error('Login Failed due to :' + err.message);
                });
            }
        }
        
    }

    
    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            toast.warning('Please Enter email');
        }
        if (passWord === '' || passWord === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }




    return (
        <div className="background_login d-flex justify-content-center align-items-center " >
            <ToastContainer />

           
            <form style={{ backgroundColor: 'white', marginTop: '70px', padding: '120px', borderRadius: '20px' }} onSubmit={ProceedLogin }>
                <h1 style={{ textAlign: 'center', paddingBottom: '30px', textTransform: 'uppercase' , fontSize: '60px', cursor:'default'}}>
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
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4" >Sign in</button>


                <div className="text-center">
                    <p>Not a member? <a href="/Sign_up">Register</a></p>
                    <a href="#!">Forgot password?</a>
                </div>
            </form>

        </div>
    );
}

export default Login;