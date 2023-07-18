import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Sidebar from "./blog/sidebar";



const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("http://localhost:9999/blog").then((res) => res.json())
            .then((data) => {
                setPosts(data)
            }).catch(err => {
                console.log(err.message)
            })
    }, [])

    
    useEffect(() => {
        fetch("http://localhost:9999/category_blog")
            .then((res) => res.json())
            .then((data) => {
                setCategory(data)
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
                            <h1 className="text-center mb-5">Blog List</h1>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col>
                            <p>Sort by: <select>
                                <option value="0" key="">Newest</option>
                                <option value="1" key="">Viewed count</option>
                            </select>
                            </p>
                        </Col>
                    </Row> */}
                    <Row>
                        <Col xs={9}>
                            {
                                posts.map((p) => (
                                    <Row className="mb-3" key={p.id}>
                                        <Col xs={3}>
                                            <Link to={"/blog/detail/" + p.id}><img src={p.img} alt="#" width={150} height={150} /></Link>
                                        </Col>
                                        <Col xs={9}>
                                            <Link to={"/blog/detail/" + p.id} className="blog">{p.name}</Link>
                                            <Row>
                                                <Col xs={6}>
                                                    <div>Category: {category.map(c => c.id === p.cid ? c.name : '')}</div>
                                                </Col>
                                                <Col xs={6}>
                                                    <div className="text-right">{p.created_date}</div>
                                                </Col>
                                            </Row>
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
        </Container >
    );
}

export default Blog;