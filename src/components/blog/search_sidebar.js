import { useRef } from "react";
import { Form } from "react-bootstrap";

const Search = () => {

const inputSearch = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault()
        console.log(inputSearch.current.value)
    }

    return (
        <div>
            <Form onSubmit={handleSearch}>
                <input ref={inputSearch} className="form-control" type="search" placeholder="Search any post.." />
                <button type="submit" className="btn btn-primary mt-2 btn-block" onSubmit={handleSearch}>Search</button>
            </Form>
        </div>
    );
}

export default Search;