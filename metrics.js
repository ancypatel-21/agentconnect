class Metrics {
  constructor() {
    this.totalJobs = 0;
    this.successfulJobs = 0;
    this.failedJobs = 0;
    this.totalAttempts = 0;
  }

  record(result) {
    this.totalJobs += 1;
    this.totalAttempts += result.attempts;

    if (result.status === "success") {
      this.successfulJobs += 1;
    } else {
      this.failedJobs += 1;
    }
  }

  summary() {
    const avgAttempts = this.totalJobs > 0 ? this.totalAttempts / this.totalJobs : 0;

    console.log("\n=== Metrics Summary ===");
    console.log(`Total jobs: ${this.totalJobs}`);
    console.log(`Successful jobs: ${this.successfulJobs}`);
    console.log(`Failed jobs: ${this.failedJobs}`);
    console.log(`Average attempts per job: ${avgAttempts.toFixed(2)}`);
  }
}

module.exports = Metrics;