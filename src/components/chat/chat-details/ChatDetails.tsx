import React from 'react';

interface ChatMessage {
    text: string;
    time: string;
    isOutgoing: boolean;
}

export interface ChatDetailsProps {
    chat: {
        name: string;
        messages: ChatMessage[];
    }
}

const ChatDetails: React.FC<ChatDetailsProps> = ({ chat }) => {
    return (
        <section>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div style={{padding: '0'}}>
                        <div className="card shadow-lg border-0" style={{ padding: '0px', height: '350px', width: '300px' }}>

                            <div
                                className="card-body"
                                style={{ overflowY: 'auto', paddingLeft: '0', paddingRight: '0', fontSize: '15px', textAlign: 'initial', marginBottom: '0' }}
                            >
                                {chat.messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`d-flex flex-row ${message.isOutgoing ? 'justify-content-end' : 'justify-content-start'}`}
                                    >
                                        <div>
                                            <p
                                                className={`small p-2 ${message.isOutgoing ? 'me-3 text-white rounded bg-primary' : 'ms-3 rounded bg-light'}`}
                                            >
                                                {message.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="card-footer d-flex align-items-center p-3">
                                <input
                                    type="text"
                                    className="form-control form-control-lg mx-2"
                                    placeholder="Type your message"
                                    style={{fontSize: '12px'}}
                                />
                                <button className="btn btn-primary" style={{fontSize: '12px'}}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default ChatDetails