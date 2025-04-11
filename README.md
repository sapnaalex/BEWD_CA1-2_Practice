# BEWD_CA1-2_Practice

Great! Here's Practice Question 1 out of 10 for your test preparation. Each question will include:

1. Question Description
2. Step-by-Step Instructions
3. Explanation of Code

---

## ✅ Practice Question 1: Simple User Signup & Management

### 🧾 Description:
Create a backend server that handles user signup and basic user management. The user should have the following fields:
- username
- email
- password
- dob

### 🎯 Required Endpoints:
- POST /signup → To create a user  
- GET /user → To view the user data  
- PUT /user → To fully update all user fields  
- PATCH /user → To update one or more fields  
- DELETE /user → To delete the user

---

## 🛠 Step-by-Step Instructions:

1. Set up Express server.
2. Use express.json() middleware.
3. Store user data in a simple object (not database or array).
4. In each endpoint, use if-else to handle:
   - Missing fields
   - Invalid values (like password length)
5. Use proper status codes and messages.


## 💡 Explanation:

### ✅ POST /signup:
- Checks if all fields are present
- Validates password length
- Stores user in a variable
- Sends success message

### ✅ GET /user:
- If user exists → returns data
- If not → sends "No user found"

### ✅ PUT /user:
- Replaces entire user object
- Requires all fields
- Same validation as POST

### ✅ PATCH /user:
- Only updates fields sent in the request
- Still checks password length if password is being updated

### ✅ DELETE /user:
- Deletes the user by resetting the variable
- If no user exists → returns appropriate message
