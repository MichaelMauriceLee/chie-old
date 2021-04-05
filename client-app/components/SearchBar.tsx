import React, { useCallback, useRef, useEffect } from 'react';
import debounce from 'lodash.debounce';

interface SearchBarProps {
  keyword?: string;
  setKeyword: (param: string) => void;
  setShowImageArea: (callback: (prev: boolean) => boolean) => void;
  fetchSearchResults: () => void
  setShowInfo: (param: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  keyword, setKeyword, setShowImageArea, fetchSearchResults, setShowInfo,
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
        <div>
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
        </div>
      </div>

      <button
        className="md:h-16 md:w-16 h-8 w-8 rounded-full hover:text-blue-500 ml-2 focus:outline-none focus:ring focus:border-blue-500"
        type="button"
        aria-label="Find Text in Photo"
        onClick={() => { setShowImageArea((prev: boolean) => !prev); setShowInfo(false); }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
