import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

type Props = {
  onSearch: (query: string) => void;
  defaultValue?: string;
};

const SearchBar: React.FC<Props> = ({ defaultValue, onSearch }) => {
  const [query, setQuery] = useState('');
  const _handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };
  return (
    <div className="flex">
      <input
        className="w-full p-3 mr-3 placeholder-gray-600 border border-gray-400 rounded-md shadow-md focus:border-blue-500"
        placeholder="Search a county or school"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={_handleKeyDown}
        defaultValue={defaultValue ? defaultValue : ''}
      />
      <button
        className="px-4 text-white bg-blue-500 rounded-md shadow-md"
        onClick={() => onSearch(query)}
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
