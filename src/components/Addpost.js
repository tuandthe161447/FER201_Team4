import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddPost = () => {


    const [title, setTitle] = useState('')
    const [cid, setCatergory] = useState(1)

    const navigate = useNavigate()

    const handlesubmit = (e) => {
        e.preventDefault()
        if (title === ''){
            alert('invalid post')
            return
        }

        const postobj = { title, cid }

        fetch('http://localhost:9999/post', {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(postobj)
        }).then(resp => {
            alert('post added')
            navigate('/APostManager')
        }).catch((err) => {
            console.log(err.message)
        })
    }

    return (
        <Container>
            <form className="container" onSubmit={handlesubmit}>
                <Card>
                    <Card.Header>
                        <h2>Create Post</h2>
                    </Card.Header>
                    <Card.Body>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={title} onChange={(e) => setTitle(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <br />
                            <select value={cid} onChange={(e) => setCatergory(parseInt(e.target.value))} className="form-control">

                                <option value='1'>Du lịch</option>
                                <option value='2'>Học Tập</option>
                                <option value='3'>Tình Yêu</option>
                                <option value='4'>Chính Trị</option>
                            </select>
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="success" type="submit">Create</Button>
                    </Card.Footer>
                </Card>
            </form>
        </Container>
    );
}

export default AddPost;