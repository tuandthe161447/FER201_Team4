import { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const APostManager = () => {

    const [post, setPost] = useState([])
    const [Pcatergory, setPcatergory] = useState([])

    useEffect(() => {
        fetch('http://localhost:9999/post')
            .then((resp) => {
                return resp.json()
            }).then((data) => {
                setPost(data)
            }).catch((err) => {
                console.log(err.message)
            })
    }, [])

    useEffect(() => {
        fetch('http://localhost:9999/category_post')
            .then((resp) => {
                return resp.json()
            }).then((data) => {
                console.log(Pcatergory)
                setPcatergory(data)
            }).catch((err) => {
                console.log(err.message)
            })
    }, [])


    const handerRemove = (code) => {
        if (window.confirm('u sure bro ?')) {
            fetch('http://localhost:9999/post/' + code, {
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
                    <h2>Post Manager</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ textAlign: 'left', marginBottom: '10px' }}>
                    <Link className="btn btn-primary" to={'add'}>Add post</Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Title</td>
                                <td>catergory</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                post.map((p) => (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td>{p.title}</td>
                                        <td>
                                            {
                                                Pcatergory.map((c) => (
                                                    c.id === p.cid ? c.name : ''
                                                ))
                                            }
                                        </td>
                                        <td>
                                        <Link className="btn btn-primary" to={'editPost/' + p.id} style={{ marginRight: '10px' }}>Edit</Link>
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
 
export default APostManager;