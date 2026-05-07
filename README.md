# **US States Data API**

A REST API built with Node.js, Express, and MongoDB that provides data and fun facts about all 50 US States.

## **Features**

* Fetch comprehensive state data (population, capitals, admission dates, etc.).  
* Filter states by contiguous or non-contiguous (?contig=true).  
* Store, update, and delete state fun facts using a connected MongoDB database.

## **Tech Stack**

* **Backend:** Node.js, Express.js  
* **Database:** MongoDB (Mongoose)


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
* PATCH /states/:state/funfact \- Update a fun fact 
* DELETE /states/:state/funfact \- Delete a fun fact
