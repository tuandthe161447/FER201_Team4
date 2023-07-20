import { useEffect, useState, useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";



const Blog = () => {
    const [blog, setBlog] = useState([]);
    const [category, setCategory] = useState([]);
    const [search, setSearch] = useState("");
    const [allblog, setallBlog] = useState([]);
    const [filter, setFilter] = useState(0);
    const [vote, setVote] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9999/blog").then((res) => res.json())
            .then((data) => {
                if (filter !== 0) {
                    setBlog(data.filter((p) => (p.cid == filter)));
                }
                if (filter == 0) {
                    setBlog(data);
                }
                setallBlog(data);
            }).catch(err => {
                console.log(err.message)
            })
        console.log(filter);
    }, [filter])


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
        fetch("http://localhost:9999/vote").then((res) => res.json())
            .then((data) => {
                setVote(data);
            }).catch(err => {
                console.log(err.message)
            })
    }, [])

    //search

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.length === 0) {
            if (filter !== 0) {
                setBlog(allblog.filter((p) => (p.cid == filter)));
            }
            else {
                setBlog(allblog);
            }
        }
        else {
            setBlog(blog.filter((s) => s.name.includes(search)))
        }
        setSearch('');
    }


    //sort
    // const navigate = useNavigate();


    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <Row>
                        <Col xs={12}>
                            <h1 className="text-center mb-5 mt-3">Blog List</h1>
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
                                blog.map((p) => (
                                    <Row className="mb-3" style={{ border: '2px solid black', padding: '10px', borderRadius: '10px' }} key={p.id}>
                                        <Col xs={3}>
                                            <Link to={"/blog/detail/" + p.id}><img src={p.img} alt="#" width={150} height={150} style={{ padding: '0' }} /></Link>
                                        </Col>
                                        <Col xs={9}>
                                            <Link to={"/blog/detail/" + p.id}><label style={{ fontSize: '30px' }}>{p.name}</label></Link>
                                            <Row>
                                                <Col xs={4}>
                                                    <div>Category: {category.map(c => c.id === p.cid ? c.name : '')}</div>
                                                </Col>
                                                <Col xs={4}>
                                                    <div>Votes: {vote.filter(v => v.pid == p.id).length}</div>
                                                </Col>
                                                <Col xs={4}>
                                                    <div className="text-right font-weight-lighter color text-secondary" >{p.created_date}</div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                ))
                            }
                        </Col>
                        <Col xs={3}>
                            <div>
                                <Form onSubmit={handleSearch}>
                                    <Form.Control
                                        style={{ width: '350px', height: '50px', borderRadius: '10px' }}
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Enter blog title to search"
                                    />
                                    <Button style={{ marginTop: '8px' }} type="submit" className="btn btn-primary">
                                        Search
                                    </Button>
                                </Form>
                            </div>
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
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container >
    );
}

export default Blog;