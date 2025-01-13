# Hospital Event Scheduling System
![React](https://img.shields.io/badge/React-brightgreen?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-black?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-green?logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-blue?logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-blue?logo=docker&logoColor=white)

## Technologies Used:
Main technologies which are used in this project are **React/Ts**, **Node/Express** and **MongoDB**.  

## Version:  
**React**: 18.3.1  
**Express.js**: 4.21.2  
**Node**: v18.17.0  
**npm**: 9.6.7  

## Overview:  
This application serves as a reservation system within a hospital. We can have users who are either **patients** or **doctors** and who can make **reservations(events)** or make **appointments(slots)**.  

**The Doctor** has a page where he makes new appointments (slots), where he chooses the exact date and time and cannot have overlaps with his slots, which means that he cannot have two slots that occupy the same time interval. On that page, he has a list of all his slots arranged by date, where he can see exactly which slot is free and which is booked. The doctor also has a special page for reservations (events), where he manages the display of all events related to him and chooses whether to reject or accept them.   

**Patients** have a page where they can choose a doctor and can see a calendar with all appointments and can schedule appointments, where they will have special validations if the appointments are already taken or if they have already sent a request, etc. In addition, they also have a page for reservations (events), where they can see all their events that are pending, approved or rejected.  

## JWT Authentication:  
I implemented JWT authentication in this app and here is the flow:  

### Authentication Flow:   

**1. Login**:  
- User logs in with email and passwrd and receives access and refresh tokens (and role but its not important for this doc, just for frontend).
 
**2. Access Token(edit in config.env for time if you want)**:
-  Used for authenticatin requests and it expires after a short period(6 minutes).
  
**3. Refresh Token(edit in config.env for time if you want)**:
- Used to obtain a new access token when the current one expires and its typically set in long expiration time.

### Auth middleware explanation:  

**1. Access Token Validation:**   
-  The middlewre check for the presence of a valid access token in the **Authorization** header and if its valid, user is authenticated.
  
**2. RBAC:**  
-  It verifies if the user's role matches the required roles (if specified).
  
**3. Refresh Token Handling:**
   
-  If the access token is expired, the middlewre checks for a refresh token in the **x-refresh-token** header and issues new tokens if valid.  

## Deploy:  

### Backend Dockerfile(server)  

**1. Build:**  
- **Base Image:** node:18.17-alpine  
- **Working Directory:** /app  
- **Copy Dependencies:** The package*.json files are copied to the working directory.  
- **Install Dependencies:** npm install is run to install all required Node.js packages.  
- **Copy Application Code:** The rest of the source code is copied.  

**2. Run:**   
- **Base Image:** node:18.17-alpine  
- **Copy Files from Build Phase:** All files generated in the previous phase are copied to /app.     
- **Re-install Dependencies:** npm install is run again to ensure all dependencies are available.  
- **Install System Dependencies:** Packages build-base and python3 are installed, required for building native modules like bcrypt.  
- **Rebuild bcrypt:** npm rebuild bcrypt --build-from-source is run to address potential issues with bcrypt.  
- **Port Exposure:** Port 3000 is exposed for the Node.js application.  
- **CMD:** The Node.js application is started using npm start.  

### Frontend Dockerfile(client)   

**1. Build:**  
- **Base Image:** node:18.17-alpine  
- **Working Directory:** /app  
- **Copy Dependencies:** The package*.json files are copied to the working directory.  
- **Install Dependencies:** npm install is run to install required frontend packages.  
- **Copy Application Code:** The rest of the frontend code is copied.  
- **Build the Application:** npm run build is executed to build the frontend application (typically for Angular/Vue/React).  

**2. Run:**  
- **Base Image:** nginx:alpine  
- **Copy Built Application:** The content of the dist/ directory from the build phase is copied into the Nginx folder for serving HTML files (/usr/share/nginx/html).  
- **Copy Custom Nginx Configuration:** The custom nginx.conf is copied into Nginx’s configuration directory.  
- **Port Exposure:** Port 80 is exposed for the Nginx server.  
- **CMD:** Nginx is started with the command nginx -g 'daemon off;' to keep the server running.  
  
## Getting Started:   
Clone this repo, navigate to root folder and start project with **sudo docker-compose up --build**.  

Ensure that **Docker** and **Docker Compose** are installed on your system and that there are no conflicts with ports already in use by other applications. Adjust configurations as needed based on your specific development environment and requirements also **IF YOU FACE ANY PROBLEM, PLEASE CONTACT ME :)**

## Author

**Andrej Stjepanović**  
Software Developer
