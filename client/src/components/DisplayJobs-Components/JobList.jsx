// components/JobList.jsx
import { MapPin, Bell, Map } from "lucide-react";

// const jobs = [
//   {
//     id: 1,
//     title: "Piping Department Manager",
//     location: "Baton Rouge, LA, US + 1 more",
//     badge: "Company Priority",
//     postedDays: 6,
//     active: true,
//   },
//   {
//     id: 2,
//     title: "Project Accountant II",
//     location: "Navi Mumbai, MH, IN",
//     badge: "Company Priority",
//     hybrid: true,
//     postedDays: 7,
//     active: false,
//   },
//   {
//     id: 3,
//     title: "Senior Principal Electrical, Instrumentation & Control Engineer",
//     location: "Charleston, WV, US",
//     badge: "Company Priority",
//     hybrid: true,
//     postedDays: 12,
//     active: false,
//   },
// ];

const JobList = ({ jobs, selectedJob, onSelectJob }) => {
  return (
    <div className="w-full h-full flex flex-col">
      {/* List Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
        <span className="text-sm font-semibold text-gray-700">771 jobs</span>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1 cursor-pointer hover:text-teal-600">
            <span>↕</span> Sort: Company priority
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-teal-600">
            <Map className="w-3 h-3" /> Show map
          </span>
        </div>
      </div>

      {/* Alert */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50">
        <span className="text-xs text-gray-500">Turn on job alerts for this search</span>
        <button className="text-xs text-teal-600 font-semibold hover:underline">Manage</button>
      </div>

      {/* Job Cards */}
      <div className="overflow-y-auto flex-1">
        {jobs.map((job) => (
          <div
            key={job._id}
            onClick={() => onSelectJob(job)}
            className={`px-3 py-3 border-b border-gray-100 cursor-pointer transition-colors duration-150 ${
              // FIX: Use _id instead of id
              selectedJob?._id === job._id
                ? "bg-teal-50 border-l-4 border-l-teal-500"
                : "hover:bg-gray-50 border-l-4 border-l-transparent"
              }`}
          >
            <h4
              className={`text-sm font-semibold leading-snug ${selectedJob?._id === job._id ? "text-teal-700" : "text-teal-600"
                }`}
            >
              {job.job_title}
            </h4>
            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3" />
              {job.location}
            </div>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {job.badge && (
                <span className="text-[10px] font-semibold text-yellow-700 bg-yellow-100 border border-yellow-300 rounded px-1.5 py-0.5">
                  ★ {job.badge}
                </span>
              )}
              {job.jobType && (
                <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 border border-blue-200 rounded px-1.5 py-0.5">
                  {job.jobType}
                </span>
              )}
            </div>
            <p className="text-[11px] text-gray-400 mt-1.5">Posted {Math.floor((Date.now() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24))} days ago</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3 py-3 border-t border-gray-200 text-sm text-gray-600">
        <button className="hover:text-teal-600">‹</button>
        <span>1 of 78</span>
        <button className="hover:text-teal-600">›</button>
      </div>
    </div>
  );
}

export default JobList;