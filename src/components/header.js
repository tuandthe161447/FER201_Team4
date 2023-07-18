
import { useEffect, useState } from 'react';
import { NavDropdown, Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);
    let user

    if (sessionStorage.getItem('uName') != null) {
        user = JSON.stringify(sessionStorage.getItem('uName'))

    }

    let userrole = JSON.parse(sessionStorage.getItem('userrole'))
    console.log(userrole);

    useEffect(() => {
        fetch(" http://localhost:9999/users").then((res) => res.json())
            .then((data) => {
                setUsers(data)

            }).catch(err => {
                console.log(err.message)
            })
    }, [])

    return (
        //top header
        <div className="row header-app d-flex fixed-top">
            <Container>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#features">Blogs</Nav.Link>
                            <NavDropdown title="Categories" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href='#contact'>Contact</Nav.Link>
                        </Nav>
                        <Nav>
                            {
                                (user != undefined) ? <Nav >
                                    <Nav.Item style={{ color: 'white', margin: 'auto 0' }}>{"Hello"} {user}</Nav.Item>
                                    <Nav.Link href="/login">Log Out</Nav.Link>
                                    {
                                        userrole == true ? <Nav>
                                            <Nav.Link href='/post'>
                                                Manage
                                            </Nav.Link>
                                        </Nav>
                                            :
                                            <></>
                                    }
                                </Nav> : <Nav>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                    <Nav.Link href="/sign_up">Sign up</Nav.Link>

                                </Nav>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </div>
    );
}

export default Header