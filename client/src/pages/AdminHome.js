import React, { useEffect, useState } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import axios from 'axios';
import { Button, Container, Table, Row, Dropdown } from 'react-bootstrap';

function AdminHome() {
    const [users, setUsers] = useState([]);
    const [change, setChange] = useState(false);

    useEffect(async () => {
        const response = await axios.get("/admin/");
        setUsers(response.data);
              
    }, [change])

    async function blockUser (id) {

        try {
            await axios.post("/admin/block-user", id);
            setChange(!change);
        } catch (e) {

        }
    }

    return (
        <div>
            <AdminNavbar />
            <Container>
                <Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => {
                                return (<tr>
                                    <td>1</td>
                                    <td>{user.email}</td>
                                    <td>********</td>
                                    {user.isActive === true ? <td>Active</td> : <td style={{ color: 'red' }}>Blocked</td>}
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                                More
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => blockUser(user._id)}>Block</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>)
                            })}

                        </tbody>
                    </Table>
                </Row>
            </Container>
        </div>
    )
}

export default AdminHome
