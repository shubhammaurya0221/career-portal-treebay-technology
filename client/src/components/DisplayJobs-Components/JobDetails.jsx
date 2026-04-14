import { MapPin, Heart, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobDetail = ({ job }) => {
  // FIX bug #2: useNavigate was missing — Apply Now crashed on every click
  const navigate = useNavigate();
  
  // 1. Safety check: If no job is selected, show a placeholder
  // console.log("Currently selected job data:", job);

  if (!job) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm italic">
        Select a job from the list to view full details.
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-full px-6 py-5">
      {/* Priority Badge - Dynamic based on job data if available */}
      <div className="mb-3">
        <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 border border-yellow-300 rounded px-2 py-1">
          ★  Featured Opportunity
        </span>
      </div>

      {/* Title Row */}
      <div className="flex items-start justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          {job.job_title}
        </h1>
        <div className="flex items-center gap-2 shrink-0 mt-1">
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-teal-600 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Location - Dynamic */}
      <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
        <MapPin className="w-4 h-4" />
        {job.location || "Remote / Not Specified"}
        <span className="text-teal-600 font-medium ml-1 cursor-pointer hover:underline">
          {job.company}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => navigate(`/apply/${job._id}`)}
          className="bg-teal-600 text-white px-5 py-2 rounded"
        >
          Apply Now
        </button>
        <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-sm px-5 py-2.5 rounded-md transition-colors">
          Save Job
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mt-6">
        <button className="text-sm font-semibold text-teal-600 border-b-2 border-teal-600 pb-2">
          Job description
        </button>
        <button className="text-sm text-gray-500 hover:text-gray-700 pb-2">Company info</button>
      </div>

      {/* Meta Info Grid - Using job fields */}
      <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Salary Range</p>
          <p className="text-gray-800 font-semibold mt-0.5">{job.salary || "N/A"}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Job Type</p>
          <p className="text-gray-800 font-semibold mt-0.5">{job.jobType || "Full-time"}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Date posted</p>
          <p className="text-gray-800 font-semibold mt-0.5">
            {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Just now"}
          </p>
        </div>
      </div>

      {/* Dynamic Description Section */}
      <div className="mt-6">
        <h2 className="text-base font-bold text-gray-900">About this role</h2>
        <div className="text-sm text-gray-600 mt-2 leading-relaxed whitespace-pre-line">
          {job.description || "No description provided for this position."}
        </div>
      </div>

      {/* Requirements / Responsibilities (if they exist in your DB) */}
      {job.requirements && (
        <div className="mt-5">
          <h2 className="text-base font-bold text-gray-900">Requirements</h2>
          <ul className="mt-2 space-y-2">
            {job.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobDetail;