import { useState } from "react";
import styles from "../styles/choose-topics.module.css";
import logo from "../public/images/brownlogo.svg";
import Image from "next/image";

const Welcome = () => {
  const choices = [
    "Art",
    "Design",
    "Hobbies",
    "At Home",
    "Entertainment",
    "Gaming",
    "Motoring",
    "Fitness",
    "Sport",
    "Outdoor",
    "LifeStyle",
    "Fashion",
    "Beauty",
    "General Interest",
    "News",
    "Science",
    "Nature",
    "Travel",
    "Business",
    "Finance",
    "Technology",
    "Other",
  ];

  const [selectedChoices, setSelectedChoices] = useState([]);

  const toggleChoice = (item) => {
    if (selectedChoices.includes(item)) {
      setSelectedChoices(selectedChoices.filter((choice) => choice !== item));
    } else {
      setSelectedChoices([...selectedChoices, item]);
    }
  };

  const isChoiceSelected = (item) => selectedChoices.includes(item);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1 className={styles.boardingHead}>
            <Image src={logo} alt="logo" />
            &nbsp;VersoView
          </h1>
        </div>

        <div className={styles.welcomeHeading}>
          <h1>Welcome</h1>
        </div>

        <div className={styles.choiceContainer}>
          {choices.map((item, index) => {
            return (
              <div
                key={index}
                className={`${styles.OuterBox} ${
                  isChoiceSelected(item) ? styles.selected : ""
                }`}
                onClick={() => toggleChoice(item)}
              >
                <p className={styles.itemStyle}>{item}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.btnContainer}>
          <button
            className={`${styles.btn} ${
              selectedChoices.length >= 1 ? styles.active : ""
            }`}
          >
            Enter
          </button>
        </div>

        <div className={styles.noteContainer}>
          <p className={styles.notePara}>
            Choose three or more topics which interest you
          </p>
        </div>
      </div>
    </>
  );
};

export default Welcome;
