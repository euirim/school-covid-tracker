// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { PHASE_EXPORT } = require('next/constants');

// eslint-disable-next-line no-undef
module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_EXPORT) {
    return {
      /* development only config options here */
      basePath: '/school-covid-tracker',
      assetPrefix: '/school-covid-tracker/',
    };
  }

  return {
    /* config options for all phases except export here */
  };
};
