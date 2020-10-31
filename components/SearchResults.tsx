import SearchResultCard from './SearchResultCard';

type Props = {
  results: SearchRecord[];
};

const SearchResults: React.FC<Props> = ({ results }) => {
  const resultCards = results.map((result) => (
    <SearchResultCard key={result.school_or_school_district} result={result} />
  ));

  return <div>{resultCards}</div>;
};

export default SearchResults;
