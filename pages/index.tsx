import Axios from 'axios';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import CSVParse from 'csv-parse/lib/sync';
import { useEffect, useState } from 'react';
import { buildSearchIndex, numerifyCaseCount } from '@utils/search';
import { Search } from 'js-search';
import SearchBar from '@components/SearchBar';
import SearchResults from '@components/SearchResults';
import { displayLocalizedDatetime } from '@utils/time';
import Stat from '@components/Stat';
import Head from 'next/head';

const sortSearchResults = (results: SearchRecord[]): SearchRecord[] => {
  const countTotalCases = (x: SearchRecord): number => {
    return (
      numerifyCaseCount(x.staff_cases_cumulative, true) +
      numerifyCaseCount(x.student_cases_cumulative, true)
    );
  };

  return results
    .sort((a, b) => {
      const aCount = countTotalCases(a);
      const bCount = countTotalCases(b);
      return aCount - bCount;
    })
    .reverse();
};

type Props = {
  dataCollectedDate: number;
  records: SearchRecord[];
  totalStaffCases: number;
  totalNewStaffCases: number;
  totalStudentCases: number;
  totalNewStudentCases: number;
};

const Home: NextPage<Props> = ({
  dataCollectedDate,
  records,
  totalStaffCases,
  totalNewStaffCases,
  totalNewStudentCases,
  totalStudentCases,
}) => {
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
      sortSearchResults(
        searchIndex.search(
          decodeURIComponent(router.query.q as string)
        ) as SearchRecord[]
      )
    );
  }, [router.query.q, searchIndex]);

  return (
    <>
      <Head>
        <title>Ohio School/District COVID-19 Case Tracker</title>
      </Head>
      <div className="flex flex-col items-stretch h-screen lg:flex-row">
        <div>
          <div className="max-w-2xl px-5 py-8 mx-auto lg:h-screen lg:overflow-y-auto lg:px-12">
            <h1 className="mb-2 font-sans text-2xl font-bold leading-tight text-center text-gray-900 sm:text-3xl md:text-4xl sm:leading-normal">
              Ohio School/District COVID-19 Case Tracker
            </h1>
            <p className="text-sm text-center text-gray-600 sm:text-md">
              Data last retrieved{' '}
              <b>{displayLocalizedDatetime(new Date(dataCollectedDate))}</b>
            </p>
            <p className="mb-6 text-xs italic text-center text-gray-600">
              Data typically updated every Thursday by the Ohio Department of
              Health.
            </p>
            <div className="flex justify-center p-5 mb-6 border border-gray-400 rounded-lg shadow-md">
              <div className="mr-5 sm:mr-20">
                <Stat
                  value={totalStudentCases}
                  valueChange={totalNewStudentCases}
                  label="Student Cases"
                />
              </div>
              <Stat
                value={totalStaffCases}
                valueChange={totalNewStaffCases}
                label="Staff Cases"
              />
            </div>
            <div style={{ marginBottom: '-1rem' }} className="lg:pb-4">
              <h2 className="mb-4 text-lg font-bold text-center text-gray-600 sm:text-xl">
                Top 5 Schools/Districts With Most Cases
              </h2>
              <SearchResults results={records.slice(0, 5)} onWhiteBg />
            </div>
          </div>
        </div>
        <div className="flex-grow bg-gray-200 lg:overflow-y-auto lg:h-screen">
          <div className="max-w-2xl px-5 pt-8 mx-auto mb-6">
            <div className="mb-6">
              <SearchBar
                onSearch={onSearch}
                defaultValue={
                  router.query.q
                    ? decodeURIComponent(router.query.q as string)
                    : undefined
                }
              />
            </div>

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
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (): Promise<any> => {
  const res = await Axios.get(
    'https://coronavirus.ohio.gov/static/dashboards/school_reporting.csv'
  );
  const csv = res.data;
  const records: SearchRecord[] = sortSearchResults(
    CSVParse(csv, {
      columns: true,
      skip_empty_lines: true,
    })
  );

  // Count total cases for students and staff
  const {
    totalStaffCases,
    totalNewStaffCases,
    totalStudentCases,
    totalNewStudentCases,
  } = records.reduce(
    (acc, record) => {
      acc.totalStaffCases += numerifyCaseCount(record.staff_cases_cumulative);
      acc.totalNewStaffCases += numerifyCaseCount(record.staff_cases_new);
      acc.totalStudentCases += numerifyCaseCount(
        record.student_cases_cumulative
      );
      acc.totalNewStudentCases += numerifyCaseCount(record.student_cases_new);
      return acc;
    },
    {
      totalStaffCases: 0,
      totalNewStaffCases: 0,
      totalStudentCases: 0,
      totalNewStudentCases: 0,
    }
  );

  return {
    props: {
      records,
      dataCollectedDate: Date.now(),
      totalStaffCases,
      totalNewStaffCases,
      totalStudentCases,
      totalNewStudentCases,
    },
  };
};
