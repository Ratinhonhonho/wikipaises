import { Globe } from 'lucide-react';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <Globe size={30} className={styles.icon} />
          <h1 className={styles.title}>WikiPaíses</h1>
        </div>

        <p className={styles.subtitle}>
          Explore informações sobre países de forma simples e organizada.
        </p>
      </div>
    </header>
  );
}

export default Header;