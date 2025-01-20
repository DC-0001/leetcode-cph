# **LeetCode CPH - Test Case Fetcher & Runner**  

A VSCode extension that allows users to **fetch test cases from LeetCode problems** and **run them against their code** in C++ or Python.  

## **Features**  
✅ **Fetch Test Cases**: Extracts test cases directly from LeetCode problem statements.  
✅ **Save Test Cases**: Stores inputs and expected outputs in organized files.  
✅ **Run Test Cases**: Executes your C++ or Python solution and compares the output.  
✅ **Pass/Fail Feedback**: Highlights mismatches between actual and expected outputs.  

---

## **Installation**  
### 1️⃣ **Prerequisites**  
- Install **VSCode**: [Download VSCode](https://code.visualstudio.com/)  
- Install **Node.js & npm**: [Download Node.js](https://nodejs.org/)  
- Install **Puppeteer** (used for web scraping LeetCode):  
  ```bash
  npm install puppeteer
  ```
- If using **C++**, install `g++` (GCC compiler).  
- If using **Python**, install `python3`.  

### 2️⃣ **Clone this repository**  
```bash
git clone https://github.com/DC-0001/leetcode-cph.git
cd leetcode-cph
```

### 3️⃣ **Install dependencies**  
```bash
npm install
```

### 4️⃣ **Run the extension**  
- Open the project folder in **VSCode**.  
- Press **F5** to launch the extension in a new VSCode window.  

---

## **Usage**  
### **Fetching Test Cases**  
1. Open **Command Palette** (`Ctrl+Shift+P`).  
2. Select **"Fetch LeetCode Test Cases!"**.  
3. Enter a **LeetCode problem URL** (e.g., `https://leetcode.com/problems/two-sum/`).  
4. Test cases are saved in the `test_cases` folder in the working directory.

### **Running Test Cases**  
1. Open your **C++ (.cpp) or Python (.py) solution** in VSCode.  
2. Open **Command Palette** (`Ctrl+Shift+P`).  
3. Select **"Run LeetCode Test Cases!"**.  
4. The extension will **compile & run** the code with test inputs and display the results.

---

## **Project Structure**  
```
📂 leetcode-cph
├── 📄 package.json        # Project dependencies & metadata
├── 📄 tsconfig.json       # TypeScript configuration
├── 📂 src                 # Source code folder
│   ├── 📄 extension.ts    # Activates the extension in VSCode
│   ├── 📄 fetcher.ts      # Fetches test cases from LeetCode
│   ├── 📄 runner.ts       # Runs test cases on user code
│   ├── 📄 utils.ts        # Saves and organizes test cases
└── README.md              # Project documentation
```

---

## **How It Works**  
### 🔹 **Fetching Test Cases (`fetcher.ts`)**  
- Uses **Puppeteer** to scrape test cases from LeetCode.  
- Cleans and structures the input/output.  
- Saves test cases as `.txt` files in `test_cases/`.

### 🔹 **Running Test Cases (`runner.ts`)**  
- Reads saved test cases from `test_cases/`.  
- Runs **C++ or Python** solutions with test inputs.  
- Compares **actual vs expected** output.  
- Displays **PASS/FAIL** messages.

---

## **Example**  
### **Input (`test_cases/input_1.txt`)**  
```
2 7 11 15
9
```
### **Expected Output (`test_cases/output_1.txt`)**  
```
0 1
```
### **Terminal Output (Running a C++ or Python solution)**  
```
Actual Output: 0 1
Expected Output: 0 1
PASS - Output matches
```

---

## **Contributing**  
🚀 **Want to improve this extension?**  
1. Fork the repo 🍴  
2. Create a feature branch (`git checkout -b feature-name`)  
3. Commit your changes (`git commit -m "Added feature"`)  
4. Push to GitHub (`git push origin feature-name`)  
5. Open a Pull Request 📢  

--- 
