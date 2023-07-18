import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { useParams } from "react-router-dom"
import parse from 'html-react-parser';


const BlogDetail = () => {

    const [title, setTitle] = useState('')
    const [catergoryid, setCatergoryid] = useState(0)
    const [content, setContent] = useState('')
    const [date, setDate] = useState('')
    const [catergory, setCatergory] = useState([])
    const { code } = useParams()

    useEffect(() => {
        fetch('http://localhost:9999/post/' + code).then(resp => {
            return resp.json()
        }).then(resp => {
            setTitle(resp.name)
            setContent(resp.content)
            setCatergoryid(resp.cid)
            setDate(resp.created_date)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])


    useEffect(() => {
        fetch('http://localhost:9999/category_post').then(resp => {
            return resp.json()
        }).then(resp => {
            setCatergory(resp)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])

    const reactElement = parse(content)


    const theDay = ((wat) => {
        let wat1 = wat.split('-')
        return wat1[2] + '/' + wat1[1] + '/' + wat1[0]
    })


    return (
        <div className="container-fluid">
            <Card>
                <Card.Header>
                    <h1>{title}</h1>
                    <h1>{
                        theDay(date)
                    }</h1>
                    <h1>{

                        catergory.map(c => c.id === catergoryid ? c.name : '')

                    }</h1>
                </Card.Header>
                <Card.Body>
                    {reactElement}
                </Card.Body>

            </Card>
        </div>
    );
}

export default BlogDetail;