import { Card, Container, Table } from "react-bootstrap";
import React, { useState, useMemo, useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";


const UserDetail = () => {

    const {code} = useParams();
    const [id, setid] = useState()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [comment, setComment] = useState([])
    const [post, setPost] = useState([])


    useEffect(() => {
        fetch('http://localhost:9999/feedback').then(resp => {
            return resp.json();
        }).then(resp => {
            setComment(resp.filter((r) => r.uid == code))
        }).catch((err) => {
            console.log(err.message)
        })
    },[])


    useEffect(() => {
        fetch('http://localhost:9999/blog').then(resp => {
            return resp.json();
        }).then(resp => {
            setPost(resp)
        }).catch((err) => {
            console.log(err.message)
        })
    },[])

    const handerRemove = (userCode) => {
        if (window.confirm('u sure bro ?')) {
            fetch('http://localhost:9999/users/' + userCode, {
                method: "DELETE"
            }).then((resp) => {
                window.location.reload()
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    const handerRemoveComment = (commentCode) => {
        if (window.confirm('u sure bro ?')) {
            fetch('http://localhost:9999/feedback/' + commentCode, {
                method: "DELETE"
            }).then((resp) => {
                window.location.reload()
            }).catch((err) => {
                console.log(err.message)
            })
        }
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
                <button className="btn btn-danger" onClick={() => { handerRemove(id)}}>Delete</button>
                </Card.Footer>
            </Card>
            <h2>Comments</h2>
            <Table>
                <thead>
                    <tr>
                        <td>Content</td>
                        <td>Location</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        comment.map((c) => (
                            <tr key={c.id}>
                                <td>{c.comment}</td>
                                <td>   
                                    {
                                        post.map((p) => p.id === c.pid ? p.name : '')
                                    }
                                </td>
                                <td>
                                    {
                                        <button className="btn btn-danger" onClick={() => { handerRemoveComment(c.id)}}>Delete</button>
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Container>
    );
}
 
export default UserDetail;