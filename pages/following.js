import { useState, useEffect } from "react";
import styles from "../styles/home.module.css";
import globalStyles from "../styles/global.module.css";
import BottomNav from "../components/bottom-nav";
import DesktopLeftNav from "../components/left-navbar";
import Latest from "../components/latest";
import MyChats from "../components/mychats";
import Following from "../components/following";
import FollowingMobileView from "../components/followingMobileView";

const Following1 = () => {

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
          <FollowingMobileView device="mobile" />
          
        </div>
      
        <div className={`${styles.desktopContainer} ${globalStyles.onlyDesktopBlock}`}>
          <div className={styles.parentContainer}>
            <div className={styles.leftNavbar}>
              <DesktopLeftNav activePage="following" />
            </div>
            <div className={styles.homeSection}>
              <FollowingMobileView device="desktop" />
            </div>
            <div className={styles.section3}>
              <div className={styles.homeContent}>
                <MyChats device="desktop" />
                <Following device="desktop" />
              </div>
            </div>
          </div>
        </div>
     
    </>
  );
};

export default Following1;