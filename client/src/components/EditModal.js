import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {
    const { id, email, change, setChange } = props;
    const [editEmail, setEditEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function editUser() {
        try {
            const data = {
                email: editEmail,
                id: id
            }
            const {status} = await axios.post('/admin/edit-user', data);
            if(status) props.onHide()
            
            setChange(!change);
        } catch (e) {
            setErrorMessage(e.response.data.errorMessage);
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <form onSubmit={(e) => {
                e.preventDefault();
                editUser()
            }
            }>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input style={{padding:'5px'}} type='email' placeholder={email} onChange={(e) => setEditEmail(e.target.value)} required />
                    <p style={{color:'red'}}>{errorMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => {
                        props.onHide()
                        setErrorMessage("")
                    }
                        }>Close</Button>
                    <Button type="submit" >Save</Button>
                </Modal.Footer>
            </form>
        </Modal >
    )
}

export default MyVerticallyCenteredModal

