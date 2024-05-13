import Link from "next/link";
import styles from "../styles/bottom-nav.module.css";
import Image from "next/image";
import homeactive from "../public/images/homeactive.svg";
import home from "../public/images/home.svg";
import search from "../public/images/search1.svg";
import searchactive from "../public/images/searchactive.svg";
import bookmark from "../public/images/bookmark.svg";
import bookmarkactive from "../public/images/bookmarkactive.svg";
import publish from "../public/images/+.svg";
import profile from "../public/images/avtar.svg";
import profileactive from "../public/images/profileactive.svg";
import { FaCirclePlus } from "react-icons/fa6";

const BottomNav = ({ activePage }) => {
  return (
    <div className={styles.container}>
      <div className={styles.bottomNavbar}>
        <Link href="/home" className={styles.icon}>
          {activePage === "home" ? (
            <Image src={homeactive} alt="homeimage" />
          ) : (
            <Image src={home} alt="homeimage" />
          )}
          <span
            className={activePage === "home" ? styles.active : styles.nonactive}
          >
            Home
          </span>
        </Link>
        <Link href="/explore" className={styles.icon}>
          {activePage === "explore" ? (
            <Image src={searchactive} alt="searchimage" />
          ) : (
            <Image src={search} alt="searchimage" />
          )}
          <span
            className={
              activePage === "explore" ? styles.active : styles.nonactive
            }
          >
            Explore
          </span>
        </Link>
        <Link href="/bookmarks" className={styles.icon}>
          {activePage === "bookmark" ? (
            <Image src={bookmarkactive} alt="bookmarkimage" />
          ) : (
            <Image src={bookmark} alt="bookmarkimage" />
          )}
          <span
            className={
              activePage === "bookmark" ? styles.active : styles.nonactive
            }
          >
            Bookmarks
          </span>
        </Link>
        <Link href="/publish" className={styles.icon}>
          <div className={styles.plusIcon}>
            <FaCirclePlus />
          </div>
          <span
            className={
              activePage === "publish" ? styles.active : styles.nonactive
            }
          >
            Publish
          </span>
        </Link>
        <Link href="/profile" className={styles.icon}>
          {activePage === "profile" ? (
            <Image src={profileactive} alt="profileimage" />
          ) : (
            <Image src={profile} alt="profileimage" />
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

export default BottomNav;
