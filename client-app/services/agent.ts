import axios from 'axios';
import {
  jishoSearchWordBaseUrl,
  ankiBaseUrl,
  ankiConnectVersion,
  HttpMethods,
  AnkiConnectActionType,
  ocrBaseUrl,
} from './constants';
import {
  AddCardRequest,
  FindNotesRequest,
  GetDeckNamesRequest,
  NotesInfoRequest,
} from '../models/AnkiRequest';
import { AnkiResponse, NotesInfoResponse } from '../models/AnkiResponse';
import { Note } from '../models/Note';
import { SearchResult } from '../models/SearchResult';
import { ImageSearchResult } from '../models/ImageSearchResult';

const formatAnkiResponse = async <T>(res: Response): Promise<T> => {
  const { result, error }: AnkiResponse = await res.json();
  if (error) {
    // need to throw error manually since with anki api
    throw new Error(error.charAt(0).toUpperCase() + error.slice(1));
  }
  return result as T;
};

export const getDeckNames = async (): Promise<string[]> => {
  const payload: GetDeckNamesRequest = {
    action: AnkiConnectActionType.deckNames,
    version: ankiConnectVersion,
  };
  const response = await fetch(ankiBaseUrl, {
    method: HttpMethods.post,
    body: JSON.stringify(payload),
  });
  return formatAnkiResponse<string[]>(response);
};

export const getCurrentDeckNotes = async (
  deckName: string,
): Promise<NotesInfoResponse[]> => {
  const payload: FindNotesRequest = {
    action: AnkiConnectActionType.findNotes,
    version: ankiConnectVersion,
    params: { query: `deck:"${deckName}"` },
  };
  const response = await fetch(ankiBaseUrl, {
    method: HttpMethods.post,
    body: JSON.stringify(payload),
  });
  const noteIdArray = await formatAnkiResponse<number[]>(response);
  const newPayload: NotesInfoRequest = {
    action: AnkiConnectActionType.notesInfo,
    version: ankiConnectVersion,
    params: { notes: noteIdArray },
  };
  const newResponse = await fetch(ankiBaseUrl, {
    method: HttpMethods.post,
    body: JSON.stringify(newPayload),
  });
  return formatAnkiResponse<NotesInfoResponse[]>(newResponse);
};

export const postNote = async (note: Note): Promise<string> => {
  const payload: AddCardRequest = {
    action: AnkiConnectActionType.addNote,
    version: ankiConnectVersion,
    params: { note },
  };
  const response = await fetch(ankiBaseUrl, {
    method: HttpMethods.post,
    body: JSON.stringify(payload),
  });
  return formatAnkiResponse<string>(response);
};

export const getSearchResults = async (
  keyword: string,
): Promise<SearchResult[]> => {
  const { data } = await axios.get(
    `${jishoSearchWordBaseUrl}?keyword=${keyword}`,
  );
  return data.data;
};

export const postAnalyzeImageRequest = async (image: File): Promise<string> => {
  const { data } = await axios.post(ocrBaseUrl, image, {
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });
  return data;
};

export const getAnalysisResults = async (
  analysisId: string,
): Promise<ImageSearchResult[] | null> => {
  const { data } = await axios.get(`${ocrBaseUrl}/results/${analysisId}`);
  const { status, analyzeResult } = data;
  if (status === 'succeeded') {
    return analyzeResult.readResults;
  }
  if (status === 'failed') {
    throw new Error('Read failed');
  }
  return null;
};
