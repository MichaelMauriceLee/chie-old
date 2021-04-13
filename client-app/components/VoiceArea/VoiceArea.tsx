import React from 'react';
import useSpeechToText from '../../hooks/useSpeechToText';

const VoiceArea: React.FC = () => {
  const { displayText, fetchTextFromFile, fetchTextFromMic } = useSpeechToText();

  const onClick = () => {
    fetchTextFromMic();
  };

  const onFileUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      const file = evt.target.files[0];
      fetchTextFromFile(file);
    }
  };

  return (
    <div className="flex mt-2 border rounded">
      <div className="p-4 w-30">
        <button className="flex flex-row items-center hover:text-blue-500" type="button" onClick={onClick}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          <div>
            Use Microphone
          </div>
        </button>

        <div className="mt-2">
          <label className="flex flex-row hover:text-blue-500" htmlFor="audio-file">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div>
              Upload audio file
            </div>
          </label>
          <input
            type="file"
            id="audio-file"
            style={{ display: 'none' }}
            onChange={onFileUpload}
          />
        </div>
      </div>
      <div className="h-96 p-1 overflow-auto">
        {displayText}
      </div>
    </div>
  );
};

export default VoiceArea;
