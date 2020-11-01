import SearchResultCard from './SearchResultCard';

type Props = {
  results: SearchRecord[];
  onWhiteBg?: boolean;
};

const SearchResults: React.FC<Props> = ({ results, onWhiteBg }) => {
  const resultCards = results.map((result) => (
    <SearchResultCard
      key={result.school_or_school_district}
      result={result}
      onWhiteBg={onWhiteBg}
    />
  ));

  return <div>{resultCards}</div>;
};

export default SearchResults;
