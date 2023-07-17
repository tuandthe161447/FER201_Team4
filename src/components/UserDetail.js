import { Card, Container, Table } from "react-bootstrap";
import React, { useState, useMemo, useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";


const UserDetail = () => {

    const {code} = useParams();
    const [id, setid] = useState()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handerRemove = () => {

    }


    useEffect(() => {
        console.log(code);
        fetch('http://localhost:9999/users/'+code)
        .then(resp => { 
            return resp.json();
        }).then(resp => {
            setid(resp.id)
            setUsername(resp.uName)
            setEmail(resp.email)
            setPassword(resp.passWord)
        }).catch((err) => {
            console.log(err.message)
        })
        console.log(id)
    },[])

    return (  
        <Container>
            <Card>
                <Card.Header>
                    <h2>User detail</h2>
                </Card.Header>
                <Card.Body>
                    <label>Id: {id}</label><br/>
                    <label>Username: {username}</label><br/>
                    <label>Email: {email}</label><br/>
                    <label>Password: {password}</label><br/>
                </Card.Body>
                <Card.Footer>
                <button className="btn btn-danger" onClick={() => { handerRemove()}}>Delete</button>
                </Card.Footer>
            </Card>
            <h2>Comments</h2>
            <Table>
                <thead>
                    <tr>
                        <td>Content</td>
                        <td>Location</td>
                        <td>Action</td>
                        <td>Release Date</td>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </Table>
        </Container>
    );
}
 
export default UserDetail;