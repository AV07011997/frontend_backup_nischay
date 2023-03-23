import React, { useEffect } from "react";
import NavBar from "../utilities/navbar/navbar";
import "./landingpage.css";
import { getApi } from "../utilities/callapi/callapi";
import { APIADDRESS, backendaddress } from "../utilities/constants/constants";
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { ImCheckboxChecked } from "react-icons/im";
import { Loader } from "rsuite";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

import { toast } from "react-toastify";
// import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
// import ScrollToTop from "../../utilities/moveToTop/moveToTop";

const LandingPage = () => {
  var [table, settable] = useState([]);
  const [radio, setradio] = useState();
  var [table2, settable2] = useState();
  const [search, setsearch] = useState({
    search: "",
  });
  const getInitialState = () => {
    const value = 5;
    return value;
  };
  const [valueDropdown, setValueDropdown] = useState(getInitialState);

  const tableheaders = [
    { value: "LMS Updates", colspan: "5" },
    { value: "Bank statements updates", colspan: "3" },
    { value: "Bureau Updates", colspan: "2" },
  ];

  const tablesubheaders = [
    "Lead id selection",
    "Deal id",
    "Customer name",
    "Last modification date",
    "Uploaded",
    "Downloaded",
    "Ready to download",
    "Synced",
    "Sync-Date",
  ];

  const tableHeaderVariable = [
    { lead_id: "Lead ID" },
    { deal_id: "Deal ID" },
    { name: "Customer Name" },
    { creation_time: "Last Modification Date" },
    { bank_uploaded: "Uploaded" },
    { bank_download: "Downloaded" },
    { bank_download_ready: "Download Ready" },
    { bureau_updated: "Synced" },
    { bureau_creation_time: "Sync-Date" },
  ];

  const handleChangeDropdown = (e) => {
    setValueDropdown(e.target.value);
  };

  useEffect(() => {
    getApi(APIADDRESS.TABLE).then((response) => {
      settable(response["customer_detail"]);
      settable2(response["customer_detail"]);
    });
  }, []);
  // const functionNavigateValue = (n) => {
  //   setupperLimit(upperLimit + n * valueDropdown);
  //   setlowerLimit(lowerLimit + n * valueDropdown);
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsearch({
      ...search,
      [name]: value,
    });
  };

  useEffect(() => {
    getApi(APIADDRESS.TABLE).then((response) => {
      settable(response["customer_detail"]);
      settable2(response["customer_detail"]);
    });
  }, []);

  console.log(table2);

  useEffect(() => {
    let local = [];
    if (search.search === "") {
      settable(table2);
    }
    if (search.search) {
      table = table2;
      for (let x of table) {
        var localobj = {};

        let nameList = x.name.toLowerCase();
        let searchInput = search.search.toLowerCase();
        let leadIdList = x.lead_id.toString();

        if (
          nameList.includes(searchInput) ||
          leadIdList.includes(searchInput)
        ) {
          for (let y of tableHeaderVariable) {
            Object.keys(y).forEach((res) => {
              localobj[res] = x[res];
            });
          }

          local.push(localobj);
        }
      }
      settable(local);
    }
  }, [search]);

  // const toastfunction = (bankUploaded) => {
  //   if (bankUploaded == 0) {
  //     toast.info("Go to UPLOADS");
  //   } else {
  //     toast.info("Go to DOWNLOAD");
  //   }
  // };

  const [upperLimit, setupperLimit] = useState();
  const [lowerLimit, setlowerLimit] = useState();

  useEffect(() => {
    setupperLimit(parseInt(valueDropdown));
    setlowerLimit(0);
  }, [valueDropdown]);

  const functionNavigateValue = (n) => {
    setupperLimit(upperLimit + n * valueDropdown);
    setlowerLimit(lowerLimit + n * valueDropdown);
  };

  return (
    <div>
      <NavBar radiovalue={radio}></NavBar>

      <div>
        {table ? (
          <>
            <input
              className="searchbar_landingpage"
              type="search"
              name="search"
              value={search.search}
              onChange={handleChange}
              placeholder="Search"
            ></input>
            <div className="table_landingpage">
              <table className="table_fixed">
                <thead className="landingpage_table_header">
                  <tr>
                    {tableheaders.map((items, i) => {
                      return (
                        <th colSpan={items["colspan"]} key={items["value"]}>
                          {items["value"]}
                        </th>
                      );
                    })}
                  </tr>
                  <tr>
                    {tablesubheaders.map((subheaders) => {
                      return <th key={subheaders}>{subheaders}</th>;
                    })}
                  </tr>
                </thead>

                <tbody>
                  {table?.map((item, i) => {
                    {
                      if (i < upperLimit && i >= lowerLimit) {
                        return (
                          <tr key={i}>
                            <td>
                              <label>
                                <input
                                  type="radio"
                                  id="radio_table"
                                  name="radio_table"
                                  value={item.lead_id}
                                  onClick={() => {
                                    setradio(item.lead_id),
                                      toastfunction(item.bank_uploaded);
                                  }}
                                />
                                {item.lead_id}
                              </label>
                            </td>
                            <td>{item.deal_id}</td>
                            <td>{item.name}</td>
                            <td>{item.creation_time}</td>
                            <td>{item.bank_uploaded}</td>
                            <td>{item.bank_download}</td>
                            <td>{item.bank_download_ready}</td>
                            {item.bureau_updated === "Yes" && (
                              <td>
                                <ImCheckboxChecked
                                  style={{ color: "green" }}
                                ></ImCheckboxChecked>
                              </td>
                            )}
                            {item.bureau_updated === "" && (
                              <td>
                                <FaWindowClose
                                  style={{ color: "red" }}
                                ></FaWindowClose>
                              </td>
                            )}
                            <td>{item.bureau_creation_time}</td>
                          </tr>
                        );
                      }
                    }
                  })}
                </tbody>
              </table>
              <div className="paginationLandingPage">
                {lowerLimit > 0 && (
                  <button
                    className="divv3"
                    onClick={() => {
                      functionNavigateValue(-1);
                    }}
                  >
                    <BiLeftArrow></BiLeftArrow>
                  </button>
                )}
                <div className="divv1"></div>

                <select
                  id="dropDownLandingPage"
                  onChange={handleChangeDropdown}
                  className="divv3"
                >
                  <option value={5}>5 Rows</option>
                  <option value={10}>10 Rows</option>
                  <option value={15}>15 Rows</option>
                </select>

                <div className="divv2">
                  Pages {upperLimit / valueDropdown} /{" "}
                  {Math.floor(table.length / valueDropdown) + 1}
                </div>

                {upperLimit <= table.length && (
                  <button
                    className="divv3"
                    onClick={() => {
                      functionNavigateValue(1);
                    }}
                  >
                    <BiRightArrow></BiRightArrow>
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <Loader
            className="loader_landingpage"
            center
            size="lg"
            content="loading..."
          ></Loader>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
