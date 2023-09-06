import React from 'react';
import Header from '../../components/website/Header';
import Footer from '../../components/website/Footer';
import './style.css';
import Rooms from '../dashboard/Rooms/Rooms';

const Home = () => {





  return (
    <>
      <Header />
      <Rooms/>
      <Footer />
    </>
  );
}

export default Home