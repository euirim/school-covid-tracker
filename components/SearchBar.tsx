import { useState } from 'react';

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
    <input
      className="w-full p-3 placeholder-black border border-gray-400 rounded-md shadow-md focus:border-blue-500"
      placeholder="Search a county or school"
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={_handleKeyDown}
      defaultValue={defaultValue ? defaultValue : ''}
    />
  );
};

export default SearchBar;
