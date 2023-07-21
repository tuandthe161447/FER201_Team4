import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditAPost = () => {
    const [title, setTitle] = useState('')
    const [cid, setCatergory] = useState(1)
    const [id, setId] = useState(0)
    const [comment, setComment] = useState([])
    const [reply, setReply] = useState([])
    const [user, setUser] = useState([])


    const { code } = useParams()

    const navigate = useNavigate()


    useEffect(() => {
        fetch('http://localhost:9999/post/' + code).then((resp) => {
            return resp.json()
        }).then((resp) => {
            setTitle(resp.title)
            setCatergory(resp.cid)
            setId(resp.id)
        })
    }, [])




    useEffect(() => {
        fetch('http://localhost:9999/comment').then((resp) => {
            return resp.json()
        }).then((resp) => {
            setComment(resp.filter(r => r.pid === parseInt(code)))
        })
    }, [])

    useEffect(() => {
        fetch('http://localhost:9999/reply').then((resp) => {
            return resp.json()
        }).then((resp) => {
            setReply(resp)
        })
    }, [])

    useEffect(() => {
        fetch('http://localhost:9999/users').then((resp) => {
            return resp.json()
        }).then((resp) => {
            setUser(resp)
        })
    }, [])

    const handlesubmit = (e) => {
        e.preventDefault()
        if (title === '') {
            alert('invalid post')
            return
        }

        const postobj = { title, cid }

        fetch('http://localhost:9999/post/' + id, {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(postobj)
        }).then(resp => {
            alert('post saved')
            navigate('/APostManager')
        }).catch((err) => {
            console.log(err.message)
        })
    }

    const handerRemoveComment = (cId) => {
        if (window.confirm('u sure bro ?')) {
            fetch('http://localhost:9999/comment/' + cId, {
                method: "DELETE"

            }).then((resp) => {
                window.location.reload()
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    const handerRemoveReply = (rId) => {
        if (window.confirm('u sure bro ?')) {
            fetch('http://localhost:9999/reply/' + rId, {
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
                    <form className="container" onSubmit={handlesubmit}>
                        <Card>
                            <Card.Header>
                                <h2>Edit Post</h2>
                            </Card.Header>
                            <Card.Body>
                                <Form.Group>
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control disabled value={id} onChange={(e) => setTitle(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control value={title} onChange={(e) => setTitle(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Category</Form.Label>
                                    <br />
                                    <select value={cid} onChange={(e) => setCatergory(parseInt(e.target.value))} className="form-control">

                                        <option value='1'>Du lịch</option>
                                        <option value='2'>Học Tập</option>
                                        <option value='3'>Tình Yêu</option>
                                        <option value='4'>Chính Trị</option>
                                    </select>
                                </Form.Group>
                            </Card.Body>
                            <Card.Footer>
                                <Button variant="success" type="submit">Save</Button>
                            </Card.Footer>
                        </Card>
                    </form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Comments</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>reply to</td>
                                <td>content</td>
                                <td>user</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                comment.map((c) => (
                                    <React.Fragment key={c.id}>
                                        <tr key={c.id}>
                                            <td>{c.id}</td>
                                            <td>{title}</td>
                                            <td>{c.comment}</td>
                                            <td>
                                                {
                                                    user.map(u => (u.id === c.uid ? u.uName : ''))
                                                }
                                            </td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => { handerRemoveComment(c.id) }}>Delete</button>
                                            </td>
                                        </tr>
                                        {
                                            reply.map(r => (
                                                r.cid === c.id ?
                                                    <tr key={r.id}>
                                                        <td>{r.id}</td>
                                                        <td>{c.comment}</td>
                                                        <td>{r.comment}</td>
                                                        <td>
                                                            {
                                                                user.map(u => (u.id === r.uid ? u.uName : ''))
                                                            }
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-danger" onClick={() => { handerRemoveReply(r.id) }}>Delete</button>
                                                        </td>
                                                    </tr> : ''
                                            ))
                                        }
                                    </React.Fragment>
                                ))
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default EditAPost;