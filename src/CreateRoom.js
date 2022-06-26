import React, { useState, useContext } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Createroom.css'
import { AppContext } from './Context'
import { useNavigate } from "react-router-dom";

function CreateRoom(data) {

    let navigate = useNavigate();

    let { chat, setChat } = useContext(AppContext);

    let socket = data.data
    const [roomName, setRoomName] = useState('');
    const [name, setName] = useState('');

    function CreateRoomID() {

        if (name.length == 0) {
            alert('PLease fill the name feild')
        }
        else if (name.length < 3) {
            alert('Your name should be a least 3 letters ')
        }
        else if (roomName.length == 0) {
            alert('Please enter a Room Name')
        }
        else if (roomName.length < 3) {
            alert('Your Room Name should be a least 5 letters ')
        }
        else {

            let ID = 'ID' + Math.floor(Math.random() * 10000)

            socket.emit('create_room', {
                Name: name,
                RoomName: roomName,
                ID: ID
            })
            setChat(true)
            navigate("/");

            socket.emit('connectRoom', {
                Name: name,
                RoomName: roomName,
                ID: ID
            })
        }


    }





    return (
        <div className='createRoomDiv'>
            <div className='createroom'>

                <h1>Create New Room </h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(event) => {
                        setName(event.target.value)
                    }} />
                    <TextField id="outlined-basic" label="Room Name" variant="outlined" onChange={(event) => {
                        setRoomName(event.target.value)
                    }} />
                </Box>
                <Button className='createButton' onClick={CreateRoomID} color="secondary" variant="contained">Create Room</Button>
            </div>


        </div>
    )
}
export default CreateRoom;