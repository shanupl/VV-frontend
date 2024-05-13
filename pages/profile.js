import { useState, useEffect } from "react";
import styles from "../styles/home.module.css";
import BottomNav from "../components/bottom-nav";
import DesktopLeftNav from "../components/left-navbar";
import Profile from "../components/profile";
import MyChats from "../components/mychats";
import Following from "../components/following";
import getChannelByName from "../api/viewProfile";

const ProfilePage = () => {
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
      {deviceType === "mobile" ? (
        <div>
          <Profile device="mobile" />
          <BottomNav activePage="home" />
        </div>
      ) : (
        <div className={styles.desktopContainer}>
          <div className={styles.parentContainer}>
            <div className={styles.leftNavbar}>
              <DesktopLeftNav activePage="profile" />
            </div>
            <div className={styles.homeSection}>
              <Profile device="desktop" />
            </div>
            <div className={styles.section3}>
              <div className={styles.homeContent}>
                <MyChats device="desktop" />
                <Following device="desktop" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
