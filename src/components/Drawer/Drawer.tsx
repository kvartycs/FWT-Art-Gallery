import { useState } from "react";
import styles from "./Drawer.module.sass";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTheme, setTheme } from "../../store/theme/reducer";
import { Modal } from "../Modal";
import { selectIsAuth } from "../../store/auth/reducer";

interface IDrawerProps {
  isOpened: boolean;
}

const Drawer = ({ isOpened }: IDrawerProps) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const isAuth = useAppSelector(selectIsAuth);
  const [isModal, setIsModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleChangeTheme = () => {
    const next = theme === "dark" ? "light" : "dark";

    return dispatch(setTheme(next));
  };
  const onClickLogOut = () => {
    document.cookie = "accessToken=; Expires=Thu, 01 Jan 1970 00:00:01 GMT";
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };
  return (
    <>
      <Modal isOpen={isModal} setIsOpen={setIsModal} isRegister={isRegister} />
      <div
        className={`${styles.overlay} ${isOpened ? styles.overlayVisible : ""}`}
      >
        <div className={styles.drawer}>
          <div className={styles.drawer_container}>
            <div className={styles.drawer_theme_wrapper}>
              <button
                className={styles.drawer_theme}
                onClick={handleChangeTheme}
              >
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
        </div>
      </div>
    </>
  );
};

export default Drawer;
