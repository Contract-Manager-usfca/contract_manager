import { useState } from "react";
import './App.css';
import Home from './components/Home';
import LineChart from "./components/LineChart";
import { UserData } from "./Data";

function App() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "#03045E",
          "#003049",
          "#94D2BD",
          "#FdF0D5",
          "#C1121F",
        ],
      },
    ],
  });

  const styles = {
    chart: {
      width: '700',
      color: "white",
      backgroundColor: "white",
      padding: "10px",
      margin: "auto"
    },
    card: {
      margin: '20px 200px',
      background: 'white',
      textAlign: 'center',
      borderRadius: '40%',
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 70px',
      backgroundColor: '#C188FB',
      color: '#210043',
      margin: '20px 90px',
    },
    exFooter: {
      backgroundColor: 'black',
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Home />
      <div style={styles.card}>
        <h4>Demographic Search Bar...</h4>
      </div>
      <div style={styles.chart}>
        <LineChart chartData={userData} />
      </div>
      <div style={styles.exFooter}>
        <div style={styles.footer}>
          <a href="#" style={{ textDecoration: 'none', marginRight: '20px' }}>Home</a>
          <a href="#" style={{ textDecoration: 'none', marginRight: '20px' }}>About Us</a>
          <a href="#" style={{ textDecoration: 'none', marginRight: '20px' }}>Help</a>
          <a href="#" style={{ textDecoration: 'none', marginRight: '20px' }}>Contact Us</a>
        </div>
      </div>
    </div>
  );
}

export default App;
