import { useState, useEffect } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinner";

const JobListings = ({ isHomePage = false}) => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => { 
    const fetchJobListings = async () => {
      const apiUrl = isHomePage ? 
        '/api/jobs?_limit=3' : 
        '/apijobs';
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setJobListings(data);
      } catch (error) {
        console.error('Error fetching job listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobListings();
  }, []);


  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          { isHomePage ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>
        {loading && (<Spinner loading={loading} />)}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobListings.map((job) => (
            <JobListing job={job} key={job.id}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
