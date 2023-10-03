import React from 'react';

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    padding: '0px 20px',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    color: 'black'
  },
  links: {
    color: '#210043',
  },
};

export default function HomePage() {
  return (
    <div>
      <div style={styles.nav}>
        <h3 style={{padding: '10px', borderRadius: '90%', backgroundColor: '#C188FB'}}>Contract Manager</h3>
        <div style={styles.links}>
          <a href="/link1" style={{textDecoration: 'none', marginRight: '20px'}}>Link 1</a>
          <a href="/link2" style={{textDecoration: 'none', marginRight: '20px'}}>Link 2</a>
          <a href="/link3" style={{textDecoration: 'none', marginRight: '20px'}}>Link 3</a>
        </div>
      </div>
    </div>
  );
}

