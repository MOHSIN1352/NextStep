const mongoose = require("mongoose");
const Hospital = require("./models/Hospital"); 
const Course = require("./models/Course");
const Employer = require("./models/Employer");
const Job = require("./models/Job");
const Policy = require('./models/Policy'); 
const City = require("./models/City");
const Institute = require("./models/Institute");

const MONGO_URI = "mongodb+srv://mohsinpathan1352:DkrgAGllCmiQOSvt@nextstep.36f6e.mongodb.net/?retryWrites=true&w=majority&appName=NextStep";

mongoose.connect(MONGO_URI)
  .then(() => console.log(" Connected to MongoDB Atlas"))
  .catch(err => console.error(" MongoDB Connection Error:", err));

const cities = [ 
    
        // Andhra Pradesh
        { City_Name: "Visakhapatnam", State_ID: "67cffe734df4cc218981e34b" },
        { City_Name: "Vijayawada", State_ID: "67cffe734df4cc218981e34b" },
        { City_Name: "Tirupati", State_ID: "67cffe734df4cc218981e34b" },
      
        // Arunachal Pradesh
        { City_Name: "Itanagar", State_ID: "67cffe734df4cc218981e34d" },
        { City_Name: "Naharlagun", State_ID: "67cffe734df4cc218981e34d" },
        { City_Name: "Pasighat", State_ID: "67cffe734df4cc218981e34d" },
      
        //  Assam
        { City_Name: "Guwahati", State_ID: "67cffe734df4cc218981e34f" },
        { City_Name: "Dibrugarh", State_ID: "67cffe734df4cc218981e34f" },
        { City_Name: "Silchar", State_ID: "67cffe734df4cc218981e34f" },
      
        //  Bihar
        { City_Name: "Patna", State_ID: "67cffe734df4cc218981e351" },
        { City_Name: "Gaya", State_ID: "67cffe734df4cc218981e351" },
        { City_Name: "Muzaffarpur", State_ID: "67cffe734df4cc218981e351" },
      
        //  Chhattisgarh
        { City_Name: "Raipur", State_ID: "67cffe734df4cc218981e353" },
        { City_Name: "Bilaspur", State_ID: "67cffe734df4cc218981e353" },
        { City_Name: "Durg", State_ID: "67cffe734df4cc218981e353" },
      
        //  Goa
        { City_Name: "Panaji", State_ID: "67cffe734df4cc218981e355" },
        { City_Name: "Vasco da Gama", State_ID: "67cffe734df4cc218981e355" },
        { City_Name: "Margao", State_ID: "67cffe734df4cc218981e355" },
      
        //  Gujarat (Excluding Ahmedabad)
        { City_Name: "Surat", State_ID: "67cffe734df4cc218981e357" },
        { City_Name: "Vadodara", State_ID: "67cffe734df4cc218981e357" },
        { City_Name: "Rajkot", State_ID: "67cffe734df4cc218981e357" },
      
        //  Haryana
        { City_Name: "Faridabad", State_ID: "67cffe734df4cc218981e359" },
        { City_Name: "Gurgaon", State_ID: "67cffe734df4cc218981e359" },
        { City_Name: "Panipat", State_ID: "67cffe734df4cc218981e359" },
      
        //  Himachal Pradesh
        { City_Name: "Shimla", State_ID: "67cffe734df4cc218981e35b" },
        { City_Name: "Manali", State_ID: "67cffe734df4cc218981e35b" },
        { City_Name: "Dharamshala", State_ID: "67cffe734df4cc218981e35b" },
      
        //  Jammu and Kashmir
        { City_Name: "Srinagar", State_ID: "67cffe734df4cc218981e391" },
        { City_Name: "Jammu", State_ID: "67cffe734df4cc218981e391" },
        { City_Name: "Baramulla", State_ID: "67cffe734df4cc218981e391" },
      
        //  Jharkhand
        { City_Name: "Ranchi", State_ID: "67cffe734df4cc218981e35d" },
        { City_Name: "Jamshedpur", State_ID: "67cffe734df4cc218981e35d" },
        { City_Name: "Dhanbad", State_ID: "67cffe734df4cc218981e35d" },
      
        //  Karnataka
        { City_Name: "Bangalore", State_ID: "67cffe734df4cc218981e35f" },
        { City_Name: "Mysore", State_ID: "67cffe734df4cc218981e35f" },
        { City_Name: "Mangalore", State_ID: "67cffe734df4cc218981e35f" },
      
        //  Kerala
        { City_Name: "Trivandrum", State_ID: "67cffe734df4cc218981e361" },
        { City_Name: "Kochi", State_ID: "67cffe734df4cc218981e361" },
        { City_Name: "Kozhikode", State_ID: "67cffe734df4cc218981e361" },
      
        //  Madhya Pradesh
        { City_Name: "Bhopal", State_ID: "67cffe734df4cc218981e363" },
        { City_Name: "Indore", State_ID: "67cffe734df4cc218981e363" },
        { City_Name: "Gwalior", State_ID: "67cffe734df4cc218981e363" },
      
        //  Maharashtra
        { City_Name: "Mumbai", State_ID: "67cffe734df4cc218981e365" },
        { City_Name: "Pune", State_ID: "67cffe734df4cc218981e365" },
        { City_Name: "Nagpur", State_ID: "67cffe734df4cc218981e365" },
      
        //  Tamil Nadu
        { City_Name: "Chennai", State_ID: "67cffe734df4cc218981e377" },
        { City_Name: "Coimbatore", State_ID: "67cffe734df4cc218981e377" },
        { City_Name: "Madurai", State_ID: "67cffe734df4cc218981e377" },
      
        //  Delhi (Union Territory)
        { City_Name: "New Delhi", State_ID: "67cffe734df4cc218981e38b" },
        { City_Name: "Dwarka", State_ID: "67cffe734df4cc218981e38b" },
        { City_Name: "Karol Bagh", State_ID: "67cffe734df4cc218981e38b" },


        //  Manipur
        { City_Name: "Imphal", State_ID: "67cffe734df4cc218981e367" },
        { City_Name: "Bishnupur", State_ID: "67cffe734df4cc218981e367" },
        { City_Name: "Churachandpur", State_ID: "67cffe734df4cc218981e367" },
        
        //  Meghalaya
        { City_Name: "Shillong", State_ID: "67cffe734df4cc218981e369" },
        { City_Name: "Tura", State_ID: "67cffe734df4cc218981e369" },
        { City_Name: "Nongstoin", State_ID: "67cffe734df4cc218981e369" },
        
        //  Mizoram
        { City_Name: "Aizawl", State_ID: "67cffe734df4cc218981e36b" },
        { City_Name: "Lunglei", State_ID: "67cffe734df4cc218981e36b" },
        { City_Name: "Champhai", State_ID: "67cffe734df4cc218981e36b" },
        
        //  Nagaland
        { City_Name: "Kohima", State_ID: "67cffe734df4cc218981e36d" },
        { City_Name: "Dimapur", State_ID: "67cffe734df4cc218981e36d" },
        { City_Name: "Mokokchung", State_ID: "67cffe734df4cc218981e36d" },
        
        //  Odisha
        { City_Name: "Bhubaneswar", State_ID: "67cffe734df4cc218981e36f" },
        { City_Name: "Cuttack", State_ID: "67cffe734df4cc218981e36f" },
        { City_Name: "Rourkela", State_ID: "67cffe734df4cc218981e36f" },
        
        //  Punjab
        { City_Name: "Ludhiana", State_ID: "67cffe734df4cc218981e371" },
        { City_Name: "Amritsar", State_ID: "67cffe734df4cc218981e371" },
        { City_Name: "Jalandhar", State_ID: "67cffe734df4cc218981e371" },
        
        //  Rajasthan
        { City_Name: "Jaipur", State_ID: "67cffe734df4cc218981e373" },
        { City_Name: "Jodhpur", State_ID: "67cffe734df4cc218981e373" },
        { City_Name: "Udaipur", State_ID: "67cffe734df4cc218981e373" },
        
        //  Sikkim
        { City_Name: "Gangtok", State_ID: "67cffe734df4cc218981e375" },
        { City_Name: "Namchi", State_ID: "67cffe734df4cc218981e375" },
        { City_Name: "Mangan", State_ID: "67cffe734df4cc218981e375" },
        
        //  Telangana
        { City_Name: "Hyderabad", State_ID: "67cffe734df4cc218981e379" },
        { City_Name: "Warangal", State_ID: "67cffe734df4cc218981e379" },
        { City_Name: "Nizamabad", State_ID: "67cffe734df4cc218981e379" },
        
        //  Tripura
        { City_Name: "Agartala", State_ID: "67cffe734df4cc218981e37b" },
        { City_Name: "Dharmanagar", State_ID: "67cffe734df4cc218981e37b" },
        { City_Name: "Udaipur", State_ID: "67cffe734df4cc218981e37b" },
        
        //  Uttar Pradesh
        { City_Name: "Lucknow", State_ID: "67cffe734df4cc218981e37d" },
        { City_Name: "Kanpur", State_ID: "67cffe734df4cc218981e37d" },
        { City_Name: "Varanasi", State_ID: "67cffe734df4cc218981e37d" },
        
        //  Uttarakhand
        { City_Name: "Dehradun", State_ID: "67cffe734df4cc218981e37f" },
        { City_Name: "Haridwar", State_ID: "67cffe734df4cc218981e37f" },
        { City_Name: "Rishikesh", State_ID: "67cffe734df4cc218981e37f" },
        
        //  West Bengal
        { City_Name: "Kolkata", State_ID: "67cffe734df4cc218981e381" },
        { City_Name: "Asansol", State_ID: "67cffe734df4cc218981e381" },
        { City_Name: "Siliguri", State_ID: "67cffe734df4cc218981e381" },
        
        //  Chandigarh (Union Territory)
        { City_Name: "Chandigarh", State_ID: "67cffe734df4cc218981e385" },
        { City_Name: "Manimajra", State_ID: "67cffe734df4cc218981e385" },
        { City_Name: "Sector 17", State_ID: "67cffe734df4cc218981e385" },
        
        //  Ladakh (Union Territory)
        { City_Name: "Leh", State_ID: "67cffe734df4cc218981e38f" },
        { City_Name: "Kargil", State_ID: "67cffe734df4cc218981e38f" },
        { City_Name: "Dras", State_ID: "67cffe734df4cc218981e38f" },
        
        //  Puducherry (Union Territory)
        { City_Name: "Puducherry", State_ID: "67cffe734df4cc218981e38d" },
        { City_Name: "Karaikal", State_ID: "67cffe734df4cc218981e38d" },
        { City_Name: "Mahe", State_ID: "67cffe734df4cc218981e38d" },
        
        //  Andaman and Nicobar Islands
        { City_Name: "Port Blair", State_ID: "67cffe734df4cc218981e383" },
        { City_Name: "Havelock Island", State_ID: "67cffe734df4cc218981e383" },
        { City_Name: "Car Nicobar", State_ID: "67cffe734df4cc218981e383" },
        
        //  Lakshadweep
        { City_Name: "Kavaratti", State_ID: "67cffe734df4cc218981e389" },
        { City_Name: "Agatti", State_ID: "67cffe734df4cc218981e389" },
        { City_Name: "Minicoy", State_ID: "67cffe734df4cc218981e389" },

        //  Dadra and Nagar Haveli and Daman and Diu
        { City_Name: "Daman", State_ID: "67cffe734df4cc218981e387" },
        { City_Name: "Diu", State_ID: "67cffe734df4cc218981e387" },
        { City_Name: "Silvassa", State_ID: "67cffe734df4cc218981e387" },

          
      
 ];


//  Insert Cities into MongoDB
async function insertCities() {
  try {
    await City.insertMany(cities);
    console.log(" Successfully inserted 3 cities!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting cities:", error);
  }
}

//  Run the function
insertCities();

