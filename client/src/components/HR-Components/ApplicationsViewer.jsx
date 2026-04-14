import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getApplications } from "../../services/api";
import {
  Users,
  Filter,
  RefreshCw,
  ChevronDown,
  Calendar,
  Mail,
  User,
  Briefcase,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

// ─── Status badge config ─────────────────────────────────────────────────────
const STATUS_CONFIG = {
  Submitted:     { color: "bg-blue-100 text-blue-700 border-blue-200",   icon: Clock },
  "Under Review":{ color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: AlertCircle },
  Selected:      { color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle },
  Rejected:      { color: "bg-red-100 text-red-700 border-red-200",      icon: XCircle },
  Draft:         { color: "bg-gray-100 text-gray-600 border-gray-200",   icon: Clock },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.Draft;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.color}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
};

// ─── Application card ────────────────────────────────────────────────────────
const ApplicationCard = ({ app, onViewDetail }) => {
  const name = app.personalDetails?.fullName || "—";
  const email = app.personalDetails?.email || "—";
  const jobTitle = app.jobId?.job_title || "Unknown Position";
  const dept = app.jobId?.department || "";
  const submittedAt = app.declaration?.submittedAt
    ? new Date(app.declaration.submittedAt).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
      })
    : new Date(app.createdAt).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
      });

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-3 group px-6 py-6 border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300">
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar placeholder */}
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center shrink-0 text-teal-700 font-bold text-base uppercase ring-1 ring-teal-200">
            {name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-slate-800 text-sm truncate">{name}</p>
            <p className="text-xs text-slate-400 flex items-center gap-1 truncate font-medium">
              <Mail className="w-3 h-3 shrink-0" /> {email}
            </p>
          </div>
        </div>
        <StatusBadge status={app.applicationStatus || "Submitted"} />
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-1.5 text-xs text-slate-500 mt-2">
        <span className="flex items-center gap-2">
          <Briefcase className="w-3.5 h-3.5 text-teal-500 shrink-0" />
          <span className="font-bold text-slate-700">{jobTitle}</span>
          {dept && <span className="text-slate-400 font-medium">· {dept}</span>}
        </span>
        <span className="flex items-center gap-2 font-medium">
          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          Applied on {submittedAt}
        </span>
      </div>

      {/* Action */}
      <button
        onClick={() => onViewDetail(app)}
        className="mt-4 w-full flex items-center justify-center gap-2 text-xs font-black text-white bg-slate-800 hover:bg-slate-900 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-slate-200 uppercase tracking-widest"
      >
        <Eye className="w-3.5 h-3.5" /> View Application
      </button>
    </div>
  );
};

// ─── Main applications viewer ─────────────────────────────────────────────────
const ApplicationsViewer = ({ jobs = [] }) => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(""); // "" = all jobs

  // Fetch applications whenever job filter changes
  const fetchApplications = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getApplications(selectedJobId);
      setApplications(data.data || []);
    } catch (err) {
      setError(err.message || "Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [selectedJobId]);

  const handleViewDetail = (app) => {
    navigate(`/hr/application/${app._id}`);
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-50/50 p-2 rounded-2xl border border-slate-100">
        {/* Filter by job */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="pl-9 pr-9 py-2.5 text-sm font-bold border border-slate-200 rounded-xl bg-white text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer shadow-sm hover:border-slate-300 transition-all"
          >
            <option value="">All Job Postings</option>
            {jobs.map((job) => (
              <option key={job._id} value={job._id}>
                {job.job_title} {job.department ? `(${job.department})` : ""}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>

        {/* Refresh */}
        <button
          onClick={fetchApplications}
          disabled={loading}
          className="flex items-center gap-2 text-sm font-bold text-slate-600 border border-slate-200 bg-white rounded-xl px-4 py-2.5 hover:bg-slate-50 transition-all duration-200 disabled:opacity-50 shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>

        {/* Count badge */}
        <span className="ml-auto text-xs font-black text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-widest leading-none">
          <Users className="w-3 h-3" />
          {applications.length} result{applications.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* States */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-10 h-10 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest animate-pulse">Scanning DB...</p>
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-5 py-4 rounded-2xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {!loading && !error && applications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center ring-8 ring-slate-50/50">
            <Users className="w-10 h-10 text-slate-300" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-slate-800 font-black text-lg tracking-tight">No applications found</p>
            <p className="text-slate-400 text-sm mt-1 max-w-[240px]">
              {selectedJobId
                ? "No one has applied to this specific posting yet."
                : "Your inbox is currently empty. New applications will appear here."}
            </p>
          </div>
        </div>
      )}

      {/* Grid of application cards */}
      {!loading && !error && applications.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-link-reveal">
          {applications.map((app) => (
            <ApplicationCard
              key={app._id}
              app={app}
              onViewDetail={handleViewDetail}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationsViewer;
