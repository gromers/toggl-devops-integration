const config = require(`./config/${process.env.NODE_ENV}.json`);
const TogglClient = require('./toggl/togglClient');
const TimeEntry = require('./timeEntry');

async function fetchTogglData() {
  return new TogglClient(config).fetch({ from: '', to: '' });
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
