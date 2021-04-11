import React, { useState } from 'react';

const VoiceArea: React.FC = () => {
  const [displayText] = useState('Upload a file or speak into your microphone (coming soon!)');
  return (
    <div className="flex mt-2 border rounded">
      <div className="w-20">
        <div>
          Use Microphone
        </div>
        <div>
          Upload WAV file
        </div>
        {/* <div className="mt-2">
          <label htmlFor="audio-file">
            <input
              type="file"
              id="audio-file"
              style={{ display: 'none' }}
            />
          </label>
        </div> */}
      </div>
      <div className="h-96 p-1 overflow-auto">
        {displayText}
      </div>
    </div>
  );
};

export default VoiceArea;
