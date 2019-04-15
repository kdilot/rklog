import React from 'react';
import { Col } from 'antd';
import { Link } from 'react-router-dom';
import './common.scss';
import naver from 'image/naver.png';
import facebook from 'image/facebook.png';
import linkedin from 'image/linkedin.png';
import google from 'image/google.png';
import kakao from 'image/kakao.png';
import guest from 'image/guest.png';

const image = {
  naver: naver,
  facebook: facebook,
  linkedin: linkedin,
  google: google,
  kakao: kakao,
  guest: guest,
}

const Social = ({ site }) => {
  return (
    <Col span={24} className="social">
      <Link to={`/auth/${site}`}>
        <div className={`social-cover ${site}`}>
          <div className="image"><img alt={site} width="50px" height="50px" src={image[site]} /></div>
          <div className="text">{site}</div>
        </div>
      </Link>
    </Col>
  );
};

export default Social;