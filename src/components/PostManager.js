import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";



function PostManager() {

    const [post, setPost] = useState([])
    const [postCat, setPostCat] = useState([])

    const handerRemove = (code) => {
        if (window.confirm('u sure bro ?')) {
            fetch('http://localhost:9999/blog/' + code, {
                method: "DELETE"
            }).then((resp) => {
                window.location.reload()
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    useEffect(() => {
        fetch('http://localhost:9999/blog')
            .then((resp) => {
                return resp.json()
            }).then((data) => {
                setPost(data)
            }).catch((err) => {
                console.log(err.message)
            })
    }, [])


    useEffect(() => {
        fetch('http://localhost:9999/category_blog')
            .then((resp) => {
                return resp.json()
            }).then((data) => {
                setPostCat(data)
            }).catch((err) => {
                console.log(err.message)
            })
    }, [])

    return (
        <Container>
            <Row>
                <Col>
                    <h2>Post manager</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ textAlign: 'left', marginBottom: '10px' }}>
                    <Link className="btn btn-primary" to={'/create'}>Add post</Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <td>id</td>
                                <td>title</td>
                                <td>date</td>
                                <td>catergory</td>
                                <td>action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                post.map((p) => (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td>{p.name}</td>
                                        <td>{p.created_date}</td>
                                        <td>
                                            {
                                                postCat.map(c => (c.id === p.cid ? c.name : ''))
                                            }
                                        </td>
                                        <td>
                                            <Link className="btn btn-primary" to={'/edit/' + p.id} style={{ marginRight: '10px' }}>Edit</Link>
                                            <button className="btn btn-danger" onClick={() => { handerRemove(p.id) }}>Delete</button>
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

export default PostManager;