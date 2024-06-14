"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../../app/Home.module.css';

export default function ListeHotel() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users/listeHotel');
        const data = await response.json();

        // Check if data is an array
        if (Array.isArray(data)) {
          setHotels(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des hôtels :', error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div className={styles.containerDashboard}>
      <div className={styles.sidebar}>
        <div className={styles.log}>
          <Image src="/logo.svg" alt="logo" width={30} height={30} className={styles.logo}/>
          <Image src="/titree.svg" alt="titree" width={150} height={150} />
        </div>
        <p>Principal</p>
        <div className={styles.menu}>
          <ul>
            <li><a href="/dashboard" className={styles.active}><Image src="/icone2.svg" alt="Dashboard icon" width={20} height={20} />Dashboard</a></li>
            <li><a href="#"><Image src="/icone1.svg" alt="Hotel icon" width={20} height={20} />Liste des hôtels</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.titles}>
            <p>Liste des hôtels</p>
          </div>
          <div className={styles.rightContent}>
            <div className={styles.searchBar}>
              <input type="text" placeholder="Recherche" />
            </div>
            <div className={styles.notification}>
              <img src="/notification.svg" alt="Notification icon" />
              <span className={styles.notificationCount}>3</span>
            </div>
            <div className={styles.profile}>
              <img src="/wally.jpg" alt="wally" />
              <span className={styles.onlineIndicator}></span>
            </div>
            <div className={styles.logout}>
              <img src="/log-out.svg" alt="Logout icon" />
            </div>
          </div>
        </div>
        <div className={styles.contentx}>
          <div className={styles.hotelCountWrapper}>
            <p className={styles.hotelCount}>Hôtels {hotels.length}</p>
            <a className={styles.createHotelButton} href='/hotel'>
              <Image src="/plus.svg" alt="Plus icon" width={20} height={20} /> Créer un nouvel hôtel
            </a>
          </div>
        </div>
        {hotels.length === 0 ? (
          <p>Chargement des hôtels en cours...</p>
        ) : (
          <div className={styles.contentWrapperx}>
            <div className={styles.gridx}>
              {hotels.map((hotel) => (
                <div key={hotel._id} className={styles.cardx}>
                  <Image
                    src={`http://localhost:3000/${hotel.photo}`}
                    alt={`Image de ${hotel.nom}`}
                    width={300}
                    height={200}
                  />
                  <div className={styles.infox}>
                    <p>{hotel.adresse}</p>
                    <h2>{hotel.nom}</h2>
                    <p>{hotel.prix} {hotel.devise} par nuit</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
