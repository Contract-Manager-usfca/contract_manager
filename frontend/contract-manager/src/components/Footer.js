import React from 'react';

const styles = {
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 70px',
      backgroundColor: '#C188FB',
      color: '#210043',
      margin: '20px 90px',
      marginTop: '0px',
    },
    exFooter: {
      backgroundColor: 'black',
    }
  };

export default function Footer() {
    return (
        <div style={styles.exFooter}>
            <div style={styles.footer}>
                <a href="#" style={{ textDecoration: 'none', marginRight: '20px' }}>Home</a>
                <a href="#" style={{ textDecoration: 'none', marginRight: '20px' }}>About Us</a>
                <a href="#" style={{ textDecoration: 'none', marginRight: '20px' }}>Help</a>
                <a href="#" style={{ textDecoration: 'none', marginRight: '20px' }}>Contact Us</a>
            </div>
        </div>
    );
}