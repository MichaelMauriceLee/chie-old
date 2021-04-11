import { useQuery, UseQueryResult } from 'react-query';
import speechsdk, { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
import { getSpeechToken } from '../services/agent';

const readText = async (text: string) => {
  const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
    localStorage.getItem('speechToken') ?? '',
    localStorage.getItem('speechRegion') ?? '',
  );
  speechConfig.speechRecognitionLanguage = 'ja-JP';
  const synthesizer = new speechsdk.SpeechSynthesizer(speechConfig);
  synthesizer.speakTextAsync(text, (result) => {
    if (result.reason === ResultReason.Canceled) {
      throw new Error('Text to speech failed');
    }
    synthesizer.close();
  });
};

const useTextToSpeech = (text: string): UseQueryResult<Error> => useQuery(`textToSpeech-${text}`,
  () => readText(text),
  {
    onError: getSpeechToken,
    enabled: false,
  });

export default useTextToSpeech;