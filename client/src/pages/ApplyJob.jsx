import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Utility: safe date conversion guard
const toDate = (val) => {
  if (!val) return null;
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
};

// Utility: stable ID for array keys
const uid = () => crypto.randomUUID();

const INITIAL_ACADEMIC = () => ({
  _id: uid(),
  educationLevel: "Graduation",
  degree: "",
  specialization: "",
  institutionName: "",
  boardOrUniversity: "",
  startYear: "",
  endYear: "",
  percentageOrCGPA: "",
  backlogs: { hasBacklogs: false, count: 0 },
  mode: "Regular",
});

const INITIAL_EXPERIENCE = () => ({
  _id: uid(),
  companyName: "",
  jobTitle: "",
  employmentType: "Full-time",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  currentSalary: "",
  expectedSalary: "",
  noticePeriod: "",
  jobDescription: "",
  skillsUsed: "",
});

const INITIAL_PROJECT = () => ({
  _id: uid(),
  title: "",
  description: "",
  technologies: "",
  githubLink: "",
  liveLink: "",
});

// --- Progress Bar ---
const SECTIONS = [
  "Personal Details",
  "Academics",
  "Experience",
  "Projects",
  "Skills",
  "Other Details",
  "Documents",
  "Declaration",
];

const ProgressBar = ({ current }) => (
  <div className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 py-3 shadow-sm">
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-teal-700">
          Section {current} of {SECTIONS.length}:{" "}
          <span className="text-gray-600 font-normal">{SECTIONS[current - 1]}</span>
        </span>
        <span className="text-xs text-gray-400">
          {Math.round((current / SECTIONS.length) * 100)}% complete
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div
          className="bg-teal-500 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${(current / SECTIONS.length) * 100}%` }}
        />
      </div>
    </div>
  </div>
);

