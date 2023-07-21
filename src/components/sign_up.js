import { useEffect } from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const Sign_up = () => {
    const navigate = useNavigate();

    const [id, setId] = useState(0);
    const [uName, setUName] = useState('');
    const [uNameError, setUNameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passWord, setPassWord] = useState('');
    const [passWordError, setPassWordError] = useState('');
    const [rId, setRId] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isAddAble, setIsAddAble] = useState(false);
    
    

    useEffect(() => {
        if (uNameError != "" || emailError != "" || passWordError != "" || confirmPasswordError != "" ) {
            setIsAddAble(false)
            return;

        } else {
            setIsAddAble(true)
            return;

        }
    }, [uNameError, emailError, passWordError, confirmPasswordError]);

    useEffect(() => {
        uName.length === 0 ? setUNameError("Username is invalid") : setUNameError("");
    }, [uName]);

    useEffect(() => {
        email.length === 0 ? setEmailError("Email is invalid") : setEmailError("");
    }, [email]);

    useEffect(() => {
        passWord.length < 8 ? setPassWordError("Password is invalid") : setPassWordError("");
    }, [passWord]);

    useEffect(() => {
        passWord != confirmPassword ? setConfirmPasswordError("Password confimation is invalid") : setConfirmPasswordError("");
    }, [passWord, confirmPassword]);

    const handleSubmit = e => {
        e.preventDefault();
        const users = { id, uName, email, passWord, rId }
        console.log(users);
        if (uName.length < 0 || passWord.length < 8) {
            alert("Please fill all fields.")
        }
        else {
            fetch('http://localhost:9999/users', {
                method: 'POST',
                headers: { 'Content-Type': 'Application/Json', 'Charset': "UTF8" },
                body: JSON.stringify(users)
            }).then(() => {
                alert("Add successful");
                navigate('/login');
            })
                .catch(err => {
                    console.log(err.message);
                })
        }   
    }



    return (

        <div className="background_login mb-5 " >
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ borderRadius: '15px' }}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                                    <form onSubmit={e => handleSubmit(e)}  >
                                        <div className="from-btn-outline mb-4">
                                            <Form.Group className='d-none' >
                                                <label>Id</label>
                                                <Form.Control value={id} disabled />
                                            </Form.Group>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" for="form3Example1cg">Your Name</label>
                                            <input type="text" id="form3Example1cg" className="form-control form-control-lg" value={uName} onChange={e => {
                                                setUName(e.target.value);
                                            }}/>
                                            
                                            <label style={{ color: 'red' }}>{uNameError}</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" for="form3Example3cg">Your Email</label>
                                            <input type="email" id="form3Example3cg" className="form-control form-control-lg" value={email} onChange={e => setEmail(e.target.value)} />
                                            <label style={{ color: 'red' }}>{emailError}</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" for="form3Example4cg">Password</label>
                                            <input type="password" id="form3Example4cg " className="form-control form-control-lg" value={passWord} onChange={e => setPassWord(e.target.value)} />
                                            <label style={{ color: 'red' }}>{passWordError}</label>

                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" id="confirmPassword" for="form3Example4cdg">Repeat your password</label>
                                            <input type="password" id="form3Example4cg " className="form-control form-control-lg" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                                            <label style={{ color: 'red' }}>{confirmPasswordError}</label>
                                        </div>

                                        


                                        <div className="d-flex justify-content-center">
                                            {isAddAble == false ? <Button type="submit" className="btn btn-success" disabled >ADD</Button> : <Button type="submit" className="btn btn-success" >ADD</Button>}
                                        </div>

                                        <p className="text-center text-muted mt-5 mb-0">Have already an account?
                                            <a href="./Login"
                                                className="fw-bold text-body"><u>Login here</u></a></p>
                                        <div className="from-btn-outline mb-4">
                                            <Form.Group className='d-none' >
                                                <label>rId</label>
                                                <Form.Control value={rId} disabled />
                                            </Form.Group>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sign_up;