//  List of Hospitals (Fixed `City_ID` & Nested Array Issue)
const facilities = [
    {
      "Name": "Sterling Hospital",
      "Facility_Type": "Hospital",
      "Longitude": 72.5718,
      "Latitude": 23.0250,
      "Contact": "9876534210",
      "Location": "Gurukul Road, Ahmedabad, Gujarat",
      "Timings": "24/7",
      "Rating": 4.7,
      "City_ID": new mongoose.Types.ObjectId("67d0023893b14064e2b2b6d0")
    },
    {
      "Name": "Zydus Hospital",
      "Facility_Type": "Hospital",
      "Longitude": 72.5801,
      "Latitude": 23.0331,
      "Contact": "9865323470",
      "Location": "SG Highway, Ahmedabad, Gujarat",
      "Timings": "24/7",
      "Rating": 4.8,
      "City_ID": new mongoose.Types.ObjectId("67d0023893b14064e2b2b6d0")
    },
    {
      "Name": "Apollo Hospital Ahmedabad",
      "Facility_Type": "Hospital",
      "Longitude": 72.5797,
      "Latitude": 23.0405,
      "Contact": "9856231780",
      "Location": "Bhat, Ahmedabad, Gujarat",
      "Timings": "24/7",
      "Rating": 4.9,
      "City_ID": new mongoose.Types.ObjectId("67d0023893b14064e2b2b6d0")
    },
    {
      "Name": "Parth Children’s Clinic",
      "Facility_Type": "Clinic",
      "Longitude": 72.5720,
      "Latitude": 23.0320,
      "Contact": "9876141230",
      "Location": "Satellite, Ahmedabad, Gujarat",
      "Timings": "9 AM - 8 PM",
      "Rating": 4.5,
      "City_ID": new mongoose.Types.ObjectId("67d0023893b14064e2b2b6d0")
    },
    {
      "Name": "Shreeji Skin & Hair Clinic",
      "Facility_Type": "Clinic",
      "Longitude": 72.5680,
      "Latitude": 23.0300,
      "Contact": "9876500214",
      "Location": "Navrangpura, Ahmedabad, Gujarat",
      "Timings": "10 AM - 7 PM",
      "Rating": 4.6,
      "City_ID": new mongoose.Types.ObjectId("67d0023893b14064e2b2b6d0")
    },
    {
      "Name": "Smile Dental Clinic",
      "Facility_Type": "Clinic",
      "Longitude": 72.5623,
      "Latitude": 23.0254,
      "Contact": "9865323476",
      "Location": "Paldi, Ahmedabad, Gujarat",
      "Timings": "9 AM - 9 PM",
      "Rating": 4.7,
      "City_ID": new mongoose.Types.ObjectId("67d0023893b14064e2b2b6d0")
    },
    {
      "Name": "Apollo Pharmacy",
      "Facility_Type": "Pharmacy",
      "Longitude": 72.5720,
      "Latitude": 23.0355,
      "Contact": "9876511480",
      "Location": "Gandhinagar Highway, Ahmedabad, Gujarat",
      "Timings": "24/7",
      "Rating": 4.8,
      "City_ID": new mongoose.Types.ObjectId("67d0023893b14064e2b2b6d0")
    },
    {
      "Name": "MedPlus Pharmacy",
      "Facility_Type": "Pharmacy",
      "Longitude": 72.5634,
      "Latitude": 23.0282,
      "Contact": "9865403175",
      "Location": "Bodakdev, Ahmedabad, Gujarat",
      "Timings": "7 AM - 11 PM",
      "Rating": 4.6,
      "City_ID": new mongoose.Types.ObjectId("67d0023893b14064e2b2b6d0")
    },
    {
      "Name": "Wellness Forever Pharmacy",
      "Facility_Type": "Pharmacy",
      "Longitude": 72.5598,
      "Latitude": 23.0315,
      "Contact": "9842632174",
      "Location": "Ellisbridge, Ahmedabad, Gujarat",
      "Timings": "24/7",
      "Rating": 4.7,
      "City_ID": new mongoose.Types.ObjectId("67d0023893b14064e2b2b6d0")
    }  
,
      {
        Name: "Lilavati Hospital",
        Facility_Type: "Hospital",
        Longitude: 72.8473,
        Latitude: 19.1197,
        Contact: "9876543211",
        Location: "Bandra, Mumbai, Maharashtra",
        Timings: "24/7",
        Rating: 4.8,
        City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b68")
      },
      {
        Name: "Tata Memorial Hospital",
        Facility_Type: "Hospital",
        Longitude: 72.8350,
        Latitude: 18.9872,
        Contact: "9865321471",
        Location: "Parel, Mumbai, Maharashtra",
        Timings: "24/7",
        Rating: 4.9,
        City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b68")
      },
      {
        Name: "Kokilaben Dhirubhai Ambani Hospital",
        Facility_Type: "Hospital",
        Longitude: 72.8453,
        Latitude: 19.1158,
        Contact: "9856234781",
        Location: "Andheri, Mumbai, Maharashtra",
        Timings: "24/7",
        Rating: 4.7,
        City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b68")
      },
      {
        Name: "Shree Sai Clinic",
        Facility_Type: "Clinic",
        Longitude: 72.8462,
        Latitude: 19.0431,
        Contact: "9876541231",
        Location: "Dadar, Mumbai, Maharashtra",
        Timings: "9 AM - 8 PM",
        Rating: 4.5,
        City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b68")
      },
      {
        Name: "Care & Cure Clinic",
        Facility_Type: "Clinic",
        Longitude: 72.8195,
        Latitude: 19.1132,
        Contact: "9876503215",
        Location: "Vile Parle, Mumbai, Maharashtra",
        Timings: "10 AM - 7 PM",
        Rating: 4.6,
        City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b68")
      },
      {
        Name: "Smile Dental Clinic",
        Facility_Type: "Clinic",
        Longitude: 72.8751,
        Latitude: 19.1876,
        Contact: "9865321472",
        Location: "Borivali, Mumbai, Maharashtra",
        Timings: "9 AM - 9 PM",
        Rating: 4.7,
        City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b68")
      },
      {
        Name: "Apollo Pharmacy",
        Facility_Type: "Pharmacy",
        Longitude: 72.8278,
        Latitude: 19.0706,
        Contact: "9876521481",
        Location: "Powai, Mumbai, Maharashtra",
        Timings: "24/7",
        Rating: 4.8,
        City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b68")
      },
      {
        Name: "MedPlus Pharmacy",
        Facility_Type: "Pharmacy",
        Longitude: 72.8349,
        Latitude: 19.1278,
        Contact: "9865423176",
        Location: "Mulund, Mumbai, Maharashtra",
        Timings: "7 AM - 11 PM",
        Rating: 4.6,
        City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b68")
      },
      {
        Name: "Wellness Forever Pharmacy",
        Facility_Type: "Pharmacy",
        Longitude: 72.8774,
        Latitude: 19.1973,
        Contact: "9845632175",
        Location: "Kandivali, Mumbai, Maharashtra",
        Timings: "24/7",
        Rating: 4.7,
        City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b68")
      },
        {
          Name: "Manipal Hospital",
          Facility_Type: "Hospital",
          Longitude: 77.6476,
          Latitude: 12.9606,
          Contact: "9876543200",
          Location: "Old Airport Road, Bangalore, Karnataka",
          Timings: "24/7",
          Rating: 4.8,
          City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b56")
        },
        {
          Name: "Fortis Hospital Bangalore",
          Facility_Type: "Hospital",
          Longitude: 77.5678,
          Latitude: 12.9205,
          Contact: "9865321450",
          Location: "Bannerghatta Road, Bangalore, Karnataka",
          Timings: "24/7",
          Rating: 4.7,
          City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b56")
        },
        {
          Name: "Apollo Hospital Bangalore",
          Facility_Type: "Hospital",
          Longitude: 77.5811,
          Latitude: 12.9356,
          Contact: "9856234578",
          Location: "Jayanagar, Bangalore, Karnataka",
          Timings: "24/7",
          Rating: 4.9,
          City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b56")
        },
        {
          Name: "Dr. Agarwal's Eye Clinic",
          Facility_Type: "Clinic",
          Longitude: 77.6046,
          Latitude: 12.9783,
          Contact: "9876541233",
          Location: "MG Road, Bangalore, Karnataka",
          Timings: "9 AM - 8 PM",
          Rating: 4.5,
          City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b56")
        },
        {
          Name: "Cloudnine Clinic",
          Facility_Type: "Clinic",
          Longitude: 77.6011,
          Latitude: 12.9289,
          Contact: "9876503218",
          Location: "Indiranagar, Bangalore, Karnataka",
          Timings: "10 AM - 7 PM",
          Rating: 4.6,
          City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b56")
        },
        {
          Name: "Smile Dental Clinic",
          Facility_Type: "Clinic",
          Longitude: 77.6152,
          Latitude: 12.9378,
          Contact: "9865321479",
          Location: "Koramangala, Bangalore, Karnataka",
          Timings: "9 AM - 9 PM",
          Rating: 4.7,
          City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b56")
        },
        {
          Name: "Apollo Pharmacy",
          Facility_Type: "Pharmacy",
          Longitude: 77.5943,
          Latitude: 12.9719,
          Contact: "9876521485",
          Location: "Brigade Road, Bangalore, Karnataka",
          Timings: "24/7",
          Rating: 4.8,
          City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b56")
        },
        {
          Name: "MedPlus Pharmacy",
          Facility_Type: "Pharmacy",
          Longitude: 77.6114,
          Latitude: 12.9723,
          Contact: "9865423178",
          Location: "Jayanagar, Bangalore, Karnataka",
          Timings: "7 AM - 11 PM",
          Rating: 4.6,
          City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b56")
        },
        {
          Name: "Wellness Forever Pharmacy",
          Facility_Type: "Pharmacy",
          Longitude: 77.5734,
          Latitude: 12.9836,
          Contact: "9845632179",
          Location: "Whitefield, Bangalore, Karnataka",
          Timings: "24/7",
          Rating: 4.7,
          City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b56")
        },
        {
          Name: "Apollo Hospital Chennai",
          Facility_Type: "Hospital",
          Longitude: 80.2515,
          Latitude: 13.0606,
          Contact: "9876543215",
          Location: "Greams Road, Chennai, Tamil Nadu",
          Timings: "24/7",
          Rating: 4.9,
          City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b6e")
        },
        {
          Name: "Fortis Malar Hospital",
          Facility_Type: "Hospital",
          Longitude: 80.2682,
          Latitude: 13.0105,
          Contact: "9865321475",
          Location: "Adyar, Chennai, Tamil Nadu",
          Timings: "24/7",
          Rating: 4.8,
          City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b6e")
        },
        {
          Name: "MIOT International",
          Facility_Type: "Hospital",
          Longitude: 80.1911,
          Latitude: 13.0086,
          Contact: "9856234575",
          Location: "Manapakkam, Chennai, Tamil Nadu",
          Timings: "24/7",
          Rating: 4.7,
          City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b6e")
        },
        {
          Name: "Apollo Dental Clinic",
          Facility_Type: "Clinic",
          Longitude: 80.2346,
          Latitude: 13.0662,
          Contact: "9876541235",
          Location: "T Nagar, Chennai, Tamil Nadu",
          Timings: "9 AM - 8 PM",
          Rating: 4.6,
          City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b6e")
        },
        {
          Name: "Dr. Mohan's Diabetes Clinic",
          Facility_Type: "Clinic",
          Longitude: 80.2231,
          Latitude: 13.0508,
          Contact: "9876503216",
          Location: "Anna Nagar, Chennai, Tamil Nadu",
          Timings: "10 AM - 7 PM",
          Rating: 4.7,
          City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b6e")
        },
        {
          Name: "Rajan Eye Care",
          Facility_Type: "Clinic",
          Longitude: 80.2164,
          Latitude: 13.0435,
          Contact: "9865321476",
          Location: "Kilpauk, Chennai, Tamil Nadu",
          Timings: "9 AM - 9 PM",
          Rating: 4.8,
          City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b6e")
        },
        {
          Name: "Apollo Pharmacy",
          Facility_Type: "Pharmacy",
          Longitude: 80.2257,
          Latitude: 13.0804,
          Contact: "9876521486",
          Location: "Vadapalani, Chennai, Tamil Nadu",
          Timings: "24/7",
          Rating: 4.8,
          City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b6e")
        },
        {
          Name: "MedPlus Pharmacy",
          Facility_Type: "Pharmacy",
          Longitude: 80.2503,
          Latitude: 13.0671,
          Contact: "9865423187",
          Location: "Nungambakkam, Chennai, Tamil Nadu",
          Timings: "7 AM - 11 PM",
          Rating: 4.6,
          City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b6e")
        },
        {
          Name: "Wellness Forever Pharmacy",
          Facility_Type: "Pharmacy",
          Longitude: 80.2305,
          Latitude: 13.0578,
          Contact: "9845632189",
          Location: "Mylapore, Chennai, Tamil Nadu",
          Timings: "24/7",
          Rating: 4.7,
          City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b6e")
        }
,
  {
    Name: "BAPS Pramukh Swami Hospital",
    Facility_Type: "Hospital",
    Longitude: 72.7997,
    Latitude: 21.1946,
    Contact: "9876543220",
    Location: "Shri Pramukh Swami Maharaj Marg, Adajan Char Rasta, Surat, Gujarat",
    Timings: "24/7",
    Rating: 4.5,
    City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b38")
  },
  {
    Name: "Nirmal Hospital",
    Facility_Type: "Hospital",
    Longitude: 72.8312,
    Latitude: 21.1889,
    Contact: "9876543213",
    Location: "Ring Road, Sagrampura, Surat, Gujarat",
    Timings: "24/7",
    Rating: 4.2,
    City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b38")
  },
  {
    Name: "Apple Hospital",
    Facility_Type: "Hospital",
    Longitude: 72.8305,
    Latitude: 21.1860,
    Contact: "9876543241",
    Location: "Udhna Darwaja, Ring Road, Surat, Gujarat",
    Timings: "24/7",
    Rating: 4.0,
    City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b38")
  },
  // Facilities in Visakhapatnam
  {
    Name: "King George Hospital",
    Facility_Type: "Hospital",
    Longitude: 83.3161,
    Latitude: 17.7139,
    Contact: "9876543443",
    Location: "Maharanipeta, Visakhapatnam, Andhra Pradesh",
    Timings: "24/7",
    Rating: 4.3,
    City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b14")
  },
  {
    Name: "SevenHills Hospital",
    Facility_Type: "Hospital",
    Longitude: 83.2185,
    Latitude: 17.7360,
    Contact: "9876543255",
    Location: "Waltair Main Road, Visakhapatnam, Andhra Pradesh",
    Timings: "24/7",
    Rating: 4.6,
    City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b14")
  },
  {
    Name: "Care Hospital",
    Facility_Type: "Hospital",
    Longitude: 83.3042,
    Latitude: 17.7215,
    Contact: "9876543265",
    Location: "Ram Nagar, Visakhapatnam, Andhra Pradesh",
    Timings: "24/7",
    Rating: 4.4,
    City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b14")
  },
  // Facilities in Patna
  {
    Name: "Patna Medical College and Hospital",
    Facility_Type: "Hospital",
    Longitude: 85.1414,
    Latitude: 25.5941,
    Contact: "9876543276",
    Location: "Ashok Rajpath, Patna, Bihar",
    Timings: "24/7",
    Rating: 4.1,
    City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b26")
  },
  {
    Name: "Nalanda Medical College and Hospital",
    Facility_Type: "Hospital",
    Longitude: 85.1680,
    Latitude: 25.5940,
    Contact: "9876543287",
    Location: "Kankarbagh, Patna, Bihar",
    Timings: "24/7",
    Rating: 4.0,
    City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b26")
  },
  {
    Name: "Ruban Memorial Hospital",
    Facility_Type: "Hospital",
    Longitude: 85.1376,
    Latitude: 25.6127,
    Contact: "9876543298",
    Location: "Patliputra Colony, Patna, Bihar",
    Timings: "24/7",
    Rating: 4.5,
    City_ID: new mongoose.Types.ObjectId("67d4822ceb109407b2178b26")
  }];



