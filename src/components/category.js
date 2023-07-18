import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./blog/sidebar";

const Category = () => {

    const { cid } = useParams();

    const [c, setCategory] = useState({});
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        fetch("http://localhost:9999/category_post/" + cid)
            .then(res => res.json())
            .then(data => {
                setCategory(data)
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost:9999/post").then((res) => res.json())
            .then((data) => {
                setPosts(data)
            }).catch(err => {
                console.log(err.message)
            })
    }, [])

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <Row>
                        <Col xs={12}>
                            <h1 className="text-center mb-5">Post List</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <h2>Category: <span className="text-secondary">{c.name}</span></h2>
                            <button className="btn btn-success mb-2" onClick={() => navigate("/blogs")}>Back to list</button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={9}>
                            {
                                posts.map((p) => (
                                    <Row className="mb-3" key={p.id}>
                                        <Col xs={3}>
                                            <img src={p.img} alt="#" width={150} height={150} />
                                        </Col>
                                        <Col xs={9}>
                                            <h2>{p.name}</h2>
                                        </Col>
                                    </Row>
                                ))
                            }
                        </Col>
                        <Col xs={3}>
                            <Sidebar />
                        </Col>
                    </Row>
                </Col>
            </Row>

        </Container>
    );
}

export default Category;