import React, { Component } from "react";
import "./BoardFilling.scss";
// Importing packages that will help us to transfrom a div into a pdf ,  Div --> Canvas(jpeg) --> Pdf
import jsPDF from "jspdf";
import conf from "../../../conf/configuration";
import Ad728x90 from "../../../assets/ads/728x90.png";
import Ad300x50 from "../../../assets/ads/300x50.png";
import MenuImg from "../../../assets/menu.png";
import Canvas from "../canvas/Canvas";
import ChipInput from "material-ui-chip-input";

// Toasts
import Toasts from "../../Toasts/Toats";
import {
  setResumePropertyPerUser,
  addEmployments,
  addEducations,
  addSkills,
} from "../../../firestore/dbOperations";
import { IncrementDownloads } from "../../../firestore/dbOperations";
// Animation Library
import { motion, AnimatePresence } from "framer-motion";
import SimpleInput from "../../Form/simple-input/SimpleInput";
import DropdownInput from "../../Form/dropdown-input/DropdownInput";
import SimpleTextArea from "../../Form/simple-textarea/SimpleTextarea";
class BoardFilling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chips: [],
      SelectCategory: "",
      Keywords: "", /// this is the title of the component . we will change it based on input change from ( SimpleInput )
      text: "",
      triggerDownload: false,
      page: 1,
      currentPage: 1,
      isSuccessToastVisible: false,
      isDownloadToastVisible: false,
      count: 0,
    };
    this.addPage = this.addPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.downloadEnded = this.downloadEnded.bind(this);
    this.ShowToast = this.ShowToast.bind(this);
    this.saveToDatabase = this.saveToDatabase.bind(this);
  }
  addChip = (value) => {
    const chips = this.state.chips.slice();
    chips.push(value);
    this.setState({ chips });
  };
  removeChip = (index) => {
    const chips = this.state.chips.slice();
    chips.splice(index, 1);
    this.setState({ chips });
  };
  handleInputs = (input, value) => {
    if (input === "Select Category") {
      this.setState({ SelectCategory: value });
    } else if (input === "Keywords") {
      this.setState({ Keywords: value });
    } else if (input === "Enter Text") {
      this.setState({ text: value });
    }
  };
  addPage() {
    this.setState((prevState, props) => ({
      page: prevState.page + 1,
    }));
  }
  nextPage() {
    this.setState((prevState, props) => ({
      currentPage: prevState.currentPage + 1,
    }));
  }
  previousPage() {
    this.setState((prevState, props) => ({
      currentPage: prevState.currentPage - 1,
    }));
  }
  componentDidMount() {
    for (let index = 0; index < 2; index++) {
      setTimeout(() => {
        if (this.state.count < 2) {
          this.setState({ count: this.state.count });
        }
      }, 1000);
    }
  }
  downloadEnded() {
    IncrementDownloads();
    this.setState({ triggerDownload: false });
  }
  // Showing  Toast
  ShowToast(type) {
    if (type == "Success") {
      setTimeout(() => {
        this.setState((prevState, props) => ({
          isSuccessToastVisible: !prevState.isSuccessToastVisible,
        }));
      }, 3000);
      this.setState((prevState, props) => ({
        isSuccessToastVisible: !prevState.isSuccessToastVisible,
      }));
    }
    if (type == "Download") {
      setTimeout(() => {
        this.setState((prevState, props) => ({
          triggerDownload: true,
          isDownloadToastVisible: !prevState.isDownloadToastVisible,
        }));
      }, 8000);
      this.setState((prevState, props) => ({
        isDownloadToastVisible: !prevState.isDownloadToastVisible,
      }));
    }
  }
  // Saving into database But first we check which field has been edited to avoid unecessary writes in  database
  saveToDatabase() {
    var numberOfInputs = 0;
    if (!localStorage.getItem("currentResumeItem")) {
      this.currentResume = {};
    } else {
      this.currentResume = JSON.parse(
        localStorage.getItem("currentResumeItem")
      );
    }
    if (
      this.currentResume.firstname !== this.props.values.firstname ||
      this.currentResume.firstname == undefined
    ) {
      console.log("Firstname need to be changed in database");
      setResumePropertyPerUser(
        localStorage.getItem("user"),
        localStorage.getItem("currentResumeId"),
        "firstname",
        this.props.values.firstname
      );
    }
    if (
      this.currentResume.lastname !== this.props.values.lastname ||
      this.currentResume.lastname == undefined
    ) {
      console.log("Firstname need to be changed in database");
      setResumePropertyPerUser(
        localStorage.getItem("user"),
        localStorage.getItem("currentResumeId"),
        "lastname",
        this.props.values.lastname
      );
    }
    if (
      this.currentResume.email !== this.props.values.email ||
      this.currentResume.email == undefined
    ) {
      console.log("Firstname need to be changed in database");
      setResumePropertyPerUser(
        localStorage.getItem("user"),
        localStorage.getItem("currentResumeId"),
        "email",
        this.props.values.email
      );
    }
    if (
      this.currentResume.phone !== this.props.values.phone ||
      this.currentResume.phone == undefined
    ) {
      console.log("Firstname need to be changed in database");
      setResumePropertyPerUser(
        localStorage.getItem("user"),
        localStorage.getItem("currentResumeId"),
        "phone",
        this.props.values.phone
      );
    }
    if (
      this.currentResume.occupation !== this.props.values.occupation ||
      this.currentResume.occupation == undefined
    ) {
      console.log("Firstname need to be changed in database");
      setResumePropertyPerUser(
        localStorage.getItem("user"),
        localStorage.getItem("currentResumeId"),
        "occupation",
        this.props.values.occupation
      );
    }
    if (
      this.currentResume.country !== this.props.values.country ||
      this.currentResume.country == undefined
    ) {
      console.log("Firstname need to be changed in database");
      setResumePropertyPerUser(
        localStorage.getItem("user"),
        localStorage.getItem("currentResumeId"),
        "country",
        this.props.values.country
      );
    }
    if (
      this.currentResume.city !== this.props.values.city ||
      this.currentResume.city == undefined
    ) {
      console.log("Firstname need to be changed in database");
      setResumePropertyPerUser(
        localStorage.getItem("user"),
        localStorage.getItem("currentResumeId"),
        "city",
        this.props.values.city
      );
    }
    if (
      this.currentResume.address !== this.props.values.address ||
      this.currentResume.address == undefined
    ) {
      console.log("Firstname need to be changed in database");
      setResumePropertyPerUser(
        localStorage.getItem("user"),
        localStorage.getItem("currentResumeId"),
        "address",
        this.props.values.address
      );
    }
    if (
      this.currentResume.postalcode !== this.props.values.postalcode ||
      this.currentResume.postalcode == undefined
    ) {
      console.log("Firstname need to be changed in database");
      setResumePropertyPerUser(
        localStorage.getItem("user"),
        localStorage.getItem("currentResumeId"),
        "postalcode",
        this.props.values.postalcode
      );
    }
    if (
      this.currentResume.dateofbirth !== this.props.values.dateofbirth ||
      this.currentResume.dateofbirth == undefined
    ) {
      console.log("dateofbirth need to be changed in database");
      setResumePropertyPerUser(
        localStorage.getItem("user"),
        localStorage.getItem("currentResumeId"),
        "dateofbirth",
        this.props.values.dateofbirth
      );
    }
    if (
      this.currentResume.drivinglicense !== this.props.values.drivinglicense ||
      this.currentResume.drivinglicense == undefined
    ) {
      console.log("Firstname need to be changed in database");
      setResumePropertyPerUser(
        localStorage.getItem("user"),
        localStorage.getItem("currentResumeId"),
        "drivinglicense",
        this.props.values.drivinglicense
      );
    }
    if (
      this.currentResume.nationality !== this.props.values.nationality ||
      this.currentResume.nationality == undefined
    ) {
      console.log("Firstname need to be changed in database");
      setResumePropertyPerUser(
        localStorage.getItem("user"),
        localStorage.getItem("currentResumeId"),
        "nationality",
        this.props.values.nationality
      );
    }
    if (
      this.currentResume.summary !== this.props.values.summary ||
      this.currentResume.summary == undefined
    ) {
      console.log("Firstname need to be changed in database");
      setResumePropertyPerUser(
        localStorage.getItem("user"),
        localStorage.getItem("currentResumeId"),
        "summary",
        this.props.values.summary
      );
    }
    // Adding employments
    addEmployments(
      localStorage.getItem("user"),
      localStorage.getItem("currentResumeId"),
      this.props.values.employments
    );
    // adding educations if presented
    addEducations(
      localStorage.getItem("user"),
      localStorage.getItem("currentResumeId"),
      this.props.values.educations
    );
    // adding skills if presented
    addSkills(
      localStorage.getItem("user"),
      localStorage.getItem("currentResumeId"),
      this.props.values.skills
    );
    this.ShowToast("Success");
  }
  
  render() {
    return (
      <>
        {this.props.third === true ? (
          <div className="board">
            <AnimatePresence>
              {this.state.isSuccessToastVisible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Toasts type="Success" />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {this.state.isDownloadToastVisible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Toasts type="Download" />
                </motion.div>
              )}
            </AnimatePresence>
            <div id="cv" className="cv">
              <div className="cvWrapper">
                <ul className="pagination">
                  <li onClick={() => this.previousPage()}> previous </li>
                  <li>1 / {this.state.page}</li>
                  <li onClick={() => this.nextPage()}> next </li>
                </ul>
                <div id="Resume">
                  <Canvas
                    currentResumeName={this.props.currentResumeName}
                    initialisePages={this.initialisePages}
                    currentPage={this.state.currentPage}
                    pages={this.state.page}
                    addPage={this.addPage}
                    downloadEnded={this.downloadEnded}
                    triggerDownload={this.state.triggerDownload}
                    values={this.props.values}
                  />
                </div>
                {/* The canvas go here with the properties and which cv to render */}
                {/* <Canvas  triggerDownload={this.state.triggerDownload} values ={this.props.values} /> */}
                {/* <CvBasic values ={this.props.values} />
                 */}
                <div className="cvAction">
                  <span
                    onClick={() => this.props.stepBack()}
                    className="selectTemplateLink"
                  >
                    {" "}
                    <img src={MenuImg} /> Select Template
                  </span>
                  <div>
                    {localStorage.getItem("user") && (
                      <button
                        onClick={() => this.saveToDatabase()}
                        style={{ fontSize: "15px" }}
                        className="btn-default"
                      >
                        Save as draft
                      </button>
                    )}

                    <button
                      onClick={this.props.change}
                      style={{ fontSize: "15px" }}
                      className="btn-default"
                    >
                      Next Page
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="board">
              <div style={{ display: "none" }}>
                <Canvas
                  currentResumeName={this.props.currentResumeName}
                  initialisePages={this.initialisePages}
                  currentPage={this.state.currentPage}
                  pages={this.state.page}
                  addPage={this.addPage}
                  downloadEnded={this.downloadEnded}
                  triggerDownload={this.state.triggerDownload}
                  values={this.props.values}
                />
              </div>
              <AnimatePresence>
                {this.state.isSuccessToastVisible && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Toasts type="Success" />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {this.state.isDownloadToastVisible && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Toasts type="Download" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div
                style={{
                  padding: "5%",
                  background: "white",
                  width: "60%",
                  marginTop: "5%",
                  marginBottom: "10%",
                }}
              >
                <form>
                <DropdownInput
                  handleInputs={this.handleInputs}
                  options={["Job", "Career", "Experiences"]}
                  title="Select Category"
                />
                <p
                  style={{
                    margin: "5px 0px",
                    color: "#98A1B3",
                    fontSize: "15px",
                  }}
                >
                  Keywords
                </p>
                <ChipInput
                  className="chipInput"
                  disableUnderline={true}
                  defaultValue={[]}
                  style={{ width: "100%" }}
                />

                <SimpleTextArea
                  handleInputs={this.handleInputs}
                  title="Enter Text"
                />
                <button
                  style={{
                    fontSize: "15px",
                    marginTop: "25px",
                    marginLeft: "82%",
                  }}
                  className="btn-default"
                
                >
                  Submit
                </button>
                </form>
              </div>
              
              <div
                style={{
                  display: "flex",
                  width: "80%",
                  marginTop: "-5%",
                  marginBottom: "5%",
                }}
              >
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    fontSize: "18px",
                    marginLeft: "7%",
                    color: "white",
                  }}
                >
                  Skip
                </button>
                <button
                  className="btn-default"
                  style={{
                    fontSize: "16px",
                    marginLeft: "23%",
                  }}
                >
                  Save as Draft
                </button>
                <button
                  className="btn-default"
                  onClick={() => this.ShowToast("Download")}
                  style={{
                    fontSize: "16px",
                    marginLeft: "3%",
                  }}
                >
                  Download Cv
                </button>
              </div>
              <div style={{ width: "50%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",

                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: "22px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Share
                  </p>
                  <i
                    style={{
                      fontSize: "30px",
                      color: "black",
                      marginLeft: "20px",
                      cursor: "pointer",
                    }}
                    className=" fa fa-facebook"
                  ></i>
                  <i
                    style={{
                      fontSize: "30px",
                      color: "black",
                      marginLeft: "20px",
                      cursor: "pointer",
                    }}
                    className=" fa fa-instagram"
                  ></i>
                  <i
                    style={{
                      fontSize: "30px",
                      color: "black",
                      marginLeft: "20px",
                      cursor: "pointer",
                    }}
                    className=" fa fa-linkedin"
                  ></i>
                  <i
                    style={{
                      fontSize: "30px",
                      color: "black",
                      marginLeft: "20px",
                      cursor: "pointer",
                    }}
                    className=" fa fa-whatsapp"
                  ></i>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
export default BoardFilling;
