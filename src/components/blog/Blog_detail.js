import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Container, Table, Form } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../css/post_detail.css'
import parse from 'html-react-parser';
import { SuitHeart, SuitHeartFill } from 'react-bootstrap-icons';

const BlogDetail = () => {

    const { bid } = useParams();
    const pid = parseInt(bid);
    const [id, setId] = useState(0);
    const [p, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState([]);
    const [c, setContent] = useState('');
    const [comment, setComment] = useState('')
    const navigate = useNavigate();
    const [editCommentId, setEditCommentId] = useState(0);
    const [editedComment, setEditedComment] = useState('');
    const [vote, setVote] = useState([]);
    const [voted, setVoted] = useState(false);
    const [voteId, setVoteId] = useState(0);


    let uid;

    if (sessionStorage.getItem('uid') != null) {
        uid = JSON.parse(sessionStorage.getItem('uid'));

    }

    useEffect(() => {
        fetch('http://localhost:9999/blog/' + bid)
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
        fetch('http://localhost:9999/feedback')
            .then(resp => resp.json())
            .then(data => {
                let count = 0;
                setComments(data.filter(s => s.pid == bid));
                count = comments.count();
                console.log(count);
            })
            .catch(err => {
                console.log(err.massage);
            })
    }, []);
    useEffect(() => {
        fetch('http://localhost:9999/vote/')
            .then(resp => resp.json())
            .then(data => {
                setVote(data);
                data.map(v => {
                    if (v.uid == uid && v.pid == pid) {
                        setVoted(true);
                        setVoteId(v.id);
                    }
                })

            })
            .catch(err => {
                console.log(err.massage);
            })
    }, []);



    const content = parse(c);


    const handleSubmit = e => {
        e.preventDefault();
        const com = { id, uid, pid, comment };
        console.log(com);
        if (comment.length === 0) {
            alert('Please fill all fields!!')
        } else {
            fetch('http://localhost:9999/feedback', {
                method: 'POST',
                headers: { 'Content-type': 'Application/Json', 'Charset': 'UTF8' },
                body: JSON.stringify(com)
            }).then(() => {
                window.location.reload();
            }).catch(err => console.log(err.message));
        }

    }

    const handleDelete = (id) => {
        if (window.confirm("Do you want to delete?"))
            fetch('http://localhost:9999/feedback/' + id, {
                method: "DELETE"
            })
                .then(() => {
                    //Reload page
                    alert("Delete success.");
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err.massage)
                })
    }

    const handleEdit = (commentId, initialComment) => {
        setEditCommentId(commentId);
        setEditedComment(initialComment);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedComment = { id: editCommentId, uid, pid, comment: editedComment };
        if (editedComment.length === 0) {
            alert('Please fill all fields!!');
        } else {
            fetch(`http://localhost:9999/feedback/` + editCommentId, {
                method: 'PUT',
                headers: { 'Content-type': 'Application/Json', 'Charset': 'UTF8' },
                body: JSON.stringify(updatedComment)
            })
                .then(() => {
                    setEditCommentId(null);
                    setEditedComment('');
                    window.location.reload();
                })
                .catch(err => console.log(err.message));
        }
    };

    const handleDisLike = () => {
        fetch('http://localhost:9999/vote/' + voteId, {
            method: "DELETE"
        })
            .then(() => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err.massage)
            })
    }


    const handleLike = () => {
        const com = { id: 0, uid, pid }
        fetch('http://localhost:9999/vote', {
            method: 'POST',
            headers: { 'Content-type': 'Application/Json', 'Charset': 'UTF8' },
            body: JSON.stringify(com)
        }).then(() => {
            window.location.reload();
        }).catch(err => console.log(err.message));
    }


    return (
        <Container>
            <Row className='pt-3'>

                <img src={p.img} alt="#" style={{height:'100%'}} />

            </Row>
            <Row>
                <h1 style={{ margin: '20px' }}>{p.name}</h1>
            </Row>
            <Row className='pt-3'>
                <h4>{content}</h4>
            </Row>
            <Row className='pt-3'>
                <h2>Votes:</h2>
            </Row>
            <Row className=''>
                <h2 style={{ marginLeft: '7px' }}>{vote.filter(v => v.pid == pid).length}</h2>
            </Row>
            {
                (uid !== undefined) ?
                    <Row className=''>
                        {
                            (voted) ?
                                <SuitHeartFill onClick={handleDisLike} style={{ width: '35px', height: '35px', color: 'red' }} />
                                :
                                <SuitHeart onClick={handleLike} style={{ width: '35px', height: '35px' }} />
                        }
                    </Row>
                    : <Row>
                        <SuitHeart style={{ width: '35px', height: '35px' }} />
                    </Row>
            }

            <Row className='pt-3'>
                <h2>Discussion: </h2>
            </Row>
            {
                (uid !== undefined) ?
                    <Row>
                        <Form onSubmit={e => handleSubmit(e)}>
                            <Form.Group>
                                <Form.Control style={{ width: '1100px', height: '50px', borderRadius: '10px' }} value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Share your opinion' />
                            </Form.Group>
                            <Form.Group className="pt-2">
                                <Button type="submit" className="btn btn-success" >
                                    Submit
                                </Button>
                            </Form.Group>
                        </Form>
                    </Row>
                    :
                    <Row>

                    </Row>
            }
            <div className='pt-3'>
                {
                    comments.map(c => (
                        <div>
                            {
                                (editCommentId === c.id) ?
                                    <Form onSubmit={handleUpdate}>
                                        <Form.Control
                                            style={{ width: '1100px', height: '50px', borderRadius: '10px' }}
                                            value={editedComment}
                                            onChange={(e) => setEditedComment(e.target.value)}
                                        />
                                        <Button type="submit" className="btn btn-primary">
                                            Update
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            onClick={() => {
                                                setEditCommentId(null);
                                                setEditedComment('');
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </Form>
                                    :
                                    <div key={c.id}>
                                        <Row>
                                            <div className='box comment'>
                                                <Row>
                                                    <img src='https://i.pinimg.com/originals/ae/ff/d6/aeffd6d2e76161d3d7b89cffca8662c1.jpg' />
                                                    <Col>
                                                        <h4>
                                                            {
                                                                user.map(u => u.id == c.uid ? u.uName : '')
                                                            }
                                                        </h4>
                                                        <h5>{c.comment}</h5>
                                                    </Col>

                                                </Row>

                                            </div>

                                        </Row>
                                        {
                                            (uid === c.uid) ?
                                                <Row>
                                                    <Link style={{ marginTop: '-20px', marginBottom: '', paddingLeft: '30px', color: 'black', fontSize: '20px' }} to={'#'} onClick={() => handleDelete(c.id)} >Delete</Link>
                                                    <Link style={{ marginTop: '-20px', marginBottom: '', paddingLeft: '30px', color: 'black', fontSize: '20px' }} to={'#'} onClick={() => handleEdit(c.id, c.comment)} >Edit</Link>
                                                </Row>
                                                :
                                                <Row>

                                                </Row>
                                        }
                                    </div>
                            }
                        </div>
                    ))
                }
            </div>
        </Container>
    )


}

export default BlogDetail;