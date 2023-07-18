import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Container, Table, Form } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../css/post_detail.css'
import parse from 'html-react-parser';

const PostDetail = () => {

    const { bid } = useParams();
    const pid = parseInt(bid);
    const [id, setId] = useState(0);
    const [p, setPosts] = useState([]);
    const [reply, setReply] = useState([]);
    const [comId, setComId] = useState(0);
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState([]);
    const [comment, setComment] = useState('');
    const [commentRep, setCommentRep] = useState('');
    const navigate = useNavigate();
    const [editCommentId, setEditCommentId] = useState(0);
    const [editedComment, setEditedComment] = useState('');
    const [editRepId, setEditRepId] = useState(0);
    const [editedRep, setEditedRep] = useState('');
    const [editRepComId, setEditRepComId] = useState(0);
    


    let uid;

    if (sessionStorage.getItem('uid') != null) {
        uid = JSON.parse(sessionStorage.getItem('uid'));

    }

    useEffect(() => {
        fetch('http://localhost:9999/post/' + bid)
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
                setComments(data.filter(s => s.pid == bid));
            })
            .catch(err => {
                console.log(err.massage);
            })
    }, []);

    useEffect(() => {
        fetch('http://localhost:9999/reply')
            .then(resp => resp.json())
            .then(data => {
                setReply(data);
            })
            .catch(err => {
                console.log(err.massage);
            })
    }, []);



    const handleSubmit = e => {
        e.preventDefault();
        const com = { id, uid, pid, comment };
        console.log(com);
        if (comment.length === 0) {
            alert('Please fill all fields!!')
        } else {
            fetch('http://localhost:9999/comment', {
                method: 'POST',
                headers: { 'Content-type': 'Application/Json', 'Charset': 'UTF8' },
                body: JSON.stringify(com)
            }).then(() => {
                window.location.reload();
            }).catch(err => console.log(err.message));
        }

    }


    const handleSubmitReply = e => {
        e.preventDefault();
        const com = { id, uid, cid: comId, comment: commentRep };
        console.log(com);
        if (commentRep.length === 0) {
            alert('Please fill all fields!!')
        } else {
            fetch('http://localhost:9999/reply', {
                method: 'POST',
                headers: { 'Content-type': 'Application/Json', 'Charset': 'UTF8' },
                body: JSON.stringify(com)
            }).then(() => {
                setComId(0);
                window.location.reload();
            }).catch(err => console.log(err.message));
        }

    }
    const handleReply = (id) => {
        setComId(id);
    }

    const handleDelete = (id) => {
        if (window.confirm("Do you want to delete?"))
            fetch('http://localhost:9999/comment/' + id, {
                method: "DELETE"
            })
                .then(() => {
                    //Reload page
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err.massage)
                })
    }

    const handleEditRep = (repId, initialComment, cid) => {
        setEditRepId(repId);
        setEditedRep(initialComment);
        setEditRepComId(cid);
    };

    const handleDeleteRep = (id) => {
        if (window.confirm("Do you want to delete?"))
            fetch('http://localhost:9999/reply/' + id, {
                method: "DELETE"
            })
                .then(() => {
                    //Reload page
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
            fetch(`http://localhost:9999/comment/` + editCommentId, {
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

    const handleUpdateRep = (e) => {
        e.preventDefault();
        const updatedComment = { id: editRepId, uid, cid: editRepComId, comment: editedRep };
        if (editedRep.length === 0) {
            alert('Please fill all fields!!');
        } else {
            fetch(`http://localhost:9999/reply/` + editRepId, {
                method: 'PUT',
                headers: { 'Content-type': 'Application/Json', 'Charset': 'UTF8' },
                body: JSON.stringify(updatedComment)
            })
                .then(() => {
                    setEditRepId(null);
                    setEditedRep('');
                    setEditRepComId(0);
                    window.location.reload();
                })
                .catch(err => console.log(err.message));
        }
    };

    return (
        <Container>
            <Row className='pt-3'>
                <h1 style={{ margin: '20px 0' }}>{p.title}</h1>
            </Row>
            <Row className='pt-3'>
                <h2>Discussion: </h2>
            </Row>
            {
                (uid !== undefined) ?
                    <Row>
                        <Form onSubmit={e => handleSubmit(e)}>
                            <Form.Group>
                                <Form.Control style={{ width: '1100px', height: '50px', borderRadius: '10px' }} value={comment} onChange={(e) => setCommentRep(e.target.value)} placeholder='Share your opinion' />
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
                                    <div className='box commentSection' key={c.id}>
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
                                        <Row>
                                            {
                                                (uid === c.uid) ?
                                                    <div style={{ marginTop: '-20px', marginBottom: '20px', paddingLeft: '30px' }}>
                                                        <Link style={{color:'black', fontSize:'20px'}} to={'#'} onClick={() => handleDelete(c.id)} >Delete</Link>
                                                        <Link style={{ marginTop: '-20px', marginBottom: '20px', paddingLeft: '10px', color:'black', fontSize:'20px' }} to={'#'} onClick={() => handleEdit(c.id, c.comment)} >Edit</Link>
                                                        <Link  style={{ marginTop: '-20px', marginBottom: '20px', paddingLeft: '10px', color:'black', fontSize:'20px' }} to={'#'} onClick={() => handleReply(c.id)} >Reply</Link>
                                                    </div>

                                                    :
                                                    <div style={{ marginTop: '-20px', marginBottom: '20px', paddingLeft: '30px' }}>
                                                        <Link style={{color:'black', fontSize:'20px'}} to={'#'} onClick={() => handleReply(c.id)} >Reply</Link>
                                                    </div>
                                            }
                                        </Row>
                                        <Row>
                                            {
                                                reply.map(r => (
                                                    <Container>
                                                        {
                                                            (r.cid === c.id) ?
                                                                <div>
                                                                    {
                                                                        (editRepId === r.id) ?
                                                                            <Form style={{marginLeft:'100px'}} onSubmit={handleUpdateRep}>
                                                                                <Form.Control
                                                                                    style={{ width: '1100px', height: '50px', borderRadius: '10px' }}
                                                                                    value={editedRep}
                                                                                    onChange={(e) => setEditedRep(e.target.value)}
                                                                                />
                                                                                <Button type="submit" className="btn btn-primary">
                                                                                    Update
                                                                                </Button>
                                                                                <Button
                                                                                    variant="secondary"
                                                                                    onClick={() => {
                                                                                        setEditRepId(0);
                                                                                        setEditedRep('');
                                                                                        setEditRepComId(0);
                                                                                    }}
                                                                                >
                                                                                    Cancel
                                                                                </Button>
                                                                            </Form>
                                                                            :
                                                                            <div key={r.id}>
                                                                                <Row>
                                                                                    <div className='box comment' style={{ marginLeft: '100px', marginTop: '-15px' }}>
                                                                                        <Row>
                                                                                            <img src='https://i.pinimg.com/originals/ae/ff/d6/aeffd6d2e76161d3d7b89cffca8662c1.jpg' />
                                                                                            <Col>
                                                                                                <h4>
                                                                                                    {
                                                                                                        user.map(u => u.id == r.uid ? u.uName : '')
                                                                                                    }
                                                                                                </h4>
                                                                                                <h5>{r.comment}</h5>
                                                                                            </Col>

                                                                                        </Row>

                                                                                    </div>
                                                                                </Row>
                                                                                <Row>

                                                                                    {
                                                                                        (uid === r.uid) ?
                                                                                            <div style={{ marginTop: '-20px', marginLeft: '100px', marginBottom: '20px', paddingLeft: '10px' }}>
                                                                                                <Link style={{color:'black', fontSize:'20px'}} to={'#'} onClick={() => handleDeleteRep(r.id)} >Delete</Link>
                                                                                                <Link style={{ marginTop: '-20px', marginBottom: '20px', paddingLeft: '10px', color:'black', fontSize:'20px' }} to={'#'} onClick={() => handleEditRep(r.id, r.comment, c.id)} >Edit</Link>
                                                                                                <Link style={{ marginTop: '-20px', marginBottom: '20px', paddingLeft: '10px', color:'black', fontSize:'20px' }} to={'#'} onClick={() => handleReply(c.id)} >Reply</Link>
                                                                                            </div>
                                                                                            :
                                                                                            <div style={{ marginTop: '-20px', marginLeft: '100px', marginBottom: '20px', paddingLeft: '10px' }}>
                                                                                                <Link style={{color:'black', fontSize:'20px'}} to={'#'} onClick={() => handleReply(c.id)} >Reply</Link>
                                                                                            </div>
                                                                                    }

                                                                                </Row>

                                                                            </div>
                                                                    }
                                                                </div>


                                                                :
                                                                <div></div>
                                                        }
                                                    </Container>
                                                ))
                                            }
                                            {
                                                (comId === c.id) ?
                                                    <div style={{ marginLeft: '100px' }}>
                                                        <Row>
                                                            <Form onSubmit={e => handleSubmitReply(e)}>
                                                                <Form.Group>
                                                                    <Form.Control style={{ width: '1000px', height: '50px', borderRadius: '10px' }} value={commentRep} onChange={(e) => setCommentRep(e.target.value)} placeholder='Share your opinion' />
                                                                </Form.Group>
                                                                <Form.Group className="pt-2">
                                                                    <Button type="submit" className="btn btn-success" >
                                                                        Submit
                                                                    </Button>
                                                                </Form.Group>
                                                            </Form>
                                                        </Row>
                                                    </div>
                                                    :
                                                    <div></div>
                                            }
                                        </Row>
                                    </div>
                            }
                        </div>
                    ))
                }
            </div>
        </Container>
    )


}

export default PostDetail;