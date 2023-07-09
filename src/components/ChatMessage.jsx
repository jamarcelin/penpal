import './ChatMessage.css'
import React, { useState } from 'react';

function Hint(props) {
    const { message, hoveredIndex, mousePosition } = props;

    return (
        <div>
            {hoveredIndex !== -1 && message.feedback.length > hoveredIndex && (
                <div
                    className="hint"
                    style={{ left: mousePosition.x + 15, top: mousePosition.y + 25 }}
                >
                    <div>
                        <div className='feedbackType'>{message.feedback[hoveredIndex][0]}</div>
                        <div className='feedbackSolution'>{message.feedback[hoveredIndex][1]}</div>
                        <div className='feedbackExplanation'>{message.feedback[hoveredIndex][2]}</div>
                    </div>
                </div>
            )
            }
        </div >
    );
}

function ChatMessage(props) {
    const { message, index, mousePosition } = props;
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const handleMouseEnter = (currentCount) => () => {
        setHoveredIndex(currentCount);
    };
    const handleMouseOut = () => () => {
        setHoveredIndex(-1);
    };

    const highlightText = (content) => {
        const parts = content.split(/\[\[\/?h\]\]/);
        let count = -1;

        return parts.map((part, index) => {
            if (index % 2 === 1) {
                count++;
                return (
                    <span>
                        <span
                            key={index}
                            className="highlightedRed"
                            onMouseEnter={handleMouseEnter(count)}
                            onMouseOut={handleMouseOut()}
                        >
                            {part}
                        </span>
                    </span>
                );
            }
            return part;
        });
    };


    return (
        <div>
            <div
                key={index}
                className={message.sender === 'User' ? 'UserMessage' : 'PenpalMessage'}
            >
                <b>{message.sender}</b>: {highlightText(message.content)}
            </div>
            <Hint message={message} hoveredIndex={hoveredIndex} mousePosition={mousePosition} />
        </div>
    );
}

export default ChatMessage;
