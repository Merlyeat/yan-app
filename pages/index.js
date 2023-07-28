import Link from "next/link";
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Link href="/cube">
        <button className={styles.btn_red}>See this shit...</button>
      </Link>
      <Link href="/dinosaur">
        <button className={styles.btn_green}>Normal game</button>
      </Link>
    </div>
  )
}
