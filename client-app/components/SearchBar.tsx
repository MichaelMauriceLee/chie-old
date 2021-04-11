import React, { useCallback, useRef, useEffect } from 'react';
import debounce from 'lodash.debounce';

interface SearchBarProps {
  keyword?: string;
  setKeyword: (param: string) => void;
  setShowImageArea: (callback: (prev: boolean) => boolean) => void;
  setShowVoiceArea: (callback: (prev: boolean) => boolean) => void;
  fetchSearchResults: () => void
  setShowInfo: (param: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  keyword, setKeyword, setShowImageArea, setShowVoiceArea, fetchSearchResults, setShowInfo,
}) => {
  const searchBarRef = useRef<HTMLInputElement>(null);

  const onKeyUp = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      searchBarRef.current?.blur();
    }
  };

  const debouncedSubmit = useCallback(
    debounce((searchTerm) => {
      if (searchTerm) {
        fetchSearchResults();
      }
    }, 500),
    [],
  );

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    setShowInfo(false);
  };

  useEffect(() => {
    debouncedSubmit(keyword);
  }, [keyword]);

  return (
    <div className="flex flex-row justify-between items-center mt-4">
      <div className="outline relative border-2 focus-within:border-blue-500 flex-grow">
        <input
          className="block text-lg p-4 w-full appearance-none focus: outline-none bg-transparent"
          id="searchInput"
          type="text"
          placeholder=" "
          ref={searchBarRef}
          value={keyword}
          onChange={onInputChange}
          onKeyUp={onKeyUp}
        />

        <label
          className="absolute p-4 text-lg top-0 duration-300 -z-1 origin-0 bg-white"
          htmlFor="searchInput"
        >
          Search
        </label>

        {keyword && (
          <button
            className="rounded-full absolute right-5 top-1/2 transform -translate-y-2/4 z-10
          hover:text-blue-500 focus:outline-none focus:ring focus:border-blue-500"
            type="button"
            onClick={() => { setKeyword(''); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      <button
        className="md:h-16 md:w-16 h-8 w-8 rounded-full hover:text-blue-500 ml-2 focus:outline-none focus:ring focus:border-blue-500"
        type="button"
        aria-label="Activate Speech to Text"
        onClick={() => {
          setShowVoiceArea((prev: boolean) => !prev);
          setShowImageArea(() => false);
          setShowInfo(false);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
        </svg>
      </button>

      <button
        className="md:h-16 md:w-16 h-8 w-8 rounded-full hover:text-blue-500 ml-2 focus:outline-none focus:ring focus:border-blue-500"
        type="button"
        aria-label="Find Text in Photo"
        onClick={() => {
          setShowImageArea((prev: boolean) => !prev);
          setShowVoiceArea(() => false);
          setShowInfo(false);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
