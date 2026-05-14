const { log } = require("./logger");

function syncToSalesforce(job) {
  log(`Syncing job ${job.id} to Salesforce...`);
  return Math.random() > 0.2;
}

function syncToHubSpot(job) {
  log(`Syncing job ${job.id} to HubSpot...`);
  return Math.random() > 0.2;
}

function sendTwilioNotification(job) {
  log(`Sending Twilio notification for job ${job.id}...`);
  return Math.random() > 0.1;
}

module.exports = {
  syncToSalesforce,
  syncToHubSpot,
  sendTwilioNotification,
};