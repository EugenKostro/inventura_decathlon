import React, { useEffect, useState, useRef } from "react";
import { useLocation } from 'react-router-dom';
import "./App.css";

const Artikli = () => {
  const [prikazaniArtikli, setPrikazaniArtikli] = useState([]);
  const [indeksTrenutnogArtikla, setIndeksTrenutnogArtikla] = useState(0);
  const [artikli, setArtikli] = useState([]);
  const zadnjiArtiklRef = useRef(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get('q');

  useEffect(() => {
    fetch("/eugen/inventura_decathlon/build/artikliData.json")
      .then((response) => response.json())
      .then((data) => {
        setArtikli(data);
        setPrikazaniArtikli([data[0]]);
      })
      .catch((error) => console.error("Greška pri dohvaćanju liste: ", error.message));
  }, []);

  const prikaziSljedeciArtikl = () => {
    if (indeksTrenutnogArtikla < artikli.length - 1) {
      const noviIndeks = indeksTrenutnogArtikla + 1;
      setIndeksTrenutnogArtikla(noviIndeks);
      setPrikazaniArtikli((prevPrikazaniArtikli) => [
        ...prevPrikazaniArtikli,
        artikli[noviIndeks],
      ]);
    }
    zadnjiArtiklRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="body-content">
      <div className="query-string-display">Query String: {q}</div>
      <div className="header">
        <img
          src="/eugen/inventura_decathlon/build/logo-decathlon-blue.svg"
          alt="Decathlon Logo"
          className="logo"
        />
        <h1 className="header-title">INVENTURNA LISTA</h1>
      </div>
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        {prikazaniArtikli.length > 0 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th style={{ textAlign: "left" }}>Naziv</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {prikazaniArtikli.map((artikl, index) => (
                  <tr
                    key={artikl.id}
                    ref={
                      index === prikazaniArtikli.length - 1
                        ? zadnjiArtiklRef
                        : null
                    }
                  >
                    <td>{artikl.id}</td>
                    <td style={{ textAlign: "left" }}>{artikl.naziv}</td>
                    <td
                      className={
                        artikl.status === "✅" ? "status-ok" : "status-not-ok"
                      }
                    >
                      {artikl.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="button-container">
          <button className="button-show-more" onClick={prikaziSljedeciArtikl}>
            Prikaži sljedeći artikl
          </button>
        </div>
      </div>
    </div>
  );
};

export default Artikli;
