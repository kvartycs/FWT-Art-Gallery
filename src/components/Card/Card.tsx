import { Link } from "react-router-dom";
import { IMainPainting } from "../../store/artists/types";
import styles from "./Card.module.sass";

interface IArtistProps {
  id: string;
  mainPainting: IMainPainting;
  name: string;
  yearsOfLife: string;
}

const Card = ({ name, mainPainting, yearsOfLife, id }: IArtistProps) => {
  return (
    <div className={styles.container}>
      <Link to={`/artist/${id}`}>
        <div className={styles.container_text_wrapper}>
          <div className={styles.container_text}>
            <p>{name}</p>
            <span>{yearsOfLife}</span>
          </div>
        </div>

        <img
          src={`https://internship-front.framework.team/${mainPainting.image.original}`}
          alt="painting"
        />
      </Link>
    </div>
  );
};

export default Card;
