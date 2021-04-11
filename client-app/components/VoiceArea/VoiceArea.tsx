import React, { useState } from 'react';

const VoiceArea: React.FC = () => {
  const [displayText] = useState('Upload a file or speak into your microphone');
  return (
    <div className="flex mt-2 border rounded">
      <div className="h-96 p-1 overflow-auto">
        {displayText}
      </div>
      <div className="w-20">
        <div />
        <div className="mt-2">
          <label htmlFor="audio-file">
            <input
              type="file"
              id="audio-file"
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default VoiceArea;
