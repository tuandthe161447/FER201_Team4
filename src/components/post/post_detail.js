import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Container, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import '../css/post_detail.css'

const PostDetail = () => {

    const { pid } = useParams();
    const [p, setPosts] = useState([]);
    const [comment, setComment] = useState([]);
    const [user, setUser] = useState([]);


    useEffect(() => {
        fetch('http://localhost:9999/post/' + pid)
            .then(resp => resp.json())
            .then(data => {
                setPosts(data);
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

    return (
        <Container>
            <Row className='pt-3'>
                <img src={p.img} alt="#" width={150} height={150} />
                <h1 style={{ margin: '20px' }}>{p.name}</h1>
            </Row>
            <Row className='pt-3'>
                <h4>{p.content}</h4>
            </Row>
            <Row className='pt-3'>
                <h2>Discussion: </h2>
            </Row>
            <Row>
                <input className='form-control' type='text' placeholder='Enter your comment'></input>
            </Row>
            <div>
                {
                    comment.map(c => (
                        <Row>
                            <div className='box'>
                                <h4>
                                    {
                                        user.map(u => u.id = c.uid ? u.uName : '')
                                    }
                                </h4>
                                <h5>{c.comment}</h5>
                            </div>
                        </Row>
                    ))
                }
            </div>
        </Container>
    )


}

export default PostDetail;