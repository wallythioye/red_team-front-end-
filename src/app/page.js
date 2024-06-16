'use client'; // Ajoute la directive "use client" en haut du fichier

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './Home.module.css';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Réinitialise l'erreur à chaque tentative de soumission

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (error) {
      setError('Nom d\'utilisateur ou mot de passe incorrect');
      console.error('Erreur:', error);
    }
  };

  return (
    <div className={styles.container}> 
      <div className={styles.logoo}>
        <Image src="/logo.svg" alt="logo" width={30} height={30} className={styles.logos}/>
        <Image src="/titree.svg" alt="titree" width={150} height={150} />
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <p className={styles.title}>Connectez-vous en tant Admin</p>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="email"
          id="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        
        <input
          type="password"
          id="password"
          placeholder="Mot de passe"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <div className={styles.checkboxContainer}>
          <input type="checkbox" id="remember" className={styles.checkbox} />
          <label htmlFor="remember">Gardez-moi connecté</label>
        </div>
        
        <button type="submit" className={styles.button}>Se Connecter</button>
      </form>
      <div className={styles.mtp}>
        <p><a href="/mtpoublie" className={styles.mtdp}>Mot de passe oublié?</a></p>
      </div>
      <div className={styles.compte}>
        <p>Vous n&apos;avez pas de compte? <a href="/register" className={styles.inscrire}>S&apos;inscrire</a></p>
      </div>
    </div>
  );
}
