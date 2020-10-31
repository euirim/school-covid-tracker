import Axios from 'axios';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import CSVParse from 'csv-parse/lib/sync';
import { useEffect, useState } from 'react';
import { buildSearchIndex } from '@utils/search';
import { Search } from 'js-search';
import SearchBar from '@components/SearchBar';
import SearchResults from '@components/SearchResults';

type Props = {
  records: SearchRecord[];
};

const Home: NextPage<Props> = ({ records }) => {
  const [searchIndex, setSearchIndex] = useState<Search | null>(null);
  useEffect(() => {
    setSearchIndex(buildSearchIndex(records));
  }, []);

  const router = useRouter();
  const onSearch = (query: string) => {
    router.push(
      {
        pathname: '/',
        query: { q: encodeURIComponent(query) },
      },
      undefined,
      { shallow: true } // prevent expensive redundant search indexing
    );
  };

  // Respond to URL query parameters
  // eslint-disable-next-line @typescript-eslint/ban-types
  const [searchResults, setSearchResults] = useState<SearchRecord[]>([]);
  useEffect(() => {
    if (!searchIndex) return;
    setSearchResults(
      searchIndex.search(
        decodeURIComponent(router.query.q as string)
      ) as SearchRecord[]
    );
  }, [router.query.q, searchIndex]);

  return (
    <div className="flex flex-col items-stretch h-screen">
      <div>
        <div className="max-w-2xl px-5 py-8 mx-auto">
          <h1 className="mb-4 font-sans text-4xl font-bold text-center text-gray-900">
            Ohio School COVID-19 Case Tracker
          </h1>
          <div>
            <SearchBar
              onSearch={onSearch}
              defaultValue={
                router.query.q
                  ? decodeURIComponent(router.query.q as string)
                  : undefined
              }
            />
          </div>
        </div>
      </div>
      <div className="flex-grow bg-gray-200">
        <div className="max-w-2xl px-5 pt-8 mx-auto">
          <div>
            {searchResults.length > 0 ? (
              <SearchResults results={searchResults} />
            ) : (
              <div className="p-4 bg-white rounded-lg shadow-xl">
                <p>
                  {router.query.q
                    ? 'No results found.'
                    : 'Please enter a search term.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (): Promise<any> => {
  const res = await Axios.get(
    'https://coronavirus.ohio.gov/static/dashboards/school_reporting.csv'
  );
  const csv = res.data;
  const records = CSVParse(csv, {
    columns: true,
    skip_empty_lines: true,
  });

  return {
    props: {
      records,
    },
  };
};
