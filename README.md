# **US States Data API**

A REST API built with Node.js, Express, and MongoDB that provides data and fun facts about all 50 US States.

## **Features**

* Fetch comprehensive state data (population, capitals, admission dates, etc.).  
* Filter states by contiguous or non-contiguous (?contig=true).  
* Store, update, and delete state fun facts using a connected MongoDB database.

## **Tech Stack**

* **Backend:** Node.js, Express.js  
* **Database:** MongoDB (Mongoose)

## **Local Setup**

1. **Clone the repository:**  
   git clone \<your-repo-url\>

2. **Install dependencies:**  
   npm install

3. **Configure Environment:**  
   Create a .env file in the root directory and add your database connection string:  
   DATABASE\_URI=your\_mongodb\_connection\_string\_here  
   PORT=3500

4. **Start the server:**  
   npm start

## **API Endpoints Reference**

*Note: The :state parameter is a 2-letter state abbreviation (e.g., KS, NY). It is case-insensitive.*

### **GET Requests**

* GET /states/ \- Get all state data  
* GET /states/:state \- Get all data for a specific state  
* GET /states/:state/funfact \- Get a random fun fact for a state  
* GET /states/:state/capital \- Get state and capital  
* GET /states/:state/nickname \- Get state and nickname  
* GET /states/:state/population \- Get state and population  
* GET /states/:state/admission \- Get state and admission date

### **Data Modification (Requires JSON Body)**

* POST /states/:state/funfact \- Add a new array of fun facts.  
* PATCH /states/:state/funfact \- Update a fun fact (requires index and funfact properties).  
* DELETE /states/:state/funfact \- Delete a fun fact (requires index property).