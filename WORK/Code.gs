/**
 * Google Apps Script for Company ID Management System
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet.
 * 2. Create two tabs: "Employees" and "Clients".
 * 3. In "Employees", add headers (Row 1): ID, Name, Email, Password, Role, Phone, Designation, Status
 * 4. In "Clients", add headers (Row 1): ID, Name, Email, Password, Role, CompanyName, ProjectDetails, Status
 * 5. Extensions > Apps Script > Paste this code.
 * 6. Deploy > New Deployment > Web App > Execute as: "Me" > Who has access: "Anyone".
 * 7. Copy the Web App URL and paste it into the companyindex.html file (API_URL constant).
 */

const SHEET_ID = ""; // Optional: If script is bound to sheet, leave empty. If standalone, paste Sheet ID here.

function doGet(e) {
  // Handle manual execution or missing parameters
  if (!e || !e.parameter) {
    return ContentService.createTextOutput("Script is active. Note: You cannot run this function directly from the editor because 'e' is undefined. Deploy as Web App to test.");
  }

  // Check if it's an API call for reading data
  if (e.parameter.action) {
    return handleApiRequest(e);
  }
  
  // Otherwise serve a basic message (or the HTML file if you were hosting full app here)
  return ContentService.createTextOutput("API is running. Use POST requests for actions.");
}

function doPost(e) {
   if (!e) return ContentService.createTextOutput("Error: No event object.");
   return handleApiRequest(e);
}

function handleApiRequest(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    // Parse parameters
    let params = e.parameter;
    
    // If request body is JSON (common in modern fetch)
    if (e.postData && e.postData.contents) {
      const body = JSON.parse(e.postData.contents);
      params = { ...params, ...body };
    }
    
    const action = params.action;
    const payload = params.payload || {};
    
    let result = { success: false, message: "Unknown action" };
    
    switch (action) {
      case "LOGIN":
        result = handleLogin(payload);
        break;
      case "ADD_EMPLOYEE":
        result = addRow("Employees", payload);
        break;
      case "ADD_CLIENT":
        result = addRow("Clients", payload);
        break;
      case "GET_ALL_DATA":
        result = getAllData();
        break;
      case "UPDATE_USER":
        result = updateUser(payload);
        break;
      default:
        result = { success: false, message: "Invalid action provided: " + action };
    }
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Database Helper
function getSheetByName(name) {
  let ss;
  if (SHEET_ID) {
    try {
      ss = SpreadsheetApp.openById(SHEET_ID);
    } catch (e) {
      throw new Error(`Invalid SHEET_ID provided: ${SHEET_ID}. Please check the ID.`);
    }
  } else {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  if (!ss) {
    throw new Error("Spreadsheet Error: Script is not connected to a Sheet. Since you created a standalone script, you MUST copy your Spreadsheet ID (from its URL) and paste it into the 'SHEET_ID' variable at the top of this script.");
  }

  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    // Add default headers if new sheet
    if (name === "Employees") {
      sheet.appendRow(["ID", "Name", "Email", "Password", "Role", "Phone", "Designation", "Status"]);
    } else if (name === "Clients") {
      sheet.appendRow(["ID", "Name", "Email", "Password", "Role", "CompanyName", "ProjectDetails", "Status"]);
    }
  }
  return sheet;
}

// 1. Authentication
function handleLogin(creds) {
  const { role, email, password } = creds;
  
  // Admin Check (Hardcoded or could be in a sheet)
  if (role === "Admin") {
    // In a real app, store admin creds securely. For this task:
    // We check if the email/pass matches a designated admin, or we can simply check if they exist in Employees with 'Admin' role.
    // Let's assume a hardcoded 'admin@company.com' / 'admin123' for simplicity 
    // OR we check the Employees sheet if there's a row with Role='Admin'.
    
    // Strategy: Search Employees sheet for Role=Admin
    const empResult = findUserInSheet("Employees", email, password);
    if (empResult.found && empResult.user.Role === "Admin") {
      return { success: true, user: empResult.user };
    }
    
    // Fallback hardcoded for initial setup
    if (email === "admin@admin.com" && password === "admin123") {
      return { success: true, user: { Name: "Super Admin", Role: "Admin", Email: email } };
    }
  }
  
  const sheetName = role === "Client" ? "Clients" : "Employees";
  const search = findUserInSheet(sheetName, email, password);
  
  if (search.found) {
    return { success: true, user: search.user };
  } else {
    return { success: false, message: "Invalid credentials" };
  }
}

function findUserInSheet(sheetName, email, password) {
  const sheet = getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  const emailIndex = headers.indexOf("Email");
  const passIndex = headers.indexOf("Password");
  
  if (emailIndex === -1 || passIndex === -1) return { found: false };
  
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][emailIndex]).toLowerCase() === String(email).toLowerCase() && 
        String(data[i][passIndex]) === String(password)) {
      
      // Map row to object
      let userObj = {};
      headers.forEach((header, idx) => {
        userObj[header] = data[i][idx];
      });
      userObj.rowIndex = i + 1; // 1-based index
      userObj.sheet = sheetName;
      
      return { found: true, user: userObj };
    }
  }
  return { found: false };
}

