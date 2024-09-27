import React from 'react';
import './Dashboard.css'

const Card = ({ title, subtitle, link }) => {
  return (
    <div className="card">
     
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle text-body-secondary">{subtitle}</h6>
      
      
    </div>
  );
};

export default Card;