async function insertHospitals() {
  try {
    //  Remove entries with missing fields
    const validFacilities = facilities.filter((hospital) => {
      if (!hospital.Name || !hospital.Facility_Type || !hospital.Longitude || !hospital.Latitude || !hospital.Contact || !hospital.Location || !hospital.Timings || !hospital.Rating || !hospital.City_ID) {
        console.error("Missing required field in:", hospital);
        return false;
      }
      return true;
    });

    if (validFacilities.length === 0) {
      console.error("No valid hospitals to insert!");
      return;
    }

    //  Insert only valid data
    await Hospital.insertMany(validFacilities);
    console.log(" Successfully inserted all hospitals into `test.hospitals`!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting hospitals:", error);
  }
}

insertHospitals();


const courses = [
  {
    "Name": "The Complete Web Development Bootcamp",
    "Platform": "Udemy",
    "Category": "Web Development",
    "url": "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
    "duration": "55 hours",
    "certification": true,
    "rating": 4.7
  },
  {
    "Name": "The Web Developer Bootcamp 2024",
    "Platform": "Udemy",
    "Category": "Web Development",
    "url": "https://www.udemy.com/course/the-web-developer-bootcamp/",
    "duration": "63 hours",
    "certification": true,
    "rating": 4.8
  },
  {
    "Name": "Modern React with Redux",
    "Platform": "Udemy",
    "Category": "Frontend Development",
    "url": "https://www.udemy.com/course/react-redux/",
    "duration": "52 hours",
    "certification": true,
    "rating": 4.6
  },
  {
    "Name": "The Complete JavaScript Course 2025: From Zero to Expert!",
    "Platform": "Udemy",
    "Category": "JavaScript",
    "url": "https://www.udemy.com/course/the-complete-javascript-course/",
    "duration": "70 hours",
    "certification": true,
    "rating": 4.8
  },
  {
    "Name": "NodeJS - The Complete Guide",
    "Platform": "Udemy",
    "Category": "Backend Development",
    "url": "https://www.udemy.com/course/nodejs-the-complete-guide/",
    "duration": "40 hours",
    "certification": true,
    "rating": 4.7
  },
    {
      "Name": "Web Development Foundations: Full-Stack vs Front-End",
      "Platform": "LinkedIn Learning",
      "Category": "Web Development",
      "url": "https://www.linkedin.com/learning/web-development-foundations-full-stack-vs-front-end",
      "duration": "1 hour 12 minutes",
      "certification": true,
      "rating": 4.7
    },
    {
      "Name": "Learning React.js",
      "Platform": "LinkedIn Learning",
      "Category": "Web Development",
      "url": "https://www.linkedin.com/learning/learning-react-js-5",
      "duration": "2 hours 30 minutes",
      "certification": true,
      "rating": 4.8
    },
    {
      "Name": "JavaScript Essential Training",
      "Platform": "LinkedIn Learning",
      "Category": "Web Development",
      "url": "https://www.linkedin.com/learning/javascript-essential-training",
      "duration": "5 hours 15 minutes",
      "certification": true,
      "rating": 4.6
    },
    {
      "Name": "Full-Stack Web Development with React",
      "Platform": "Coursera",
      "Category": "Web Development",
      "url": "https://www.coursera.org/specializations/full-stack-react",
      "duration": "3 months",
      "certification": true,
      "rating": 4.7
    },
    {
      "Name": "HTML, CSS, and JavaScript for Web Developers",
      "Platform": "Coursera",
      "Category": "Web Development",
      "url": "https://www.coursera.org/learn/html-css-javascript-for-web-developers",
      "duration": "5 weeks",
      "certification": true,
      "rating": 4.8
    },
    {
      "Name": "Web Design for Everybody: Basics of Web Development & Coding",
      "Platform": "Coursera",
      "Category": "Web Development",
      "url": "https://www.coursera.org/specializations/web-design",
      "duration": "6 months",
      "certification": true,
      "rating": 4.7
    },
    {
      "Name": "Full Stack Web Developer - MEAN Stack",
      "Platform": "Simplilearn",
      "Category": "Web Development",
      "url": "https://www.simplilearn.com/full-stack-web-developer-mean-stack-certification-training",
      "duration": "6 months",
      "certification": true,
      "rating": 4.5
    },
    {
      "Name": "JavaScript Certification Training",
      "Platform": "Simplilearn",
      "Category": "Web Development",
      "url": "https://www.simplilearn.com/javascript-certification-training",
      "duration": "1 month",
      "certification": true,
      "rating": 4.6
    },
    {
      "Name": "React.js Training Course",
      "Platform": "Simplilearn",
      "Category": "Web Development",
      "url": "https://www.simplilearn.com/react-js-training-course",
      "duration": "1.5 months",
      "certification": true,
      "rating": 4.7
    },

    {
      "Name": "The Complete Python Bootcamp From Zero to Hero in Python",
      "Platform": "Udemy",
      "Category": "Development",
      "url": "https://www.udemy.com/course/complete-python-bootcamp/",
      "duration": "22 hours",
      "certification": true,
      "rating": 4.6
    },
    {
      "Name": "Machine Learning A-Z™: Hands-On Python & R In Data Science",
      "Platform": "Udemy",
      "Category": "Data Science",
      "url": "https://www.udemy.com/course/machinelearning/",
      "duration": "44 hours",
      "certification": true,
      "rating": 4.5
    },
    {
      "Name": "Graphic Design Masterclass - Learn GREAT Design",
      "Platform": "Udemy",
      "Category": "Design",
      "url": "https://www.udemy.com/course/graphic-design-masterclass/",
      "duration": "19.5 hours",
      "certification": true,
      "rating": 4.7
    },
    {
      "Name": "The Complete Digital Marketing Guide - 12 Courses in 1",
      "Platform": "Udemy",
      "Category": "Marketing",
      "url": "https://www.udemy.com/course/12-course-digital-marketing-bundle/",
      "duration": "24 hours",
      "certification": true,
      "rating": 4.6
    },
    {
      "Name": "Photography Masterclass: A Complete Guide to Photography",
      "Platform": "Udemy",
      "Category": "Photography",
      "url": "https://www.udemy.com/course/photography-masterclass-complete-guide-to-photography/",
      "duration": "22 hours",
      "certification": true,
      "rating": 4.7
    },
    {
      "Name": "Ultimate Microsoft Office; Excel, Word, PowerPoint & Access",
      "Platform": "Udemy",
      "Category": "Office Productivity",
      "url": "https://www.udemy.com/course/ultimate-microsoft-office-excel-word-powerpoint-access/",
      "duration": "70.5 hours",
      "certification": true,
      "rating": 4.6
    },
    {
      "Name": "Personal Development Masterclass: 22 Courses in 1",
      "Platform": "Udemy",
      "Category": "Personal Development",
      "url": "https://www.udemy.com/course/personal-development-masterclass/",
      "duration": "40 hours",
      "certification": true,
      "rating": 4.5
    },
    {
      "Name": "The Complete Financial Analyst Course 2023",
      "Platform": "Udemy",
      "Category": "Finance & Accounting",
      "url": "https://www.udemy.com/course/the-complete-financial-analyst-course/",
      "duration": "20.5 hours",
      "certification": true,
      "rating": 4.6
    },
    {
      "Name": "AWS Certified Solutions Architect - Associate 2023",
      "Platform": "Udemy",
      "Category": "IT & Software",
      "url": "https://www.udemy.com/course/aws-certified-solutions-architect-associate/",
      "duration": "27 hours",
      "certification": true,
      "rating": 4.7
    },
    {
      "Name": "The Complete 2023 Web Development Bootcamp",
      "Platform": "Udemy",
      "Category": "Development",
      "url": "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
      "duration": "55 hours",
      "certification": true,
      "rating": 4.7
    },

    {
      "Name": "Learning Personal Branding",
      "Platform": "LinkedIn Learning",
      "Category": "Personal Development",
      "url": "https://www.linkedin.com/learning/learning-personal-branding",
      "duration": "1 hour",
      "certification": true,
      "rating": 4.7
    },
    {
      "Name": "Strategic Thinking",
      "Platform": "LinkedIn Learning",
      "Category": "Business",
      "url": "https://www.linkedin.com/learning/strategic-thinking",
      "duration": "1 hour 6 minutes",
      "certification": true,
      "rating": 4.7
    },
    {
      "Name": "Excel: Lookup Functions in Depth",
      "Platform": "LinkedIn Learning",
      "Category": "Data Analysis",
      "url": "https://www.linkedin.com/learning/excel-lookup-functions-in-depth",
      "duration": "2 hours 24 minutes",
      "certification": true,
      "rating": 4.8
    },
    {
      "Name": "Communicating with Confidence",
      "Platform": "LinkedIn Learning",
      "Category": "Communication",
      "url": "https://www.linkedin.com/learning/communicating-with-confidence",
      "duration": "1 hour 16 minutes",
      "certification": true,
      "rating": 4.7
    },
    {
      "Name": "Critical Thinking",
      "Platform": "LinkedIn Learning",
      "Category": "Personal Development",
      "url": "https://www.linkedin.com/learning/critical-thinking",
      "duration": "1 hour 6 minutes",
      "certification": true,
      "rating": 4.7
    },
    {
      "Name": "Project Management Simplified",
      "Platform": "LinkedIn Learning",
      "Category": "Project Management",
      "url": "https://www.linkedin.com/learning/project-management-simplified",
      "duration": "1 hour 19 minutes",
      "certification": true,
      "rating": 4.7
    },
    {
      "Name": "HTML Essential Training",
      "Platform": "LinkedIn Learning",
      "Category": "Web Development",
      "url": "https://www.linkedin.com/learning/html-essential-training",
      "duration": "2 hours 45 minutes",
      "certification": true,
      "rating": 4.7
    },
    {
      "Name": "Leadership Foundations",
      "Platform": "LinkedIn Learning",
      "Category": "Leadership",
      "url": "https://www.linkedin.com/learning/leadership-foundations",
      "duration": "2 hours 40 minutes",
      "certification": true,
      "rating": 4.7
    },
    {
      "Name": "Learning Python",
      "Platform": "LinkedIn Learning",
      "Category": "Programming",
      "url": "https://www.linkedin.com/learning/learning-python",
      "duration": "2 hours 11 minutes",
      "certification": true,
      "rating": 4.7
    },
    {
      "Name": "Financial Basics Everyone Should Know",
      "Platform": "LinkedIn Learning",
      "Category": "Finance",
      "url": "https://www.linkedin.com/learning/financial-basics-everyone-should-know",
      "duration": "1 hour 30 minutes",
      "certification": true,
      "rating": 4.7
    },

    {
      "Name": "Indigenous Canada",
      "Platform": "Coursera",
      "Category": "Arts and Humanities",
      "url": "https://www.coursera.org/learn/indigenous-canada",
      "duration": "12 weeks",
      "certification": true,
      "rating": 4.8
    },
    {
      "Name": "Excel Skills for Business",
      "Platform": "Coursera",
      "Category": "Business",
      "url": "https://www.coursera.org/specializations/excel",
      "duration": "4 months",
      "certification": true,
      "rating": 4.9
    },
    {
      "Name": "Python for Everybody",
      "Platform": "Coursera",
      "Category": "Computer Science",
      "url": "https://www.coursera.org/specializations/python",
      "duration": "8 months",
      "certification": true,
      "rating": 4.8
    },
    {
      "Name": "Supervised Machine Learning: Regression and Classification",
      "Platform": "Coursera",
      "Category": "Data Science",
      "url": "https://www.coursera.org/learn/machine-learning",
      "duration": "11 weeks",
      "certification": true,
      "rating": 4.9
    },
    {
      "Name": "Introduction to Psychology",
      "Platform": "Coursera",
      "Category": "Health",
      "url": "https://www.coursera.org/learn/introduction-psychology",
      "duration": "7 weeks",
      "certification": true,
      "rating": 4.7
    },
    {
      "Name": "IBM Cybersecurity Analyst",
      "Platform": "Coursera",
      "Category": "Information Technology",
      "url": "https://www.coursera.org/professional-certificates/ibm-cybersecurity-analyst",
      "duration": "8 months",
      "certification": true,
      "rating": 4.6
    },
    {
      "Name": "Learn to Speak Korean 1",
      "Platform": "Coursera",
      "Category": "Language Learning",
      "url": "https://www.coursera.org/learn/learn-korean",
      "duration": "6 weeks",
      "certification": true,
      "rating": 4.8
    },
    {
      "Name": "Introduction to Mathematical Thinking",
      "Platform": "Coursera",
      "Category": "Math and Logic",
      "url": "https://www.coursera.org/learn/mathematical-thinking",
      "duration": "10 weeks",
      "certification": true,
      "rating": 4.7
    },
    {
      "Name": "The Science of Well-Being",
      "Platform": "Coursera",
      "Category": "Personal Development",
      "url": "https://www.coursera.org/learn/the-science-of-well-being",
      "duration": "10 weeks",
      "certification": true,
      "rating": 4.9
    },
    {
      "Name": "Introduction to Programming the Internet of Things (IoT)",
      "Platform": "Coursera",
      "Category": "Physical Science & Engineering",
      "url": "https://www.coursera.org/specializations/iot",
      "duration": "6 months",
      "certification": true,
      "rating": 4.7
    },

    {
      "Name": "Post Graduate Program in Data Science",
      "Platform": "Simplilearn",
      "Category": "Data Science",
      "url": "https://www.simplilearn.com/data-science-post-graduate-program-with-purdue-university",
      "duration": "12 months",
      "certification": true,
      "rating": 4.7
    },
    {
      "Name": "Cyber Security Expert Master's Program",
      "Platform": "Simplilearn",
      "Category": "Cybersecurity",
      "url": "https://www.simplilearn.com/cyber-security-expert-master-program-training",
      "duration": "12 months",
      "certification": true,
      "rating": 4.6
    },
    {
      "Name": "AI and Machine Learning Certification",
      "Platform": "Simplilearn",
      "Category": "Artificial Intelligence",
      "url": "https://www.simplilearn.com/ai-machine-learning-certification-course",
      "duration": "11 months",
      "certification": true,
      "rating": 4.7
    },
    {
      "Name": "Digital Marketing Specialist Master’s Program",
      "Platform": "Simplilearn",
      "Category": "Marketing",
      "url": "https://www.simplilearn.com/digital-marketing/digital-marketing-specialist-master-program-training",
      "duration": "12 months",
      "certification": true,
      "rating": 4.6
    },
    {
      "Name": "PMP Certification Training Course",
      "Platform": "Simplilearn",
      "Category": "Project Management",
      "url": "https://www.simplilearn.com/project-management/pmp-certification-training",
      "duration": "2 months",
      "certification": true,
      "rating": 4.8
    },
    {
      "Name": "Business Analyst Master's Program",
      "Platform": "Simplilearn",
      "Category": "Business",
      "url": "https://www.simplilearn.com/business-analyst-master-certification-training-course",
      "duration": "12 months",
      "certification": true,
      "rating": 4.7
    },
    {
      "Name": "Full Stack Java Developer",
      "Platform": "Simplilearn",
      "Category": "Software Development",
      "url": "https://www.simplilearn.com/full-stack-java-developer-certification-training-course",
      "duration": "9 months",
      "certification": true,
      "rating": 4.6
    },
    {
      "Name": "Certified ScrumMaster® (CSM) Certification Training",
      "Platform": "Simplilearn",
      "Category": "Agile and Scrum",
      "url": "https://www.simplilearn.com/agile-and-scrum/csm-certification-training",
      "duration": "2 weeks",
      "certification": true,
      "rating": 4.8
    },
    {
      "Name": "AWS Solutions Architect Certification Training Course",
      "Platform": "Simplilearn",
      "Category": "Cloud Computing",
      "url": "https://www.simplilearn.com/cloud-solutions-architect-masters-program-training",
      "duration": "6 months",
      "certification": true,
      "rating": 4.7
    },
    {
      "Name": "Finance for Non-Financial Managers",
      "Platform": "Simplilearn",
      "Category": "Finance",
      "url": "https://www.simplilearn.com/finance-for-non-financial-managers-training-course",
      "duration": "6 weeks",
      "certification": true,
      "rating": 4.5
    },
{
  "Name": "Data Science Foundations: Fundamentals",
  "Platform": "LinkedIn Learning",
  "Category": "Data Science",
  "url": "https://www.linkedin.com/learning/data-science-foundations-fundamentals",
  "duration": "3 hours",
  "certification": true,
  "rating": 4.7
},
{
  "Name": "Machine Learning Specialization",
  "Platform": "Coursera",
  "Category": "Machine Learning",
  "url": "https://www.coursera.org/specializations/machine-learning-introduction",
  "duration": "4 months (at 5 hours/week)",
  "certification": true,
  "rating": 4.9
},
{
  "Name": "Cyber Security Expert Master’s Program",
  "Platform": "Simplilearn",
  "Category": "Cybersecurity",
  "url": "https://www.simplilearn.com/cyber-security-expert-master-program-training",
  "duration": "12 months",
  "certification": true,
  "rating": 4.6
},
{
  "Name": "Project Management Foundations",
  "Platform": "LinkedIn Learning",
  "Category": "Project Management",
  "url": "https://www.linkedin.com/learning/project-management-foundations-4",
  "duration": "3 hours",
  "certification": true,
  "rating": 4.8
},
{
  "Name": "Google IT Support Professional Certificate",
  "Platform": "Coursera",
  "Category": "IT Support",
  "url": "https://www.coursera.org/professional-certificates/google-it-support",
  "duration": "6 months (at 10 hours/week)",
  "certification": true,
  "rating": 4.8
},
{
  "Name": "Digital Marketing Specialist Program",
  "Platform": "Simplilearn",
  "Category": "Digital Marketing",
  "url": "https://www.simplilearn.com/digital-marketing/advanced-digital-marketing-certification-training",
  "duration": "12 months",
  "certification": true,
  "rating": 4.7
},
{
  "Name": "Excel Essential Training (Microsoft 365)",
  "Platform": "LinkedIn Learning",
  "Category": "Productivity",
  "url": "https://www.linkedin.com/learning/excel-essential-training-microsoft-365",
  "duration": "2 hours",
  "certification": true,
  "rating": 4.6
},
{
  "Name": "Introduction to Psychology",
  "Platform": "Coursera",
  "Category": "Psychology",
  "url": "https://www.coursera.org/learn/introduction-psychology",
  "duration": "4 weeks",
  "certification": true,
  "rating": 4.8
},
{
  "Name": "Business Analyst Master’s Program",
  "Platform": "Simplilearn",
  "Category": "Business Analysis",
  "url": "https://www.simplilearn.com/business-analyst-masters-certification-training-course",
  "duration": "11 months",
  "certification": true,
  "rating": 4.5
}];


