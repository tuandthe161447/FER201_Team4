import { useEffect, useState, useRef } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";



const Posts = () => {
    const [blog, setBlog] = useState([]);
    const [category, setCategory] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("http://localhost:9999/blog").then((res) => res.json())
            .then((data) => {
                setBlog(data)
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

    //search
    const inputSearch = useRef(null);

    const handleSearch = () => {
        
    }


    //sort
    const navigate = useNavigate();


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
                                            <Link to={"/blog/detail/" + p.id}><img src={p.img} alt="#" width={150} height={150} style={{padding: '0' }} /></Link>
                                        </Col>
                                        <Col xs={9}>
                                            <Link to={"/blog/detail/" + p.id}><label style={{ fontSize: '30px' }}>{p.name}</label></Link>
                                            <Row>
                                                <Col xs={6}>
                                                    <div>Category: {category.map(c => c.id === p.cid ? c.name : '')}</div>
                                                </Col>
                                                <Col xs={6}>
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
                                    <input ref={inputSearch} className="form-control" type="search" placeholder="Search any post.." />
                                    <button type="submit" className="btn btn-primary mt-2 btn-block" onSubmit={handleSearch}>Search</button>
                                </Form>
                            </div>
                            <div>
                                <h3>Category</h3>
                                {
                                    category.map((c) => (
                                        <div key={c.id}>
                                            <Link to={"/blog/category/" + c.id}>{c.name}</Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container >
    );
}

export default Posts;