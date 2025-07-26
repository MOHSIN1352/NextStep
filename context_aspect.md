# Assignment 1 – Integral Concepts for NextStep

Project: NextStep  
Author: Mohsin Pathan  
Date: 26-July-2025  

---

## 1. User

| Context                          | Important Fields                                            |
|----------------------------------|-------------------------------------------------------------|
| Profile creation and updates     | id, name, email, dob, location, interests, resumeUrl        |
| Recommendation personalization   | skills, preferences, savedJobs, savedPolicies, savedCourses |
| Saved items page                 | savedJobs, savedCourses, savedInstitutes, savedPolicies     |

---

## 2. Job

| Context                        | Important Fields                                                             |
|--------------------------------|------------------------------------------------------------------------------|
| Job listings & recommendations | title, companyName, industryType, salary, location (cityId), skillsRequired  |
| Saved jobs                     | jobId, savedDate, userId                                                     |

---

## 3. Policy

| Context                          | Important Fields                                     |
|----------------------------------|------------------------------------------------------|
| Scholarships and health schemes  | title, type, eligibility, benefits, region (stateId) |
| Saved policies                   | policyId, savedDate, userId                          |

---

## 4. Institute

| Context                        | Important Fields                                                         |
|--------------------------------|--------------------------------------------------------------------------|
| Course recommendations         | name, location (cityId), coursesOffered, ratings, infrastructureDetails  |
| Saved institutes               | instituteId, userId, savedDate                                           |

---

## 5. Course

| Context                          | Important Fields                                         |
|----------------------------------|----------------------------------------------------------|
| Personalized course suggestions  | name, instituteId, duration, fees, mode (online/offline) |
| Saved courses                    | courseId, userId, savedDate                              |

---

## 6. City

| Context                       | Important Fields                                  |
|-------------------------------|---------------------------------------------------|
| Location filter in search     | cityName, stateId, population                     |
| Referenced by Job/Institute   | cityId, location                                  |

---

## 7. State

| Context                        | Important Fields                                  |
|--------------------------------|---------------------------------------------------|
| Policy regional filtering      | stateName, regionCode, zones                      |
| Linked to cities and policies  | stateId, associatedPolicies                       |

---

## 8. Recommendation Engine

| Context                            | Important Fields                                                 |
|------------------------------------|------------------------------------------------------------------|
| Job, course & policy suggestions   | userSkills, location, pastInteractions, trendingItems, userGoals |

---

## 9. Saved Items

| Context                            | Important Fields                                  |
|------------------------------------|---------------------------------------------------|
| Centralized Saved Items page       | userId, itemId, itemType, savedTimestamp          |

---
