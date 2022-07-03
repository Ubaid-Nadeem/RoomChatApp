// import './App.css';
import { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chat from './Chat'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './room.css'
import { AppContext } from './Context'
import { Link } from "react-router-dom";
// let message = [];

function Room(data) {

    let socket = data.data
    let { chat, setChat } = useContext(AppContext);

    const [message, setMessage] = useState([])
    const [name, setName] = useState("");
    const [room, setRoom] = useState("")
    const [inRoom, setInRoom] = useState(false)
    const [allRooms, setAllRooms] = useState(null)
    const [match, setMatch] = useState(false);
    const [currentRoom, setCurrentRoom] = useState({ RoomName: '', Name: '', ID: '' })
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);



    useEffect(() => {
        return () => {






            socket.on('getRooms', (data) => {
                setAllRooms(data)
            });

            socket.on('joinRequest_status', (data) => {
                setStatus(data.status)
                setCurrentRoom(data.data)
                setChat(true)
                // console.log(data.data)
            })

            socket.on('ConnectRoom', (data) => {
                // console.log(data)
                setCurrentRoom(data)
                setName(data.Name)
                setRoom(data.ID)
            });

            socket.on('joinRequest_reject', (data) => {
                setTimeout(() => {
                    alert('Room ID is not match')
                    setStatus(data.status)
                    setOpen(false)

                }, 5000)
            })
        }
    }, [])


    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };


    function joinRoom() {
        if (name.length == 0) {
            alert('PLease fill the name feild')
        }
        else if (name.length < 3) {
            alert('Your name should be a least 3 letters')
        }
        else if (room.length == 0) {
            alert('Please enter a room ID')
        }
        else {
            socket.emit("join_request", { room, name })
            console.log(room, name)
            handleToggle()
        }

    }


    return (
        !chat ? <div className='roompage'>
            <div className='authpage'>
                <h1>Room Chat</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(event) => { setName(event.target.value) }} />
                    <TextField id="outlined-basic" label="Room ID" variant="outlined" onChange={(event) => { setRoom(event.target.value) }} />
                </Box>
                <Button onClick={joinRoom} variant="contained">Join Room</Button>
                <Link className='link' to="/createroom">Create a New Room</Link>

            </div>

            {/* <form class="row g-4">

                <div class="col-8">
                    <label for="validationDefaultUsername" class="form-label">Username</label>
                    <div class="input-group">
                        <span class="input-group-text" id="inputGroupPrepend2">@</span>
                        <input type="text" class="form-control" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required />
                    </div>
                </div>

                <div class="col-8">
                    <label for="validationDefault05" class="form-label">Zip</label>
                    <input type="text" class="form-control" id="validationDefault05" required />
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" type="submit">Submit form</button>
                </div>
            </form > */}


            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>


        </div > :
            <Chat data={{ socket, currentRoom, name, room }} />

    );
}
export default Room;