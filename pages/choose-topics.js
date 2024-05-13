import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import styles from "../styles/choose-topics.module.css";
import logo from "../public/images/brownlogo.svg";
import Image from "next/image";
import desktopLogo from "../public/images/desktop-logo.svg";
import globalStyles from "../styles/global.module.css";
import chooseTopicsApi from "../api/chooseTopics";

const Welcome = () => {
  const router = useRouter();
  const [choices, setchoices] = useState([]);
  useEffect(() => {
    const fetchChooseTopicData = async () => {
      try {
        const data = await chooseTopicsApi();
        setchoices(data);
      } catch (error) {
        console.error("Error fetching choose topic data:", error);
      }
    };
  
    fetchChooseTopicData();
  }, []);
 
  const [selectedChoices, setSelectedChoices] = useState([]);

  const toggleChoice = (item) => {
    if (selectedChoices.includes(item)) {
      setSelectedChoices(selectedChoices.filter((choice) => choice !== item));
    } else {
      setSelectedChoices([...selectedChoices, item]);
    }
  };

  const isChoiceSelected = (item) => selectedChoices.includes(item);
  const handleEnterClick = () => {
    if (selectedChoices.length >= 1) {
      const queryString = selectedChoices.map(choice => `topic=${choice}`).join('&');
      router.push(`/home?${queryString}`);
    }
  };

  return (
    <>
      <div className={`${globalStyles.onlyDesktop} ${globalStyles.topBarDesktop}`}>
        <Image
            src={desktopLogo}
            alt="desktopLogo"
            className={globalStyles.logo}
          />
      </div>


      <div className={styles.container}>
        <div className={`${styles.heading} ${globalStyles.onlyMobileBlock}`} >
          <span className={styles.boardingHead}>
            <Image src={desktopLogo} alt="logo"  style={{marginTop:30, width:160}}/>
          </span>
        </div>

        <div className={styles.welcomeHeading}>
          <span>Welcome</span>
        </div>

        <div className={styles.choiceContainer}>
          {choices.map((item, index) => {
            return (
              <div
                key={index}
                className={`${styles.OuterBox} ${
                  isChoiceSelected(item.genreName) ? styles.active : ""
                }`}
                onClick={() => toggleChoice(item.genreName)}
              >
                <p className={styles.itemStyle}>{item.genreName}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.btnContainer}>
          <button
            className={`${styles.btn} ${
              selectedChoices.length >= 1 ? styles.active : ""
            }`}
            onClick={handleEnterClick}
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
