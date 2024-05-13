import { useState, useEffect } from "react";
import styles from "../styles/home.module.css";
import globalStyles from "../styles/global.module.css";
import BottomNav from "../components/bottom-nav";
import DesktopLeftNav from "../components/left-navbar";
import Latest from "../components/latest";
import MyChats from "../components/mychats";
import Following from "../components/following";
import Reply from "../components/reply";

const ReplyPage = () => {

  const [deviceType, setDeviceType] = useState(() => {
    return typeof window !== "undefined" && window.innerWidth < 600
      ? "mobile"
      : "desktop";
  });

  useEffect(() => {
    const detectDeviceType = () => {
      const width = window.innerWidth;

      if (width < 600) {
        setDeviceType("mobile");
      } else {
        setDeviceType("desktop");
      }
    };
    const handleResize = () => {
      detectDeviceType();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
        <div className={globalStyles.onlyMobileBlock}>
          <Reply device="mobile" />
          <BottomNav activePage="home" />
        </div>
      
        <div className={`${styles.desktopContainer} ${globalStyles.onlyDesktopBlock}`}>
          <div className={styles.parentContainer}>
            <div className={styles.leftNavbar}>
              <DesktopLeftNav activePage="profile" />
            </div>
            <div className={styles.homeSection}>
              <Latest device="desktop" />
            </div>
            <div className={styles.section3}>
              <div className={styles.homeContent}>
                <Reply device="desktop" />
                <Following device="desktop" />
              </div>
            </div>
          </div>
        </div>
     
    </>
  );
};

export default ReplyPage;
