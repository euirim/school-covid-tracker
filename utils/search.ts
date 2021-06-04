import { Search } from 'js-search';

export const buildSearchIndex = (records: unknown[]): Search => {
  const search = new Search('school_or_school_district');
  search.addIndex('county');
  search.addIndex('school_or_school_district');
  // eslint-disable-next-line @typescript-eslint/ban-types
  search.addDocuments(records as Object[]);

  return search;
};

export const numerifyCaseCount = (
  rawCaseCount: string,
  negativeForInvalid?: boolean
) => {
  negativeForInvalid =
    negativeForInvalid === undefined ? false : negativeForInvalid;
  if (rawCaseCount.trim().toLowerCase() === 'no cases reported')
    return negativeForInvalid ? -1 : 0;
  const result = parseInt(rawCaseCount);
  if (!result) {
    return 0;
  }
  return result;
};
