import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Social } from 'common';
import { Row } from 'antd';
import './view.scss'

const Main = () => {
  return (
    <>
      <div className="main-title">
        <div className="title-cover">{`<`}</div>
        {/* Klog */}
        <div className="glitched">Klog</div>
        <div className='glitch-window'></div>
        <div className="title-cover">{`>`}</div>
      </div>
      <div className="social-login">
        <Router>
          <Row gutter={5} type="flex" justify="center">
            <Social site="google" />
            <Social site="facebook" />
            <Social site="naver" />
            <Social site="kakao" />
            {/* <Social site="linkedin" /> */}
            <Social site="guest" guest={true} />
          </Row>
        </Router>
      </div>
    </>
  );
};

export default Main;