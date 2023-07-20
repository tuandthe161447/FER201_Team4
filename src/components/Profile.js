import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Profile = () => {

    let user

    // const { uid } = useParams();

    const [id, setId] = useState(1)
    const [uName, setuName] = useState('')
    const [passWord, setPassWord] = useState('')
    const [email, setEmail] = useState('')
    const [rId, setRid] = useState(true)
    const [passWordError, setPassWordError] = useState('');
    const [isEditAble, setIsEditAble] = useState(false);

    useEffect(() => {
        if (passWordError != "") {
            setIsEditAble(false)
            return;

        } else {
            setIsEditAble(true)
            return;

        }
    }, [passWordError]);

    useEffect(() => {
        passWord.length < 8 ? setPassWordError("Password is invalid") : setPassWordError("");
    }, [passWord]);

    const navigate = useNavigate();


    let uid = JSON.parse(sessionStorage.getItem('uid'))
    // if (sessionStorage.getItem('uName') != null) {
    //     user = JSON.stringify(sessionStorage.getItem('uName'))

    // }



    useEffect(() => {
        fetch(
            "http://localhost:9999/users/" + uid
        ).then((res) => res.json())
            .then((result) => {
                setId(result.id);
                setuName(result.uName);
                setEmail(result.email)
                setPassWord(result.passWord)
                setRid(result.rId)
            });
    }, [])




    const handleSubmit = (e) => {
        // toast.success("Success", { closeOnClick: true, theme: 'colored', pauseOnFocusLoss: 'false' })
        // window.location.href = "/"
        e.preventDefault();
        const userProfile = { id, uName, email, passWord, rId }
        if (uName.length === 0 || email.length === 0 || passWord.length === 0) {
            toast.warning("Fields cant be empty")
        } else if (passWord.length < 8) {
            toast.warning("Password must more than 8 characters")
        }
        else {
            fetch("http://localhost:9999/users/" + uid, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(userProfile),
            })
                .then(() => {
                    toast.success("Edit success", { closeOnClick: true, theme: 'colored', pauseOnFocusLoss: 'false' })
                    console.log(uid)
                    navigate("/")
                }).catch((err) => {
                    toast.error("Failed")
                })
        }
    }



    return (
        <Container>
            <ToastContainer autoClose={3000} />
            <Row>
                <Col xs={12}>
                    <Row className="mt-5">
                        <Col xs={5}>
                            <h2 className="text-center">Avatar</h2>
                            <div className="d-flex justify-content-center">
                                <img src='https://i.pinimg.com/originals/ae/ff/d6/aeffd6d2e76161d3d7b89cffca8662c1.jpg' alt="#" style={{ height: '250px', width: '250px', borderRadius: '100%', marginTop: '20px' }} />
                            </div>

                        </Col>
                        <Col xs={7}>
                            <h2 className="text-center">Infomation</h2>
                            <Col xs={12}>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col>
                                            <label>Username</label><br />
                                            <input type="text" className="form-control" value={uName} onChange={(e) => setuName(e.target.value)} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label>Email</label><br />
                                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label>Password</label><br />
                                            <input type="password" className="form-control" onChange={(e) => setPassWord(e.target.value)} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={3}>
                                            {/* <button className="btn btn-success mt-3" type="submit">Save changes</button> */}
                                            {isEditAble == false ? <Button type="submit" className="btn btn-success mt-3" disabled >Save changes</Button> : <Button type="submit" className="btn btn-success mt-3" >Save changes</Button>}
                                            
                                        </Col>
                                        <Col xs={9} >
                                            <button className="btn btn-outline-primary mt-3" onClick={(e) => {
                                                navigate("/")
                                            }}>Back to Home</button>
                                        </Col>
                                    </Row>
                                </Form>
                                <Row>
                                </Row>
                            </Col>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;