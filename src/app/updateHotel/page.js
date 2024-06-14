"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../../app/Home.module.css';

export default function ModifierHotel() {
  const [hotelId, setHotelId] = useState(null); // État pour stocker l'ID de l'hôtel à modifier
  const [hotelData, setHotelData] = useState(null); // État pour stocker les données de l'hôtel

  useEffect(() => {
    if (hotelId) {
      fetchHotelData(hotelId); // Appel à fetchHotelData lorsque hotelId est défini
    }
  }, [hotelId]); // Déclenché à chaque fois que hotelId change

  const fetchHotelData = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/hotels/${id}`); // Remplacez par votre API endpoint réel
      if (!response.ok) {
        throw new Error('Failed to fetch hotel data');
      }
      const data = await response.json();
      setHotelData(data); // Met à jour les données de l'hôtel dans l'état
    } catch (error) {
      console.error('Error fetching hotel data:', error);
    }
  };

  const handleEditClick = (id) => {
    setHotelId(id); // Met à jour hotelId lors du clic sur l'icône de modification
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // Logique pour sauvegarder les modifications de l'hôtel
    console.log('Hotel data to be saved:', hotelData);
  };

  if (!hotelData) {
    return <p>Loading...</p>; // Affiche un message de chargement tant que les données de l'hôtel ne sont pas disponibles
  }

  return (
    <div className={styles.containerHotel}>
      <form className={styles.formeHotel} onSubmit={handleSubmit}>
        <p className={styles.titleHotel}>Modifier hôtel</p>

        <div className={styles.ligne1}>
          <div className={styles.champ}>
            <label htmlFor="nom" className={styles.label}>Nom hôtel</label><br/><br/>
            <input
              type="text"
              id="nom"
              className={styles.inputHotel}
              value={formData.nom}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.champ}>
            <label htmlFor="adresse" className={styles.label}>Adresse</label><br/><br/>
            <input
              type="text"
              id="adresse"
              className={styles.inputHotel}
              value={formData.adresse}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.ligne2}>
          <div className={styles.champ}>
            <label htmlFor="email" className={styles.label}>E-mail</label><br/><br/>
            <input
              type="email"
              id="email"
              className={styles.inputHotel}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.champ}>
            <label htmlFor="telephone" className={styles.label}>Numéro de téléphone</label><br/><br/>
            <input
              type="tel"
              id="telephone"
              className={styles.inputHotel}
              value={formData.telephone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.ligne3}>
          <div className={styles.champ}>
            <label htmlFor="prix" className={styles.label}>Prix par nuit</label><br/><br/>
            <input
              type="number"
              id="prix"
              className={styles.inputHotel}
              value={formData.prix}
              onChange={handleChange}
            />
          </div>

          <div className={styles.champ}>
            <label htmlFor="devise" className={styles.label}>Devise</label><br/><br/>
            <select id="devise" className={styles.inputHotel} value={formData.devise} onChange={handleChange}>
              <option value="XOF">XOF</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>

        <div className={`${styles.champe} ${styles.fullWidth}`}>
          <label htmlFor="photo" className={styles.label}>Ajouter une photo</label>
          <div className={styles.photoInput}>
            <label htmlFor="photo" className={styles.photoInputLabel}>
              <Image src="/image.svg" alt="Image" width={20} height={20} />
              <span>Ajouter une image</span>
              <input
                type="file"
                id="photo"
                className={styles.photoFileInput}
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        <button type="submit" className={styles.buttonHotel}>Enregistrer les modifications</button>
      </form>
    </div>
  );
}
