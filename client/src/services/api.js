// services/api.js

export const getJobs = async () => {
 try {
   const res = await fetch("http://localhost:5000/api/jobs");
   return res.status(200).json();
 } catch (error) {
    console.error("Error fetching jobs:", error);
 }
};