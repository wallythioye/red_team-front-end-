import Image from 'next/image';
import styles from '../../app/Home.module.css';

export default function Acceuil() {
  return (
    <div className={styles.containerDashboard}>
      <div className={styles.sidebar}>
        <div className={styles.log}>
          <Image src="/logo.svg" alt="logo" width={30} height={30} className={styles.logo} />
          <Image src="/titree.svg" alt="titree" width={150} height={150} />
        </div>
        <p>Principal</p>
        <div className={styles.activeMenu}>
          <ul>
            <li><a href="/dashboard" className={styles.active}><Image src="/icone2.svg" alt="Dashboard icon" width={20} height={20} />Dashboard</a></li>
            <li><a href="/listeHotel"><Image src="/icone1.svg" alt="Hotel icon" width={20} height={20} />Liste des hôtel</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.dashboardTitle}>
            <h2>Dashboard</h2>
          </div>
          <div className={styles.rightContent}>
            <div className={styles.searchBar}>
              <input type="text" placeholder="Recherche" />
            </div>
            <div className={styles.notificationIcon}>
              <Image src="/notification.svg" alt="Notification icon" width={24} height={24} />
              <span className={styles.notificationCount}>3</span>
            </div>
            <div className={styles.profile}>
              <Image src="/wally.jpg" alt="wally" width={32} height={32} className={styles.profileImage} />
              <span className={styles.onlineIndicator}></span>
            </div>
            <div className={styles.logout}>
              <Image src="/log-out.svg" alt="Logout icon" width={24} height={24} />
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <p className={styles.bienvenue}>Bienvenue sur RED Product</p>
          <p className={styles.lorem}>Lorem ipsum dolor sit amet consectetur</p>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.analytics}>
            <div className={styles.cardGrid}>
              <div className={styles.card}>
                <Image src="/span1.svg" alt="Hotel icon" width={45} height={45} />
                <div>
                  <p>125 Formulaires <br /> Je ne sais pas quoi mettre.</p>
                </div>
              </div>
              <div className={styles.card}>
                <Image src="/span2.svg" alt="Hotel icon" width={45} height={45} />
                <div>
                  <p>125 Formulaires <br /> Je ne sais pas quoi mettre.</p>
                </div>
              </div>
              <div className={styles.card}>
                <Image src="/span3.svg" alt="Hotel icon" width={45} height={45} />
                <div>
                  <p>125 Formulaires <br /> Je ne sais pas quoi mettre.</p>
                </div>
              </div>
              <div className={styles.card}>
                <Image src="/span4.svg" alt="Hotel icon" width={45} height={45} />
                <div>
                  <p>125 Formulaires <br /> Je ne sais pas quoi mettre.</p>
                </div>
              </div>
              <div className={styles.card}>
                <Image src="/span5.svg" alt="Hotel icon" width={45} height={45} />
                <div>
                  <p>125 Formulaires <br /> Je ne sais pas quoi mettre.</p>
                </div>
              </div>
              <div className={styles.card}>
                <Image src="/span6.svg" alt="Hotel icon" width={45} height={45} />
                <div>
                  <p>125 Formulaires <br /> Je ne sais pas quoi mettre.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
