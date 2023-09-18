import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./Header.module.sass";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTheme, setTheme } from "../../store/theme/reducer";
import { useResize } from "../../hooks/useResize";

interface IHeaderProps {
  isOpened: boolean;
  setIsOpened: (state: boolean) => void;
}

const Header = ({ setIsOpened, isOpened }: IHeaderProps) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const width = useResize();
  const [showBurger, setShowBurger] = useState(false);

  const handleChangeTheme = () => {
    const next = theme === "dark" ? "light" : "dark";

    return dispatch(setTheme(next));
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={styles.container}>
      <Link to="/">
        <img
          src={
            theme === "dark"
              ? "../assets/img/logo.svg"
              : "../assets/img/light_logo.svg"
          }
          alt="logo"
        />
      </Link>
      {width > 1440 ? (
        <div className={styles.container_right}>
          <div className={styles.container_right_links}>
            <Link to="/">LOG IN</Link>
            <Link to="/">SIGN UP</Link>
          </div>

          <button
            className={styles.container_theme}
            onClick={handleChangeTheme}
          >
            <img
              src={
                theme === "dark"
                  ? "../assets/img/light_icon.svg"
                  : "../assets/img/dark_icon.svg"
              }
              alt="theme"
            />
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            setShowBurger(!showBurger);
            setIsOpened(!isOpened);
          }}
          className={classNames(styles.container_burger, {
            [styles.active]: showBurger,
          })}
        >
          <span />
          <span />
          <span />
        </button>
      )}
    </div>
  );
};

export default Header;
