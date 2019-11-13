module.exports = class TogglTimeEntry {
  constructor(rawData) {
    this.rawData = rawData;
  }

  get raw() {
    return this.rawData;
  }
};
