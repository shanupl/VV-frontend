import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import styles from "../styles/home.module.css";
import globalStyles from "../styles/global.module.css";
import BottomNav from "../components/bottom-nav";
import DesktopLeftNav from "../components/left-navbar";
import Latest from "../components/latest";
import MyChats from "../components/mychats";
import Following from "../components/following";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const router = useRouter();
  const selectedTopics = router.query.topic ? (Array.isArray(router.query.topic) ? router.query.topic : [router.query.topic]) : [];
  const [deviceType, setDeviceType] = useState(() => {
    return typeof window !== "undefined" && window.innerWidth < 600
      ? "mobile"
      : "desktop";
  });

  useEffect(() => {
    localStorage.setItem("selectedTopics", JSON.stringify(selectedTopics));
  }, [selectedTopics]);

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
      <Latest device="mobile"/>
      <BottomNav activePage="home" />
      </div>

      <div
        className={`${styles.desktopContainer} ${globalStyles.onlyDesktopBlock}`}
      >
        <div className={styles.parentContainer}>
          <div className={styles.leftNavbar}>
            <DesktopLeftNav activePage="home" />
          </div>
          <div className={styles.homeSection}>
          <Latest device="desktop"/>
          </div>
          <div className={styles.section3}>
            <div className={styles.homeContent}>
              <MyChats device="desktop" />
              <Following device="desktop" />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
