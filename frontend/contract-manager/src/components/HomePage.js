import { useState, useEffect } from "react";
import BarGraph from "./BarGraph";
import axios from 'axios';

function HomePage() {
  const [allDemographics, setAllDemographics] = useState([]);
  const [selectedDemographics, setSelectedDemographics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
          setSearchQuery(""); // clear the search input after adding the chip
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
    chartContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '70%',
      margin: '10px 250px 20px',
      background: '#202020',
      padding: '20px',
      border: 'solid #CBE1AE 1px',
    },
    chartTitle: {
      color: 'white',
      marginBottom: '20px',
      textAlign: 'center',
    },
    chartText: {
      color: 'white',
      maxWidth: '100%',
      fontSize: '17px',
      marginTop: '20px',
      textAlign: 'center',
    },
    searchBar: {
      display: 'flex',
      gap: '10px',
      backgroundColor: 'white',
      padding: '.5%',
      width: '500px',
    },
    searchInput: {
      padding: '5px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      flexGrow: 1,
      textColor: '#CBE1AE',
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
            list="demographics-list"
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
        <div style={styles.barGraph}>
          <h2 style={styles.chartTitle}>First D3 Graph</h2>
          <BarGraph selectedDemographics={selectedDemographics} />
          <p style={styles.chartText}>
            This is a <b>Bar Graph</b> generated with your selected Demographics.
            <br /><br />
            {selectedDemographics.length > 0 ? (
              <span>
                The Demographics currently selected are:{" "}
                <strong>{selectedDemographics.join(", ")}</strong>
              </span>
            ) : (
             <b>Make a Selection above to see the generated results</b>
            )}
          </p>
        </div>
      </div>

      <div style={styles.chartContainer}>
        <div style={styles.barGraph}>
          <h2 style={styles.chartTitle}>D3 Bar Graph Test</h2>
          {/* <BarGraph /> */}
          <p style={styles.chartText}>
            These are the results from Chart 2. Demographic, blah blah, gets some percentage more followers than the other demographics. blah blah blah more explanation about this graph.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

