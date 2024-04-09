import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import dog from "../../assets/images/13.png"

export function ErrorPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Ops!</h1>
      <h2 className={styles.title}>Página não encontrada</h2>
      <Link to="/">
        <button className={styles.button}>Ir para página inicial</button>
      </Link>

      <img src={dog} className={styles.image} />
    </div>
  );
}
