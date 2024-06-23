"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../../app/Home.module.css';

export default function ListeHotel() {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/listeHotel`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setHotels(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des hôtels :', error);
        setError('Erreur lors de la récupération des hôtels');
      }
    };

    fetchHotels();
  }, []);

  const deleteHotel = async (hotelId) => {
    if (!window.confirm('Êtes vous sûr de vouloir supprimer cet hotel?')) {
      return; // If the user cancels, do nothing
    }

    try {
      const response = await fetch(`http://localhost:3000/api/users/hotels/${hotelId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete hotel');
      }

      // Remove the deleted hotel from the state
      setHotels(hotels.filter(hotel => hotel._id !== hotelId));
    } catch (error) {
      console.error('Error deleting hotel:', error);
      setError('Error deleting hotel');
    }
  };

  const handleEditClick = (hotelId) => {
    router.push(`/updateHotel?id=${hotelId}`); // Use router to navigate to the edit page with the hotel ID
  };

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
        {error && <p className={styles.error}>{error}</p>}
        {hotels.length === 0 && !error ? (
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
                    <button onClick={() => deleteHotel(hotel._id)}>Delete</button>
                    <button onClick={() => handleEditClick(hotel._id)}>Modifier</button>
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
