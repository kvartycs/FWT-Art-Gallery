import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./Header.module.sass";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTheme, setTheme } from "../../store/theme/reducer";
import { useResize } from "../../hooks/useResize";
import { Modal } from "../Modal";
import { selectIsAuth } from "../../store/auth/reducer";

interface IHeaderProps {
  isOpened: boolean;
  setIsOpened: (state: boolean) => void;
}

const Header = ({ setIsOpened, isOpened }: IHeaderProps) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const [isModal, setIsModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [showBurger, setShowBurger] = useState(false);
  const width = useResize();
  const isAuth = useAppSelector(selectIsAuth);

  const handleChangeTheme = () => {
    const next = theme === "dark" ? "light" : "dark";

    return dispatch(setTheme(next));
  };
  const onClickLogOut = () => {
    document.cookie = "accessToken=; Expires=Thu, 01 Jan 1970 00:00:01 GMT";
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <Modal isOpen={isModal} setIsOpen={setIsModal} isRegister={isRegister} />
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
              {isAuth ? (
                <p onClick={onClickLogOut}>LOG OUT</p>
              ) : (
                <>
                  <p
                    onClick={() => {
                      setIsModal(true);
                      setIsRegister(false);
                    }}
                  >
                    LOG IN
                  </p>
                  <p
                    onClick={() => {
                      setIsModal(true);
                      setIsRegister(true);
                    }}
                  >
                    SIGN UP
                  </p>
                </>
              )}
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
    </>
  );
};

export default Header;
