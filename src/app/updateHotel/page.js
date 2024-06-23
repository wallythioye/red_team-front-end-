"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../../app/Home.module.css';

export default function ModifierHotel() {
  const router = useRouter();
  const { id } = router.query || {};
  const [hotelData, setHotelData] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    adresse: '',
    email: '',
    telephone: '',
    prix: 0,
    devise: 'XOF',
    photo: ''
  });

  useEffect(() => {
    if (id) {
      console.log('Fetching hotel data for id:', id); // Debugging log
      fetchHotelData(id);
    }
  }, [id]);

  const fetchHotelData = async (_id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/hotels/${_id}`);
      console.log('Response from server:', response); // Debugging log
      if (!response.ok) {
        throw new Error('Failed to fetch hotel data');
      }
      const data = await response.json();
      console.log('Hotel data:', data); // Debugging log
      setHotelData(data);
      setFormData({
        nom: data.nom,
        adresse: data.adresse,
        email: data.email,
        telephone: data.telephone,
        prix: data.prix,
        devise: data.devise,
        photo: '' // photo is handled separately
      });
    } catch (error) {
      console.error('Error fetching hotel data:', error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const response = await fetch(`http://localhost:3000/api/users/updateHotels/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });
      if (!response.ok) {
        throw new Error('Failed to update hotel');
      }
      const updatedHotel = await response.json();
      setHotelData(updatedHotel);
      router.push('/listeHotel');
    } catch (error) {
      console.error('Error updating hotel:', error);
    }
  };

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
