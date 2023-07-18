import React, { useState, useMemo, useEffect } from "react";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Card, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import {  useNavigate, useParams } from "react-router-dom";
import htmlToDraft, {} from 'html-to-draftjs'


const EditPost = () => {
    const [name, setTitle] = useState('')
    const [created_date, setDate] = useState('')
    const [id, setId] = useState(0)
    const [cid, setCatergory] = useState(0)
    const [img, setImg] = useState('')
    const {code} = useParams();

    const navigate = useNavigate()

    useEffect(() => {
        console.log(code);
        fetch('http://localhost:9999/post/'+code).then(resp => { return resp.json();
        }).then(resp => {
            setId(resp.id);
            setTitle(resp.name);
            setDate(resp.created_date);
            setEditorState(htmlToDraftBlocks(resp.content));
            setCatergory(resp.cid)
            setImg(resp.img)
        }).catch((err) => {
            console.log(err.message)
        })
    },[])


    const htmlToDraftBlocks = (html) => {
        const blocksFromHtml = htmlToDraft(html);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);
        return editorState;
       }

    const handlesubmit = (e) => {
        e.preventDefault()
        const postobj = { name, created_date, content, cid }
        console.log(postobj)

        fetch('http://localhost:9999/post/' + id, {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(postobj)
        }).then(resp => {
            alert('wattttt')
            navigate('/postmanager')
        }).catch((err) => {
            console.log(err.message)
        })
    }

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const handleChange = (data) => {
        setEditorState(data);
    };
    var content = useMemo(
        () => draftToHtml(convertToRaw(editorState.getCurrentContent())),
        [editorState]
    );

    const toolbarOptions = {
        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'image'],
        inline: {
            options: ["bold", "italic", "underline", "strikethrough"],
        },
    };

    return (
        <div>
            <form className="container-fluid" onSubmit={handlesubmit}>
                <Row>
                    <Col>
                        <Card style={{ minHeight: '90vh' }}>
                            <Card.Header style={{ textAlign: 'center' }}><h2>Edit Post</h2></Card.Header>
                            <Card.Body>
                                <Form.Group>
                                    <Editor
                                        editorState={editorState}
                                        onEditorStateChange={handleChange}
                                        wrapperClassName="editor-wrapper"
                                        editorClassName="message-editor"
                                        toolbarClassName="message-toolbar"
                                        toolbar={toolbarOptions}
                                    />
                                    <textarea
                                        disabled
                                        value={content}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control disabled value={id} onChange={(e) => setId(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Thumbnail image</Form.Label>
                                    <Form.Control value={img} onChange={(e) => setImg(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control value={name} onChange={(e) => setTitle(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Publish Date</Form.Label>
                                    <Form.Control type="date" value={created_date} onChange={(e) => setDate(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Category</Form.Label>
                                    <br/>
                                    <select value={cid} onChange={(e) => setCatergory(parseInt(e.target.value))} className="form-control">
                                        
                                        <option value='1'>Travelling Guide</option>
                                        <option value='2'>Travelling Spots</option>
                                        <option value='3'>Top List</option>
                                    </select>
                                </Form.Group>

                            </Card.Body>
                            <Card.Footer>
                                <Button variant="success" type="submit">Save</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </form>
        </div>



    );
}

export default EditPost;