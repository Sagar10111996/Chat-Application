import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    ConversationList,
    Conversation,
    MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import { getAllRoomsForUser, getCurrentChat } from '../../services/chat';
import { useDispatch, useSelector } from 'react-redux';
import { setRooms, setCurrentChat, setCurrentRoomId } from '../../redux/slice/chat'

const ChatScreen = () => {

  const roomId = useSelector(state => state.chat.currentRoomId)

  // const [roomId, setRoomId] = useState(null)

  const dispatch = useDispatch()
  const chatRooms = useSelector(state => state.chat.rooms)
  const currentChat = useSelector(state => state.chat.currentChat)
  const loggedInUser = useSelector(state => state.user.details)
  console.log('LoggedinUser:', loggedInUser);
  const [currentWebSocket, setCurrentWebSocket] = useState(null)
  const [currentRoom, setCurrentRoom] = useState(null)
  const [fromUser, setFromUser] = useState("")
  console.log('fromUser:', fromUser)
  const [noMsgError, setNoMsgError] = useState(false)

  const getRooms = async () => {
    const rooms = await getAllRoomsForUser()
    dispatch(setRooms(rooms))
  }

  useEffect(() => {
    getRooms()
  }, [])

  //create websocket on room change
  useEffect( () => {
    const createWebSocketConnection = async () => {
      if (roomId !== null) {
        if (roomId === '') {
          const rooms = await getAllRoomsForUser()
          if (rooms.length) {
            let newRoomId = rooms[0].room_id
            let chatSock = new WebSocket('ws://127.0.0.1:8000/ws/' + newRoomId + '/');
            setCurrentWebSocket(chatSock);
            setCurrentRoom(rooms[0])
            dispatch(setCurrentRoomId(newRoomId))
            getCurrentChat({ room_id: newRoomId })
            setFromUser((rooms[0].to_user.id === (loggedInUser.id)) ? rooms[0].from_user.id : rooms[0].to_user.id)
          } else {
            setNoMsgError(true)
          }
  
      } else {
        // const chatSocket = new WebSocket('ws://bluebird.no-ip.org/ws/' + roomId + '/');
        const chatSocket = new WebSocket('ws://127.0.0.1:8000/ws/' + roomId + '/');
        console.log('ws://127.0.0.1:8000/ws/' + roomId + '/')
        setCurrentWebSocket(chatSocket);
        getCurrentChat({ room_id: roomId })
        }
      }
    }
    
    createWebSocketConnection()
  }, [roomId])

  useEffect(() => {
    if (currentWebSocket !== null) {
      currentWebSocket.onopen = function (e) {
        console.log("Connection Established")
      };
    }
  }, [currentWebSocket])

  if (currentWebSocket != null) {
    currentWebSocket.onmessage = function (event) {
      getCurrentChat({ room_id: roomId })
    }
  }

  return (
    <>
      {
        noMsgError
        ?
          <p style={{textAlign: 'center'}}>No messages in chats</p>
        :
          <div style={useStyles.root}>
            <MainContainer style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'row' }}>
              <ConversationList>
                {
                  chatRooms && chatRooms.map(room => {
                    let fullName = (loggedInUser.id) === room.from_user.id ? `${room.to_user.first_name} ${room.to_user.last_name}` : `${room.from_user.first_name} ${room.from_user.last_name}`
                    return (
                      <>
                        <Conversation
                          name={fullName}
                          key={room.to_user.id}
                          info={room.latest_message.content}
                          active={room.room_id === roomId}
                          onClick={() => {
                            setCurrentRoom(room)
                            // setRoomId()
                            dispatch(setCurrentRoomId(room.room_id))

                            setFromUser((room.to_user.id === (loggedInUser.id)) ? room.from_user.id : room.to_user.id)
                          }}
                        />
                        <MessageSeparator />
                      </>
                    )
                  })
                }
              </ConversationList>
                <ChatContainer>
                  <MessageList>
                    {
                      currentChat.map((chatMsgObj, index) => {
                        const msgDirection = loggedInUser.id === chatMsgObj.from_user.id ? "outgoing" : 'incoming'
                        return (
                          <>
                            <Message
                              key={index}
                              model={{
                                message: chatMsgObj.content,
                                sentTime: chatMsgObj.createdAt,
                                sender: chatMsgObj.from_user.first_name + ' ' + chatMsgObj.from_user.last_name,
                                direction: msgDirection,
                                position: "single",
                              }} 
                              />
                          </>
                        )
                      })
                    }
                  </MessageList>
                  <MessageInput placeholder="Type message here" onSend={(e) => {
                    currentWebSocket.send(JSON.stringify({
                      'content': e,
                      'room_id': roomId,
                      'from_user': loggedInUser.id,
                      'to_user': fromUser,
                    }));
                    }} 
                  />
                </ChatContainer>
            </MainContainer>
          </div>
      }
        
    </>
  )
}

export default ChatScreen
