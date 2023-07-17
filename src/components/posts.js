import { useEffect, useState } from "react";
import { Col, Container, Row} from "react-bootstrap";


const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState([]);
    const [search, setSearch] = useState("");

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


    console.log()

    return (
        <Container className="mt-5">
            <Row>
                <Col xs={12}>
                    <h1 className="text-center mb-5">Post List</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={9}>
                    {
                        posts.map((p) => (
                            <Row className="mb-3" key={p.id}>
                                <Col xs={3}>
                                    <img src={p.img} alt="#" width={150} height={150} />
                                </Col>
                                <Col xs={9} className="m-0">
                                    <h2>{p.name}</h2>
                                    <Row>
                                        <Col xs={6}>
                                            <div>{category.map(c => c.id === p.cid ? c.name : '')}</div>
                                        </Col>
                                        <Col xs={6}>
                                            <div className="text-right">{p.created_date}</div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        ))
                    }
                </Col>
                <Col xs={3}>
                    <div>
                        <h3>Search</h3>
                        <input type="text" placeholder="Search any post.." />
                    </div>
                    <div>
                        <h3>Filter by user</h3>
                    </div>
                    <div>
                        <h3>Filter by category</h3>
                        {
                            category.map((c) => (
                                <div key={c.id}>
                                    <input type="checkbox"/>
                                    {c.name}
                                </div>
                            ))
                        }
                    </div>
                </Col>
            </Row>

        </Container>
    );
}

export default Posts;