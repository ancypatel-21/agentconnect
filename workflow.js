const { shouldRetry } = require("./retries");
const { log } = require("./logger");
const {
  syncToSalesforce,
  syncToHubSpot,
  sendTwilioNotification,
} = require("./integrations");

function processJob(job) {
  let attempt = 0;
  const maxRetries = 3;

  while (attempt < maxRetries) {
    attempt += 1;

    log(`Processing job ${job.id} for ${job.type} (attempt ${attempt})`);

    const success = Math.random() > 0.35;

    if (success) {
      let integrationSuccess = true;

      if (job.source === "Salesforce") {
        integrationSuccess = syncToSalesforce(job);
      } else if (job.source === "HubSpot") {
        integrationSuccess = syncToHubSpot(job);
      } else if (job.source === "Twilio") {
        integrationSuccess = sendTwilioNotification(job);
      }

      if (!integrationSuccess) {
        log(`Integration failed for job ${job.id}`);
        if (!shouldRetry(attempt, maxRetries)) {
          break;
        }
        log(`Retrying integration for job ${job.id}...`);
        continue;
      }

      log(`Job ${job.id} completed successfully`);
      return {
        jobId: job.id,
        status: "success",
        attempts: attempt,
      };
    }

    log(`Job ${job.id} failed`);

    if (!shouldRetry(attempt, maxRetries)) {
      break;
    }

    log(`Retrying job ${job.id}...`);
  }

  return {
    jobId: job.id,
    status: "failed",
    attempts: attempt,
  };
}

module.exports = { processJob };