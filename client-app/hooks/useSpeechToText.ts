import {
  ResultReason, SpeechConfig, AudioConfig, SpeechRecognizer,
} from 'microsoft-cognitiveservices-speech-sdk';
import { useState } from 'react';
import { getSpeechToken } from '../services/agent';

interface UseSpeechToText {
  displayText: string;
  fetchTextFromMic: () => Promise<void>;
  fetchTextFromFile: (audioFile: File) => Promise<void>;
}

const useSpeechToText = (): UseSpeechToText => {
  const [displayText, setDisplayText] = useState('Upload an audio file or speak into your microphone');

  const fetchTextFromMic = async () => {
    const { token, region } = await getSpeechToken();
    const speechConfig = SpeechConfig.fromAuthorizationToken(token, region);
    speechConfig.speechRecognitionLanguage = 'ja-JP';
    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechRecognizer(speechConfig, audioConfig);
    setDisplayText('Speak into your microphone...');

    recognizer.recognizeOnceAsync((result) => {
      if (result.reason === ResultReason.RecognizedSpeech) {
        setDisplayText(`RECOGNIZED: ${result.text}`);
        return;
      }
      setDisplayText('ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.');
    });
  };

  const fetchTextFromFile = async (audioFile: File) => {
    if (audioFile.name.split('.').pop() !== 'wav') {
      setDisplayText('ERROR: File must be .wav sound file.');
      return;
    }
    setDisplayText(`${audioFile.name} size=${audioFile.size} bytes`);

    const { token, region } = await getSpeechToken();
    const speechConfig = SpeechConfig.fromAuthorizationToken(token, region);
    speechConfig.speechRecognitionLanguage = 'ja-JP';
    const audioConfig = AudioConfig.fromWavFileInput(audioFile);
    const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync((result) => {
      if (result.reason === ResultReason.RecognizedSpeech) {
        setDisplayText(`RECOGNIZED: ${result.text}`);
        return;
      }
      setDisplayText('ERROR: Speech was cancelled or could not be recognized.');
    });
  };

  return {
    displayText,
    fetchTextFromMic,
    fetchTextFromFile,
  };
};

export default useSpeechToText;
