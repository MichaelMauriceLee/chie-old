import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import useCreateNote from '../../hooks/useCreateNote';
import useNotification from '../../hooks/useNotification';
import { Note } from '../../models/Note';
import { NotificationType } from '../../models/Notification';
import { JapaneseWord, SearchResult } from '../../models/SearchResult';

interface SearchResultItemProps {
  searchResult: SearchResult;
  isConnectedToAnki: boolean;
  currentDeckName: string | null;
  currentDeckNotes: Record<string, boolean>;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  searchResult, isConnectedToAnki, currentDeckName, currentDeckNotes,
}) => {
  const isMobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;

  const dispatch = useNotification();
  const createSuccessNotification = () => {
    dispatch({
      type: NotificationType.Success,
      message: `Successfully added card to deck: ${currentDeckName}`,
    });
  };
  const createErrorNotification = (error: Error) => {
    dispatch({
      type: NotificationType.Error,
      message: error.message,
    });
  };
  const { mutate } = useCreateNote(createSuccessNotification, createErrorNotification);

  const isWordAlreadyInAnki = (dictWord: JapaneseWord) => {
    if (dictWord.word && currentDeckNotes[dictWord.word]) {
      return true;
    }
    if (!dictWord.word && dictWord.reading && currentDeckNotes[dictWord.reading]) {
      return true;
    }
    return false;
  };

  const showAddIcon = () => {
    if (isMobile) {
      return true;
    }
    return isConnectedToAnki;
  };

  const disableButton = (sR: JapaneseWord) => {
    if (isMobile) {
      return false;
    }
    return !isConnectedToAnki || isWordAlreadyInAnki(sR);
  };

  const isSomeWordAlreadyInAnki = () => searchResult.japanese.some(
    (dictWord) => isWordAlreadyInAnki(dictWord),
  );

  const createCardAndAddToDeck = async (i: number) => {
    let backContent = searchResult.japanese[i].word ? `${searchResult.japanese[i].reading}<br>` : '';
    searchResult.senses.forEach((sense, index) => {
      backContent += `${sense.parts_of_speech.join('; ')}<br>`;
      backContent += `${index + 1}. ${sense.english_definitions.join('; ')}`;
      if (sense.tags.length !== 0) {
        backContent += '<br>';
        backContent += sense.tags.join('; ');
      }

      if (index !== searchResult.senses.length - 1) {
        backContent += '<br>';
      }
    });

    const newNote: Note = {
      deckName: currentDeckName ?? '',
      modelName: 'Basic',
      fields: {
        Front: searchResult.japanese[i].word ?? searchResult.japanese[i].reading,
        Back: backContent,
      },
    };

    if (isMobile) { // used for adding notes on android
      if (navigator.share) {
        navigator.share(
          {
            title: searchResult.japanese[i].word ?? searchResult.japanese[i].reading,
            text: backContent,
          },
        );
      }
    } else {
      mutate(newNote);
    }
  };

  return (
    <div className={`grid md:grid-cols-3 grid-cols-1 gap-4 rounded-md border ${isSomeWordAlreadyInAnki() ? 'bg-gray-100' : ''}`}>
      <div className="col-span-1 md:pl-7 md:pr-0 md:pt-2 md:pb-2 px-2 pt-2">
        <div className="flex flex-row justify-between items-center">
          <div className="text-5xl font-bold">
            {searchResult.japanese[0].word}
          </div>

          <button
            className={`h-10 w-10 rounded-full ${disableButton(searchResult.japanese[0]) ? 'opacity-50 cursor-default' : 'hover:text-blue-500 hover:bg-gray-200 cursor-pointer'}`}
            type="button"
            disabled={disableButton(searchResult.japanese[0])}
            onClick={() => { createCardAndAddToDeck(0); }}
          >
            {showAddIcon() ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        <div className={searchResult.japanese[0].word ? 'text-2 pt-2' : 'text-5xl font-bold'}>
          {searchResult.japanese[0].reading}
        </div>

        {searchResult.is_common
          && (
            <div className="text-green-700 pt-1">
              common word
            </div>
          )}

        {searchResult.jlpt
          && (
            <div className="text-blue-700 pt-1">
              {searchResult.jlpt.join(', ').replaceAll('-', ' ')}
            </div>
          )}

        {searchResult.japanese.length !== 1 && (
          <div>
            <div className="text-gray-500 pt-2">
              Other forms
            </div>

            {searchResult.japanese.slice(1).map((sR, index) => (
              <div
                className="flex flex-row justify-between items-center"
                key={uuidv4()}
              >
                <div className="flex flex-row">
                  <div className="font-bold pr-1">
                    {sR.word}
                  </div>
                  {sR.word ? (
                    <div>
                      [
                      {sR.reading}
                      ]
                    </div>
                  ) : (
                    <div className="font-bold pr-1">
                      {sR.reading}
                    </div>
                  )}
                </div>

                <button
                  className={`h-10 w-10 rounded-full ${disableButton(sR) ? 'opacity-50 cursor-default' : 'hover:text-blue-500 hover:bg-gray-200 cursor-pointer'}`}
                  type="button"
                  disabled={disableButton(sR)}
                  onClick={() => { createCardAndAddToDeck(index + 1); }}
                >
                  {showAddIcon() ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="md:col-span-2 col-span-1 md:pl-0 py-2 pl-2 space-y-4">
        {searchResult.senses.map((sense, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <div className="text-base text-gray-500">
              {sense.parts_of_speech.join(', ')}
            </div>

            <div className="text-base">
              {index + 1}
              .
              {' '}
              {sense.english_definitions.join('; ')}
            </div>

            {sense.tags.length !== 0 && (
              <div className="text-base text-gray-500">
                {sense.tags.join('; ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultItem;
