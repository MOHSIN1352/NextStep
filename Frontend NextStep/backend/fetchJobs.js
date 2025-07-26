require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");
const Job = require("./models/Job");
const City = require("./models/City");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const fetchJobsForCity = async (cityName, cityId) => {
  try {
    const { data } = await axios.get("https://jsearch.p.rapidapi.com/search", {
      params: {
        query: `developer in ${cityName}, India`,
        num_pages: 2
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      }
    });

    const jobData = data.data;
    
    if (!jobData || jobData.length === 0) {
      console.warn(`⚠️ No jobs found for ${cityName}`);
      return [];
    }

    const formattedJobs = jobData.map(job => {
      if (!job.job_title || !job.employer_name) return null;

      const salary = job.job_min_salary && job.job_max_salary
        ? Math.round((job.job_min_salary + job.job_max_salary) / 2)
        : 0;

      return {
        Title: job.job_title,
        Company_Name: job.employer_name,
        Industry_Type: job.job_employment_type || "General",
        Salary: salary,
        Location: cityId
      };
    }).filter(Boolean);

    return formattedJobs;
  } catch (error) {
    console.error(`❌ Error fetching jobs for ${cityName}:`, error);
    return [];
  }
};

const fetchJobs = async () => {
  try {
    const cities = await City.find({});
    const cityMap = {};
    
    cities.forEach(city => {
      if (city.City_Name) {
        cityMap[city.City_Name.trim().toLowerCase()] = city._id;
      }
    });

    console.log(`🔹 Found ${Object.keys(cityMap).length} cities in the database`);

    let allJobs = [];
    for (const [cityName, cityId] of Object.entries(cityMap)) {
      console.log(`🌍 Fetching jobs for ${cityName}...`);
      const jobs = await fetchJobsForCity(cityName, cityId);
      allJobs.push(...jobs);
    }

    if (allJobs.length > 0) {
      const inserted = await Job.insertMany(allJobs);
      console.log(`✅ Inserted ${inserted.length} jobs`);
    } else {
      console.warn("⚠️ No jobs were inserted.");
    }
  } catch (error) {
    console.error("❌ Error during job fetching:", error);
  } finally {
    mongoose.disconnect();
  }
};

fetchJobs();
