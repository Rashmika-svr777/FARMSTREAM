import React from "react";

const AboutFarmer = () => {
  return (
    <div style={{
      maxWidth: 700, backgroundColor: 'rgba(255,255,255,0.95)', padding: 20, margin: '2rem auto',
      borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.1)', textAlign: 'center'
    }}>
      <h1 style={{ color: '#141d0eff' }}>About the Farmer</h1>
      <img
        src="/images/farmerrm.jpg"
        alt="Farmer"
        style={{ borderRadius: '50%', width: 180, height: 180, objectFit: 'cover' }}
/>

      <h2>Farmer Ramakistaiah Masaram</h2>
      <p className="about-bio">
        Ramakistaiah Masaram is a dedicated and experienced farmer with deep roots in sustainable agriculture. With decades of hands-on experience, he has mastered the art of nurturing the land to produce the freshest, highest-quality crops. His passion for environmentally friendly farming practices and commitment to organic produce have earned him respect in the farming community. Ramakistaiah believes in preserving nature's balance while delivering healthy and nutritious food to the local community. His unwavering dedication continues to inspire and guide future generations toward sustainable farming.
      </p>
      <p>
        Experience the farm freshness and ethical farming by connecting with Farmer John through our platform.
                                     <br></br>Contact: 9638527418
      </p>
    </div>
  );
};

export default AboutFarmer;

