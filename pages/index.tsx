import Axios from 'axios';
import { GetStaticProps, NextPage } from 'next';
import CSVParse from 'csv-parse/lib/sync';
import { useEffect, useState } from 'react';
import { buildSearchIndex } from '@utils/search';
import { Search } from 'js-search';

type Props = {
  records: {
    county: string;
    school_or_school_district: string;
    type: string;
    student_cases_new: string;
    student_cases_cumulative: string;
    staff_cases_new: string;
    staff_cases_cumulative: string;
  }[];
};

const Home: NextPage<Props> = ({ records }) => {
  const [searchIndex, setSearchIndex] = useState<Search | null>(null);
  useEffect(() => {
    setSearchIndex(buildSearchIndex(records));
  }, []);

  return (
    <>
      <h1>Hello</h1>
    </>
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