// --- Toast ---
const Toast = ({ toast }) => {
  if (!toast) return null;
  const colors =
    toast.type === "success"
      ? "bg-green-50 border-green-400 text-green-800"
      : "bg-red-50 border-red-400 text-red-800";
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 border-l-4 px-5 py-4 rounded-lg shadow-lg max-w-sm ${colors}`}
    >
      <p className="font-semibold text-sm">{toast.message}</p>
    </div>
  );
};

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState(1);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const [formData, setFormData] = useState({
    personalDetails: {
      fullName: "",
      email: "",
      mobile: "",
      alternatePhone: "",
      dob: "",
      gender: "",
      nationality: "",
      address: {
        currentAddress: "",
        permanentAddress: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
      },
      profilePhoto: "",
      linkedin: "",
      portfolio: "",
      github: "",
    },
    academics: [INITIAL_ACADEMIC()],
    isFresher: true,
    experiences: [],
    skills: {
      technical: "",
      soft: "",
    },
    projects: [],
    documents: {
      resume: "",
      coverLetter: "",
      certificates: "",
    },
    otherDetails: {
      willingToRelocate: false,
      preferredLocation: "",
      workAuthorization: "",
      openToShift: false,
      expectedJoiningDate: "",
      appliedBefore: false,
      relativesInCompany: false,
    },
    declaration: {
      isTrue: false,
      acceptedPrivacyPolicy: false,
      acceptedTerms: false,
      digitalSignature: "",
    },
  });

  // --- Handlers ---

  const handleNestedChange = (section, e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [name]: val },
    }));
  };

  const handleDeepNestedChange = (section, subSection, e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSection]: { ...prev[section][subSection], [name]: value },
      },
    }));
  };

  const handleArrayChange = (section, index, e, nestedField = null) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => {
      const updatedArray = [...prev[section]];
      if (nestedField) {
        updatedArray[index] = {
          ...updatedArray[index],
          [nestedField]: { ...updatedArray[index][nestedField], [name]: val },
        };
      } else {
        updatedArray[index] = { ...updatedArray[index], [name]: val };
        if (name === "currentlyWorking" && val === true) {
          updatedArray[index].endDate = "";
        }
      }
      return { ...prev, [section]: updatedArray };
    });
  };

  const addArrayItem = (section, template) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], template],
    }));
  };

  const removeArrayItem = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  // FIX: Clear experiences when toggling back to fresher
  const handleFresherToggle = (e) => {
    const isFresher = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      isFresher,
      experiences: isFresher ? [] : prev.experiences,
    }));
  };

  // --- Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Guard: declaration checkbox is required
    if (!formData.declaration.isTrue) {
      showToast("Please confirm that all details are correct.", "error");
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      jobId,
      personalDetails: {
        ...formData.personalDetails,
        fullName: formData.personalDetails.fullName.trim(),
        email: formData.personalDetails.email.trim().toLowerCase(),
      },
      skills: {
        technical: formData.skills.technical
          ? formData.skills.technical.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        soft: formData.skills.soft
          ? formData.skills.soft.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
      },
      documents: {
        ...formData.documents,
        certificates: formData.documents.certificates
          ? formData.documents.certificates.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
      },
      academics: formData.academics.map(({ _id, ...acc }) => ({
        ...acc,
        startYear: acc.startYear ? Number(acc.startYear) : null,
        endYear: acc.endYear ? Number(acc.endYear) : null,
        percentageOrCGPA: acc.percentageOrCGPA ? Number(acc.percentageOrCGPA) : null,
        backlogs: {
          hasBacklogs: acc.backlogs.hasBacklogs,
          count: acc.backlogs.count ? Number(acc.backlogs.count) : 0,
        },
      })),
      // FIX: safe date conversion with toDate() guard
      experiences: formData.isFresher
        ? []
        : formData.experiences.map(({ _id, ...exp }) => ({
            ...exp,
            startDate: toDate(exp.startDate),
            endDate: toDate(exp.endDate),
            currentSalary: exp.currentSalary ? Number(exp.currentSalary) : 0,
            expectedSalary: exp.expectedSalary ? Number(exp.expectedSalary) : 0,
            skillsUsed: exp.skillsUsed
              ? exp.skillsUsed.split(",").map((s) => s.trim()).filter(Boolean)
              : [],
          })),
      projects: formData.projects.map(({ _id, ...proj }) => ({
        ...proj,
        technologies: proj.technologies
          ? proj.technologies.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
      })),
      otherDetails: {
        ...formData.otherDetails,
        // FIX: safe date conversion
        expectedJoiningDate: toDate(formData.otherDetails.expectedJoiningDate),
      },
      declaration: {
        ...formData.declaration,
        submittedAt: new Date(),
      },
    };

    try {
      const res = await fetch(`/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Server error: ${res.status}`);
      }

      setSubmitted(true);
      showToast("Application submitted successfully! Redirecting...");
      setTimeout(() => navigate("/"), 2500);
    } catch (error) {
      console.error("Submission error:", error);
      showToast(error.message || "Submission failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // --- Section scroll tracker ---
 useEffect(() => {
  const onScroll = () => {
    const sections = document.querySelectorAll("section[data-section]");
    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 200 && rect.bottom > 0) {
        setActiveSection(Number(sec.dataset.section));
      }
    });
  };

  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
          <p className="text-gray-500">Your application has been received. We'll be in touch soon.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProgressBar current={activeSection} />
      <Toast toast={toast} />

      <div
        className="min-h-screen py-10 bg-gray-50 flex justify-center px-4"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-5xl space-y-10"
        >
          <header className="border-b pb-4">
            <h2 className="text-3xl font-extrabold text-gray-900">Job Application Form</h2>
            <p className="text-gray-500 mt-1">
              Please fill in all details accurately as per your official documents.
            </p>
          </header>

          {/* 1. PERSONAL DETAILS */}
          <section data-section="1" className="space-y-6">
            <h3 className="text-xl font-bold text-teal-700">1. Personal Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="fullName"
                value={formData.personalDetails.fullName}
                placeholder="Full Name *"
                className="border p-3 rounded-lg w-full"
                onChange={(e) => handleNestedChange("personalDetails", e)}
                required
              />
              <input
                type="email"
                name="email"
                value={formData.personalDetails.email}
                placeholder="Email Address *"
                className="border p-3 rounded-lg w-full"
                onChange={(e) => handleNestedChange("personalDetails", e)}
                required
              />
              {/* FIX: type="tel" for mobile keyboard on phones */}
              <input
                type="tel"
                name="mobile"
                value={formData.personalDetails.mobile}
                placeholder="Mobile Number *"
                className="border p-3 rounded-lg w-full"
                onChange={(e) => handleNestedChange("personalDetails", e)}
                required
              />
              <input
                type="tel"
                name="alternatePhone"
                value={formData.personalDetails.alternatePhone}
                placeholder="Alternate Phone"
                className="border p-3 rounded-lg w-full"
                onChange={(e) => handleNestedChange("personalDetails", e)}
              />
              <div className="flex flex-col">
                <label className="text-xs text-gray-400 px-1 mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.personalDetails.dob}
                  className="border p-3 rounded-lg w-full"
                  onChange={(e) => handleNestedChange("personalDetails", e)}
                />
              </div>
              <select
                name="gender"
                value={formData.personalDetails.gender}
                className="border p-3 rounded-lg w-full"
                onChange={(e) => handleNestedChange("personalDetails", e)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                name="nationality"
                value={formData.personalDetails.nationality}
                placeholder="Nationality"
                className="border p-3 rounded-lg w-full"
                onChange={(e) => handleNestedChange("personalDetails", e)}
              />
            </div>

            {/* Profile Photo URL - FIX: was in state but missing from UI */}
            <div>
              <input
                type="url"
                name="profilePhoto"
                value={formData.personalDetails.profilePhoto}
                placeholder="Profile Photo URL (optional)"
                className="border p-3 rounded-lg w-full"
                onChange={(e) => handleNestedChange("personalDetails", e)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <textarea
                name="currentAddress"
                value={formData.personalDetails.address.currentAddress}
                placeholder="Current Address"
                className="border p-3 rounded-lg"
                onChange={(e) => handleDeepNestedChange("personalDetails", "address", e)}
              />
              <textarea
                name="permanentAddress"
                value={formData.personalDetails.address.permanentAddress}
                placeholder="Permanent Address"
                className="border p-3 rounded-lg"
                onChange={(e) => handleDeepNestedChange("personalDetails", "address", e)}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <input
                type="text"
                name="city"
                value={formData.personalDetails.address.city}
                placeholder="City"
                className="border p-3 rounded-lg"
                onChange={(e) => handleDeepNestedChange("personalDetails", "address", e)}
              />
              <input
                type="text"
                name="state"
                value={formData.personalDetails.address.state}
                placeholder="State"
                className="border p-3 rounded-lg"
                onChange={(e) => handleDeepNestedChange("personalDetails", "address", e)}
              />
              <input
                type="text"
                name="country"
                value={formData.personalDetails.address.country}
                placeholder="Country"
                className="border p-3 rounded-lg"
                onChange={(e) => handleDeepNestedChange("personalDetails", "address", e)}
              />
              <input
                type="text"
                name="pincode"
                value={formData.personalDetails.address.pincode}
                placeholder="Pincode"
                className="border p-3 rounded-lg"
                onChange={(e) => handleDeepNestedChange("personalDetails", "address", e)}
              />
            </div>

            {/* FIX: type="url" for social/portfolio links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="url"
                name="linkedin"
                value={formData.personalDetails.linkedin}
                placeholder="LinkedIn URL"
                className="border p-3 rounded-lg"
                onChange={(e) => handleNestedChange("personalDetails", e)}
              />
              <input
                type="url"
                name="github"
                value={formData.personalDetails.github}
                placeholder="GitHub Profile URL"
                className="border p-3 rounded-lg"
                onChange={(e) => handleNestedChange("personalDetails", e)}
              />
              <input
                type="url"
                name="portfolio"
                value={formData.personalDetails.portfolio}
                placeholder="Portfolio Link"
                className="border p-3 rounded-lg"
                onChange={(e) => handleNestedChange("personalDetails", e)}
              />
            </div>
          </section>

          {/* 2. ACADEMICS */}
          <section data-section="2" className="space-y-4">
            <div className="flex justify-between items-center bg-teal-50 p-3 rounded-lg">
              <h3 className="text-xl font-bold text-teal-700">2. Academic Background</h3>
              <button
                type="button"
                onClick={() => addArrayItem("academics", INITIAL_ACADEMIC())}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                + Add Education
              </button>
            </div>

            {/* FIX: key={acc._id} instead of key={index} for stable React keys */}
            {formData.academics.map((acc, index) => (
              <div
                key={acc._id}
                className="p-6 border-2 border-dashed rounded-xl relative space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <select
                    name="educationLevel"
                    value={acc.educationLevel}
                    className="border p-3 rounded-lg"
                    onChange={(e) => handleArrayChange("academics", index, e)}
                  >
                    {["10th", "12th", "Diploma", "Graduation", "Post Graduation", "PhD"].map(
                      (lvl) => (
                        <option key={lvl} value={lvl}>
                          {lvl}
                        </option>
                      )
                    )}
                  </select>
                  <input
                    type="text"
                    name="degree"
                    value={acc.degree}
                    placeholder="Degree *"
                    className="border p-3 rounded-lg"
                    onChange={(e) => handleArrayChange("academics", index, e)}
                    required
                  />
                  <input
                    type="text"
                    name="specialization"
                    value={acc.specialization}
                    placeholder="Specialization"
                    className="border p-3 rounded-lg"
                    onChange={(e) => handleArrayChange("academics", index, e)}
                  />
                  <input
                    type="text"
                    name="institutionName"
                    value={acc.institutionName}
                    placeholder="Institution Name *"
                    className="border p-3 rounded-lg"
                    onChange={(e) => handleArrayChange("academics", index, e)}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    name="boardOrUniversity"
                    value={acc.boardOrUniversity}
                    placeholder="Board / University *"
                    className="border p-3 rounded-lg"
                    onChange={(e) => handleArrayChange("academics", index, e)}
                    required
                  />
                  <input
                    type="number"
                    name="startYear"
                    value={acc.startYear}
                    placeholder="Start Year"
                    className="border p-3 rounded-lg"
                    onChange={(e) => handleArrayChange("academics", index, e)}
                    required
                  />
                  <input
                    type="number"
                    name="endYear"
                    value={acc.endYear}
                    placeholder="End Year"
                    className="border p-3 rounded-lg"
                    onChange={(e) => handleArrayChange("academics", index, e)}
                    required
                  />
                  <input
                    type="number"
                    step="0.01"
                    name="percentageOrCGPA"
                    value={acc.percentageOrCGPA}
                    placeholder="Percentage / CGPA *"
                    className="border p-3 rounded-lg"
                    onChange={(e) => handleArrayChange("academics", index, e)}
                    required
                  />
                </div>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="hasBacklogs"
                      checked={acc.backlogs.hasBacklogs}
                      onChange={(e) => handleArrayChange("academics", index, e, "backlogs")}
                    />
                    <span>Has Backlogs?</span>
                  </label>
                  {acc.backlogs.hasBacklogs && (
                    <input
                      type="number"
                      name="count"
                      value={acc.backlogs.count}
                      placeholder="Count"
                      min={1}
                      className="border p-2 rounded w-24"
                      onChange={(e) => handleArrayChange("academics", index, e, "backlogs")}
                    />
                  )}
                  <select
                    name="mode"
                    value={acc.mode}
                    className="border p-2 rounded"
                    onChange={(e) => handleArrayChange("academics", index, e)}
                  >
                    <option value="Regular">Regular</option>
                    <option value="Distance">Distance</option>
                  </select>
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("academics", index)}
                    className="absolute top-2 right-2 text-red-500 text-sm font-semibold"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </section>

          {/* 3. EXPERIENCE */}
          <section data-section="3" className="space-y-4">
            <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
              <h3 className="text-xl font-bold text-teal-700">3. Work Experience</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                {/* FIX: uses handleFresherToggle which clears experiences array */}
                <input
                  type="checkbox"
                  checked={formData.isFresher}
                  onChange={handleFresherToggle}
                />
                <span className="font-semibold">I am a Fresher</span>
              </label>
            </div>

            {!formData.isFresher && (
              <div className="space-y-6">
                <button
                  type="button"
                  onClick={() => addArrayItem("experiences", INITIAL_EXPERIENCE())}
                  className="text-sm bg-teal-100 text-teal-700 px-4 py-2 rounded-lg font-bold"
                >
                  + Add Work Experience
                </button>
                {formData.experiences.map((exp, index) => (
                  // FIX: stable key
                  <div key={exp._id} className="p-6 border-2 rounded-xl space-y-4 relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        name="companyName"
                        value={exp.companyName}
                        placeholder="Company Name"
                        className="border p-3 rounded-lg"
                        onChange={(e) => handleArrayChange("experiences", index, e)}
                      />
                      <input
                        type="text"
                        name="jobTitle"
                        value={exp.jobTitle}
                        placeholder="Job Title"
                        className="border p-3 rounded-lg"
                        onChange={(e) => handleArrayChange("experiences", index, e)}
                      />
                      <select
                        name="employmentType"
                        value={exp.employmentType}
                        className="border p-3 rounded-lg"
                        onChange={(e) => handleArrayChange("experiences", index, e)}
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Intern">Intern</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <input
                        type="date"
                        name="startDate"
                        value={exp.startDate}
                        className="border p-3 rounded-lg"
                        onChange={(e) => handleArrayChange("experiences", index, e)}
                      />
                      <input
                        type="date"
                        name="endDate"
                        value={exp.endDate}
                        className="border p-3 rounded-lg"
                        disabled={exp.currentlyWorking}
                        onChange={(e) => handleArrayChange("experiences", index, e)}
                      />
                      <input
                        type="number"
                        name="currentSalary"
                        value={exp.currentSalary}
                        placeholder="Current Salary (₹)"
                        className="border p-3 rounded-lg"
                        onChange={(e) => handleArrayChange("experiences", index, e)}
                      />
                      <input
                        type="number"
                        name="expectedSalary"
                        value={exp.expectedSalary}
                        placeholder="Expected Salary (₹)"
                        className="border p-3 rounded-lg"
                        onChange={(e) => handleArrayChange("experiences", index, e)}
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="currentlyWorking"
                          checked={exp.currentlyWorking}
                          onChange={(e) => handleArrayChange("experiences", index, e)}
                        />
                        Still Working?
                      </label>
                      <input
                        type="text"
                        name="noticePeriod"
                        value={exp.noticePeriod}
                        placeholder="Notice Period (e.g. 30 days)"
                        className="border p-3 rounded-lg flex-1"
                        onChange={(e) => handleArrayChange("experiences", index, e)}
                      />
                    </div>
                    <textarea
                      name="jobDescription"
                      value={exp.jobDescription}
                      placeholder="Job Description"
                      className="border p-3 rounded-lg w-full h-24"
                      onChange={(e) => handleArrayChange("experiences", index, e)}
                    />
                    <input
                      type="text"
                      name="skillsUsed"
                      value={exp.skillsUsed}
                      placeholder="Skills Used (comma separated)"
                      className="border p-3 rounded-lg w-full"
                      onChange={(e) => handleArrayChange("experiences", index, e)}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("experiences", index)}
                      className="absolute top-2 right-2 text-red-500 text-sm font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 4. PROJECTS */}
          <section data-section="4" className="space-y-4">
            <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
              <h3 className="text-xl font-bold text-teal-700">4. Key Projects</h3>
              <button
                type="button"
                onClick={() => addArrayItem("projects", INITIAL_PROJECT())}
                className="text-sm bg-teal-100 text-teal-700 px-4 py-2 rounded-lg font-bold"
              >
                + Add Project
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.projects.map((proj, index) => (
                // FIX: stable key
                <div key={proj._id} className="p-4 border rounded-xl relative space-y-3">
                  <input
                    type="text"
                    name="title"
                    value={proj.title}
                    placeholder="Project Title"
                    className="border p-3 rounded-lg w-full font-bold"
                    onChange={(e) => handleArrayChange("projects", index, e)}
                  />
                  <textarea
                    name="description"
                    value={proj.description}
                    placeholder="Project Description"
                    className="border p-3 rounded-lg w-full"
                    onChange={(e) => handleArrayChange("projects", index, e)}
                  />
                  <input
                    type="text"
                    name="technologies"
                    value={proj.technologies}
                    placeholder="Technologies (comma separated)"
                    className="border p-3 rounded-lg w-full"
                    onChange={(e) => handleArrayChange("projects", index, e)}
                  />
                  {/* FIX: type="url" for link inputs */}
                  <input
                    type="url"
                    name="githubLink"
                    value={proj.githubLink}
                    placeholder="GitHub Link"
                    className="border p-3 rounded-lg w-full text-blue-600"
                    onChange={(e) => handleArrayChange("projects", index, e)}
                  />
                  <input
                    type="url"
                    name="liveLink"
                    value={proj.liveLink}
                    placeholder="Live Demo Link"
                    className="border p-3 rounded-lg w-full text-blue-600"
                    onChange={(e) => handleArrayChange("projects", index, e)}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem("projects", index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* 5. SKILLS */}
          <section data-section="5" className="space-y-4">
            <h3 className="text-xl font-bold text-teal-700">5. Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <textarea
                name="technical"
                value={formData.skills.technical}
                placeholder="Technical Skills (e.g. React, Node.js, Python) *"
                className="border p-4 rounded-xl h-32"
                onChange={(e) => handleNestedChange("skills", e)}
                required
              />
              <textarea
                name="soft"
                value={formData.skills.soft}
                placeholder="Soft Skills (e.g. Leadership, Communication)"
                className="border p-4 rounded-xl h-32"
                onChange={(e) => handleNestedChange("skills", e)}
              />
            </div>
          </section>

          {/* 6. OTHER DETAILS */}
          <section data-section="6" className="space-y-6 bg-teal-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-teal-700">6. Other Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="willingToRelocate"
                  checked={formData.otherDetails.willingToRelocate}
                  onChange={(e) => handleNestedChange("otherDetails", e)}
                />{" "}
                Willing to Relocate?
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="openToShift"
                  checked={formData.otherDetails.openToShift}
                  onChange={(e) => handleNestedChange("otherDetails", e)}
                />{" "}
                Open to Rotational Shifts?
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="appliedBefore"
                  checked={formData.otherDetails.appliedBefore}
                  onChange={(e) => handleNestedChange("otherDetails", e)}
                />{" "}
                Applied to us before?
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="relativesInCompany"
                  checked={formData.otherDetails.relativesInCompany}
                  onChange={(e) => handleNestedChange("otherDetails", e)}
                />{" "}
                Relatives in Company?
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="preferredLocation"
                value={formData.otherDetails.preferredLocation}
                placeholder="Preferred Work Location"
                className="border p-3 rounded-lg"
                onChange={(e) => handleNestedChange("otherDetails", e)}
              />
              <input
                type="text"
                name="workAuthorization"
                value={formData.otherDetails.workAuthorization}
                placeholder="Work Authorization (e.g. H1B, Indian Citizen)"
                className="border p-3 rounded-lg"
                onChange={(e) => handleNestedChange("otherDetails", e)}
              />
              <div className="flex flex-col">
                <label className="text-xs text-gray-400 mb-1">Earliest Joining Date</label>
                <input
                  type="date"
                  name="expectedJoiningDate"
                  value={formData.otherDetails.expectedJoiningDate}
                  className="border p-3 rounded-lg"
                  onChange={(e) => handleNestedChange("otherDetails", e)}
                />
              </div>
            </div>
          </section>

          {/* 7. DOCUMENTS */}
          <section data-section="7" className="space-y-4">
            <h3 className="text-xl font-bold text-teal-700">7. Documents</h3>
            {/* FIX: type="url" for resume and certificates */}
            <input
              type="url"
              name="resume"
              value={formData.documents.resume}
              placeholder="Resume URL (Google Drive / Dropbox Link) *"
              className="border p-3 rounded-lg w-full border-teal-300"
              onChange={(e) => handleNestedChange("documents", e)}
              required
            />
            <textarea
              name="coverLetter"
              value={formData.documents.coverLetter}
              placeholder="Cover Letter (Optional)"
              className="border p-3 rounded-lg w-full h-32"
              onChange={(e) => handleNestedChange("documents", e)}
            />
            <input
              type="text"
              name="certificates"
              value={formData.documents.certificates}
              placeholder="Certificate URLs (comma separated)"
              className="border p-3 rounded-lg w-full"
              onChange={(e) => handleNestedChange("documents", e)}
            />
          </section>

          {/* 8. DECLARATION */}
          <section data-section="8" className="space-y-4 border-t pt-8">
            <h3 className="text-xl font-bold text-teal-700">8. Declaration</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  name="isTrue"
                  checked={formData.declaration.isTrue}
                  className="w-5 h-5"
                  onChange={(e) => handleNestedChange("declaration", e)}
                  required
                />
                I confirm that all details provided are correct. *
              </label>
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  name="acceptedPrivacyPolicy"
                  checked={formData.declaration.acceptedPrivacyPolicy}
                  className="w-5 h-5"
                  onChange={(e) => handleNestedChange("declaration", e)}
                />
                I accept the Privacy Policy.
              </label>
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  checked={formData.declaration.acceptedTerms}
                  className="w-5 h-5"
                  onChange={(e) => handleNestedChange("declaration", e)}
                />
                I accept the Terms & Conditions.
              </label>
            </div>
            <input
              type="text"
              name="digitalSignature"
              value={formData.declaration.digitalSignature}
              placeholder="Enter Full Name as Digital Signature *"
              className="border p-3 rounded-lg w-full italic"
              onChange={(e) => handleNestedChange("declaration", e)}
              required
            />
          </section>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-4 rounded-xl text-xl font-bold hover:bg-teal-700 transition shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit My Application"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default ApplyJob;
