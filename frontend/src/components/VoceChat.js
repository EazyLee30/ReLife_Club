import React from 'react';
import './VoceChat.css';

const VoceChat = ({ channelId = 'retirement-life' }) => {
  return (
    <div className="voce-chat-container">
      <iframe
        src={`http://localhost:8080/group/${channelId}`}
        className="voce-chat-iframe"
        title="VoceChat"
        allow="microphone; camera"
      />
    </div>
  );
};

export default VoceChat; 