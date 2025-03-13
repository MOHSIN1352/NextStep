import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api"; // Backend URL

const fetchData = async (url) => {
  try {
    const response = await fetch(`${API_URL}${url}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};

// ---------------------------
// State & City APIs
// ---------------------------
export const getStates = async () => fetchData("/state");

export const getCities = async () => fetchData("/city");

// ---------------------------
// Policy APIs
// ---------------------------
export const getPolicies = async () => fetchData("/policy");

export const addPolicy = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/policy`, formData);
    return response.data;
  } catch (error) {
    console.error("Error adding policy:", error);
    throw error;
  }
};

export const updatePolicy = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/policy/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating policy:", error);
    throw error;
  }
};

export const deletePolicy = async (id) => {
  try {
    await axios.delete(`${API_URL}/policy/${id}`);
  } catch (error) {
    console.error("Error deleting policy:", error);
    throw error;
  }
};

// ---------------------------
// Job APIs
// ---------------------------
export const getJobs = async () => fetchData("/job");

export const addJob = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/job`, formData);
    return response.data;
  } catch (error) {
    console.error("Error adding job:", error);
    throw error;
  }
};

export const updateJob = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/job/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};

export const deleteJob = async (id) => {
  try {
    await axios.delete(`${API_URL}/job/${id}`);
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
};

// ---------------------------
// Employer APIs
// ---------------------------
export const getEmployers = async () => fetchData("/employer");

export const addEmployer = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/employer`, formData);
    return response.data;
  } catch (error) {
    console.error("Error adding employer:", error);
    throw error;
  }
};

export const updateEmployer = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/employer/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating employer:", error);
    throw error;
  }
};

export const deleteEmployer = async (id) => {
  try {
    await axios.delete(`${API_URL}/employer/${id}`);
  } catch (error) {
    console.error("Error deleting employer:", error);
    throw error;
  }
};

// ---------------------------
// Institute APIs
// ---------------------------
export const getInstitutes = async () => fetchData("/institute");

export const addInstitute = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/institute`, formData);
    return response.data;
  } catch (error) {
    console.error("Error adding institute:", error);
    throw error;
  }
};

export const updateInstitute = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/institute/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating institute:", error);
    throw error;
  }
};

export const deleteInstitute = async (id) => {
  try {
    await axios.delete(`${API_URL}/institute/${id}`);
  } catch (error) {
    console.error("Error deleting institute:", error);
    throw error;
  }
};

// ---------------------------
// Hospital APIs
// ---------------------------
export const getHospitals = async () => fetchData("/hospital");

export const addHospital = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/hospital`, formData);
    return response.data;
  } catch (error) {
    console.error("Error adding hospital:", error);
    throw error;
  }
};

export const updateHospital = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/hospital/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating hospital:", error);
    throw error;
  }
};

export const deleteHospital = async (id) => {
  try {
    await axios.delete(`${API_URL}/hospital/${id}`);
  } catch (error) {
    console.error("Error deleting hospital:", error);
    throw error;
  }
};

// ---------------------------
// Course APIs
// ---------------------------
export const getCourses = async () => fetchData("/course");

export const addCourse = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/course`, formData);
    return response.data;
  } catch (error) {
    console.error("Error adding course:", error);
    throw error;
  }
};

export const updateCourse = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/course/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    await axios.delete(`${API_URL}/course/${id}`);
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};
