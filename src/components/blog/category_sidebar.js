import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Category = () => {

    const [category, setCategory] = useState([]);

    const navigate = useNavigate();

    const api = "http://localhost:9999/category_blog"

    useEffect(() => {
        fetch(api).then((res) => res.json())
            .then((data) => {
                setCategory(data)
            }).catch(err => {
                console.log(err.message)
            })
    }, [])

    return (
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
    );
}

export default Category;