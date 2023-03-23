import React from "react";
import "./upload.css";
import { getApi, postApi } from "../utilities/callapi/callapi";
import { useState, useEffect } from "react";
import { APIADDRESS } from "../utilities/constants/constants";
import NavBar from "../utilities/navbar/navbar";
import { useParams } from "react-router-dom";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import { objectFunction } from "../utilities/constants/objectFunction";
import Pageinfo from "../utilities/pageInfo/pageInfo";
import MaterialTable from "@material-table/core";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AiOutlineFilePdf } from "react-icons/ai";
import { AiFillDelete, AiOutlineFileAdd } from "react-icons/ai";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  var [table, settable] = useState();
  var [table1, settable1] = useState();

  const [mergefiles, setmergefiles] = useState();
  const navigate = useNavigate();
  const params = useParams();
  var { radiovalue } = params;

  var mergedFilesUrl = [];
  var tableData = [];

  var formData = new FormData();

  var defaultLayoutPluginInstance = defaultLayoutPlugin();
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    getApi(APIADDRESS.UPLOADSTATEMENT + radiovalue + "/").then((response) => {
      const table = objectFunction(response[2]);
      const table1 = objectFunction(response[0]);

      // console.log(response);
      settable(table);
      settable1(table1);
    });
  }, []);

  // console.log(table1[0]);

  var newFiles = [];
  var pdfurl = [];

  const handleFile = (e) => {
    newFiles.push(e.target.files);
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = new FileReader();

      newFiles.push(e.target.files[i]);
      let selectedfile = e.target.files[i];
      reader.readAsDataURL(selectedfile);
      reader.onloadend = (e) => {
        mergefilesurl(selectedfile, e.target.result);

        pdfurl.push(e.target.result);
      };
    }
  };

  const mergefilesurl = (file, fileurl) => {
    mergedFilesUrl.push([file, fileurl]);
    setmergefiles(mergedFilesUrl);
  };

  const state = {
    columns: [
      { title: "File Name", field: "file_name" },
      { title: "Date", field: "date" },
    ],
  };

  useEffect(() => {
    if (table) {
      for (let index of table) {
        let localobject = { fileName: index.file_name, date: index.date };
        tableData.push(localobject);
      }
    }
  }, [table]);

  const uplooadfiles = () => {
    formData.append("lead_id", table1[0].lead_id);
    formData.append("name", table1[0].name);
    formData.append("lead_id__count", table1[0].lead_id__count);
    for (let files in mergefiles) {
      formData.append(files, mergefiles[files][0]);
    }

    postApi(APIADDRESS.UPLOADFILES, formData, false, false).then((response) => {
      // if (response == 1) {
      //   navigate(`/download/${radiovalue}`);
      // }
    });
  };

  const removepdfview = (fileurl) => {
    const localmergedfile = [];
    for (let combinedfile of mergefiles) {
      if (fileurl == combinedfile[1]) {
      } else {
        localmergedfile.push(combinedfile);
      }
    }
    setmergefiles(localmergedfile);
  };

  return (
    <div>
      <div>
        <NavBar radiovalue={radiovalue}></NavBar>
      </div>
      <div>
        <Pageinfo leadId={radiovalue}></Pageinfo>
      </div>

      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        multiple
        onChange={handleFile}
      />

      <div className="upload_table">
        <MaterialTable
          title="Upload table Records"
          columns={state.columns}
          data={table}
          actions={[
            {
              icon: () => {
                return (
                  <AiOutlineFileAdd
                    size={40}
                    style={{ color: "red", size: "10" }}
                  ></AiOutlineFileAdd>
                );
              },
              tooltip: "Add File",
              position: "toolbar",

              onClick: () => {
                handleClick();
              },
            },
          ]}
        />
      </div>

      {mergefiles &&
        mergefiles.map((items, i) => {
          return (
            <div key={i} className="pdfviewercontainer">
              <div className="removebutton_uploadpage">
                <button
                  onClick={() => {
                    removepdfview(items[1]);
                  }}
                >
                  <AiFillDelete
                    size={25}
                    style={{ color: "red" }}
                  ></AiFillDelete>
                </button>
                {/* <input type="dropdown"></input> */}
                <label for="customer" id="customer_dropdown">
                  Select Customer:
                </label>
                <select name="customer" id="customer_dropdown">
                  <option value="none">customer info</option>
                  <option value="cust_info">
                    {table1[0].name} : {table1[0].lead_id}
                  </option>
                </select>
              </div>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={items[1]}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </Worker>
            </div>
          );
        })}

      {mergefiles?.length > 0 && (
        <div>
          <button className="uploadbutton" onClick={uplooadfiles}>
            Upload
          </button>
        </div>
      )}
    </div>
  );
};
export default Upload;
