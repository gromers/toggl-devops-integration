const axios = require('axios').default;

const TogglTimeEntry = require('./togglTimeEntry');

function createBasicAuthenticationString(username, password) {
  const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');
  return `Basic ${base64Credentials}`;
}

module.exports = class TogglClient {
  constructor(config) {
    this.config = config;
    this.basicAuth = createBasicAuthenticationString(config.toggl.userName, config.toggl.password);
  }

  async fetch(options) {
    const togglResponseData = await axios.get(
      'https://www.toggl.com/api/v8/time_entries', {
        params: {
          start_date: '2019-11-05T00:00:00+02:00',
          end_date: '2019-11-13T00:00:00+02:00',
        },
        headers: {
          Authorization: this.basicAuth,
        },
      },
    );

    if (options.verbose) {
      console.log(togglResponseData);
    }

    return togglResponseData.data.map((rawDataElement) => new TogglTimeEntry(rawDataElement));
  }
};
