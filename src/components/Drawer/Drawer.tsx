import { Link } from "react-router-dom";
import styles from "./Drawer.module.sass";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTheme, setTheme } from "../../store/theme/reducer";

interface IDrawerProps {
  isOpened: boolean;
}

const Drawer = ({ isOpened }: IDrawerProps) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const handleChangeTheme = () => {
    const next = theme === "dark" ? "light" : "dark";

    return dispatch(setTheme(next));
  };
  return (
    <div
      className={`${styles.overlay} ${isOpened ? styles.overlayVisible : ""}`}
    >
      <div className={styles.drawer}>
        <div className={styles.drawer_container}>
          <div className={styles.drawer_theme_wrapper}>
            <button className={styles.drawer_theme} onClick={handleChangeTheme}>
              <img
                src={
                  theme === "dark"
                    ? "./assets/img/light_icon.svg"
                    : "./assets/img/dark_icon.svg"
                }
                alt="theme"
              />
            </button>
            <span>{theme === "dark" ? "LIGHT  THEME" : "DARK THEME"}</span>
          </div>

          <Link to="/">LOG IN</Link>
          <Link to="/">SIGN UP</Link>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
