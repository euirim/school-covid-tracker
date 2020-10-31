// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { PHASE_PRODUCTION_BUILD } = require('next/constants');

// eslint-disable-next-line no-undef
module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_BUILD) {
    return {
      /* production only config options here */
      basePath: '/school-covid-tracker', // for github pages
      assetPrefix: '/school-covid-tracker/', // for github pages
    };
  }

  return {
    /* config options for all phases except production here */
  };
};
