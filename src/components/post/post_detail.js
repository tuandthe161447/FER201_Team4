import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Container, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import '../css/post_detail.css'
import parse from 'html-react-parser';

const PostDetail = () => {

    const { pid } = useParams();
    const [p, setPosts] = useState([]);
    const [comment, setComment] = useState([]);
    const [user, setUser] = useState([]);
    const [c, setContent] = useState('');


    useEffect(() => {
        fetch('http://localhost:9999/post/' + pid)
            .then(resp => resp.json())
            .then(data => {
                setPosts(data);
                setContent(data.content);
            })
            .catch(err => {
                console.log(err.massage);
            })
    }, []);

    useEffect(() => {
        fetch('http://localhost:9999/users')
            .then(resp => resp.json())
            .then(data => {
                setUser(data);
            })
            .catch(err => {
                console.log(err.massage);
            })
    }, []);

    useEffect(() => {
        fetch('http://localhost:9999/comment')
            .then(resp => resp.json())
            .then(data => {
                setComment(data.filter(s => s.pid == pid));
            })
            .catch(err => {
                console.log(err.massage);
            })
    }, []);

    const content = parse(c);

    return (
        <Container>
            <Row className='pt-3'>
                <img src={p.img} alt="#" width={150} height={150} />
                <h1 style={{ margin: '20px' }}>{p.name}</h1>
            </Row>
            <Row className='pt-3'>
                <h4>{content}</h4>
            </Row>
            <Row className='pt-3'>
                <h2>Discussion: </h2>
            </Row>
            <Row>
                <input className='form-control' type='text' placeholder='Enter your comment'></input>
            </Row>
            <div className='pt-3'>
                {
                    comment.map(c => (
                        <Row>
                            <div className='box comment'>
                                <Row>
                                    <Col xs={2}>
                                        <img src='https://i.pinimg.com/originals/ae/ff/d6/aeffd6d2e76161d3d7b89cffca8662c1.jpg' />
                                    </Col>
                                    <Col xs={10}>
                                        <h4>
                                            {
                                                user.map(u => u.id = c.uid ? u.uName : '')
                                            }
                                        </h4>
                                        <h5>{c.comment}</h5>
                                    </Col>
                                </Row>
                            </div>
                        </Row>
                    ))
                }
            </div>
        </Container>
    )


}

export default PostDetail;