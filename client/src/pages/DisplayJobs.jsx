import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Common-Components/Navbar";
import Footer from "../components/Common-Components/Footer";
import SearchBar from "../components/DisplayJobs-Components/SearchBar";
import JobList from "../components/DisplayJobs-Components/JobList";
import JobDetail from "../components/DisplayJobs-Components/JobDetails";

import { fetchJobs } from "../redux/features/jobs/jobSlice";

const DisplayJobs = () => {
  const dispatch = useDispatch();

  // Redux state
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  // Local state (UI only)
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch jobs
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
  // Only set the default if we have jobs AND no job is currently selected
  if (jobs.length > 0 && !selectedJob?._id) {
    setSelectedJob(jobs[0]);
  }
}, [jobs, selectedJob?._id]); 

  const handleSelectJob = useCallback((job) => {
  setSelectedJob(job);
}, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex flex-col flex-1 w-full">
        <SearchBar onSearch={() => {}} />

        <div className="flex flex-1 w-full px-2 sm:px-4 py-4">
          <div className="flex flex-1 w-full border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">

            {/* LEFT: Job List */}
            <div
              className="w-80 min-w-[300px] border-r border-gray-200 flex flex-col"
              style={{ height: "calc(100vh - 200px)" }}
            >
              <JobList
                jobs={jobs}
                selectedJob={selectedJob}
                onSelectJob={handleSelectJob}
              />
            </div>

            {/* RIGHT: Job Detail */}
            <div
              className="flex-1 overflow-hidden"
              style={{ height: "calc(100vh - 200px)" }}
            >
              {selectedJob ? (
                <JobDetail 
                job={selectedJob} />
              ) : (
                <div className="p-6 text-gray-500">
                  Select a job to view details
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DisplayJobs;