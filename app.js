const config = require('./config.json')
const TogglClient = require('./toggl/togglClient');
const TimeEntry = require('./timeEntry');

async function fetchTogglData() {
  const entries = await new TogglClient(config).fetch({ from: '', to: '' })
    .then((resp) => {
      console.log(resp)
    })
    .catch((err) => {
      console.log(err)
    });
    return entries;
}

fetchTogglData();