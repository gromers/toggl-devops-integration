module.exports = class TimeEntry {
  constructor(workItemId) {
    this.workItemId = workItemId;
    this.tags = [];
  }

  getWorkItemId() {
    return this.workItemId;
  }
};
