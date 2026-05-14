const JobQueue = require("./queue");
const { processJob } = require("./workflow");
const { log } = require("./logger");
const Metrics = require("./metrics");

const queue = new JobQueue();
const metrics = new Metrics();

const jobs = [
  { id: 1, type: "CRM Sync", source: "Salesforce" },
  { id: 2, type: "Lead Enrichment", source: "HubSpot" },
  { id: 3, type: "Notification", source: "Twilio" },
  { id: 4, type: "Follow-up Email", source: "Gmail" },
  { id: 5, type: "Data Update", source: "PostgreSQL" },
];

jobs.forEach((job) => queue.enqueue(job));

log("AgentConnect workflow engine started");

const results = [];

while (!queue.isEmpty()) {
  const job = queue.dequeue();
  const result = processJob(job);
  results.push(result);
  metrics.record(result);
}

log("Workflow summary:");
results.forEach((result) => {
  log(
    `Job ${result.jobId}: ${result.status.toUpperCase()} after ${result.attempts} attempt(s)`
  );
});

metrics.summary();