// Insert data
const seedCourses = async () => {
  try {
    await Course.deleteMany(); // optional: clears old data
    await Course.insertMany(courses);
    console.log("Courses inserted successfully!");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding courses:", error);
  }
};

seedCourses();


const employers = [
    {
      Name: "Wipro",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b56"), // Bangalore
      Average_Salary: 459300,
      Website: "https://www.wipro.com"
    },
    {
      Name: "Tech Mahindra",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b6a"), // Pune
      Average_Salary: 234590,
      Website: "https://www.techmahindra.com"
    },
    {
      Name: "IBM India",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b56"), // Bangalore
      Average_Salary: 352700,
      Website: "https://www.ibm.com/in-en"
    },
    {
      Name: "Cognizant",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b6e"), // Chennai
      Average_Salary: 126789,
      Website: "https://www.cognizant.com"
    },
    {
      Name: "Capgemini India",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b68"), // Mumbai
      Average_Salary: 345090,
      Website: "https://www.capgemini.com/in-en"
    },
    {
      Name: "L&T Infotech",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b68"), // Mumbai
      Average_Salary: 457900,
      Website: "https://www.lntinfotech.com"
    },
    {
      Name: "Zoho Corporation",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b6e"), // Chennai
      Average_Salary: 338690,
      Website: "https://www.zoho.com"
    },
    {
      Name: "Freshworks",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b6e"), // Chennai
      Average_Salary: 450900,
      Website: "https://www.freshworks.com"
    },
    {
      Name: "BYJU’S",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b56"), // Bangalore
      Average_Salary: 239000,
      Website: "https://www.byjus.com"
    },
    {
      Name: "Unacademy",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b56"), // Bangalore
      Average_Salary: 1234900,
      Website: "https://www.unacademy.com"
    },
    {
      Name: "Vedantu",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b56"), // Bangalore
      Average_Salary: 120090,
      Website: "https://www.vedantu.com"
    },
    {
      Name: "upGrad",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b68"), // Mumbai
      Average_Salary: 509090,
      Website: "https://www.upgrad.com"
    },
    {
      Name: "WhiteHat Jr",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b68"), // Mumbai
      Average_Salary: 124930,
      Website: "https://www.whitehatjr.com"
    },
    {
      Name: "Flipkart",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b56"), // Bangalore
      Average_Salary: 980670,
      Website: "https://www.flipkart.com"
    },
    {
      Name: "Amazon India",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b56"), // Bangalore
      Average_Salary: 657489,
      Website: "https://www.amazon.in"
    },
    {
      Name: "Myntra",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b56"), // Bangalore
      Average_Salary: 1001790,
      Website: "https://www.myntra.com"
    },
    {
      Name: "Snapdeal",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b44"), // New Delhi
      Average_Salary: 430000,
      Website: "https://www.snapdeal.com"
    },
    {
      Name: "PhonePe",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b56"), // Bangalore
      Average_Salary: 123450,
      Website: "https://www.phonepe.com"
    },
    {
      Name: "Razorpay",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b56"), // Bangalore
      Average_Salary: 438000,
      Website: "https://www.razorpay.com"
    },
    {
      Name: "PolicyBazaar",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b40"), // Gurgaon
      Average_Salary: 740210,
      Website: "https://www.policybazaar.com"
    },
    {
      Name: "HDFC Bank",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b68"), // Mumbai
      Average_Salary: 457980,
      Website: "https://www.hdfcbank.com"
    },
    {
      Name: "ICICI Bank",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b68"), // Mumbai
      Average_Salary: 340000,
      Website: "https://www.icicibank.com"
    },
    {
      Name: "Axis Bank",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b68"), // Mumbai
      Average_Salary: 329800,
      Website: "https://www.axisbank.com"
    },
    {
      Name: "State Bank of India",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b68"), // Mumbai
      Average_Salary: 560000,
      Website: "https://www.sbi.co.in"
    },
    {
      Name: "Yes Bank",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b68"), // Mumbai
      Average_Salary: 471000,
      Website: "https://www.yesbank.in"
    },
    {
      Name: "Hindustan Unilever Limited",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b68"), // Mumbai
      Average_Salary: 1130000,
      Website: "https://www.hul.co.in"
    },
    {
      Name: "ITC Limited",
      Location: new mongoose.Types.ObjectId("67d487df4a74f5f286ca9318"), // Kolkata
      Average_Salary: 345100,
      Website: "https://www.itcportal.com"
    },
    {
      Name: "Dabur India Ltd",
      Location: new mongoose.Types.ObjectId("67d487df4a74f5f286ca9318"), // Kolkata
      Average_Salary: 467890,
      Website: "https://www.dabur.com"
    },
    {
      Name: "Britannia Industries",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b56"), // Bangalore
      Average_Salary: 1290000,
      Website: "https://www.britannia.co.in"
    },
    {
      Name: "Nestle India",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b40"), // Gurgaon
      Average_Salary: 239800,
      Website: "https://www.nestle.in"
    },
    {
      Name: "Reliance Industries",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b68"), // Mumbai
      Average_Salary: 433000,
      Website: "https://www.ril.com"
    },
    {
      Name: "Tata Group",
      Location: new mongoose.Types.ObjectId("67d4822ceb109407b2178b68"), // Mumbai
      Average_Salary: 510000,
      Website: "https://www.tata.com"
    },
  
    
];

Employer.insertMany(employers)
  .then(() => {
    console.log('Employers inserted successfully');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error inserting employers:', error);
    mongoose.connection.close();
  });


