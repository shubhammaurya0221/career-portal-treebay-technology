// services/api.js — Central API helper layer for the career portal
// All requests use relative paths; Vite proxies them to http://localhost:5000

const BASE = "/api";

// ─────────────────────────────────────────────
// JOBS
// ─────────────────────────────────────────────

/** Fetch all active job listings */
export const getJobs = async () => {
  // FIX bug #1: was `res.status(200).json()` — status() is not on Response.
  // Correct pattern: await fetch(...) then call .json() on the Response object.
  const res = await fetch(`${BASE}/jobs`);
  if (!res.ok) throw new Error(`Failed to fetch jobs: ${res.status}`);
  return res.json();
};

/** Fetch a single job by ID (used in ApplyJob to display job title) */
export const getJobById = async (id) => {
  const res = await fetch(`${BASE}/jobs/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch job: ${res.status}`);
  return res.json();
};

/** HR: Fetch ALL jobs (active + inactive) for management view */
export const getAllJobsForHR = async () => {
  const res = await fetch(`${BASE}/jobs/all`);
  if (!res.ok) throw new Error(`Failed to fetch all jobs: ${res.status}`);
  return res.json();
};

/** HR: Toggle a job's active/inactive status */
export const toggleJobStatus = async (id) => {
  const res = await fetch(`${BASE}/jobs/${id}/toggle`, {
    method: "PATCH",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Toggle failed: ${res.status}`);
  }
  return res.json();
};

/** HR: Create a new job posting */
export const createJobAPI = async (payload) => {
  const res = await fetch(`${BASE}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to create job: ${res.status}`);
  }
  return res.json();
};

// ─────────────────────────────────────────────
// APPLICATIONS
// ─────────────────────────────────────────────

/** Applicant submits a job application */
export const submitApplication = async (payload) => {
  const res = await fetch(`${BASE}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Submission failed: ${res.status}`);
  }
  return res.json();
};

/** HR: Get all applications, optionally filtered by jobId */
export const getApplications = async (jobId = "") => {
  const query = jobId ? `?jobId=${jobId}` : "";
  const res = await fetch(`${BASE}/applications${query}`);
  if (!res.ok) throw new Error(`Failed to fetch applications: ${res.status}`);
  return res.json();
};

/** HR: Get full details of a single application */
export const getApplicationById = async (id) => {
  const res = await fetch(`${BASE}/applications/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch application: ${res.status}`);
  return res.json();
};

/** HR: Update the status of an application */
export const updateApplicationStatus = async (id, status) => {
  const res = await fetch(`${BASE}/applications/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Status update failed: ${res.status}`);
  }
  return res.json();
};