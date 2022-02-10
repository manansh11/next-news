
import { Toolbar } from '../component/toolbar';
import styles from '../styles/Home.module.css'

export default function Home() {


  return (
    <div className="page-container">
    
    <Toolbar />

      <div className={styles.main}>
        <h1 className={styles.main}>Next.js News App</h1>
        <h3>Read the latest news!</h3>
      </div>
    </div>
  );
}


