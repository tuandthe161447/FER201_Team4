import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Slide_hearder from './slide_header';
import '../components/css/home.css'


const Home = () => {
    const [blog, setBlog] = useState([]);
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9999/blog").then((res) => res.json())
            .then((data) => {
                let Latest = [];
                Latest = data.slice(0, 3);
                setBlog(Latest)
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

    return (
        <Container fluid>
            <Row>
                <Slide_hearder />
            </Row>
            <Row>
                <Container>
                    <Row>
                        <Col>
                            <h1 className='text-center pt-5 pb-3'>Trending Blog</h1>
                            <Row>
                                {
                                    blog.map(p => (
                                        <Col xs={4}>
                                            <Link to={'/blog/detail/' + p.id}>
                                                <div className='box pt-3'>
                                                    <img src={p.img} alt="#" />
                                                    <h2 style={{ color: 'black' }}>{p.name}</h2>
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
                            <h1 className='text-center pt-5 pb-3'>Latest Post</h1>
                            <Row>
                                {
                                    posts.map(p => (
                                        <Col xs={4}>
                                            <Link to={'/post/detail/' + p.id}>
                                                <div className='box pt-3'>
                                                    <h2 className='pl-2'>{p.title}</h2>
                                                    <h4 className="pl-2" style={{ color: 'grey' }}>
                                                        {
                                                            category.map(c => c.id == p.cid ? c.name : '')
                                                        }
                                                    </h4>
                                                </div>
                                            </Link>

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