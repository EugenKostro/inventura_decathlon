import React, { useState } from 'react';

const Artikli = () => {
  const artikli = [
    { id: 1, naziv: 'nogometna_lopta', status: '✅' },
    { id: 2, naziv: 'kopačke', status: '✅' },
    { id: 3, naziv: 'štitnici', status: '❌' }
  ];

  const [prikazaniArtikli, setPrikazaniArtikli] = useState([]);

  const prikaziSljedeciArtikl = () => {
    if (prikazaniArtikli.length < artikli.length) {
      setPrikazaniArtikli(prevPrikazani => [
        ...prevPrikazani,
        artikli[prikazaniArtikli.length]
      ]);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Lista Artikala</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button style={{
          backgroundColor: '#0078b8',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '10px 20px',
          cursor: 'pointer'
        }} onClick={prikaziSljedeciArtikl}>
          Prikaži Sljedeći Artikl
        </button>
      </div>
      {prikazaniArtikli.length > 0 && (
        <table style={{
          margin: 'auto',
          borderCollapse: 'collapse',
          border: '1px solid black',
          width: '60%', 
          maxWidth: '600px', 
        }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', textAlign: 'left', padding: '5px' }}>ID</th>
              <th style={{ border: '1px solid black', textAlign: 'right', padding: '5px' }}>Naziv</th>
              <th style={{ border: '1px solid black', textAlign: 'center', padding: '5px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {prikazaniArtikli.map((artikl) => (
              <tr key={artikl.id}>
                <td style={{ border: '1px solid black', textAlign: 'left', padding: '5px' }}>{artikl.id}</td>
                <td style={{ border: '1px solid black', textAlign: 'right', padding: '5px' }}>{artikl.naziv}</td>
                <td style={{ border: '1px solid black', textAlign: 'center', padding: '5px', color: artikl.status === '✅' ? 'green' : 'red' }}>
                  {artikl.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Artikli;
