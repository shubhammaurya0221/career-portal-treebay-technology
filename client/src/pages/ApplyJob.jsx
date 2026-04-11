import { useParams } from "react-router-dom";
import { useState } from "react";

const ApplyJob = () => {
  const { jobId } = useParams();

  // 1. Full State matching the entire Mongoose Schema
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
    academics: [
      {
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
      },
    ],
    isFresher: true,
    experiences: [],
    skills: {
      technical: "", // Converted to array on submit
      soft: "", // Converted to array on submit
    },
    projects: [],
    documents: {
      resume: "",
      coverLetter: "",
      certificates: "", // Converted to array on submit
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

  const [loading, setLoading] = useState(false);

  // --- Handlers ---

const handleNestedChange = (section, e) => {
  const { name, value, type, checked } = e.target;
  const val = type === "checkbox" ? checked : value;
  
  setFormData((prev) => ({
    ...prev,
    [section]: {
      ...prev[section],
      [name]: val,
    },
  }));
};

const handleDeepNestedChange = (section, subSection, e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [section]: {
      ...prev[section],
      [subSection]: {
        ...prev[section][subSection],
        [name]: value,
      },
    },
  }));
};

// CRITICAL: Updated Array Handler for nested objects like 'backlogs'
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
    }
    return { ...prev, [section]: updatedArray };
  });
};

  const addArrayItem = (section, template) => {
    setFormData({ ...formData, [section]: [...formData[section], template] });
  };

  const removeArrayItem = (section, index) => {
    const updatedArray = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updatedArray });
  };

  // --- Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      jobId,
      skills: {
        technical: formData.skills.technical.split(",").map((s) => s.trim()),
        soft: formData.skills.soft.split(",").map((s) => s.trim()),
      },
      documents: {
        ...formData.documents,
        certificates: formData.documents.certificates.split(",").map((s) => s.trim()),
      },
      // Ensure number types are correct
      academics: formData.academics.map(acc => ({
          ...acc,
          startYear: Number(acc.startYear),
          endYear: Number(acc.endYear),
          percentageOrCGPA: Number(acc.percentageOrCGPA),
          backlogs: { ...acc.backlogs, count: Number(acc.backlogs.count) }
      })),
      experiences: formData.experiences.map(exp => ({
          ...exp,
          currentSalary: Number(exp.currentSalary),
          expectedSalary: Number(exp.expectedSalary),
          skillsUsed: exp.skillsUsed ? exp.skillsUsed.split(",").map(s => s.trim()) : []
      })),
      declaration: {
          ...formData.declaration,
          submittedAt: new Date()
      }
    };

    console.log("FINAL PAYLOAD:", payload);
    console.log("submited")
    // ... fetch logic same as before
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-10 bg-gray-50 flex justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-5xl space-y-10">
        <header className="border-b pb-4">
          <h2 className="text-3xl font-extrabold text-gray-900">Job Application Form</h2>
          <p className="text-gray-500">Please fill in all details accurately as per your official documents.</p>
        </header>

        {/* 🧑‍💼 PERSONAL DETAILS */}
        <section className="space-y-6">
          <h3 className="text-xl font-bold text-teal-700 flex items-center gap-2">1. Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" name="fullName" placeholder="Full Name *" className="border p-3 rounded-lg w-full" onChange={(e) => handleNestedChange("personalDetails", e)} required />
            <input type="email" name="email" placeholder="Email Address *" className="border p-3 rounded-lg w-full" onChange={(e) => handleNestedChange("personalDetails", e)} required />
            <input type="text" name="mobile" placeholder="Mobile Number *" className="border p-3 rounded-lg w-full" onChange={(e) => handleNestedChange("personalDetails", e)} required />
            <input type="text" name="alternatePhone" placeholder="Alternate Phone" className="border p-3 rounded-lg w-full" onChange={(e) => handleNestedChange("personalDetails", e)} />
            <div className="flex flex-col">
                <label className="text-xs text-gray-400 px-1">Date of Birth</label>
                <input type="date" name="dob" className="border p-3 rounded-lg w-full" onChange={(e) => handleNestedChange("personalDetails", e)} />
            </div>
            <select name="gender" className="border p-3 rounded-lg w-full" onChange={(e) => handleNestedChange("personalDetails", e)}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <textarea name="currentAddress" placeholder="Current Address" className="border p-3 rounded-lg" onChange={(e) => handleDeepNestedChange("personalDetails", "address", e)} />
              <textarea name="permanentAddress" placeholder="Permanent Address" className="border p-3 rounded-lg" onChange={(e) => handleDeepNestedChange("personalDetails", "address", e)} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <input type="text" name="city" placeholder="City" className="border p-3 rounded-lg" onChange={(e) => handleDeepNestedChange("personalDetails", "address", e)} />
            <input type="text" name="state" placeholder="State" className="border p-3 rounded-lg" onChange={(e) => handleDeepNestedChange("personalDetails", "address", e)} />
            <input type="text" name="country" placeholder="Country" className="border p-3 rounded-lg" onChange={(e) => handleDeepNestedChange("personalDetails", "address", e)} />
            <input type="text" name="pincode" placeholder="Pincode" className="border p-3 rounded-lg" onChange={(e) => handleDeepNestedChange("personalDetails", "address", e)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" name="linkedin" placeholder="LinkedIn URL" className="border p-3 rounded-lg" onChange={(e) => handleNestedChange("personalDetails", e)} />
            <input type="text" name="github" placeholder="GitHub Profile URL" className="border p-3 rounded-lg" onChange={(e) => handleNestedChange("personalDetails", e)} />
            <input type="text" name="portfolio" placeholder="Portfolio Link" className="border p-3 rounded-lg" onChange={(e) => handleNestedChange("personalDetails", e)} />
          </div>
        </section>

        {/* 🎓 ACADEMICS */}
        <section className="space-y-4">
          <div className="flex justify-between items-center bg-teal-50 p-3 rounded-lg">
            <h3 className="text-xl font-bold text-teal-700">2. Academic Background</h3>
            <button type="button" onClick={() => addArrayItem("academics", { educationLevel: "Graduation", degree: "", specialization: "", institutionName: "", boardOrUniversity: "", startYear: "", endYear: "", percentageOrCGPA: "", backlogs: { hasBacklogs: false, count: 0 }, mode: "Regular" })} className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm">+ Add Education</button>
          </div>

          {formData.academics.map((acc, index) => (
            <div key={index} className="p-6 border-2 border-dashed rounded-xl relative space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select name="educationLevel" value={acc.educationLevel} className="border p-3 rounded-lg" onChange={(e) => handleArrayChange("academics", index, e)}>
                  {["10th", "12th", "Diploma", "Graduation", "Post Graduation", "PhD"].map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
                </select>
                <input type="text" name="degree" placeholder="Degree *" className="border p-3 rounded-lg" onChange={(e) => handleArrayChange("academics", index, e)} required />
                <input type="text" name="specialization" placeholder="Specialization" className="border p-3 rounded-lg" onChange={(e) => handleArrayChange("academics", index, e)} />
                <input type="text" name="institutionName" placeholder="Institution Name *" className="border p-3 rounded-lg" onChange={(e) => handleArrayChange("academics", index, e)} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input type="text" name="boardOrUniversity" placeholder="Board / University *" className="border p-3 rounded-lg" onChange={(e) => handleArrayChange("academics", index, e)} required />
                <input type="number" name="startYear" placeholder="Start Year" className="border p-3 rounded-lg" onChange={(e) => handleArrayChange("academics", index, e)} required />
                <input type="number" name="endYear" placeholder="End Year" className="border p-3 rounded-lg" onChange={(e) => handleArrayChange("academics", index, e)} required />
                <input type="number" step="0.01" name="percentageOrCGPA" placeholder="Percentage / CGPA *" className="border p-3 rounded-lg" onChange={(e) => handleArrayChange("academics", index, e)} required />
              </div>
              <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                      <input type="checkbox" name="hasBacklogs" onChange={(e) => handleArrayChange("academics", index, e, "backlogs")} />
                      <span>Has Backlogs?</span>
                  </label>
                  {acc.backlogs.hasBacklogs && <input type="number" name="count" placeholder="Count" className="border p-2 rounded w-24" onChange={(e) => handleArrayChange("academics", index, e, "backlogs")} />}
                  <select name="mode" className="border p-2 rounded" onChange={(e) => handleArrayChange("academics", index, e)}>
                      <option value="Regular">Regular</option>
                      <option value="Distance">Distance</option>
                  </select>
              </div>
              {index > 0 && <button type="button" onClick={() => removeArrayItem("academics", index)} className="absolute top-2 right-2 text-red-500">Remove</button>}
            </div>
          ))}
        </section>

        {/* 💼 EXPERIENCE */}
        <section className="space-y-4">
            <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                <h3 className="text-xl font-bold text-teal-700">3. Work Experience</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isFresher} onChange={(e) => setFormData({...formData, isFresher: e.target.checked})} />
                    <span className="font-semibold">I am a Fresher</span>
                </label>
            </div>

            {!formData.isFresher && (
                <div className="space-y-6">
                    <button type="button" onClick={() => addArrayItem("experiences", { companyName: "", jobTitle: "", employmentType: "Full-time", startDate: "", endDate: "", currentlyWorking: false, currentSalary: 0, expectedSalary: 0, noticePeriod: "", jobDescription: "", skillsUsed: "" })} className="text-sm bg-teal-100 text-teal-700 px-4 py-2 rounded-lg font-bold">
                        + Add Work Experience
                    </button>
                    {formData.experiences.map((exp, index) => (
                        <div key={index} className="p-6 border-2 rounded-xl space-y-4 relative">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input type="text" name="companyName" placeholder="Company Name" className="border p-3 rounded-lg" onChange={(e) => handleArrayChange("experiences", index, e)} />
                                <input type="text" name="jobTitle" placeholder="Job Title" className="border p-3 rounded-lg" onChange={(e) => handleArrayChange("experiences", index, e)} />
                                <select name="employmentType" className="border p-3 rounded-lg" onChange={(e) => handleArrayChange("experiences", index, e)}>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Intern">Intern</option>
                                    <option value="Contract">Contract</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <input type="date" name="startDate" className="border p-3 rounded-lg" onChange={(e) => handleArrayChange("experiences", index, e)} />
                                <input type="date" name="endDate" className="border p-3 rounded-lg" disabled={exp.currentlyWorking} onChange={(e) => handleArrayChange("experiences", index, e)} />
                                <input type="number" name="currentSalary" placeholder="Current Salary" className="border p-3 rounded-lg" onChange={(e) => handleArrayChange("experiences", index, e)} />
                                <input type="number" name="expectedSalary" placeholder="Expected Salary" className="border p-3 rounded-lg" onChange={(e) => handleArrayChange("experiences", index, e)} />
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2"><input type="checkbox" name="currentlyWorking" onChange={(e) => handleArrayChange("experiences", index, e)} /> Still Working?</label>
                                <input type="text" name="noticePeriod" placeholder="Notice Period (e.g. 30 days)" className="border p-3 rounded-lg flex-1" onChange={(e) => handleArrayChange("experiences", index, e)} />
                            </div>
                            <textarea name="jobDescription" placeholder="Job Description" className="border p-3 rounded-lg w-full h-24" onChange={(e) => handleArrayChange("experiences", index, e)} />
                            <input type="text" name="skillsUsed" placeholder="Skills Used (comma separated)" className="border p-3 rounded-lg w-full" onChange={(e) => handleArrayChange("experiences", index, e)} />
                            <button type="button" onClick={() => removeArrayItem("experiences", index)} className="absolute top-2 right-2 text-red-500">Remove</button>
                        </div>
                    ))}
                </div>
            )}
        </section>

        {/* 🚀 PROJECTS */}
        <section className="space-y-4">
          <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
            <h3 className="text-xl font-bold text-teal-700">4. Key Projects</h3>
            <button type="button" onClick={() => addArrayItem("projects", { title: "", description: "", technologies: "", githubLink: "", liveLink: "" })} className="text-sm bg-teal-100 text-teal-700 px-4 py-2 rounded-lg font-bold">+ Add Project</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.projects.map((proj, index) => (
                  <div key={index} className="p-4 border rounded-xl relative space-y-3">
                      <input type="text" name="title" placeholder="Project Title" className="border p-3 rounded-lg w-full font-bold" onChange={(e) => handleArrayChange("projects", index, e)} />
                      <textarea name="description" placeholder="Project Description" className="border p-3 rounded-lg w-full" onChange={(e) => handleArrayChange("projects", index, e)} />
                      <input type="text" name="technologies" placeholder="Technologies (comma separated)" className="border p-3 rounded-lg w-full" onChange={(e) => handleArrayChange("projects", index, e)} />
                      <input type="text" name="githubLink" placeholder="GitHub Link" className="border p-3 rounded-lg w-full text-blue-600" onChange={(e) => handleArrayChange("projects", index, e)} />
                      <input type="text" name="liveLink" placeholder="Live Demo Link" className="border p-3 rounded-lg w-full text-blue-600" onChange={(e) => handleArrayChange("projects", index, e)} />
                      <button type="button" onClick={() => removeArrayItem("projects", index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6">×</button>
                  </div>
              ))}
          </div>
        </section>

        {/* 🛠️ SKILLS */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-teal-700">5. Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea name="technical" placeholder="Technical Skills (e.g. React, Node.js, Python) *" className="border p-4 rounded-xl h-32" onChange={(e) => handleNestedChange("skills", e)} required />
            <textarea name="soft" placeholder="Soft Skills (e.g. Leadership, Communication)" className="border p-4 rounded-xl h-32" onChange={(e) => handleNestedChange("skills", e)} />
          </div>
        </section>

        {/* 🌍 OTHER DETAILS */}
        <section className="space-y-6 bg-teal-50 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-teal-700">6. Other Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <label className="flex items-center gap-2"><input type="checkbox" name="willingToRelocate" onChange={(e) => handleNestedChange("otherDetails", e)} /> Willing to Relocate?</label>
              <label className="flex items-center gap-2"><input type="checkbox" name="openToShift" onChange={(e) => handleNestedChange("otherDetails", e)} /> Open to Rotational Shifts?</label>
              <label className="flex items-center gap-2"><input type="checkbox" name="appliedBefore" onChange={(e) => handleNestedChange("otherDetails", e)} /> Applied to us before?</label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="preferredLocation" placeholder="Preferred Work Location" className="border p-3 rounded-lg" onChange={(e) => handleNestedChange("otherDetails", e)} />
              <input type="text" name="workAuthorization" placeholder="Work Authorization (e.g. H1B, Indian Citizen)" className="border p-3 rounded-lg" onChange={(e) => handleNestedChange("otherDetails", e)} />
              <div className="flex flex-col">
                  <label className="text-xs text-gray-400">Earliest Joining Date</label>
                  <input type="date" name="expectedJoiningDate" className="border p-3 rounded-lg" onChange={(e) => handleNestedChange("otherDetails", e)} />
              </div>
          </div>
        </section>

        {/* 📄 DOCUMENTS */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-teal-700">7. Documents</h3>
          <input type="text" name="resume" placeholder="Resume URL (Google Drive/Dropbox Link) *" className="border p-3 rounded-lg w-full border-teal-300" onChange={(e) => handleNestedChange("documents", e)} required />
          <textarea name="coverLetter" placeholder="Cover Letter (Optional)" className="border p-3 rounded-lg w-full h-32" onChange={(e) => handleNestedChange("documents", e)} />
          <input type="text" name="certificates" placeholder="Certificate URLs (comma separated)" className="border p-3 rounded-lg w-full" onChange={(e) => handleNestedChange("documents", e)} />
        </section>

        {/* ✅ DECLARATION */}
        <section className="space-y-4 border-t pt-8">
          <div className="space-y-2">
            <label className="flex items-center gap-3 text-sm"><input type="checkbox" name="isTrue" className="w-5 h-5" onChange={(e) => handleNestedChange("declaration", e)} required /> I confirm that all details provided are correct. *</label>
            <label className="flex items-center gap-3 text-sm"><input type="checkbox" name="acceptedPrivacyPolicy" className="w-5 h-5" onChange={(e) => handleNestedChange("declaration", e)} /> I accept the Privacy Policy.</label>
            <label className="flex items-center gap-3 text-sm"><input type="checkbox" name="acceptedTerms" className="w-5 h-5" onChange={(e) => handleNestedChange("declaration", e)} /> I accept the Terms & Conditions.</label>
          </div>
          <input type="text" name="digitalSignature" placeholder="Enter Full Name as Digital Signature *" className="border p-3 rounded-lg w-full italic" onChange={(e) => handleNestedChange("declaration", e)} required />
        </section>

        <button type="submit" disabled={loading} className="w-full bg-teal-600 text-white py-4 rounded-xl text-xl font-bold hover:bg-teal-700 transition shadow-lg">
          {loading ? "Processing..." : "Submit My Application"}
        </button>
      </form>
    </div>
  );
};

export default ApplyJob;