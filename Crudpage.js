let selectedRow = null;

// ---Create Button.---
// Place values on the textboxes.

function onDetailsCreate() {
  if (validate()) {
    let createData = readCreateData();
    if (selectedRow == null) addNewData(createData);
    resetData();
    addAndClear("Data created successfully.");
  }
}

function readCreateData() {
  let createData = {};
  createData["orderNo"] = document.getElementById("orderNo").value;
  createData["customer"] = document.getElementById("customer").value;
  createData["consignee"] = document.getElementById("consignee").value;
  createData["date"] = document.getElementById("date").value;
  createData["trackingNo"] = document.getElementById("trackingNo").value;
  createData["status"] = document.getElementById("status").value;
  return createData;
}

// Place data in HTML table.

const addNewData = (data) => {
  let table = document
    .getElementById("tablelist")
    .getElementsByTagName("tbody")[0];
  let newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.orderNo;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.date;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.customer;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.trackingNo;
  cell5 = newRow.insertCell(4);
  cell5.innerHTML = data.status;
  cell6 = newRow.insertCell(5);
  cell6.innerHTML = data.consignee;
  cell7 = newRow.insertCell(6);
  cell7.innerHTML = `<a class="edi-del" onClick="onEdit(this)">Edit</a> /
                       <a class="edi-del" onClick="onDelete(this)">Delete</a>`;
};

// Reset textboxes.

function resetData() {
  document.getElementById("orderNo").value = "";
  document.getElementById("customer").value = "";
  document.getElementById("consignee").value = "";
  document.getElementById("date").value = "";
  document.getElementById("trackingNo").value = "";
  document.getElementById("status").value = "";
  selectedRow = null;
}

function updateData(createData) {
  selectedRow.cells[0].innerHTML = createData.orderNo;
  selectedRow.cells[1].innerHTML = createData.date;
  selectedRow.cells[2].innerHTML = createData.customer;
  selectedRow.cells[3].innerHTML = createData.trackingNo;
  selectedRow.cells[4].innerHTML = createData.status;
  selectedRow.cells[5].innerHTML = createData.consignee;
}

// Add validation to the orderNo field.

function validate() {
  isValid = true;
  if (document.getElementById("orderNo").value == "") {
    isValid = false;
    document.getElementById("orderNoError").classList.remove("hide");
  } else {
    isValid = true;
    if (!document.getElementById("orderNoError").classList.contains("hide"))
      document.getElementById("orderNoError").classList.add("hide");
  }
  return isValid;
}

// Edit button in tablelist.

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("orderNo").value = selectedRow.cells[0].innerHTML;
  document.getElementById("date").value = selectedRow.cells[1].innerHTML;
  document.getElementById("customer").value = selectedRow.cells[2].innerHTML;
  document.getElementById("trackingNo").value = selectedRow.cells[3].innerHTML;
  document.getElementById("status").value = selectedRow.cells[4].innerHTML;
  document.getElementById("consignee").value = selectedRow.cells[5].innerHTML;
}

// Delete button in tablelist.

function onDelete(td) {
  if (confirm("Are you sure to delete this data ?")) {
    row = td.parentElement.parentElement;
    document.getElementById("tablelist").deleteRow(row.rowIndex);
    resetData();
  }

  addAndClear("Deleted successfully.");
}

// An inforamtion after operation.

const msg = document.getElementById("upd-del");
function addAndClear(text) {
  msg.innerHTML = text;
  setTimeout(() => {
    msg.innerHTML = "";
  }, 3000);
}

// ---Show list button. Provide datalist.txt---

function onShowList() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "datalist.txt", true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let jsonData = JSON.parse(xhr.responseText);
      for (let i = 0; i < jsonData.length; i++) {
        addNewData(jsonData[i]);
      }
    }
  };
}

// ---Update button.---

function onUpdate() {
  let createdData = readCreateData();
  if (selectedRow != null) {
    updateData(createdData);
    addAndClear(document.getElementById("orderNo").value + " is updated.");
  } else {
    addAndClear("There is no data to update.");
  }
  resetData();
}

// ---Delete all button.---

function onDeleteAll() {
  if (confirm("Are you sure to delete all data ?")) {
    let details = document.getElementById("tablelist");
    let rowCount = details.rows.length;

    for (let i = rowCount - 1; i > 0; i--) {
      details.deleteRow(i);
    }
    addAndClear("Deleted all successfully.");
  }
}

// ---Erase button.---

function onReset() {
  resetData();
}
