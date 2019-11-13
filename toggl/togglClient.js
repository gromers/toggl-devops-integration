const axios = require('axios').default;
const moment = require('moment');

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
    if (!options.from || !options.to) {
      throw new Error('No valid daterange provided');
    }

    const togglResponseData = await axios.get(
      'https://www.toggl.com/api/v8/time_entries', {
        params: {
          start_date: moment(options.from).format(),
          end_date: moment(options.to).format(),
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
