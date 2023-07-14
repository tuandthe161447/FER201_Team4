import { Col } from "react-bootstrap";
import Search from "./search_sidebar";
import Category from "./category_sidebar";


const Sidebar = () => {
    return (
        <div>
            <Search />
            <Category />
        </div>
    );
}

export default Sidebar;