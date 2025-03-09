import React, { useState } from "react";
import "./Expenses.css";

const quarterData = {
  Q1: { months: ["July", "August", "September"], label: "Jul, Aug, Sep" },
  Q2: { months: ["October", "November", "December"], label: "Oct, Nov, Dec" },
  Q3: { months: ["January", "February", "March"], label: "Jan, Feb, Mar" },
  Q4: { months: ["April", "May", "June"], label: "Apr, May, Jun" },
};

const Expenses = () => {
  const [selectYear, setSelectYear] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState("");
  const [months, setMonths] = useState(["Month 1", "Month 2", "Month 3"]);
  const [expenses, setExpenses] = useState({
    Fuel: [0, 0, 0],
    Insurance: [0, 0, 0],
    "Power Cost for Business use": [0, 0, 0],
    "Repairs & Maintenance": [0, 0, 0],
    "Roadside Assistance": [0, 0, 0],
    "Telephone/Internet": [0, 0, 0],
    "Toll Way-Linkt": [0, 0, 0],
    "Car Wash & Cleaning stuff": [0, 0, 0],
    "License Fee and Registration": [0, 0, 0],
  });
  const [income, setIncome] = useState({
    Uber: [0, 0, 0],
    DIDI: [0, 0, 0],
    Ola: [0, 0, 0],
    Other: [0, 0, 0],
  });
  const [warning, setWarning] = useState(false);

  //print the page
  const handlePrint = () => {
    window.print();
  };

  const handleYearSelectChange = (event) => {
    const year = Number(event.target.value); // Convert string to number
    setSelectYear(year);

    if (!year) {
      // Check for empty value instead of isNaN
      setWarning(true);
    } else {
      setWarning(false);
    }
  };
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedQuarter(selectedValue);
    setMonths(
      quarterData[selectedValue]?.months || ["Month 1", "Month 2", "Month 3"]
    );
    setWarning(false); // Clear warning when a quarter is selected
  };

  const handleInputChange = (expense, monthIndex, value) => {
    if (!selectedQuarter || !selectYear) {
      setWarning(true); // Show warning if a quarter is not selected
      return;
    }

    const updatedExpenses = { ...expenses };
    updatedExpenses[expense][monthIndex] = parseFloat(value) || 0;
    setExpenses(updatedExpenses);
  };
  const handleIncomeInputChange = (incomeType, monthIndex, value) => {
    if (!selectedQuarter) {
      setWarning(true);
      return;
    }

    const updatedIncome = { ...income }; // Create a copy of the income state
    updatedIncome[incomeType][monthIndex] = parseFloat(value) || 0; // Update the specific incomeType
    setIncome(updatedIncome); // ✅ Set the updated state
  };

  const calculateRowTotal = (expense) => {
    return expenses[expense].reduce((total, value) => total + value, 0);
  };
  const calculateIncomeRowTotal = (service) => {
    return income[service].reduce((total, value) => total + value, 0);
  };

  const calculateMonthTotal = (monthIndex) => {
    return Object.values(expenses).reduce(
      (total, expense) => total + expense[monthIndex],
      0
    );
  };

  const calculateIncomeMonthTotal = (monthIndex) => {
    return Object.values(income).reduce(
      (total, income) => total + income[monthIndex],
      0
    );
  };

  // Reset all fields
  const handleClearExpensesTable = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all income data?"
    );
    if (confirmClear) {
      setSelectedQuarter("");
      setMonths(["Month 1", "Month 2", "Month 3"]);
      setExpenses({
        Fuel: [0, 0, 0],
        Insurance: [0, 0, 0],
        "Power Cost for Business use": [0, 0, 0],
        "Repairs & Maintenance": [0, 0, 0],
        "Roadside Assistance": [0, 0, 0],
        "Telephone/Internet": [0, 0, 0],
        "Toll Way-Linkt": [0, 0, 0],
        "Car Wash & Cleaning stuff": [0, 0, 0],
        "License Fee and Registration": [0, 0, 0],
      });
      setWarning(false);
    }
  };

  const handleClearIncomeTable = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all income data?"
    );
    if (confirmClear) {
      setIncome({
        Uber: [0, 0, 0],
        DIDI: [0, 0, 0],
        Ola: [0, 0, 0],
        Other: [0, 0, 0],
      });
    }
  };

  return (
    <>
      <h1>Goods and Services Tax</h1>

      <div className="select-quater">
        <label>Select the Quarter</label>
        <select value={selectedQuarter} onChange={handleSelectChange}>
          <option value="">Please choose an option</option>
          <option value="Q1">Q1 Jul, Aug, Sep</option>
          <option value="Q2">Q2 Oct, Nov, Dec</option>
          <option value="Q3">Q3 Jan, Feb, Mar</option>
          <option value="Q4">Q4 Apr, May, Jun</option>
        </select>
        <label>Select the Year</label>
        <select onChange={handleYearSelectChange}>
          <option value="">Choose the year</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
      </div>
      <h2>Expenses</h2>
      <h5>
        Total rideshare expenses from{" "}
        {selectedQuarter
          ? quarterData[selectedQuarter].label
          : "the selected quarter"}
      </h5>
      {warning && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          ⚠ Please select a quarter and year before entering values.
        </p>
      )}

      <table id="expensesTable">
        <thead>
          <tr>
            <th>Expenses Details</th>
            <th>{months[0]}</th>
            <th>{months[1]}</th>
            <th>{months[2]}</th>
            <th>G11</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(expenses).map((expense, index) => (
            <tr key={index}>
              <td>{expense}</td>
              {expenses[expense].map((value, monthIndex) => (
                <td key={monthIndex}>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) =>
                      handleInputChange(expense, monthIndex, e.target.value)
                    }
                  />
                </td>
              ))}
              <td>{calculateRowTotal(expense).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td>
              <strong>Total Expenses</strong>
            </td>
            <td>{calculateMonthTotal(0).toFixed(2)}</td>
            <td>{calculateMonthTotal(1).toFixed(2)}</td>
            <td>{calculateMonthTotal(2).toFixed(2)}</td>
            <td>
              <strong>
                {(
                  calculateMonthTotal(0) +
                  calculateMonthTotal(1) +
                  calculateMonthTotal(2)
                ).toFixed(2)}
              </strong>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="clear-btn" onClick={handleClearExpensesTable}>
        Clear
      </button>
      <div>
        <h2>Income</h2>
        <h5>
          Total rideshare incomes from{" "}
          {selectedQuarter
            ? quarterData[selectedQuarter].label
            : "the selected quarter"}
        </h5>
        <table>
          <thead>
            <tr>
              <th>Income details</th>
              <th>{months[0]}</th>
              <th>{months[1]}</th>
              <th>{months[2]}</th>
              <th>G1</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(income).map(([incomeType, amounts], index) => (
              <tr key={index}>
                <td>{incomeType}</td>
                {amounts.map((amount, i) => (
                  <td key={i}>
                    <input
                      type="number"
                      value={amount}
                      onChange={
                        (e) =>
                          handleIncomeInputChange(incomeType, i, e.target.value) // ✅ Correctly passing incomeType
                      }
                    />
                  </td>
                ))}
                <td>{calculateIncomeRowTotal(incomeType).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              {" "}
              <td>
                <strong>Total Income</strong>
              </td>
              <td>{calculateIncomeMonthTotal(0).toFixed(2)}</td>
              <td>{calculateIncomeMonthTotal(1).toFixed(2)}</td>
              <td>{calculateIncomeMonthTotal(2).toFixed(2)}</td>
              <td>
                <strong>
                  {(
                    calculateIncomeMonthTotal(0) +
                    calculateIncomeMonthTotal(1) +
                    calculateIncomeMonthTotal(2)
                  ).toFixed(2)}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
        <button className="clear-btn" onClick={handleClearIncomeTable}>
          Clear
        </button>
      </div>
      <div class="final-gst-calculation">
        <h2>GST Calculation</h2>
        <hr></hr>
        <p>
          G1 (Total sales):{" "}
          {(
            calculateIncomeMonthTotal(0) +
            calculateIncomeMonthTotal(1) +
            calculateIncomeMonthTotal(2)
          ).toFixed(2)}
        </p>
        <p>
          1A (You owe to ATO):
          {(
            (calculateIncomeMonthTotal(0) +
              calculateIncomeMonthTotal(1) +
              calculateIncomeMonthTotal(2)) /
            11
          ).toFixed(2)}
        </p>
        <p>
          G11 (Total purchase):{" "}
          {(
            calculateMonthTotal(0) +
            calculateMonthTotal(1) +
            calculateMonthTotal(2)
          ).toFixed(2)}
        </p>
        <p>
          1B (ATO owes you):{" "}
          {(
            (calculateMonthTotal(0) +
              calculateMonthTotal(1) +
              calculateMonthTotal(2)) /
            11
          ).toFixed(2)}
        </p>
        <p class="amount-owing-ato">
          Amount owing to ATO (1A-1B):{" "}
          {(
            (calculateIncomeMonthTotal(0) +
              calculateIncomeMonthTotal(1) +
              calculateIncomeMonthTotal(2)) /
              11 -
            (calculateMonthTotal(0) +
              calculateMonthTotal(1) +
              calculateMonthTotal(2)) /
              11
          ).toFixed(2)}
        </p>
      </div>
      <div>
        <button className="clear-btn" onClick={handlePrint}>
          Print or Save as PDF
        </button>
      </div>
      <hr></hr>
      <div className="disclaimer">
        <h3>Disclaimer</h3>
        <p>
          Calculations in this application are based on publicly available
          information from the Australian Taxation Office (ATO). However, please
          be aware that any changes to the tax rates or regulations made by the
          ATO may take some time to be reflected in this app.
        </p>
        <p>
          Consult with a registered tax agent or financial professional if you
          need more details.
        </p>
      </div>
    </>
  );
};

export default Expenses;
