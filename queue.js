class JobQueue {
  constructor() {
    this.jobs = [];
  }

  enqueue(job) {
    this.jobs.push(job);
  }

  dequeue() {
    return this.jobs.shift();
  }

  isEmpty() {
    return this.jobs.length === 0;
  }

  size() {
    return this.jobs.length;
  }
}

module.exports = JobQueue;