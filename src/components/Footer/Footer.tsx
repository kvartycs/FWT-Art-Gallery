import styles from "./Footer.module.sass";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_text}>
        <p>
          Проект реализован в рамках стажировки
          <br /> для Frontend-разработчиков от компании Framework Team
        </p>
        <span>Иванов Иван, 2021</span>
      </div>
      <div className={styles.container_socials}>
        <a href="#">
          <img src="../assets/img/facebook_icon.svg" alt="facebook" />
        </a>
        <a href="#">
          <img src="../assets/img/vk_icon.svg" alt="vk" />
        </a>
        <a href="#">
          <img src="../assets/img/instagram_icon.svg" alt="instagram" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
