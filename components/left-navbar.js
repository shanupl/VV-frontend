import Link from "next/link";
import styles from "../styles/left-nav.module.css";
import Image from "next/image";
import homeactive from "../public/images/homeactive.svg";
import home from "../public/images/home1.svg";
import search from "../public/images/search1.svg";
import searchactive from "../public/images/searchactive.svg";
import bookmark from "../public/images/bookmark1.svg";
import bookmarkactive from "../public/images/bookmarkactive.svg";
import profile from "../public/images/avtar.svg";
import plusCircle from "../public/images/plus_circle.svg";
import profileactive from "../public/images/avtar-active.svg";
import { FaCirclePlus } from "react-icons/fa6";

const DesktopLeftNav = ({ activePage }) => {
  return (
    <div className={styles.container}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <Link href="/home" className={styles.icon}>
          {activePage === "home" ? (
            <Image src={homeactive} alt="homeimage" style={{width:30, height:30}}/>
          ) : (
            <Image src={home} alt="homeimage" style={{width:30, height:30}}/>
          )}
          <span
            className={activePage === "home" ? styles.active : styles.nonactive}
          >
            Home
          </span>
        </Link>
        <Link href="/explore" className={styles.icon} style={{marginTop:10}}>
          {activePage === "explore" ? (
            <Image src={searchactive} alt="searchimage" style={{width:30, height:30}}/>
          ) : (
            <Image src={search} alt="searchimage" style={{width:30, height:30}}/>
          )}
          <span
            className={
              activePage === "explore" ? styles.active : styles.nonactive
            }
          >
            Explore
          </span>
        </Link>
        <Link href="/bookmarks" className={styles.icon} style={{marginTop:10}}>
          {activePage === "bookmark" ? (
            <Image src={bookmarkactive} alt="bookmarkimage" style={{width:30, height:30}}/>
          ) : (
            <Image src={bookmark} alt="bookmarkimage" style={{width:30, height:30}}/>
          )}
          <span
            className={
              activePage === "bookmark" ? styles.active : styles.nonactive
            }
          >
            My Lists
          </span>
        </Link>
        <Link href="/publish" className={styles.icon} style={{marginTop:10}}>
            <Image src={plusCircle} alt="pluscircle" style={{width:30, height:30}}/>
          
          <span
            className={
              activePage === "publish" ? styles.active : styles.nonactive
            }
          >
            Publish
          </span>
        </Link>
        <Link href="/profile" className={styles.icon} style={{marginTop:10}}>
          {activePage === "profile" ? (
            <Image src={profileactive} alt="profileimage" style={{width:30, height:30}}/>
          ) : (
            <Image src={profile} alt="profileimage" style={{width:30, height:30}}/>
          )}
          <span
            className={
              activePage === "profile" ? styles.active : styles.nonactive
            }
          >
            Profile
          </span>
        </Link>
      </div>
    </div>
  );
};

export default DesktopLeftNav;
