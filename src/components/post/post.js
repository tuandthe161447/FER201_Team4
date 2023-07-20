import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../css/post.css'




const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState(0);


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
                        {/* <Col xs={3}>
                            <div>
                                <input style={{ width: '350px', height: '50px', borderRadius: '10px' }} type="text" name="seacrh" onSubmit={e => setSearch(e.target.value)} placeholder="Enter post title to search"/>
                                <button style={{marginTop:'8px'}} type="submit" className="btn btn-primary">Search</button>
                            </div>
                            <div>
                                <h3>Category</h3>
                                {
                                    category.map((c) => (
                                        <div key={c.id}>
                                            <input  type='radio' name='filter' value={c.id} onChange={e => setFilter(e.target.value)} /> {c.name} <br />
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