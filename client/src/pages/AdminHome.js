import './AdminHome.css';
import React, { useEffect, useState } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import axios from 'axios';
import { Container, Table, Row, Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2';
import MyVerticallyCenteredModal from '../components/EditModal';
import { FaSearch } from "react-icons/fa";


function AdminHome() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [change, setChange] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [editEmail, setEditEmail] = useState("");
    const [editId, setEditId] = useState("");


    useEffect(async () => {
        console.log(search);
        const response = await axios.post("/admin", { search });
        setUsers(response.data);

    }, [change])

    async function blockUser(id) {
        try {
            await axios.post("/admin/block-user", { id });
            setChange(!change);
        } catch (e) {

        }
    }

    function editUser(id, email) {
        setEditEmail(email);
        setEditId(id);
        setModalShow(true)
    }

    async function deleteUser(id) {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'User will have Admin Privileges',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        })
        if (result.value) {
            await axios.post("/admin/delete-user", { id });
            setChange(!change);
        }
    }

    return (
        <div>
            <AdminNavbar />
            <Container className='mt-5'>
                <Row>
                    <div className='mb-3' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <form className='form' action="">
                            <input className='input' onChange={(e) => {
                            setSearch(e.target.value)
                            setChange(!change)
                        }} type="search" required />
                                <i class="fa"><FaSearch /></i>
                        </form>
                        
                    </div>
                    <Table striped bordered hover variant="dark">
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
                                                <Dropdown.Item onClick={() => blockUser(user._id)}>{user.isActive === true ? "Block" : "Unblock"}</Dropdown.Item>
                                                <Dropdown.Item onClick={() => editUser(user._id, user.email)}>Edit</Dropdown.Item>
                                                <Dropdown.Item onClick={() => deleteUser(user._id)}>Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                    <MyVerticallyCenteredModal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                        email={editEmail}
                                        id={editId}
                                        change={change}
                                        setChange={setChange}
                                    />
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
