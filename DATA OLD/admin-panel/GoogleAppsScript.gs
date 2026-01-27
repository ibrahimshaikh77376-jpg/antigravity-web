/**
 * GOOGLE APPS SCRIPT BACKEND
 * 
 * Instructions:
 * 1. Go to https://script.google.com/ and create a new project.
 * 2. Paste this code into the editor (replace existing code).
 * 3. Create a Google Sheet and copy its ID (from the URL).
 * 4. Paste the Sheet ID into the SHEET_ID variable below.
 * 5. Click "Deploy" -> "New deployment".
 * 6. Select type: "Web app".
 * 7. Description: "v1".
 * 8. Execute as: "Me".
 * 9. Who has access: "Anyone" (This is crucial for the fetch API to work from your local app).
 * 10. Click "Deploy" and copy the "Web App URL".
 * 11. Paste that URL into your React application's API_URL constant.
 */

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // <--- PASTE YOUR SHEET ID HERE
const SHEET_NAME = 'Employees';

function doGet(e) {
  return getEmployees();
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    if (action === 'ADD_EMPLOYEE') {
      return addEmployee(data.payload);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Unknown action' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getEmployees() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    // Return empty list if sheet doesn't exist yet
    return ContentService.createTextOutput(JSON.stringify({ status: 'success', data: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const employees = rows.map(row => {
    let emp = {};
    headers.forEach((header, index) => {
      emp[header] = row[index];
    });
    return emp;
  });
  
  return ContentService.createTextOutput(JSON.stringify({ status: 'success', data: employees }))
    .setMimeType(ContentService.MimeType.JSON);
}

function addEmployee(employeeData) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // Headers mapping based on your requirements
  const headers = [
    'EmployeeID', 'BiometricID', 'Salute', 'FirstName', 'MiddleName', 'LastName', 'ShortName', 'Gender',
    'WorkEmail', 'MobileNumber',
    'Status', 'EmployeeType', 'Department', 'Designation', 'UserType', 'Location',
    'DateOfJoining', 'ReportingTo',
    'IsAdmin', 'IsApprover',
    'LoginBasedOn', 'PasswordChangeRequired'
  ];

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(headers);
  } else {
    // Verify headers exist, if not add them (simple check)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    }
  }
  
  // Prepare row data strictly based on headers order
  const row = headers.map(header => employeeData[header] || '');
  
  sheet.appendRow(row);
  
  return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Employee added successfully' }))
    .setMimeType(ContentService.MimeType.JSON);
}
