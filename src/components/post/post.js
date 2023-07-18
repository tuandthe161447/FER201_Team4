import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../css/post.css'




const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("http://localhost:9999/post").then((res) => res.json())
            .then((data) => {
                setPosts(data)
            }).catch(err => {
                console.log(err.message)
            })
    }, [])


    useEffect(() => {
        fetch("http://localhost:9999/category_post")
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
                            <h1 className="text-center mb-5">Post List</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={9}>
                            {
                                posts.map((p) => (
                                    <Row className="box post mb-3" key={p.id}>
                                        <Col>
                                            <Link>
                                                <h3 className="pt-2" style={{color:'black'}}>{p.title}</h3>
                                                <h4 className="pl-5" style={{color:'grey'}}>
                                                    {
                                                        category.map(c => c.id == p.cid ? c.name : '')
                                                    }
                                                </h4>
                                            </Link>
                                        </Col>
                                    </Row>
                                ))
                            }
                        </Col>
                        <Col xs={3}>
                            
                        </Col>
                    </Row>

                </Col>
            </Row>
        </Container >
    );
}

export default Posts;