import { useState, useEffect } from "react";
import styles from "../styles/home.module.css";
import BottomNav from "../components/bottom-nav";
import DesktopLeftNav from "../components/left-navbar";
import UpdateProfile from "../components/update-profile";
import MyChats from "../components/mychats";
import Following from "../components/following";
import { ToastContainer } from "react-toastify";


const UpdateProfilePage = () => {
  const [deviceType, setDeviceType] = useState(() => {
    return typeof window !== "undefined" && window.innerWidth < 600
      ? "mobile"
      : "desktop";
  });

  useEffect(() => {
    const detectDeviceType = () => {
      const width = typeof window !== "undefined" ? window.innerWidth : 0;

      if (width < 600) {
        setDeviceType("mobile");
      } else {
        setDeviceType("desktop");
      }
    };

    const handleResize = () => {
      detectDeviceType();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <>
      {deviceType === "mobile" ? (
        <div>
          <UpdateProfile device="mobile" />
          <BottomNav activePage="home" />
        </div>
      ) : (
        <div className={styles.desktopContainer}>
          <div className={styles.parentContainer}>
            <div className={styles.leftNavbar}>
              <DesktopLeftNav activePage="home" />
            </div>
            <div className={styles.homeSection}>
              <UpdateProfile device="desktop" />
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
      <ToastContainer />
    </>
  );
};

export default UpdateProfilePage;
