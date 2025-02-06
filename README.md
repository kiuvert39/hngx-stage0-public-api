# **Classify Number API - NestJS**

## **📌 Overview**
This API classifies a given number based on mathematical properties and returns additional information, such as:

- **Prime Number Check** ✅
- **Perfect Number Check** ✅
- **Armstrong Number Check** ✅
- **Odd or Even Classification** ✅
- **Sum of Digits Calculation** ✅
- **Math Fun Fact (From Numbers API)** ✅

## **🚀 Getting Started**

### **1️⃣ Prerequisites**
Ensure you have the following installed:
- **Node.js** (v16+ recommended)
- **npm** (or yarn)
- **NestJS CLI** (if not installed, run: `npm install -g @nestjs/cli`)

### **2️⃣ Installation**
Clone the repository and install dependencies:
```sh
# Clone the repository
git clone https://github.com/kiuvert39/stage1.git
cd stage1

# Install dependencies
npm install
```

### **3️⃣ Running the Server**
Start the NestJS application:
```sh
npm run start
```
The API will be available at:
```
http://localhost:3000
```

## **🛠 API Usage**
### **🔹 Endpoint: Classify a Number**
- **URL:** `GET /api/classify-number?number={value}`
- **Method:** `GET`
- **Query Parameter:**
  - `number` (Required) - The number to classify.
- **Response Format:** JSON

### **📌 Example Request**
```http
GET http://localhost:3000/api/classify-number?number=371
```

### **✅ Successful Response**
```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

### **❌ Error Response (Invalid Input)**
```http
GET http://localhost:3000/api/classify-number?number=hello
```
```json
{
    "number": "hello",
    "error": true
}
```

## **📌 How It Works**
1. The API receives a number as a query parameter.
2. It determines if the number is:
   - **Prime** (Divisible only by 1 and itself)
   - **Perfect** (Sum of divisors equals the number itself)
   - **Armstrong** (Sum of its digits raised to the power of the number of digits equals the number itself)
   - **Odd/Even**
   - **Digit Sum Calculation**
3. It fetches a **fun fact** from the [Numbers API](http://numbersapi.com/) and includes it in the response.

## **📌 Deployment**
You can deploy this API using:
- **Render**
- **Vercel**
- **Railway**
- **AWS Lambda (via Serverless Framework)**

## **📌 License**
This project is open-source and available under the **MIT License**.

## **📌 Author**
Developed by **[Your Name]** 🚀

---

### **💡 Want to Contribute?**
Feel free to submit a pull request or report issues! 😊

