# API Routes Documentation

## Authentication Routes

### POST /auth/login  
- **Purpose:** Authenticates a user(PATIENT/DOCTOR) and return accessToken, refreshToken and role.  
- **Access:** Public
  
### POST /auth/login  
- **Purpose:**  Registers a new user(PATIENT/DOCTOR).  
- **Access:**  Public  

## Doctor Routes  

### GET /doctors  
- **Purpose:**  Retrieves a list of all doctors  
- **Access:**  Requires PATIENT authentication.    

## Event Routes  

### GET /events  
- **Purpose:** Retrieves events based on the user's role (PATIENT/DOCTOR)  
- **Access:** Required PATIENT or DOCTOR authentication.  

### POST /events  
- **Purpose:**  Creates a new event(reservation) which is accessible by patients. If patient already sent request it will return please wait message and if it's booked in meantime it will return message and update UI.  
- **Access:**  Required PATIENT authentication.  

### PUT /events  
- **Purpose:** Update the status of an event(accessible by doctor) and it will update UI and if status is approved it will auto-reject all other events for specific slot id.  
- **Access:** Required DOCTOR authentication.  

## Slot Routes  

### GET /slots  
- **Purpose:**  Retrieves all slots for a specific doctor.  
- **Access:** Requires DOCTOR authentication.  

### GET /slots/doctors/:doctorId/date/:date  
- **Purpose:**  Retrieves available and booked slots for a specific doctor by date (accessible by patients).  
- **Access:**  Requires PATIENT authentication.  

### POST /slots  
- **Purpose:** Creates a new slot(appointment) - accessible by doctors.   
- **Access:**  Requires DOCTOR authentication.  
