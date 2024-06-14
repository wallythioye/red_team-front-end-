import Image from "next/image";
import styles from '../../app/Home.module.css';

export default function MtpOublie () {
    return (
      <div className={styles.container}> 
       <div className={styles.logoo}>
        <Image src="/logo.svg" alt="logo" width={30} height={30} className={styles.logo}/>
        <Image src="/titree.svg" alt="titree" width={150} height={150} />
      </div>
        <form className={styles.formInfo}><br></br>
  
        <p className={styles.title}>Mot de passe oublié?</p>
        <p className={styles.info}>
           Entrez votre adresse e-mail ci-dessous et<br></br> 
           nous vous envoyons des instructions sur la<br></br>
           façon de modifier votre mot de passe.
        </p><br></br><br></br>

         <label htmlFor="email" className={styles.label}>Votre e-mail</label><br></br><br></br>
          <input
            type="password"
            id="password"
            placeholder="Mot de pass"
            className={styles.input}
          />
          
          <button type="submit" className={styles.buttonInfo}>Envoyer</button>
          </form>
          <div className={styles.retour}>
            <p>Revenir à la<a href="/" className={styles.inscrire}> connexion</a></p>
          </div>
      </div>
    );
  };
  
  