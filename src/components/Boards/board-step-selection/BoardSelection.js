import React, { Component } from "react";
import "./BoardSelection.scss";
import { CSSTransition } from "react-transition-group";
import { motion, AnimatePresence } from "framer-motion";
import AuthWrapper from "../../auth/authWrapper/AuthWrapper";

class BoardSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthShowed: false,
    };
    this.togglerHandler = this.togglerHandler.bind(this);
    this.handleResumeClick = this.handleResumeClick.bind(this);
  }
  togglerHandler() {
    this.props.toggler();
    this.props.nextStep();
  }
  handleResumeClick(resumeName) {
    if (localStorage.getItem("user")) {
      console.log("clicked cv");
      this.props.changeResumeName(resumeName);
      this.props.nextStep();
    } else {
      if (localStorage.getItem("user") == null) {
        this.setState((prevState, props) => ({
          isAuthShowed: prevState.isAuthShowed ? false : true,
        }));
      } else if (localStorage.getItem("user") != null) {
        this.setState({
          isAuthShowed: false,
        });
      }
    }
  }
  render() {
    return (
      <div className="board">
        <div className="action-introWrappers">
          <AnimatePresence>
            {this.state.isAuthShowed && (
              <motion.div
                exit={{ opacity: 0 }}
                initial="hidden"
                animate="visible"
                variants={this.authVariants}
                transition={{ duration: 0.4 }}
              >
                <AuthWrapper closeModal={() => this.handleResumeClick()} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <CSSTransition appear={true} in={true} classNames="fade" timeout={1000}>
          <div className="templateSelection">
            <h3>Templates</h3>
            <div className="templatesList">
              <div className="template">
                <img
                  onClick={() => this.handleResumeClick("Cv1")}
                  src={"../../../assets/1.JPG"}
                  alt="Cv Preview"
                />
              </div>
              <div className="template">
                <img
                  onClick={() => this.handleResumeClick("Cv2")}
                  src={"../../../assets/2.JPG"}
                  alt="Cv Preview"
                />
              </div>
              <div className="template">
                <img
                  onClick={() => this.handleResumeClick("Cv3")}
                  src={"../../../assets/3.JPG"}
                  alt="Cv Preview"
                />
              </div>
              <div className="template">
                <img
                  onClick={() => this.handleResumeClick("Cv4")}
                  src={"../../../assets/4.jpg"}
                  alt="Cv Preview"
                />
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}
export default BoardSelection;