const policies = [
  
  {
    Name: "Migration Support Scheme",
    Description: "A welfare scheme by Andhra Pradesh to support migrant workers and their families with skill development, financial aid, and relocation support.",
    Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e34b"),
    Department: "Andhra Pradesh Non-Resident Telugu Society (APNRT)",
    Deadline: "31-12-2025",
    Status: "Active",
    Year: "2021",
    documentLink: "https://gad.ap.gov.in/downloads/political/non-resident-telugus/nrt-policy.pdf"
  },
  {
    Name: "Interstate Migrant Workers Act",
    Description: "Implementation of the Inter-State Migrant Workmen Act, providing licensing and protection to workers in Assam.",
    Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e34f"),
    Department: "Labour Commissionerate, Assam",
    Deadline: "31-12-2025",
    Status: "Active",
    Year: "2020",
    documentLink: "https://labourcommissioner.assam.gov.in/information-and-services/registration-establishments-and-licensing-auto-renewal-contractors-migrant-workmen"
  },
  {
    Name: "Bihar Migrant Labour Welfare Program",
    Description: "A welfare initiative targeting Bihar's migrant laborers with provisions for aid, employment, and health support.",
    Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e351"),
    Department: "Labour Resources Department, Bihar",
    Deadline: "31-12-2025",
    Status: "Active",
    Year: "2020",
    documentLink: "https://serviceonline.bihar.gov.in/"
  },
  {
    Name: "Chhattisgarh Migrant Assistance",
    Description: "Support scheme by Chhattisgarh government to help migrant workers returning or relocating to the state.",
    Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e353"),
    Department: "Department of Labour, Chhattisgarh",
    Deadline: "31-12-2025",
    Status: "Active",
    Year: "2021",
    documentLink: "https://cgstate.gov.in/"
  },
  {
    Name: "Goa Migrant Worker Act",
    Description: "Rules and regulations under the Inter-State Migrant Workmen Act applicable in Goa to safeguard workers' rights.",
    Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e355"),
    Department: "Labour Department, Goa",
    Deadline: "31-12-2025",
    Status: "Active",
    Year: "1982",
    documentLink: "https://www.goa.gov.in/government/acts-and-rules/"
  },
  {
    Name: "Gujarat Migrant Welfare Board",
    Description: "Programs by the Gujarat Labour Welfare Board focused on education, health, and housing support for migrant workers.",
    Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e357"),
    Department: "Gujarat Labour Welfare Board",
    Deadline: "31-12-2025",
    Status: "Active",
    Year: "2019",
    documentLink: "https://glwb.gujarat.gov.in/index.htm"
  },
  {
    Name: "Haryana Migrant Worker Program",
    Description: "Programs under the Inter-State Migrant Workmen Act implemented in Haryana to ensure safe migration and rights protection.",
    Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e359"),
    Department: "Labour Department, Haryana",
    Deadline: "31-12-2025",
    Status: "Active",
    Year: "2020",
    documentLink: "https://hrylabour.gov.in/content/interstate_migrant"
  },
  {
    Name: "Himachal Pradesh Migrant Assistance",
    Description: "Programs under the Labour and Employment Department of Himachal Pradesh aimed at migrant support and rehabilitation.",
    Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e35b"),
    Department: "Labour & Employment Department, HP",
    Deadline: "31-12-2025",
    Status: "Active",
    Year: "2020",
    documentLink: "https://hppanchayat.nic.in/PDF/Migration_support_centre.pdf"
  },
  {
    Name: "Jharkhand Migrant Support",
    Description: "Jharkhand State Migrant Labourers Survey and Rehabilitation Scheme to support migrant workers' reintegration and welfare.",
    Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e35d"),
    Department: "Labour Department, Jharkhand",
    Deadline: "31-12-2025",
    Status: "Active",
    Year: "2020",
    documentLink: "https://www.myscheme.gov.in/hi/schemes/jsmlsrs"
  },
  {
    Name: "Karnataka Migrant Worker Policy",
    Description: "Online services and licensing under the Inter-State Migrant Workmen Act for safeguarding migrant laborers in Karnataka.",
    Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e35f"),
    Department: "Labour Department, Karnataka",
    Deadline: "31-12-2025",
    Status: "Active",
    Year: "2020",
    documentLink: "https://www.labouronline.karnataka.gov.in/InterStateMigrantWorkmen/InterstateMigrant_Licence.aspx"
  },
  {
    Name: "Madhya Pradesh Migration Assistance",
    Description: "Initiative by Madhya Pradesh to assist migrant workers with relocation, job support, and welfare schemes.",
    Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e363"),
    Department: "Labour Department, Madhya Pradesh",
    Deadline: "31-12-2025",
    Status: "Active",
    Year: "2020",
    documentLink: "https://labour.mp.gov.in"
  },

    {
      Name: "Maharashtra Migrant Worker Act",
      Description: "Maharashtra's legal and welfare support programs for interstate migrant workers under the ISMW Act.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e365'),
      Department: "Labour Welfare Board, Maharashtra",
      Deadline: "31-12-2025",
      Status: "Active",
      Year: "2020",
      documentLink: "https://mahakamgar.maharashtra.gov.in"
    },
    {
      Name: "Odisha Migrant Labour Welfare Scheme",
      Description: "Odisha's targeted welfare initiative supporting safety, rehabilitation, and reintegration of migrant laborers.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e36f'),
      Department: "Labour & ESI Department, Odisha",
      Deadline: "31-12-2025",
      Status: "Active",
      Year: "2020",
      documentLink: "https://labour.odisha.gov.in"
    },
    {
      Name: "Punjab Migrant Support Program",
      Description: "Punjab government's program to provide aid and employment support for migrant workers in the state.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e371'),
      Department: "Department of Labour, Punjab",
      Deadline: "31-12-2025",
      Status: "Active",
      Year: "2020",
      documentLink: "https://punjab.gov.in/labour-department/"
    },
    {
      Name: "Rajasthan Migrant Worker Program",
      Description: "Comprehensive program in Rajasthan focused on welfare and rehabilitation of migrant laborers.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e373'),
      Department: "Department of Labour, Rajasthan",
      Deadline: "31-12-2025",
      Status: "Active",
      Year: "2020",
      documentLink: "https://labour.rajasthan.gov.in"
    },
    {
      Name: "Tamil Nadu Migrant Assistance",
      Description: "Welfare measures and helplines for migrant workers offered by the Tamil Nadu Labour Welfare Board.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e377'),
      Department: "Labour Department, Tamil Nadu",
      Deadline: "31-12-2025",
      Status: "Active",
      Year: "2020",
      documentLink: "https://labour.tn.gov.in"
    },
    {
      Name: "Telangana Migrant Welfare Act",
      Description: "Schemes and regulatory provisions under the ISMW Act to support migrant labor in Telangana.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e379'),
      Department: "Labour Department, Telangana",
      Deadline: "31-12-2025",
      Status: "Active",
      Year: "2020",
      documentLink: "https://labour.telangana.gov.in"
    },
    {
      Name: "West Bengal Migrant Assistance",
      Description: "Support policy for migrant workers launched by West Bengal to ensure rights and welfare.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e381'),
      Department: "Labour Department, West Bengal",
      Deadline: "31-12-2025",
      Status: "Active",
      Year: "2020",
      documentLink: "https://wblabour.gov.in"
    },
    {
      Name: "Delhi Migration Support Policy",
      Description: "Delhi's support program focused on urban migrants and workers affected during relocation or crises.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e38b'),
      Department: "Labour Department, Government of NCT of Delhi",
      Deadline: "31-12-2025",
      Status: "Active",
      Year: "2021",
      documentLink: "https://labour.delhi.gov.in"
    },
    {
      Name: "Andhra Pradesh Job Creation Scheme",
      Description: "A scheme aimed at generating employment opportunities in Andhra Pradesh through various initiatives.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e34b'),
      Department: "Department of Labour, Employment, Training and Factories, Andhra Pradesh",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://labour.ap.gov.in/"
    },
    {
      Name: "Arunachal Pradesh Employment Program",
      Description: "An initiative to provide employment opportunities and skill development in Arunachal Pradesh.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e34d'),
      Department: "Department of Labour and Employment, Arunachal Pradesh",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2021",
      documentLink: "https://labour.arunachal.gov.in/"
    },
    {
      Name: "Assam Job Guarantee Act",
      Description: "A legislative act aimed at guaranteeing job opportunities to eligible citizens in Assam.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e34f'),
      Department: "Department of Labour Welfare, Assam",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2019",
      documentLink: "https://labour.assam.gov.in/"
    },
    {
      Name: "Bihar Skill Development Mission",
      Description: "A mission to enhance the skill set of individuals in Bihar to improve employability.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e351'),
      Department: "Department of Labour Resources, Bihar",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2018",
      documentLink: "https://skillmissionbihar.org/"
    },
    {
      Name: "Chhattisgarh Employment Opportunity Scheme",
      Description: "A scheme to create and promote employment opportunities in Chhattisgarh.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e353'),
      Department: "Department of Labour, Chhattisgarh",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://erojgar.cg.gov.in/"
    },
    {
      Name: "Goa Youth Employment Program",
      Description: "An initiative focused on providing employment opportunities to the youth in Goa.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e355"),
      Department: "Department of Labour and Employment, Goa",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2019",
      documentLink: "https://edc-goa.com/chief-ministers-rojgar-yojana/"
    },
    {
      Name: "Gujarat Industrial Job Scheme",
      Description: "A scheme aimed at boosting industrial employment in Gujarat through various incentives.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e357"),
      Department: "Labour and Employment Department, Gujarat",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2021",
      documentLink: "https://labour.gujarat.gov.in/"
    },
    {
      Name: "Haryana Skill Development",
      Description: "A program focused on enhancing the skills of individuals in Haryana to meet industry standards.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e359"),
      Department: "Skill Development and Industrial Training Department, Haryana",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://itiharyana.gov.in/"
    },
    {
      Name: "Himachal Pradesh Job Assurance Program",
      Description: "An initiative to assure job opportunities to eligible individuals in Himachal Pradesh.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e35b"),
      Department: "Labour and Employment Department, Himachal Pradesh",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2019",
      documentLink: "https://eemis.hp.nic.in/"
    },
    {
      Name: "Jharkhand Job Training Scheme",
      Description: "A scheme to provide job training and skill development programs in Jharkhand.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e35d"),
      Department: "Department of Labour, Employment and Training, Jharkhand",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2021",
      documentLink: "https://www.myscheme.gov.in/schemes/sjkvy"
    },
    {
      Name: "Karnataka Employment Guarantee",
      Description: "A scheme aimed at providing guaranteed employment opportunities to eligible individuals in Karnataka.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e35f"),
      Department: "Department of Labour, Karnataka",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://labour.karnataka.gov.in/"
    },
    {
      Name: "Kerala Startup Job Program",
      Description: "A program focused on fostering startups and providing employment opportunities in Kerala.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e361"),
      Department: "Department of Labour and Skills, Kerala",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2021",
      documentLink: "https://startupmission.kerala.gov.in/career/ksum"
    },
    {
      Name: "Madhya Pradesh Job Creation Mission",
      Description: "A mission to create new employment avenues through government and private initiatives in Madhya Pradesh.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e363"),
      Department: "Department of Industrial Policy and Investment Promotion, Madhya Pradesh",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://cedmapindia.mp.gov.in/"
    },
    {
      Name: "Maharashtra Rural Employment Scheme",
      Description: "Focused on improving employment rates in rural areas of Maharashtra through skill and job support.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e365"),
      Department: "Department of Rural Development, Maharashtra",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2019",
      documentLink: "https://rdd.maharashtra.gov.in/"
    },
    {
      Name: "Punjab Employment Guarantee",
      Description: "A program to assure job opportunities for the unemployed in Punjab.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e371"),
      Department: "Department of Employment Generation, Skill Development & Training, Punjab",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://www.pgrkam.com/"
    },
    {
      Name: "Rajasthan Job Training Initiative",
      Description: "An initiative providing job-oriented training programs in Rajasthan.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e373"),
      Department: "Department of Skill, Employment and Entrepreneurship, Rajasthan",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2021",
      documentLink: "https://employment.livelihoods.rajasthan.gov.in/"
    },
    {
      Name: "Sikkim Youth Employment Mission",
      Description: "A mission to support youth in gaining employment through skill development in Sikkim.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e375"),
      Department: "Department of Skill Development and Entrepreneurship, Sikkim",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2021",
      documentLink: "https://sdd.sikkim.gov.in/visitor/aboutdepartment"
    },
    {
      Name: "Tamil Nadu Skill Development",
      Description: "A comprehensive skill development program for employability in Tamil Nadu.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e377"),
      Department: "Tamil Nadu Skill Development Corporation (TNSDC)",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://www.tnskill.tn.gov.in/"
    },
    {
      Name: "Uttar Pradesh Job Support Scheme",
      Description: "A support scheme to boost employment generation across Uttar Pradesh.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e37d"),
      Department: "Department of Vocational Education and Skill Development, Uttar Pradesh",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "http://sewayojan.up.nic.in/"
    },
    {
      Name: "West Bengal Employment Mission",
      Description: "A mission to ensure employment to eligible job seekers through state-run initiatives in West Bengal.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e381"),
      Department: "Department of Labour, West Bengal",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://employmentbankwb.gov.in/"
    },
    {
      Name: "Andhra Pradesh Free Education Scheme",
      Description: "A state-run scheme to offer free education to economically weaker sections in Andhra Pradesh.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e34b"),
      Department: "Department of School Education, Andhra Pradesh",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://cse.ap.gov.in/"
    },
    {
      Name: "Assam Scholarship Program",
      Description: "Provides financial assistance to students from underprivileged backgrounds in Assam.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e34f"),
      Department: "Directorate of Higher Education, Assam",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2021",
      documentLink: "https://directorateofhighereducation.assam.gov.in/"
    },
    {
      Name: "Chhattisgarh Education Loan Scheme",
      Description: "Offers subsidized education loans for higher studies to students in Chhattisgarh.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e353"),
      Department: "Department of Higher Education, Chhattisgarh",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2019",
      documentLink: "https://www.cgapexbank.com/education_loan.php"
    },
    {
      Name: "Goa Student Support Program",
      Description: "Provides financial and academic support to students in Goa pursuing higher education.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e355"),
      Department: "Directorate of Higher Education, Goa",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://www.dhe.goa.gov.in/"
    },
    {
      Name: "Gujarat Educational Aid Scheme",
      Description: "Offers scholarships and financial aid to meritorious and needy students in Gujarat.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e357"),
      Department: "Commissionerate of Higher Education, Gujarat",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2019",
      documentLink: "https://sje.gujarat.gov.in/ddcw/Educational?lang=English"
    },
    {
      Name: "Haryana Scholarship Program",
      Description: "Provides scholarships to SC/ST/OBC and economically weaker students in Haryana.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e359"),
      Department: "Department of Higher Education, Haryana",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2021",
      documentLink: "https://harchhatravratti.highereduhry.ac.in/"
    },
    {
      Name: "Himachal Pradesh Free Education Act",
      Description: "Ensures free education up to college level for eligible categories in Himachal Pradesh.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e35b'),
      Department: "Department of Education, Himachal Pradesh",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://education.hp.gov.in/"
    },
    {
      Name: "Jharkhand Tuition Fee Waiver",
      Description: "Offers a waiver of tuition fees for students from disadvantaged groups in Jharkhand.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e35d'),
      Department: "Department of Higher and Technical Education, Jharkhand",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://jharkhanduniversities.nic.in/"
    },
    {
      Name: "Karnataka Merit Scholarship",
      Description: "A merit-based scholarship program for high-performing students in Karnataka.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e35f'),
      Department: "Department of Collegiate and Technical Education, Karnataka",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2021",
      documentLink: "https://dce.karnataka.gov.in/"
    },
    {
      Name: "Kerala Student Welfare Scheme",
      Description: "A scheme offering financial support and welfare benefits to students in Kerala.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e361'),
      Department: "Directorate of Collegiate Education, Kerala",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2021",
      documentLink: "https://www.dcescholarship.kerala.gov.in/"
    },
    {
      Name: "Madhya Pradesh Scholarship Scheme",
      Description: "Financial support for students from economically weaker sections in Madhya Pradesh to pursue higher education.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e363'),
      Department: "Department of Higher Education, Madhya Pradesh",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://highereducation.mp.gov.in/"
    },
    {
      Name: "Maharashtra Education Aid Program",
      Description: "Provides education aid to marginalized and underprivileged students in Maharashtra.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e365'),
      Department: "Department of Higher and Technical Education, Maharashtra",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2021",
      documentLink: "https://mahadbt.maharashtra.gov.in/Login/Login"
    },
    {
      Name: "Manipur Free Education Initiative",
      Description: "Offers free education for students from low-income families in Manipur.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e367'),
      Department: "Department of Education, Manipur",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2019",
      documentLink: "https://manipureducation.gov.in/"
    },
    {
      Name: "Nagaland Scholarship Program",
      Description: "A program to provide scholarships for students in Nagaland pursuing secondary and higher education.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e36d'),
      Department: "Directorate of Higher Education, Nagaland",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://highereducation.nagaland.gov.in/"
    },
    {
      Name: "Odisha Educational Support Scheme",
      Description: "Support scheme for tribal and backward class students in Odisha to complete their education.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e36f'),
      Department: "Department of School and Mass Education, Odisha",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://sme.odisha.gov.in/"
    },
    {
      Name: "Punjab Student Welfare Act",
      Description: "Provides financial aid and educational resources for students in Punjab.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e371'),
      Department: "Department of Higher Education, Punjab",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2021",
      documentLink: "https://righttoeducation.in/sites/default/files/Punjab%20RTE_Rules%20Final%20draft%20,2011.pdf"
    },
    {
      Name: "Rajasthan School Support Scheme",
      Description: "Supports school education for children from disadvantaged communities in Rajasthan.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e373'),
      Department: "Department of Education, Rajasthan",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://education.rajasthan.gov.in/"
    },
    {
      Name: "Tamil Nadu Education Assistance",
      Description: "Provides education assistance and scholarships to students in Tamil Nadu.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e377'),
      Department: "Department of Higher Education, Tamil Nadu",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2021",
      documentLink: "https://www.tndce.tn.gov.in/"
    },
    {
      Name: "Uttar Pradesh Merit Scholarship",
      Description: "A merit-based scholarship scheme for students in Uttar Pradesh to encourage academic excellence.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e37d'),
      Department: "Department of Education, Uttar Pradesh",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://scholarship.up.gov.in/"
    },
    {
      Name: "Andhra Pradesh Health Insurance Scheme",
      Description: "A state health insurance scheme in Andhra Pradesh providing medical coverage for BPL families.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e34b'),
      Department: "Department of Health, Medical & Family Welfare, Andhra Pradesh",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2019",
      documentLink: "https://cfms.ap.gov.in/"
    },
    {
      Name: "Arunachal Pradesh Medical Support",
      Description: "A healthcare scheme to provide financial support for medical treatment in Arunachal Pradesh.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e34d'),
      Department: "Department of Health and Family Welfare, Arunachal Pradesh",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2021",
      documentLink: "https://health.arunachal.gov.in/"
    },
    {
      Name: "Assam Health Protection Scheme",
      Description: "A comprehensive health protection scheme for underprivileged families in Assam.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e34f'),
      Department: "National Health Mission, Assam",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://nhm.assam.gov.in/"
    },
    {
      Name: "Bihar Health Assurance Plan",
      Description: "A health assurance program to cover medical expenses for BPL families in Bihar.",
      Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e351'),
      Department: "State Health Society, Bihar",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2019",
      documentLink: "https://statehealthsocietybihar.org/"
    },
    {
      Name: "Chhattisgarh Rural Health Initiative",
      Description: "Focuses on improving access to healthcare in rural areas of Chhattisgarh.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e353"),
      Department: "Department of Health and Family Welfare, Chhattisgarh",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://cghealth.nic.in/"
    },
    {
      Name: "Goa Free Health Check-up Program",
      Description: "Provides free health check-ups and diagnostic services in Goa.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e355"),
      Department: "Directorate of Health Services, Goa",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2021",
      documentLink: "https://dhsgoa.gov.in/"
    },
    {
      Name: "Gujarat Medical Assistance Scheme",
      Description: "Medical assistance and cashless treatment for families below the poverty line in Gujarat.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e357"),
      Department: "Health and Family Welfare Department, Gujarat",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2018",
      documentLink: "https://gujhealth.gujarat.gov.in/"
    },
    {
      Name: "Haryana Healthcare Program",
      Description: "Improves health infrastructure and offers medical subsidies to residents of Haryana.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e359"),
      Department: "Health Department, Haryana",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://haryanahealth.gov.in/schemes-programmes/"
    },
    {
      Name: "Himachal Pradesh Health Initiative",
      Description: "A state-wide health initiative for providing free diagnostics and treatment in Himachal Pradesh.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e35b"),
      Department: "Department of Health and Family Welfare, Himachal Pradesh",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2021",
      documentLink: "https://nhm.hp.gov.in/"
    },
    {
      Name: "Jharkhand Rural Health Scheme",
      Description: "Healthcare scheme to improve rural health infrastructure and services in Jharkhand.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e35d"),
      Department: "Department of Health, Medical Education & Family Welfare, Jharkhand",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://jrhms.jharkhand.gov.in/"
    },
    {
      Name: "Karnataka Health Insurance Program",
      Description: "A government-backed health insurance scheme for the economically weaker sections in Karnataka.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e35f"),
      Department: "Department of Health and Family Welfare, Karnataka",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2019",
      documentLink: "https://arogya.karnataka.gov.in/"
    },
    {
      Name: "Kerala Healthcare Assistance",
      Description: "A comprehensive healthcare assistance scheme for families across Kerala.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e361"),
      Department: "Department of Health and Family Welfare, Kerala",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2021",
      documentLink: "https://dhs.kerala.gov.in/"
    },
    {
      Name: "Madhya Pradesh Health Coverage Program",
      Description: "Health insurance and coverage for vulnerable families in Madhya Pradesh.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e363"),
      Department: "Public Health and Family Welfare Department, MP",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://health.mp.gov.in/"
    },
    {
      Name: "Maharashtra Health Insurance Act",
      Description: "A state-wide health insurance framework to ensure access to medical services in Maharashtra.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e365"),
      Department: "Public Health Department, Maharashtra",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2019",
      documentLink: "https://www.jeevandayee.gov.in/"
    },
    {
      Name: "Odisha Health and Wellness Program",
      Description: "Focused on primary healthcare and wellness initiatives in Odisha.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e36f"),
      Department: "Health and Family Welfare Department, Odisha",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2021",
      documentLink: "https://health.odisha.gov.in/"
    },
    {
      Name: "Punjab Health Assurance Scheme",
      Description: "A health assurance scheme to cover major medical expenses for Punjab residents.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e371"),
      Department: "Department of Health and Family Welfare, Punjab",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2020",
      documentLink: "https://health.punjab.gov.in/"
    },
    {
      Name: "Rajasthan Health Welfare Program",
      Description: "Welfare scheme targeting improved medical services and affordability in Rajasthan.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e373"),
      Department: "Medical, Health & Family Welfare Department, Rajasthan",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2021",
      documentLink: "https://medicaleducation.rajasthan.gov.in/"
    },
    {
      Name: "Tamil Nadu Healthcare Mission",
      Description: "A mission to strengthen public healthcare and insurance systems in Tamil Nadu.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e377"),
      Department: "Department of Health and Family Welfare, Tamil Nadu",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2022",
      documentLink: "https://tnhealth.tn.gov.in/"
    },
    {
      Name: "Uttarakhand Health Insurance Plan",
      Description: "Health insurance support for low-income families in Uttarakhand.",
      Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e379"),
      Department: "Department of Medical Health and Family Welfare, Uttarakhand",
      Deadline: "2025-12-31",
      Status: "Active",
      Year: "2019",
      documentLink: "https://health.uk.gov.in/"
    },
      {
        Name: "West Bengal Medical Support Scheme",
        Description: "Aimed at providing financial aid for treatment of critical illnesses in West Bengal.",
        Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e381'),
        Department: "Health and Family Welfare Department, West Bengal",
        Deadline: "2025-12-31",
        Status: "Active",
        Year: "2020",
        documentLink: "https://wbhealth.gov.in/"
      },
      {
        Name: "Delhi Migrant Welfare Act",
        Description: "A migration support policy that safeguards rights and welfare of migrant workers in Delhi.",
        Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e38b'),
        Department: "Labour and Employment Department, Delhi",
        Deadline: "2025-12-31",
        Status: "Active",
        Year: "2023",
        documentLink: "https://labour.delhi.gov.in/"
      },
      {
        Name: "Jammu and Kashmir Employment Guarantee",
        Description: "Employment guarantee initiative ensuring job security for residents of Jammu and Kashmir.",
        Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e391'),
        Department: "Department of Labour and Employment, Jammu and Kashmir",
        Deadline: "2025-12-31",
        Status: "Active",
        Year: "2023",
        documentLink: "https://jkgss.jk.gov.in/"
      },
      {
        Name: "Tripura Free Education Program",
        Description: "Provides free education and learning resources for students across Tripura.",
        Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e37b'),
        Department: "Education Department, Tripura",
        Deadline: "2025-12-31",
        Status: "Active",
        Year: "2022",
        documentLink: "https://schooleducation.tripura.gov.in/"
      },
      {
        Name: "Ladakh Health Support Plan",
        Description: "A healthcare plan to improve medical services and access in Ladakh.",
        Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e38f'),
        Department: "Health and Medical Education Department, Ladakh",
        Deadline: "2025-12-31",
        Status: "Active",
        Year: "2024",
        documentLink: "https://leh.nic.in/"
      },
      {
        Name: "Puducherry Skill Development Scheme",
        Description: "Skill training and job-linked certification programs in Puducherry.",
        Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e38d'),
        Department: "Labour and Employment Department, Puducherry",
        Deadline: "2025-12-31",
        Status: "Active",
        Year: "2021",
        documentLink: "https://labour.py.gov.in/"
      },
      {
        Name: "Lakshadweep Student Support Program",
        Description: "Educational aid and scholarships for students in Lakshadweep.",
        Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e389'),
        Department: "Education Department, Lakshadweep",
        Deadline: "2025-12-31",
        Status: "Active",
        Year: "2020",
        documentLink: "https://www.myscheme.gov.in/schemes/lkdss"
      },
      {
        Name: "Dadra and Nagar Haveli Job Opportunity Scheme",
        Description: "Job placement and employment incentives for residents of Dadra and Nagar Haveli and Daman and Diu.",
        Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e387'),
        Department: "Labour Department, DNHDD",
        Deadline: "2025-12-31",
        Status: "Active",
        Year: "2021",
        documentLink: "https://dnh.gov.in/"
      },
      {
        Name: "Andaman and Nicobar Health Program",
        Description: "Health coverage and wellness campaigns for island residents.",
        Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e383'),
        Department: "Directorate of Health Services, A&N Islands",
        Deadline: "2025-12-31",
        Status: "Active",
        Year: "2022",
        documentLink: "https://dhs.andaman.gov.in/"
      },
      {
        Name: "Chandigarh Migrant Assistance Program",
        Description: "Program supporting migrant workers with housing, health, and employment in Chandigarh.",
        Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e385'),
        Department: "Labour Department, Chandigarh",
        Deadline: "2025-12-31",
        Status: "Active",
        Year: "2023",
        documentLink: "https://chandigarh.gov.in/dept_labour.htm"
      },
      {
        Name: "Sikkim Education for All Initiative",
        Description: "Universal education campaign focused on improving literacy rates in Sikkim.",
        Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e375'),
        Department: "Human Resource Development Department, Sikkim",
        Deadline: "2025-12-31",
        Status: "Active",
        Year: "2022",
        documentLink: "https://sikkimhrdd.org/"
      },
      {
        Name: "Mizoram Employment Assistance",
        Description: "Government assistance for job seekers and skill training programs in Mizoram.",
        Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e36b'),
        Department: "Labour, Employment, Skill Development and Entrepreneurship Department, Mizoram",
        Deadline: "2025-12-31",
        Status: "Active",
        Year: "2021",
        documentLink: "https://lesde.mizoram.gov.in/"
      },
      {
        Name: "Manipur Education Support Scheme",
        Description: "Provides scholarships and academic support for underprivileged students in Manipur.",
        Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e367'),
        Department: "Education Department, Manipur",
        Deadline: "2025-12-31",
        Status: "Active",
        Year: "2022",
        documentLink: "https://www.ptregistrationedusmanipur.com/"
      },
      {
        Name: "Nagaland Healthcare Mission",
        Description: "Improves access to medical services and infrastructure in rural Nagaland.",
        Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e36d'),
        Department: "Health and Family Welfare Department, Nagaland",
        Deadline: "2025-12-31",
        Status: "Active",
        Year: "2023",
        documentLink: "https://nagahealth.nagaland.gov.in/"
      },
      {
        Name: "Meghalaya Job Training Program",
        Description: "Skill development and job placement for unemployed youth in Meghalaya.",
        Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e369'),
        Department: "Labour Department, Meghalaya",
        Deadline: "2025-12-31",
        Status: "Active",
        Year: "2022",
        documentLink: "https://meglabour.gov.in/"
      },
      {
        Name: "Kerala Rural Education Fund",
        Description: "Funding educational infrastructure and learning materials for rural areas in Kerala.",
        Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e361'),
        Department: "General Education Department, Kerala",
        Deadline: "2025-12-31",
        Status: "Active",
        Year: "2021",
        documentLink: "https://education.kerala.gov.in/"
      },
      {
        Name: "Punjab Migration Assistance",
        Description: "Support services for migrant workers and returnees in Punjab.",
        Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e371'),
        Department: "Department of Employment Generation, Skill Development & Training, Punjab",
        Deadline: "2025-12-31",
        Status: "Active",
        Year: "2023",
        documentLink: "https://punjab.gov.in/government/departments/department-of-home-affairs-and-justice/"
      },
      {
        Name: "Odisha Job Opportunity Scheme",
        Description: "Employment and entrepreneurship incentives for youth in Odisha.",
        Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e36f'),
        Department: "Skill Development and Technical Education Department, Odisha",
        Deadline: "2025-12-31",
        Status: "Active",
        Year: "2022",
        documentLink: "https://skill.samsodisha.gov.in/"
      },
      {
        Name: "Tamil Nadu Rural Health Program",
        Description: "Focused healthcare services and outreach in rural areas of Tamil Nadu.",
        Region: new mongoose.Types.ObjectId('67cffe734df4cc218981e377'),
        Department: "Health and Family Welfare Department, Tamil Nadu",
        Deadline: "2025-12-31",
        Status: "Active",
        Year: "2023",
        documentLink: "https://tnhealth.tn.gov.in/tngovin/orgnstructure.php"
      },
      {
        Name: "Uttar Pradesh Student Loan Support",
        Description: "Loan assistance for students pursuing higher education in Uttar Pradesh.",
        Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e37d"),
        Department: "Higher Education Department, Uttar Pradesh",
        Deadline: "2025-12-31",
        Status: "Active",
        Year: "2022",
        documentLink: "https://uphed.gov.in/"
      },
      {
        Name: "West Bengal Skill Development Initiative",
        Description: "Statewide initiative to enhance employability through skills training.",
        Region: new mongoose.Types.ObjectId("67cffe734df4cc218981e381"),
        Department: "Technical Education, Training & Skill Development Department, West Bengal",
        Deadline: "2025-12-31",
        Status: "Active",
        Year: "2023",
        documentLink: "https://wb.gov.in/"
      }
];


