'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../../app/Home.module.css';


export default function RegisterPage() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();

      if (response.ok) {
        console.log('User registered:', result);
      } else {
        console.error('Error:', result.error);
      }
      router.push('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoo}>
        <Image src="/logo.svg" alt="logo" width={30} height={30} className={styles.logos}/>
        <Image src="/titree.svg" alt="titree" width={150} height={150} />
      </div>
      <form className={styles.forme} onSubmit={handleSubmit}><br></br>
        <p className={styles.title}>Inscrivez-vous en tant que Admin</p>
        <input
          type="text"
          id="name"
          placeholder="Nom"
          className={styles.input}
          value={formData.name}
          onChange={handleChange}
        /><br></br>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
        /><br></br>
        <input
          type="password"
          id="password"
          placeholder="Mot de passe"
          className={styles.input}
          value={formData.password}
          onChange={handleChange}
        />
        <div className={styles.checkboxContainer}>
          <input type="checkbox" id="remember" className={styles.checkbox} />
          <label htmlFor="remember">Accepter les termes et la politique</label>
        </div>
        <button type="submit" className={styles.buttone}>S&apos;inscrire</button>
      </form>
      <div className={styles.compte}>
        <p>Vous avez déjà un compte? <a href="/" className={styles.inscrire}>Se connecter</a></p>
      </div>
    </div>
  );
}
