import React, { Component } from 'react';
import './BoardIntroduction.scss';
import PortfolioImage from '../../../assets/portfolio.png';
import addResume from '../../../firestore/dbOperations';

class BoardIntroduction extends Component {
  /// This  class have nextStep passed to it in props so we be able to navigate between steps
  handleClick = () => {
    this.props.nextStep();
    !localStorage.getItem('currentResumeId') &&
      addResume(localStorage.getItem('user'));
  };
  render() {
    return (
      <div className='board'>
        <div className='introWrapper'>
          <img
            className='introductionImage'
            src={PortfolioImage}
            alt='Portolio Img'
          />
          <button onClick={this.handleClick} className='btn-default'>
            Select a template
          </button>
          (If you are applying to large organisations with Application Tracking
          Systems (ATS) then choose a template without Image.)
        </div>
        <div className='introFooter'>All Rights Reserved.</div>
      </div>
    );
  }
}
export default BoardIntroduction;