async function insertData() {
  try {
    await Policy.insertMany(policies);
    console.log('Policies inserted successfully!');
  } catch (error) {
    console.error('Error inserting policies:', error);
  } finally {
    mongoose.connection.close();
  }
}

insertData();



const institutes = [
  {
    Name: "Indian Institute of Technology Bombay",
    address: "Powai, Mumbai, Maharashtra, India",
    websiteLink: "https://www.iitb.ac.in",
    accreditation: "UGC, AICTE",
    establishment_year: 1958,
    degreesOffered: ["B.Tech", "M.Tech", "Ph.D"]
  },
  {
    Name: "Indian Institute of Technology Delhi",
    address: "Hauz Khas, New Delhi, India",
    websiteLink: "https://home.iitd.ac.in",
    accreditation: "UGC, AICTE",
    establishment_year: 1961,
    degreesOffered: ["B.Tech", "M.Tech", "Ph.D"]
  },
  
    {
      Name: "Indian Institute of Technology Madras",
      address: "Chennai, Tamil Nadu, India",
      websiteLink: "https://www.iitm.ac.in",
      accreditation: "UGC, AICTE",
      establishment_year: 1959,
      degreesOffered: ["B.Tech", "M.Tech", "Ph.D"]
    },
    {
      Name: "Indian Institute of Technology Kanpur",
      address: "Kanpur, Uttar Pradesh, India",
      websiteLink: "https://www.iitk.ac.in",
      accreditation: "UGC, AICTE",
      establishment_year: 1959,
      degreesOffered: ["B.Tech", "M.Tech", "Ph.D"]
    },
    {
      Name: "Indian Institute of Technology Kharagpur",
      address: "Kharagpur, West Bengal, India",
      websiteLink: "https://www.iitkgp.ac.in",
      accreditation: "UGC, AICTE",
      establishment_year: 1951,
      degreesOffered: ["B.Tech", "M.Tech", "Ph.D"]
    },
    {
      Name: "Indian Institute of Science",
      address: "Bangalore, Karnataka, India",
      websiteLink: "https://www.iisc.ac.in",
      accreditation: "UGC, AICTE",
      establishment_year: 1909,
      degreesOffered: ["B.Sc", "M.Sc", "Ph.D"]
    },
    {
      Name: "Indian Institute of Management Ahmedabad",
      address: "Ahmedabad, Gujarat, India",
      websiteLink: "https://www.iima.ac.in",
      accreditation: "AACSB, EQUIS",
      establishment_year: 1961,
      degreesOffered: ["MBA", "PGDM", "Ph.D"]
    },
    {
      Name: "Indian Institute of Management Bangalore",
      address: "Bangalore, Karnataka, India",
      websiteLink: "https://www.iimb.ac.in",
      accreditation: "AACSB, EQUIS",
      establishment_year: 1973,
      degreesOffered: ["MBA", "PGDM", "Ph.D"]
    },
    {
      Name: "Indian Institute of Management Calcutta",
      address: "Kolkata, West Bengal, India",
      websiteLink: "https://www.iimcal.ac.in",
      accreditation: "AACSB, EQUIS, AMBA",
      establishment_year: 1961,
      degreesOffered: ["MBA", "PGDM", "Ph.D"]
    },
    {
      Name: "Delhi University",
      address: "New Delhi, India",
      websiteLink: "https://www.du.ac.in",
      accreditation: "UGC, NAAC A+",
      establishment_year: 1922,
      degreesOffered: ["B.A", "B.Com", "B.Sc", "M.A", "Ph.D"]
    },
    {
      Name: "Jawaharlal Nehru University",
      address: "New Delhi, India",
      websiteLink: "https://www.jnu.ac.in",
      accreditation: "UGC, NAAC A++",
      establishment_year: 1969,
      degreesOffered: ["B.A", "M.A", "M.Sc", "Ph.D"]
    },
    {
      Name: "Banaras Hindu University",
      address: "Varanasi, Uttar Pradesh, India",
      websiteLink: "https://www.bhu.ac.in",
      accreditation: "UGC, NAAC A",
      establishment_year: 1916,
      degreesOffered: ["B.A", "B.Com", "B.Sc", "M.A", "Ph.D"]
    },
        {
          Name: "Tata Institute of Fundamental Research",
          address: "Mumbai, Maharashtra, India",
          websiteLink: "https://www.tifr.res.in",
          accreditation: "UGC",
          establishment_year: 1945,
          degreesOffered: ["M.Sc", "Ph.D"]
        },
        {
          Name: "Indian Statistical Institute",
          address: "Kolkata, West Bengal, India",
          websiteLink: "https://www.isical.ac.in",
          accreditation: "UGC",
          establishment_year: 1931,
          degreesOffered: ["B.Stat", "M.Stat", "Ph.D"]
        },
        {
          Name: "National Institute of Design",
          address: "Ahmedabad, Gujarat, India",
          websiteLink: "https://www.nid.edu",
          accreditation: "AICTE",
          establishment_year: 1961,
          degreesOffered: ["B.Des", "M.Des", "Ph.D"]
        },
        {
          Name: "All India Institute of Medical Sciences (AIIMS) Delhi",
          address: "New Delhi, India",
          websiteLink: "https://www.aiims.edu",
          accreditation: "MCI",
          establishment_year: 1956,
          degreesOffered: ["MBBS", "MD", "DM", "M.Ch"]
        },
        {
          Name: "Christian Medical College",
          address: "Vellore, Tamil Nadu, India",
          websiteLink: "https://www.cmch-vellore.edu",
          accreditation: "MCI",
          establishment_year: 1900,
          degreesOffered: ["MBBS", "MD", "DM", "M.Ch"]
        },
        {
          Name: "National Law School of India University",
          address: "Bangalore, Karnataka, India",
          websiteLink: "https://www.nls.ac.in",
          accreditation: "UGC, BCI",
          establishment_year: 1986,
          degreesOffered: ["BA LLB", "LLM", "Ph.D"]
        },
        {
          Name: "Symbiosis International University",
          address: "Pune, Maharashtra, India",
          websiteLink: "https://www.siu.edu.in",
          accreditation: "UGC, NAAC A+",
          establishment_year: 1971,
          degreesOffered: ["BBA", "MBA", "LLB", "MCA"]
        },
        {
          Name: "Indian School of Business",
          address: "Hyderabad, Telangana, India",
          websiteLink: "https://www.isb.edu",
          accreditation: "AACSB",
          establishment_year: 2001,
          degreesOffered: ["PGP", "MBA", "Executive MBA"]
        },
        {
          Name: "Xavier School of Management (XLRI)",
          address: "Jamshedpur, Jharkhand, India",
          websiteLink: "https://www.xlri.ac.in",
          accreditation: "AICTE, AACSB",
          establishment_year: 1949,
          degreesOffered: ["PGDM", "MBA", "Executive MBA"]
        },
        {
          Name: "Film and Television Institute of India",
          address: "Pune, Maharashtra, India",
          websiteLink: "https://www.ftii.ac.in",
          accreditation: "AICTE",
          establishment_year: 1960,
          degreesOffered: ["PG Diploma in Film Direction", "Cinematography", "Acting"]
        },
          {
            Name: "National Law University (NLU)",
            address: "New Delhi, India",
            websiteLink: "https://www.nludelhi.ac.in",
            accreditation: "BCI, UGC",
            establishment_year: 2008,
            degreesOffered: ["BA LLB", "LLM", "Ph.D in Law"]
          },
          {
            Name: "Film and Television Institute of India (FTII)",
            address: "Pune, Maharashtra, India",
            websiteLink: "https://www.ftii.ac.in",
            accreditation: "Ministry of Information & Broadcasting",
            establishment_year: 1960,
            degreesOffered: ["Diploma in Direction", "Diploma in Cinematography", "Diploma in Editing"]
          },
          {
            Name: "Indian Statistical Institute (ISI)",
            address: "Kolkata, West Bengal, India",
            websiteLink: "https://www.isical.ac.in",
            accreditation: "AICTE, UGC",
            establishment_year: 1931,
            degreesOffered: ["B.Stat", "M.Stat", "M.Tech in Cryptology", "Ph.D"]
          },
          {
            Name: "National Institute of Design (NID)",
            address: "Ahmedabad, Gujarat, India",
            websiteLink: "https://www.nid.edu",
            accreditation: "UGC",
            establishment_year: 1961,
            degreesOffered: ["B.Des", "M.Des", "Ph.D in Design"]
          },
          {
            Name: "Indian Maritime University (IMU)",
            address: "Chennai, Tamil Nadu, India",
            websiteLink: "https://www.imu.edu.in",
            accreditation: "UGC",
            establishment_year: 2008,
            degreesOffered: ["B.Tech Marine Engineering", "B.Sc Nautical Science", "MBA Port & Shipping Management"]
          },
          {
            Name: "Indira Gandhi Institute of Development Research (IGIDR)",
            address: "Mumbai, Maharashtra, India",
            websiteLink: "https://www.igidr.ac.in",
            accreditation: "UGC",
            establishment_year: 1987,
            degreesOffered: ["M.Sc in Economics", "Ph.D in Development Studies"]
          },
          {
            Name: "Institute of Hotel Management (IHM)",
            address: "Pusa, New Delhi, India",
            websiteLink: "https://www.ihmpusa.net",
            accreditation: "NCHMCT",
            establishment_year: 1962,
            degreesOffered: ["B.Sc Hospitality & Hotel Administration", "Diploma in Food Production"]
          },
          {
            Name: "Indian Institute of Science Education and Research (IISER)",
            address: "Pune, Maharashtra, India",
            websiteLink: "https://www.iiserpune.ac.in",
            accreditation: "MHRD",
            establishment_year: 2006,
            degreesOffered: ["BS-MS", "Ph.D in Science"]
          },
          {
            Name: "The Energy and Resources Institute (TERI)",
            address: "New Delhi, India",
            websiteLink: "https://www.terisas.ac.in",
            accreditation: "UGC",
            establishment_year: 1998,
            degreesOffered: ["M.Tech in Renewable Energy", "MBA in Sustainability", "Ph.D"]
          },
          {
            Name: "Institute of Rural Management Anand (IRMA)",
            address: "Anand, Gujarat, India",
            websiteLink: "https://www.irma.ac.in",
            accreditation: "AICTE",
            establishment_year: 1979,
            degreesOffered: ["PGDM Rural Management", "Fellowship in Management"]
          },
            {
              Name: "Indian Statistical Institute (ISI)",
              address: "Kolkata, West Bengal, India",
              websiteLink: "https://www.isical.ac.in",
              accreditation: "AICTE, Ministry of Statistics",
              establishment_year: 1931,
              degreesOffered: ["B.Stat", "M.Stat", "M.Tech in Cryptology", "Ph.D in Statistical Sciences"]
            },
            {
              Name: "National Institute of Design (NID)",
              address: "Ahmedabad, Gujarat, India",
              websiteLink: "https://www.nid.edu",
              accreditation: "Institute of National Importance",
              establishment_year: 1961,
              degreesOffered: ["B.Des", "M.Des", "Ph.D in Design"]
            },
            {
              Name: "Indian Institute of Forest Management (IIFM)",
              address: "Bhopal, Madhya Pradesh, India",
              websiteLink: "https://www.iifm.ac.in",
              accreditation: "Ministry of Environment, Forest and Climate Change",
              establishment_year: 1982,
              degreesOffered: ["PG Diploma in Forestry Management", "M.Phil in Natural Resource Management"]
            },
            {
              Name: "Rashtriya Raksha University (RRU)",
              address: "Gandhinagar, Gujarat, India",
              websiteLink: "https://www.rru.ac.in",
              accreditation: "Ministry of Home Affairs",
              establishment_year: 2010,
              degreesOffered: ["B.Tech in Cyber Security", "M.Sc in Criminology", "PG Diploma in Forensic Science"]
            },
            {
              Name: "Wildlife Institute of India (WII)",
              address: "Dehradun, Uttarakhand, India",
              websiteLink: "https://www.wii.gov.in",
              accreditation: "Ministry of Environment, Forest and Climate Change",
              establishment_year: 1982,
              degreesOffered: ["M.Sc in Wildlife Sciences", "Ph.D in Wildlife Conservation"]
            },
            {
              Name: "Footwear Design and Development Institute (FDDI)",
              address: "Noida, Uttar Pradesh, India",
              websiteLink: "https://www.fddiindia.com",
              accreditation: "Ministry of Commerce & Industry",
              establishment_year: 1986,
              degreesOffered: ["B.Des in Footwear Design", "MBA in Retail & Fashion Management"]
            },
            {
              Name: "National Institute of Solar Energy (NISE)",
              address: "Gurugram, Haryana, India",
              websiteLink: "https://www.nise.res.in",
              accreditation: "Ministry of New and Renewable Energy",
              establishment_year: 2013,
              degreesOffered: ["Diploma in Solar Energy", "M.Tech in Renewable Energy", "Ph.D in Solar Photovoltaics"]
            },
            {
              Name: "Lakshmibai National Institute of Physical Education (LNIPE)",
              address: "Gwalior, Madhya Pradesh, India",
              websiteLink: "https://www.lnipe.edu.in",
              accreditation: "Ministry of Youth Affairs and Sports",
              establishment_year: 1957,
              degreesOffered: ["B.P.Ed", "M.P.Ed", "Ph.D in Sports Science"]
            },
            {
              Name: "Indian Institute of Crop Processing Technology (IICPT)",
              address: "Thanjavur, Tamil Nadu, India",
              websiteLink: "https://www.iicpt.edu.in",
              accreditation: "ICAR",
              establishment_year: 1967,
              degreesOffered: ["B.Tech in Food Processing", "M.Tech in Crop Processing", "Ph.D in Post-Harvest Engineering"]
            },
            {
              Name: "Indira Gandhi Institute of Development Research (IGIDR)",
              address: "Mumbai, Maharashtra, India",
              websiteLink: "http://www.igidr.ac.in",
              accreditation: "Reserve Bank of India",
              establishment_year: 1987,
              degreesOffered: ["M.Sc in Economics", "Ph.D in Development Studies"]
            },
              {
                Name: "Birla Institute of Technology and Science (BITS) Pilani",
                address: "Pilani, Rajasthan, India",
                websiteLink: "https://www.bits-pilani.ac.in",
                accreditation: "UGC, AICTE",
                establishment_year: 1964,
                degreesOffered: ["B.E", "M.E", "Ph.D"]
              },
              {
                Name: "Vellore Institute of Technology (VIT)",
                address: "Vellore, Tamil Nadu, India",
                websiteLink: "https://www.vit.ac.in",
                accreditation: "UGC, NAAC A++",
                establishment_year: 1984,
                degreesOffered: ["B.Tech", "M.Tech", "Ph.D"]
              },
              {
                Name: "SRM Institute of Science and Technology",
                address: "Chennai, Tamil Nadu, India",
                websiteLink: "https://www.srmist.edu.in",
                accreditation: "UGC, NAAC A++",
                establishment_year: 1985,
                degreesOffered: ["B.Tech", "M.Tech", "MBA", "Ph.D"]
              },
              {
                Name: "Amity University",
                address: "Noida, Uttar Pradesh, India",
                websiteLink: "https://www.amity.edu",
                accreditation: "UGC, NAAC A+",
                establishment_year: 2005,
                degreesOffered: ["B.Tech", "MBA", "LLB", "Ph.D"]
              },
              {
                Name: "Indian Institute of Information Technology Allahabad (IIIT-A)",
                address: "Allahabad, Uttar Pradesh, India",
                websiteLink: "https://www.iiita.ac.in",
                accreditation: "UGC, AICTE",
                establishment_year: 1999,
                degreesOffered: ["B.Tech", "M.Tech", "Ph.D"]
              },
              {
                Name: "National Institute of Technology Tiruchirappalli (NIT Trichy)",
                address: "Tiruchirappalli, Tamil Nadu, India",
                websiteLink: "https://www.nitt.edu",
                accreditation: "UGC, AICTE",
                establishment_year: 1964,
                degreesOffered: ["B.Tech", "M.Tech", "Ph.D"]
              },
              {
                Name: "Jamia Millia Islamia",
                address: "New Delhi, India",
                websiteLink: "https://www.jmi.ac.in",
                accreditation: "UGC, NAAC A++",
                establishment_year: 1920,
                degreesOffered: ["B.A", "B.Tech", "M.A", "Ph.D"]
              },
              {
                Name: "University of Hyderabad",
                address: "Hyderabad, Telangana, India",
                websiteLink: "https://www.uohyd.ac.in",
                accreditation: "UGC, NAAC A+",
                establishment_year: 1974,
                degreesOffered: ["M.Sc", "M.A", "Ph.D"]
              },
              {
                Name: "Savitribai Phule Pune University",
                address: "Pune, Maharashtra, India",
                websiteLink: "http://www.unipune.ac.in",
                accreditation: "UGC, NAAC A++",
                establishment_year: 1949,
                degreesOffered: ["B.A", "B.Sc", "M.A", "Ph.D"]
              },
              {
                Name: "Indian Institute of Science Education and Research (IISER) Pune",
                address: "Pune, Maharashtra, India",
                websiteLink: "https://www.iiserpune.ac.in",
                accreditation: "UGC",
                establishment_year: 2006,
                degreesOffered: ["B.S-MS", "Ph.D"]
              },
              {
                Name: "National Institute of Fashion Technology (NIFT)",
                address: "New Delhi, India",
                websiteLink: "https://www.nift.ac.in",
                accreditation: "UGC",
                establishment_year: 1986,
                degreesOffered: ["B.Des", "M.Des", "Ph.D"]
              },
              {
                Name: "Shiv Nadar University",
                address: "Dadri, Uttar Pradesh, India",
                websiteLink: "https://www.snu.edu.in",
                accreditation: "UGC, NAAC A+",
                establishment_year: 2011,
                degreesOffered: ["B.Tech", "B.Sc", "MBA", "Ph.D"]
              },
              {
                Name: "Chennai Mathematical Institute",
                address: "Chennai, Tamil Nadu, India",
                websiteLink: "https://www.cmi.ac.in",
                accreditation: "UGC",
                establishment_year: 1989,
                degreesOffered: ["B.Sc", "M.Sc", "Ph.D"]
              },
              {
                Name: "TISS (Tata Institute of Social Sciences)",
                address: "Mumbai, Maharashtra, India",
                websiteLink: "https://www.tiss.edu",
                accreditation: "UGC, NAAC A++",
                establishment_year: 1936,
                degreesOffered: ["B.A", "M.A", "Ph.D"]
              },
              {
                Name: "Ashoka University",
                address: "Sonipat, Haryana, India",
                websiteLink: "https://www.ashoka.edu.in",
                accreditation: "UGC",
                establishment_year: 2014,
                degreesOffered: ["B.A", "B.Sc", "M.A", "Ph.D"]
              },
              {
                Name: "Birla Institute of Technology and Science (BITS) Pilani",
                address: "Pilani, Rajasthan, India",
                websiteLink: "https://www.bits-pilani.ac.in",
                accreditation: "UGC, AICTE",
                establishment_year: 1964,
                degreesOffered: ["B.E", "M.E", "Ph.D"]
              },
              {
                Name: "Vellore Institute of Technology (VIT)",
                address: "Vellore, Tamil Nadu, India",
                websiteLink: "https://www.vit.ac.in",
                accreditation: "UGC, NAAC A++",
                establishment_year: 1984,
                degreesOffered: ["B.Tech", "M.Tech", "Ph.D"]
              },
              {
                Name: "SRM Institute of Science and Technology",
                address: "Chennai, Tamil Nadu, India",
                websiteLink: "https://www.srmist.edu.in",
                accreditation: "UGC, NAAC A++",
                establishment_year: 1985,
                degreesOffered: ["B.Tech", "M.Tech", "MBA", "Ph.D"]
              },
              {
                Name: "Amity University",
                address: "Noida, Uttar Pradesh, India",
                websiteLink: "https://www.amity.edu",
                accreditation: "UGC, NAAC A+",
                establishment_year: 2005,
                degreesOffered: ["B.Tech", "MBA", "LLB", "Ph.D"]
              },
              {
                Name: "Indian Institute of Information Technology Allahabad (IIIT-A)",
                address: "Allahabad, Uttar Pradesh, India",
                websiteLink: "https://www.iiita.ac.in",
                accreditation: "UGC, AICTE",
                establishment_year: 1999,
                degreesOffered: ["B.Tech", "M.Tech", "Ph.D"]
              },
              {
                Name: "National Institute of Technology Tiruchirappalli (NIT Trichy)",
                address: "Tiruchirappalli, Tamil Nadu, India",
                websiteLink: "https://www.nitt.edu",
                accreditation: "UGC, AICTE",
                establishment_year: 1964,
                degreesOffered: ["B.Tech", "M.Tech", "Ph.D"]
              },
              {
                Name: "Jamia Millia Islamia",
                address: "New Delhi, India",
                websiteLink: "https://www.jmi.ac.in",
                accreditation: "UGC, NAAC A++",
                establishment_year: 1920,
                degreesOffered: ["B.A", "B.Tech", "M.A", "Ph.D"]
              },
              {
                Name: "University of Hyderabad",
                address: "Hyderabad, Telangana, India",
                websiteLink: "https://www.uohyd.ac.in",
                accreditation: "UGC, NAAC A+",
                establishment_year: 1974,
                degreesOffered: ["M.Sc", "M.A", "Ph.D"]
              },
              {
                Name: "Savitribai Phule Pune University",
                address: "Pune, Maharashtra, India",
                websiteLink: "http://www.unipune.ac.in",
                accreditation: "UGC, NAAC A++",
                establishment_year: 1949,
                degreesOffered: ["B.A", "B.Sc", "M.A", "Ph.D"]
              },
              {
                Name: "Indian Institute of Science Education and Research (IISER) Pune",
                address: "Pune, Maharashtra, India",
                websiteLink: "https://www.iiserpune.ac.in",
                accreditation: "UGC",
                establishment_year: 2006,
                degreesOffered: ["B.S-MS", "Ph.D"]
              },
              {
                Name: "National Institute of Fashion Technology (NIFT)",
                address: "New Delhi, India",
                websiteLink: "https://www.nift.ac.in",
                accreditation: "UGC",
                establishment_year: 1986,
                degreesOffered: ["B.Des", "M.Des", "Ph.D"]
              },
              {
                Name: "Shiv Nadar University",
                address: "Dadri, Uttar Pradesh, India",
                websiteLink: "https://www.snu.edu.in",
                accreditation: "UGC, NAAC A+",
                establishment_year: 2011,
                degreesOffered: ["B.Tech", "B.Sc", "MBA", "Ph.D"]
              },
              {
                Name: "Chennai Mathematical Institute",
                address: "Chennai, Tamil Nadu, India",
                websiteLink: "https://www.cmi.ac.in",
                accreditation: "UGC",
                establishment_year: 1989,
                degreesOffered: ["B.Sc", "M.Sc", "Ph.D"]
              },
              {
                Name: "TISS (Tata Institute of Social Sciences)",
                address: "Mumbai, Maharashtra, India",
                websiteLink: "https://www.tiss.edu",
                accreditation: "UGC, NAAC A++",
                establishment_year: 1936,
                degreesOffered: ["B.A", "M.A", "Ph.D"]
              },
              {
                Name: "Ashoka University",
                address: "Sonipat, Haryana, India",
                websiteLink: "https://www.ashoka.edu.in",
                accreditation: "UGC",
                establishment_year: 2014,
                degreesOffered: ["B.A", "B.Sc", "M.A", "Ph.D"]
              },
                {
                  "Name": "Indian Institute of Information Technology Design and Manufacturing, Kancheepuram",
                  "address": "Chennai, Tamil Nadu, India",
                  "websiteLink": "http://www.iiitdm.ac.in",
                  "accreditation": "MHRD",
                  "establishment_year": 2007,
                  "degreesOffered": ["B.Tech", "M.Tech", "Ph.D"]
                },
                {
                  "Name": "National Institute of Technology, Mizoram",
                  "address": "Aizawl, Mizoram, India",
                  "websiteLink": "http://www.nitmz.ac.in",
                  "accreditation": "MHRD",
                  "establishment_year": 2010,
                  "degreesOffered": ["B.Tech", "M.Tech", "Ph.D"]
                },
                {
                  "Name": "Central University of Jharkhand",
                  "address": "Ranchi, Jharkhand, India",
                  "websiteLink": "http://www.cuj.ac.in",
                  "accreditation": "UGC",
                  "establishment_year": 2009,
                  "degreesOffered": ["B.A", "M.A", "Ph.D"]
                },
                {
                  "Name": "Mizoram University",
                  "address": "Aizawl, Mizoram, India",
                  "websiteLink": "http://www.mzu.edu.in",
                  "accreditation": "UGC, NAAC A",
                  "establishment_year": 2001,
                  "degreesOffered": ["B.Sc", "M.Sc", "Ph.D"]
                },
                {
                  "Name": "Nagaland University",
                  "address": "Lumami, Nagaland, India",
                  "websiteLink": "http://www.nagalanduniversity.ac.in",
                  "accreditation": "UGC",
                  "establishment_year": 1994,
                  "degreesOffered": ["B.A", "M.A", "Ph.D"]
                },
                {
                  "Name": "Central University of Tamil Nadu",
                  "address": "Thiruvarur, Tamil Nadu, India",
                  "websiteLink": "http://www.cutn.ac.in",
                  "accreditation": "UGC",
                  "establishment_year": 2009,
                  "degreesOffered": ["B.Sc", "M.Sc", "Ph.D"]
                },
                {
                  "Name": "Indian Institute of Information Technology, Una",
                  "address": "Una, Himachal Pradesh, India",
                  "websiteLink": "http://www.iiitu.ac.in",
                  "accreditation": "MHRD",
                  "establishment_year": 2014,
                  "degreesOffered": ["B.Tech", "M.Tech"]
                },
                {
                  "Name": "Central University of Haryana",
                  "address": "Mahendragarh, Haryana, India",
                  "websiteLink": "http://www.cuh.ac.in",
                  "accreditation": "UGC",
                  "establishment_year": 2009,
                  "degreesOffered": ["B.A", "M.A", "Ph.D"]
                },
                {
                  "Name": "National Institute of Technology, Arunachal Pradesh",
                  "address": "Yupia, Arunachal Pradesh, India",
                  "websiteLink": "http://www.nitap.ac.in",
                  "accreditation": "MHRD",
                  "establishment_year": 2010,
                  "degreesOffered": ["B.Tech", "M.Tech", "Ph.D"]
                },
                {
                  "Name": "Central University of Kerala",
                  "address": "Kasaragod, Kerala, India",
                  "websiteLink": "http://www.cukerala.ac.in",
                  "accreditation": "UGC",
                  "establishment_year": 2009,
                  "degreesOffered": ["B.Sc", "M.Sc", "Ph.D"]
                },
                {
                  "Name": "Indian Institute of Information Technology, Kalyani",
                  "address": "Kalyani, West Bengal, India",
                  "websiteLink": "http://www.iiitkalyani.ac.in",
                  "accreditation": "MHRD",
                  "establishment_year": 2014,
                  "degreesOffered": ["B.Tech", "M.Tech"]
                },
                {
                  "Name": "Central University of South Bihar",
                  "address": "Gaya, Bihar, India",
                  "websiteLink": "http://www.cusb.ac.in",
                  "accreditation": "UGC",
                  "establishment_year": 2009,
                  "degreesOffered": ["B.A", "M.A", "Ph.D"]
                },
                {
                  "Name": "National Institute of Technology, Manipur",
                  "address": "Imphal, Manipur, India",
                  "websiteLink": "http://www.nitmanipur.ac.in",
                  "accreditation": "MHRD",
                  "establishment_year": 2010,
                  "degreesOffered": ["B.Tech", "M.Tech", "Ph.D"]
                },
                {
                  "Name": "Central University of Rajasthan",
                  "address": "Ajmer, Rajasthan, India",
                  "websiteLink": "http://www.curaj.ac.in",
                  "accreditation": "UGC",
                  "establishment_year": 2009,
                  "degreesOffered": ["B.Sc", "M.Sc", "Ph.D"]
                },
                {
                  "Name": "Indian Institute of Information Technology, Dharwad",
                  "address": "Dharwad, Karnataka, India",
                  "websiteLink": "http://www.iiitdwd.ac.in",
                  "accreditation": "MHRD",
                  "establishment_year": 2015,
                  "degreesOffered": ["B.Tech", "M.Tech"]
                }
              
            ];

const insertInstitutes = async () => {
  try {
    await Institute.insertMany(institutes);
    console.log(" 100 institutes added successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting institutes:", error);
  }
};

insertInstitutes();
