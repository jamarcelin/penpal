import { useState, useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage';

import './ChatWindow.css'

function InfoBar(props) {
    const { penpal, chat } = props;

    return (
        <div className="infoBar">
            <p className="penpalName">{penpal.name}</p>
            <p className="penpalLanguage">{penpal.language}</p>
            <p className="penpalProficiency">{penpal.proficiency}</p>
            <p className="chatNumber"> {chat.length}</p>
        </div>
    );
}

function ChatBox(props) {
    const { chat, loading } = props;
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(scrollToBottom, [chat]);

    return (
        <div className="chatBox">
            {chat.map((message, index) => (
                <ChatMessage message={message} index={index} mousePosition={mousePosition} />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}


function InputBox(props) {
    const { newMessage, setNewMessage, sendMessage, loading } = props;


    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim() !== '' && loading == 0) {
            sendMessage(newMessage);
            setNewMessage('');
        }

    }

    return (
        <div className="inputBox">
            <form className="inputForm" onSubmit={handleFormSubmit}>
                <input type="text" value={newMessage} onChange={handleInputChange} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

function ChatWindow(props) {
    const { penpal } = props;

    const [chat, setChat] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const [loading, setLoading] = useState(0);

    const sendMessage = async (message) => {
        setLoading(1);

        try {
            const response = await fetch('http://localhost:3000/api/review-feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const responseJson = await response.json();
            const resultJson = JSON.parse(responseJson.result);

            setLoading(2);

            const aiResponse = await fetch('http://localhost:3000/api/respond', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            if (!aiResponse.ok) {
                throw new Error('API request failed');
            }

            const aiResponseJson = await aiResponse.json(); // Parse the response as JSON



            setChat([
                ...chat,
                {
                    sender: 'User',
                    content: resultJson.text,
                    feedback: resultJson.feedback
                },
                {
                    sender: 'AI',
                    content: aiResponseJson.result,
                    feedback: []
                }
            ]);

            setLoading(0);
        } catch (error) {
            console.error('Request error:', error);
            setLoading(0);
        }
    };







    // useEffect(() => {
    //     //Testing Purposes
    //     for (let i = 0; i < 2; i++) {
    //         setTimeout(() => {
    //             setChat((prevChat) => [
    //                 ...prevChat,
    //                 {
    //                     sender: 'User',
    //                     content: "I went [[h]]too[[\h]] the [[h]]stor[[\h]] and [[h]]bougt[[\h]] some [[h]]fruts[[\h]]. [[h]]Thre[[\h]] was [[h]]alots[[\h]] of peple ther but the [[h]]servis[[\h]] wasnt good.",
    //                     feedback: [
    //                         ["Spelling", "to the", "Change 'too' to 'to' for the correct spelling of 'to'."],
    //                         ["Spelling", "store", "Change 'stor' to 'store' for the correct spelling of 'store'."],
    //                         ["Spelling", "bought", "Change 'bougt' to 'bought' for the correct spelling of 'bought'."],
    //                         ["Spelling", "fruits", "Change 'fruts' to 'fruits' for the correct spelling of 'fruits'."],
    //                         ["Spelling", "There", "Change 'Thre' to 'There' for the correct spelling of 'There'."],
    //                         ["Spelling", "lots", "Change 'alots' to 'lots' for the correct spelling of 'lots'."],
    //                         ["Spelling", "service", "Change 'servis' to 'service' for the correct spelling of 'service'."]
    //                     ]
    //                 },
    //             ]);
    //         }, i * 1); // Delay between setting chat messages
    //     }
    // }, []);

    return (
        <div className="chatWindow">
            <InfoBar penpal={penpal} chat={chat} />
            <ChatBox chat={chat} loading={loading} />
            <InputBox newMessage={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage} loading={loading} />
        </div>
    );
}

export default ChatWindow
