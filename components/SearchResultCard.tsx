const convertCaseNumber = (num: string): number => {
  return num.toLowerCase() === 'no cases reported' ? -1 : parseInt(num);
};

type Props = {
  result: SearchRecord;
  onWhiteBg?: boolean;
};

const SearchResultCard: React.FC<Props> = ({ result, onWhiteBg }) => {
  const numStaffCases = convertCaseNumber(result.staff_cases_cumulative);
  const numNewStaffCases = convertCaseNumber(result.staff_cases_new);
  const numStudentCases = convertCaseNumber(result.student_cases_cumulative);
  const numNewStudentCases = convertCaseNumber(result.student_cases_new);

  return (
    <div
      className={`p-5 mb-5 bg-white rounded-lg ${
        onWhiteBg ? 'border border-gray-400' : 'shadow-xl'
      }`}
    >
      <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase">
        {result.county} County
      </h2>
      <h1 className="mb-2 text-2xl text-gray-900">
        {result.school_or_school_district}
      </h1>
      <div className="flex">
        <p className="mr-4">
          <span className="text-gray-700">Staff Cases:</span>{' '}
          <span className="font-bold">
            {numStaffCases >= 0 ? numStaffCases : 'N/A'}{' '}
            {numNewStaffCases > 0 ? (
              <span className="text-red-600">{`(+${numNewStaffCases})`}</span>
            ) : (
              ''
            )}
          </span>
        </p>
        <p>
          <span className="text-gray-700">Student Cases:</span>{' '}
          <span className="font-bold">
            {numStudentCases >= 0 ? numStudentCases : 'N/A'}{' '}
            {numNewStudentCases > 0 ? (
              <span className="text-red-600">{`(+${numNewStudentCases})`}</span>
            ) : (
              ''
            )}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SearchResultCard;
