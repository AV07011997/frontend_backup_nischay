import "./bureau.css";
import React from "react";
import NavBar from "../utilities/navbar/navbar";
import MaterialTable from "@material-table/core";
import { useParams } from "react-router-dom";

const Bureau = () => {
  const params = useParams();
  var { radiovalue } = params;
  const state = {
    columns: [
      { title: "Loan Selection", field: "loanSelection" },
      { title: "Date Reported", field: "dateReported" },
      { title: "Loan Type", field: "loanType" },
      { title: "Loan Status", field: "loanStatus" },
      { title: "Disbursal Date", field: "disbursalDate" },
      { title: "Disbursed amount", field: "disbursedAmount" },
      { title: "Tenure(M)", field: "tenure" },
      { title: "ROI(%)", field: "roi" },
      { title: "EMI", field: "emi" },
      { title: "Current Balance", field: "currentBalance" },
      { title: "Last DPD", field: "lastDpd" },
      { title: "Overdue Amount", field: "overdueAmount" },
      { title: "Source", field: "source" },
      { title: "Value Type", field: "valueType" },
    ],
  };

  return (
    <div>
      <NavBar radiovalue={radiovalue}></NavBar>

      <div>
        <div>
          <MaterialTable
            title="Bureau Table"
            columns={state.columns}
            options={{ filtering: true }}
          ></MaterialTable>
        </div>
      </div>
    </div>
  );
};

export default Bureau;
