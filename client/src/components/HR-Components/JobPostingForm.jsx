import { useState } from "react";
import { createJobAPI } from "../../services/api";
import {
  CheckCircle,
  Briefcase,
  MapPin,
  Calendar,
  Tag,
  AlignLeft,
  Building2,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const JOB_TYPES = ["Full-time", "Part-time", "Internship", "Contract"];

/* ── Shared input class ─────────────────────────────────────────────────── */
const FIELD =
  "border border-slate-200 rounded-lg p-3 w-full text-sm text-slate-800 bg-white/80 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder-slate-400 hover:border-slate-300";

/* ── Label wrapper ───────────────────────────────────────────────────────── */
const Label = ({ icon: Icon, children }) => (
  <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
    {Icon && <Icon className="w-3 h-3 text-teal-500" />}
    {children}
  </label>
);

/* ── Section card ────────────────────────────────────────────────────────── */
const Card = ({ number, title, children }) => (
  <div className="relative bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
    {/* left accent bar */}
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 to-teal-600 rounded-l-2xl" />
    <div className="pl-6 pr-5 py-5">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="w-6 h-6 rounded-full bg-teal-50 border border-teal-200 text-teal-600 text-[11px] font-black flex items-center justify-center">
          {number}
        </span>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</span>
      </div>
      {children}
    </div>
  </div>
);

const JobPostingForm = ({ onJobCreated }) => {
  const [form, setForm] = useState({
    job_title: "",
    company: "Treebay Technology",
    department: "",
    location: "",
    jobType: "Full-time",
    salary: "",
    description: "",
    requirements: "",
    lastDateToApply: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.job_title.trim() || !form.location.trim() || !form.description.trim()) {
      setError("Job Title, Location, and Description are required.");
      return;
    }
    if (!form.requirements.trim()) {
      setError("Please provide at least one required skill.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        requirements: form.requirements.split(",").map((s) => s.trim()).filter(Boolean),
        salary: form.salary ? Number(form.salary) : undefined,
        lastDateToApply: form.lastDateToApply || undefined,
      };

      const data = await createJobAPI(payload);
      setSuccess(true);

      if (onJobCreated) onJobCreated(data.data);

      setTimeout(() => {
        setSuccess(false);
        setForm((prev) => ({
          ...prev,
          job_title: "",
          department: "",
          location: "",
          salary: "",
          description: "",
          requirements: "",
          lastDateToApply: "",
        }));
      }, 2500);
    } catch (err) {
      setError(err.message || "Failed to create job posting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Success screen ──────────────────────────────────────────────────── */
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center ring-8 ring-teal-50">
            <CheckCircle className="w-10 h-10 text-teal-600" strokeWidth={1.5} />
          </div>
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </span>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">Job Posted!</h3>
          <p className="text-slate-500 text-sm mt-1">The listing is now live on the jobs page.</p>
        </div>
        <div className="flex gap-2 mt-1">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-teal-400"
              style={{ opacity: 1 - i * 0.3 }}
            />
          ))}
        </div>
      </div>
    );
  }

  /* ── Form ────────────────────────────────────────────────────────────── */
  return (
    <div className="max-w-3xl mx-auto">
      {/* Page header */}
      <div className="mb-7 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">
            New Job Posting
          </h2>
          <p className="text-slate-400 text-sm mt-0.5">
            Fill in the details below to publish a new listing.
          </p>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
          HR Dashboard
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error banner */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Card 1 — Role Info */}
        <Card number="1" title="Role Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label icon={Briefcase}>Job Title *</Label>
              <input
                type="text"
                name="job_title"
                value={form.job_title}
                onChange={handleChange}
                placeholder="e.g. Senior React Developer"
                className={FIELD}
                required
              />
            </div>
            <div>
              <Label icon={Building2}>Department</Label>
              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="e.g. Engineering, Marketing"
                className={FIELD}
              />
            </div>
            <div>
              <Label icon={Building2}>Company *</Label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company name"
                className={FIELD}
                required
              />
            </div>
            <div>
              <Label icon={MapPin}>Location *</Label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Remote, Mumbai, Pune"
                className={FIELD}
                required
              />
            </div>
          </div>
        </Card>

        {/* Card 2 — Terms */}
        <Card number="2" title="Terms &amp; Schedule">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label icon={Tag}>Job Type *</Label>
              <div className="relative">
                <select
                  name="jobType"
                  value={form.jobType}
                  onChange={handleChange}
                  className={`${FIELD} appearance-none pr-9 cursor-pointer`}
                >
                  {JOB_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <Label>Salary (₹ / year)</Label>
              <input
                type="number"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="e.g. 800000"
                className={FIELD}
                min={0}
              />
            </div>
            <div>
              <Label icon={Calendar}>Last Date to Apply</Label>
              <input
                type="date"
                name="lastDateToApply"
                value={form.lastDateToApply}
                onChange={handleChange}
                className={FIELD}
              />
            </div>
          </div>
        </Card>

        {/* Card 3 — Description */}
        <Card number="3" title="Job Description">
          <Label icon={AlignLeft}>Description *</Label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            placeholder="Describe responsibilities, expectations, and the role in detail..."
            className={`${FIELD} resize-none`}
            required
          />
        </Card>

        {/* Card 4 — Skills */}
        <Card number="4" title="Required Skills">
          <Label>
            Skills *{" "}
            <span className="font-normal text-slate-400 normal-case tracking-normal ml-1">
              (comma-separated)
            </span>
          </Label>
          <input
            type="text"
            name="requirements"
            value={form.requirements}
            onChange={handleChange}
            placeholder="e.g. React, Node.js, MongoDB, REST APIs"
            className={FIELD}
            required
          />
          {form.requirements && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {form.requirements
                .split(",")
                .filter(Boolean)
                .map((s, i) => (
                  <span
                    key={i}
                    className="text-xs bg-teal-50 text-teal-700 border border-teal-200 px-2.5 py-1 rounded-full font-medium"
                  >
                    {s.trim()}
                  </span>
                ))}
            </div>
          )}
        </Card>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 hover:bg-teal-700 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 text-sm shadow-md shadow-teal-600/20 mt-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Publishing...
            </>
          ) : (
            <>
              <Briefcase className="w-4 h-4" />
              Publish Job Posting
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default JobPostingForm;
