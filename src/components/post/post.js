import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../css/post.css'




const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState(0);
    const [allPost, setAllPost] = useState([]);


    useEffect(() => {
        fetch("http://localhost:9999/post").then((res) => res.json())
            .then((data) => {
                if (filter !== 0) {
                    setPosts(data.filter((p) => (p.cid == filter)));
                }
                if (filter == 0) {
                    setPosts(data);
                }
                setAllPost(data);
            }).catch(err => {
                console.log(err.message)
            })
    }, [filter])


    useEffect(() => {
        fetch("http://localhost:9999/category_post")
            .then((res) => res.json())
            .then((data) => {
                setCategory(data)
            }).catch(err => {
                console.log(err.message)
            })
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.length === 0) {
            if (filter !== 0) {
                setPosts(allPost.filter((p) => (p.cid == filter)));
            }
            else {
                setPosts(allPost);
            }
        }
        else {
            setPosts(posts.filter((s) => s.title.includes(search)))
        }
        setSearch('');
        console.log(search)

    }


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
                            {
                                posts.map((p) => (
                                    <Row className="box post mb-3" key={p.id}>
                                        <Col>
                                            <Link to={'/post/detail/' + p.id}>
                                                <h3 className="pt-2" style={{ color: 'black' }}>{p.title}</h3>
                                                <h4 className="pl-5" style={{ color: 'grey' }}>
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
                            <Form onSubmit={handleSearch}>
                                <input className="form-control" style={{ width: '350px', height: '50px', borderRadius: '10px' }} 
                                type="text" name="search" 
                                onChange={e => setSearch(e.target.value)} placeholder="Enter post title to search" />
                                <button style={{ marginTop: '8px' }} type="submit" className="btn btn-primary">Search</button>
                            </Form>

                            <div>
                                <h3>Category</h3>
                                {
                                    category.map((c) => (
                                        <div key={c.id}>
                                            <input type='radio' name='filter' value={c.id} onChange={e => setFilter(e.target.value)} /> {c.name} <br />
                                        </div>
                                    ))
                                }
                                <input type='radio' name='filter' value={0} onChange={e => setFilter(e.target.value)} /> All <br />

                            </div>
                        </Col> */}
                    </Row>

                </Col>
            </Row>
        </Container >
    );
}

export default Posts;