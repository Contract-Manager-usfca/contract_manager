import { useState, useEffect } from "react";
import LineChart from "./LineChart";
import { UserData } from "../Data";
import axios from 'axios';

function HomePage() {
  // graph tings
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
        borderColor: [
          "#FFFBEE"
        ]
      },
    ],
  });

  const [allDemographics, setAllDemographics] = useState([]);
  const [selectedDemographics, setSelectedDemographics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDemographics, setFilteredDemographics] = useState([]);

  // Fetch and set all available demographics from your database
  useEffect(() => {
    axios.get('http://chupacabra.cs.usfca.edu:8000/demographics/', { withCredentials: true })
      .then(response => {
        const demographicsArray = response.data.map(demographic => demographic.demographic);
        setAllDemographics(demographicsArray);
      })
      .catch(error => {
        console.error("Error fetching demographics:", error);
      });
  }, []);

  const fetchDemographic = () => {
    axios.get('http://chupacabra.cs.usfca.edu:8000/demographics/', { withCredentials: true })
      .then(response => {
        const filteredData = response.data.filter(demographic => {
          return demographic.demographic.toLowerCase().includes(searchQuery.toLowerCase());
        });

        // If the filteredData contains results, add the first match as a chip
        if (filteredData.length > 0) {
          const demographicName = filteredData[0].demographic;
          selectDemographic(demographicName);
          setSearchQuery(""); // Optionally clear the search input after adding the chip
        } else {
          console.warn("Demographic not found!"); // or display some UI warning to the user
        }
      })
      .catch(error => {
        console.error("Error fetching demographics:", error);
      });
};


  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const selectDemographic = (demographic) => {
    if (!selectedDemographics.includes(demographic)) {
      setSelectedDemographics(prev => [...prev, demographic]);
    }
  };

  const deselectDemographic = (demographic) => {
    setSelectedDemographics(prev => prev.filter(item => item !== demographic));
  };

  function Chip({ label, onRemove }) {
    return (
      <div style={{ display: 'inline-flex', padding: '5px 10px', border: '1px solid #CBE1AE', borderRadius: '20px', marginRight: '10px', backgroundColor: '#303030' }}>
        <span>{label}</span>
        <button onClick={onRemove} style={{ marginLeft: '5px', cursor: 'pointer', background: 'none', border: 'none', color: '#CBE1AE' }}>x</button>
      </div>
    );
  }



  const styles = {
    card: {
      display: 'flex',
      alignItems: 'center',
      margin: '20px 400px',
      textAlign: 'center',
      borderRadius: '40%',
    },
    cardTitle: {
      color: 'white',
      paddingRight: '10%',
    },
    chart: {
      width: '100%',
      height: 'auto',
    },
    chartContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '70%',
      margin: '10px 250px 20px',
      background: '#202020',
      padding: '20px',
      border: 'solid #CBE1AE 1px'
    },
    chartTitle: {
      color: 'white',
      marginRight: '25px',
      marginBottom: '20px',
      padding: '2% 20% 0% 6%',
    },
    chartText: {
      color: 'white',
      marginRight: '20px',
      maxWidth: '70%',
      fontSize: '0.9rem',
      padding: '2% 0% 6% 6%',
    },
    searchBar: {
      display: 'flex',
      gap: '10px',
      backgroundColor: 'white',
      padding: '.5%',
      width: '500px'
    },
    searchInput: {
      padding: '5px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      flexGrow: 1,
      textColor: '#CBE1AE'
    },
    searchBtn: {
      padding: '5px 15px',
      fontSize: '16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      backgroundColor: '#CBE1AE',
    },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#252525', paddingBottom: '100px' }}>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Search Demographic</h2>
        <div style={styles.searchBar}>
          <input
            type="text"
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            list="demographics-list" // Reference the datalist element
          />
          <button onClick={fetchDemographic} style={styles.searchBtn}>Search</button>
        </div>
        {/* Create the datalist with all available demographics */}
        <datalist id="demographics-list">
          {allDemographics.map((option, index) => (
            <option key={index} value={option} />
          ))}
        </datalist>
      </div>
      <div style={{ color: 'white', alignContent: 'center', margin: 'auto' }}>
          {selectedDemographics.map(demo => (
            <Chip key={demo} label={demo} onRemove={() => deselectDemographic(demo)} />
          ))}
      </div>
      <div style={styles.chartContainer}>
        <div>
          <h2 style={styles.chartTitle}>CHART 1</h2>
          <p style={styles.chartText}>
            These are the results from Chart 1. Demographic, blah blah, gets some percentage more followers than the other demographics. blah blah blah more explanation about this graph.
          </p>
        </div>
        <div style={styles.chart}>
          <LineChart chartData={userData} />
        </div>
      </div>
      <div style={styles.chartContainer}>
        <div style={styles.chart}>
          <LineChart chartData={userData} />
        </div>
        <div>
          <h2 style={styles.chartTitle}>CHART 2</h2>
          <p style={styles.chartText}>
            These are the results from Chart 2. Demographic, blah blah, gets some percentage more followers than the other demographics. blah blah blah more explanation about this graph.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

