const moment = require('moment');

const config = require(`./config/${process.env.NODE_ENV}.json`);
const TogglClient = require('./toggl/togglClient');
const TimeEntry = require('./timeEntry');

const getIntegrationStartDate = (appConfig) => ((appConfig && appConfig.fromDate) ? moment(appConfig.fromDate) : moment().subtract(1, 'days'));
const getIntegrationEndDate = (appConfig) => ((appConfig && appConfig.toDate) ? moment(appConfig.toDate) : moment());

function fetchTogglData() {
  return new TogglClient(config).fetch({
    from: getIntegrationStartDate(config.app),
    to: getIntegrationEndDate(config.app),
  });
}

fetchTogglData()
  .then((togglTimeEntries) => {
    for (let i = 0; i < togglTimeEntries.length; i += 1) {
      console.log(togglTimeEntries[i].raw);
    }
  })
  .catch((err) => {
    console.log(`Error while fetching the data from toggl: ${err}`);
  });
