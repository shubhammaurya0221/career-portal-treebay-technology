export const fetchJobsAPI = async () => {
    try {
        const res = await fetch("http://localhost:5000/api/jobs/");
        return res.json();      
    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw error;
    }
};