import React, { useState, useEffect, useRef } from 'react'
import './chat.css'
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import deleteIcon from '@mui/icons-material/Delete';
import GroupIcon from '@mui/icons-material/Group';
import Badge from '@mui/material/Badge';
const Chat = (data) => {

    const [message, setMessage] = useState([]);
    const [currentmessage, setCurrentmessage] = useState("");
    const [member, setMember] = useState(1)
    const messageEndRef = useRef(null)
    const socket = data.data.socket;
    // console.log(data.data.name)
    useEffect(() => {

        return () => {

            socket.on("get_message", (res) => {
                setMessage((list) => [...list, res]);
                console.log(res)
            })

            socket.on('joinNewMember', (data) => {
                console.log(data)
                setMessage((list) => [...list, data]);

            })

        }
    }, [])


    useEffect(() => {
        messageEndRef.current?.scrollIntoView();
    }, [message])

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };


    async function sendMessage() {
        let newData = {
            message: currentmessage,
            author: data.data.name,
            room: data.data.room,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            status: 'message'
        }

        await socket.emit("message", newData)

        setMessage((list) => [...list, newData]);
        setCurrentmessage('')

    }

    const _handleKeyDown = (e) => {
        if (currentmessage.length > 0 || currentmessage.length != " ") {
            if (e.key === 'Enter') {
                sendMessage()
            }
        }
    }

    return (
        <div className='chat'>
            <div className='header'>

                <Chip color="info" avatar={<Avatar>ID</Avatar>}
                    label={data.data.currentRoom.ID}
                    className='Chip'

                />

                <div>
                    <h2>{data.data.currentRoom.RoomName}</h2>
                    {/* <p className='createdAt'>Created at {data.data.currentRoom.Name}</p> */}
                </div>

                <div >
                    {/* <Badge badgeContent={member} color="primary">
                        <GroupIcon color="action" />
                    </Badge> */}
                    <Chip
                        className='Chip'
                        avatar={<Avatar>{data.data.name[0]}</Avatar>}
                        label={data.data.name}
                        variant="outlined"
                    />
                </div>

            </div>

            <div className='body'>


                {message.map((res, index) => {
                    return <div key={index} className={res.status == "message" ? "message" : "joined"}>
                        {/* <Avatar className='profie-logo'>{res.author[0]}</Avatar> */}
                        <div className={res.author == data.data.name ? "your-Logo" : "other-logo"}>{res.author[0].toUpperCase()}</div>
                        <div className='message-content'>
                            <p className={res.author == data.data.name ? "you" : "other"}>
                                <h5>{res.author == data.data.name ? "you" : res.author}</h5>
                                {res.message}
                            </p>
                            {/* <span>{res.time}</span> */}
                        </div>
                    </div>
                })}

                <div ref={messageEndRef}></div>
            </div>
            <div className='footer'>
                <input
                    type="text"
                    placeholder='message'
                    value={currentmessage}
                    className="input"
                    onChange={(event) => {
                        setCurrentmessage(event.target.value)
                    }}
                    onKeyDown={_handleKeyDown}
                />

                <Button variant="contained" endIcon={<SendIcon />}
                    onClick={sendMessage}>
                    Send
                </Button>
            </div>
        </div>
    )
}

export default Chat