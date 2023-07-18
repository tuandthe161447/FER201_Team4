import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Slide_hearder from './slide_header';
import '../components/css/home.css'


const Home = () => {
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9999/post").then((res) => res.json())
            .then((data) => {
                let Latest = [];
                Latest = data.slice(0, 3);
                setPosts(Latest)
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
        <Container fluid>
            <Row>
                <Slide_hearder />
            </Row>
            <Row>
                <Container>
                    <Row>
                        <Col>
                            <h1 className='text-center pt-5 pb-3'>Latest Posts</h1>
                            <Row>
                                {
                                    posts.map(p => (
                                        <Col xs={4}>
                                            <Link to={'/post/detail/'+p.id}>
                                                <div className='box pt-3'>
                                                    <img src={p.img} alt="#" />
                                                    <h2>{p.name}</h2>
                                                </div>
                                            </Link>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1 className='text-center pt-5 pb-3'>Trending Blog</h1>
                            <Row>
                                {
                                    posts.map(p => (
                                        <Col xs={4}>
                                            <div className='box pt-3'>
                                                <img src={p.img} alt="#" />
                                                <h2>{p.name}</h2>
                                            </div>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
    )
}

export default Home;