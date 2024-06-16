"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../../app/Home.module.css';

export default function AjoutHotel() {
  const [formData, setFormData] = useState({
    nom: '',
    adresse: '',
    email: '',
    telephone: '',
    prix: '',
    devise: '',
    photo: ''
  });
  
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const { nom, adresse, email, telephone, prix, devise } = formData;
    if (!nom || !adresse || !email || !telephone || !prix || !devise) {
      alert('Tous les champs requis doivent être remplis.');
      return;
    }

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    console.log('Submitting form data:', formData); // Debugging log

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/ajoutHotel`, {
        method: 'POST',
        body: form
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Hotel added:', result);
      } else {
        console.error('Error:', result.error);
      }

      router.push('/listeHotel');

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.containerHotel}> 
      <form className={styles.formeHotel} onSubmit={handleSubmit}>
        <p className={styles.titleHotel}>Créer un nouveau hôtel</p>

        <div className={styles.ligne1}>
          <div className={styles.champ}>
            <label htmlFor="nom" className={styles.label}>Nom de l&apos;hôtel</label><br/><br/>
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

        <button type="submit" className={styles.buttonHotel}>Enregistrer</button>
      </form>
    </div>
  );
}
