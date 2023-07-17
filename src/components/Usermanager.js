import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Usermanager = () => {

    const [user,setUser] = useState([])
    

    useEffect(() => {
        fetch('http://localhost:9999/users')
        .then((resp) => {
            return resp.json()
        }).then((data) => {
            setUser(data)
        }).catch((err) => {
            console.log(err.message)
        })
    },[])

    const handerRemove = (code) => {
        if (window.confirm('u sure bro ?')) {
            fetch('http://localhost:9999/users/' + code, {
                method: "DELETE"
            }).then((resp) => {
                window.location.reload()
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    return (  
        <Container>
            <Row>
                <Col>
                    <h2>User Manager</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>Username</td>
                                <td>email</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.map((u) => (
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        <td>{u.uName}</td>
                                        <td>{u.email}</td>
                                        <td>
                                            <Link className="btn btn-primary" to={'/user/' + u.id} style={{ marginRight: '10px' }}>Detail</Link>
                                            <button className="btn btn-danger" onClick={() => { handerRemove(u.id) }}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}
 
export default Usermanager;