// 2. Add Data
function addRow(sheetName, payload) {
  const sheet = getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  // Auto-increment ID
  let maxId = 0;
  // Assuming ID is always in column 0
  if (data.length > 1) {
    for (let i = 1; i < data.length; i++) {
      let id = parseInt(data[i][0]);
      if (!isNaN(id) && id > maxId) maxId = id;
    }
  }
  const newId = maxId + 1;
  const newRow = [];
  
  headers.forEach(header => {
    if (header === "ID") newRow.push(newId);
    else if (header === "Status") newRow.push("Active");
    else if (header === "Role") newRow.push(sheetName === "Clients" ? "Client" : (payload.Role || "Employee"));
    else newRow.push(payload[header] || "");
  });
  
  sheet.appendRow(newRow);
  return { success: true, message: "Added successfully", id: newId };
}

// 3. Get All Data (For Admin Preview)
function getAllData() {
  const empSheet = getSheetByName("Employees");
  const clientSheet = getSheetByName("Clients");
  
  const empData = sheetToObjects(empSheet);
  const clientData = sheetToObjects(clientSheet);
  
  return {
    success: true,
    data: {
      employees: empData,
      clients: clientData
    }
  };
}

function sheetToObjects(sheet) {
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  
  const headers = data[0];
  const results = [];
  
  for (let i = 1; i < data.length; i++) {
    let obj = {};
    headers.forEach((h, idx) => {
      obj[h] = data[i][idx];
    });
    // Add internal metadata for unique identification if needed, relying on ID
    results.push(obj);
  }
  return results;
}

// 4. Update User
function updateUser(payload) {
  // payload needs: sheetTarget ('Employees' or 'Clients'), id (to find row), updates (object with col: value)
  const sheetName = payload.sheetTarget;
  const idToFind = payload.id;
  const updates = payload.updates; // { Name: 'New Name', Password: 'New' }
  
  if (!sheetName || !idToFind) return { success: false, message: "Missing target info" };
  
  const sheet = getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  // Find Row
  let rowIndex = -1;
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(idToFind)) { // Assuming ID is first col
      rowIndex = i + 1; // 1-based index
      break;
    }
  }
  
  if (rowIndex === -1) return { success: false, message: "User ID not found" };
  
  // Update cells
  const keys = Object.keys(updates);
  for (let k of keys) {
    const colIndex = headers.indexOf(k);
    if (colIndex !== -1) {
      sheet.getRange(rowIndex, colIndex + 1).setValue(updates[k]);
    }
  }
  
  return { success: true, message: "Updated successfully" };
}
