import { useState, useRef, useEffect } from "react";
import styles from "./Accordeon.module.sass";

const Accordeon = ({ description }: { description: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [textHeight, setTextHeight] = useState(87);
  const textRef = useRef<null | HTMLDivElement>(null);
  const textOpen = description.length < 150;

  useEffect(() => {
    setIsOpen(textOpen);
  }, [setIsOpen, textOpen]);

  useEffect(() => {
    if (isOpen && textRef !== null && textRef.current != null) {
      setTextHeight(textRef.current.clientHeight);
    } else {
      setTextHeight(87);
    }
  }, [isOpen, setTextHeight]);

  return (
    <div className={styles.accordeon}>
      <div
        className={styles.accordeon_text_container}
        style={{ maxHeight: `${textHeight}px` }}
      >
        <p className={styles.accordeon_text} ref={textRef}>
          {description}
        </p>
      </div>
      {!textOpen && (
        <div
          className={styles.accordeon_button_wrapper}
          onClick={() => setIsOpen(!isOpen)}
        >
          <button className={styles.accordeon_button}>
            READ {isOpen ? "LESS" : "MORE"}
          </button>
          <div
            className={
              isOpen
                ? styles.accordeon_button_arrow
                : styles.accordeon_button_arrow_open
            }
          >
            <img src="../assets/img/arrow_down.svg" alt="arrow" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordeon;
