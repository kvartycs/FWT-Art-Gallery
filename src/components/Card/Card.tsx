import { IMainPainting } from "../../store/artists/types";
import styles from "./Card.module.sass";

interface IArtistProps {
  mainPainting: IMainPainting;
  name: string;
  yearsOfLife: string;
}

const Card = ({ name, mainPainting, yearsOfLife }: IArtistProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_text_wrapper}>
        <div className={styles.container_text}>
          <p>{name}</p>
          <span>{yearsOfLife}</span>
        </div>
      </div>

      <img
        src={`https://internship-front.framework.team/${mainPainting.image.webp}`}
        alt=""
      />
    </div>
  );
};

export default Card;
