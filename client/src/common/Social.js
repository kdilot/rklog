import React from 'react';
import { Col } from 'antd';
import { Link } from 'react-router-dom';
import './common.scss';

const Social = ({ site, guest = false }) => {
  return (
    <Col span={guest ? 24 : 12} className="social">
      <Link to={`/auth/${site}`}>
        <div className={`social-cover ${site}`}>
          <div className="text">{site}</div>
        </div>
      </Link>
    </Col>
  );
};

export default Social;