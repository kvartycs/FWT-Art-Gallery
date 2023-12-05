import { useState } from "react";
import validator from "validator";
import { Dialog } from "@headlessui/react";
import styles from "./Modal.module.sass";
import { useResize } from "../../hooks/useResize";
import { useAppDispatch } from "../../store";
import { fetchAuth, fetchRegister } from "../../store/auth/reducer";
import { getFingerprint } from "../../utils/getFingerprint";

interface IModalProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  isRegister: boolean;
}

const Modal = ({ isOpen, setIsOpen, isRegister }: IModalProps) => {
  const dispatch = useAppDispatch();
  const width = useResize();
  const [auth, setAuth] = useState({ username: "", password: "" });

  const handleRegisterForm = async () => {
    if (validator.isEmail(auth.username)) {
      const fingerprint = await getFingerprint();
      const data = await dispatch(
        fetchRegister({ ...auth, fingerprint }),
      ).unwrap();
      if (data.accessToken) {
        document.cookie = `accessToken=${data.accessToken}`;
      }
    } else {
      // TODO: Integrate into toast
      alert("Введен неверный email");
    }

    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };
  const handleLoginForm = async () => {
    if (validator.isEmail(auth.username)) {
      const fingerprint = await getFingerprint();
      const data = await dispatch(fetchAuth({ ...auth, fingerprint })).unwrap();
      console.log(data);

      if (data.accessToken) {
        document.cookie = `accessToken=${data.accessToken}`;
      }
    } else {
      // TODO: Integrate into toast
      alert("Введен неверный email");
    }

    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Dialog
        className={styles.wrapper}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className={styles.bg} aria-hidden="true"></div>
        <Dialog.Panel className={styles.container}>
          {width > 1440 && (
            <div className={styles.container_image}>
              <img
                src={
                  isRegister
                    ? "../assets/img/register_bg.svg"
                    : "../assets/img/login_bg.svg"
                }
                alt="bg"
              />
            </div>
          )}

          <div className={styles.container_form}>
            <Dialog.Title className={styles.container_form_title}>
              {isRegister ? "Create your profile" : "Welcome back"}
            </Dialog.Title>
            {width > 768 && (
              <div className={styles.container_form_description}>
                {isRegister ? (
                  <p>
                    If you already have an account, please <span>log in</span>
                  </p>
                ) : (
                  <p>
                    If you do not have an account yet, please{" "}
                    <span>sign up</span>
                  </p>
                )}
              </div>
            )}

            <div className={styles.container_form_input_wrapper}>
              <div className={styles.container_form_input_title}>Email</div>
              <input
                className={styles.container_form_input}
                type="text"
                name="username"
                id=""
                value={auth.username}
                onChange={(e) => handleChangeInput(e)}
              />
            </div>
            <div className={styles.container_form_input_wrapper}>
              <div className={styles.container_form_input_title}>Password</div>
              <input
                className={styles.container_form_input}
                type="text"
                name="password"
                id=""
                onChange={(e) => handleChangeInput(e)}
                value={auth.password}
              />
            </div>

            <button
              className={styles.container_form_submit}
              onClick={() => {
                setIsOpen(false);
                if (isRegister) {
                  handleRegisterForm();
                } else {
                  handleLoginForm();
                }
              }}
            >
              {isRegister ? "Sign up" : "Login"}
            </button>
            <button
              className={styles.container_form_close}
              onClick={() => setIsOpen(false)}
            >
              <img src="../assets/img/close_icon.svg" alt="close" />
            </button>
            {width < 768 && (
              <Dialog.Description className={styles.container_form_description}>
                If you do not have an account yet, please <span>sign up</span>
              </Dialog.Description>
            )}
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default Modal;
