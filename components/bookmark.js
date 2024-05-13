import { useState, useEffect } from "react";
import styles from "../styles/home.module.css";
import bookmarkStyle from "../styles/bookmark.module.css";
import Image from "next/image";
import logo from "../public/images/logo.svg";
import community from "../public/images/community.svg";
import menuicon from "../public/images/menu.svg";
import bookmark from "../public/images/outlinebookmark.svg";
import filledbookmark from "../public/images/filledbookmark.svg";
import doublechat from "../public/images/doublechat.svg";
import profilesData from "../profileData.json";
import searchicon from "../public/images/search.svg";
import getAllBookmarkApi from "../api/getAllBookmark";

const Bookmark = ({ device }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);
  const [showShareBox, setShowShareBox] = useState(false);
  const [bookmarkData, setBookmarkData] = useState([]);
  const [bookmarkStates, setBookmarkStates] = useState(
    Array(profilesData.length).fill(false)
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllBookmarks();
  }, []);

  const getAllBookmarks = async () => {
    try {
      const response = await getAllBookmarkApi();
      const bookmarks = response.data;

      if(bookmarkData){
        setBookmarkData(bookmarks);
      }
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  const handleBookmarkClick = (index) => {
    const newBookmarkStates = [...bookmarkStates];
    newBookmarkStates[index] = !newBookmarkStates[index];
    setBookmarkStates(newBookmarkStates);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleMenuIconClick = (index) => {
    setSelectedMenuIndex(index);
    setShowShareBox(!showShareBox);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showShareBox && !event.target.closest(`.${styles.shareContainer}`)) {
        setShowShareBox(false);
        setSelectedMenuIndex(null);
      }

      if (isMenuOpen && !event.target.closest(`.${styles.shareContainer}`)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showShareBox, isMenuOpen]);

  const filteredBookmarkData = bookmarkData.filter((item) =>
    item.postId.channelId.channelName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span
            className={`${styles.boardingHead} ${bookmarkStyle.boardingHead}`}
          >
            <Image src={logo} alt="logo" />
            &nbsp;Bookmarks
          </span>
          <div className={styles.totalCountingDiv}>
            <Image
              src={community}
              alt="community"
              className={styles.userIcon}
            />
            <span className={styles.count}>23</span>
          </div>
        </div>

        <div style={{width: "100%", height: 2, backgroundColor: '#707070', opacity: 0.1,}}></div>

        <div className={bookmarkStyle.searchBar} style={{marginTop:4}}>
          <form style={{width:'90%'}}>
            <div className={bookmarkStyle.inputGroup}>
              <input
                type="search"
                style={{ width: "100%" }}
                className={bookmarkStyle.searchInput}
                placeholder="NFT"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className={bookmarkStyle.searchIconPosition}>
                <Image src={searchicon} alt="searchicon" />
              </span>
            </div>
          </form>
          <span className={`${styles.icons} ${styles.shareContainer}`}>
            <Image
              src={menuicon}
              alt="menuicon"
              onClick={toggleMenu}
              style={{ cursor: "pointer" }}
              className={bookmarkStyle.menuIcon}
            />
            {isMenuOpen && (
              <div className={bookmarkStyle.popupContainer}>
                <div className={bookmarkStyle.popup}>
                  <div className={bookmarkStyle.popupStyle}>A-Z</div>
                  <hr />
                  <div className={bookmarkStyle.popupStyle}>LATEST</div>
                  <hr />
                  <div className={bookmarkStyle.popupStyle}>GENRE</div>
                </div>
              </div>
            )}
          </span>
        </div>

        <div style={{width: "100%", height: 2, backgroundColor: '#707070', opacity: 0.1, marginTop:3}}></div>

        <div>
          {filteredBookmarkData.map((item, index) => {
            return (
              <div key={item.id} className={styles.profileDetails}>
                <div className={styles.profileContent}>
                  <div className={styles.alignCenter}>
                    <img
                      src={item.postId.mainImageURL}
                      alt={"name"}
                      className={styles.smallImg}
                    />
                    &nbsp;
                    <p className={styles.profileName}>
                      {item.postId.channelId.channelName}
                      </p>
                  </div>
                  <div
                    className={`${styles.alignCenter} ${styles.shareContainer}`}
                  >
                    <Image
                      src={menuicon}
                      alt="menuicon"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleMenuIconClick(index)}
                    />
                    {showShareBox && selectedMenuIndex === index && (
                      <div className={styles.shareBox}>
                        <p>SHARE</p>
                      </div>
                    )}
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    <Image
                      src={bookmarkStates[index] ? filledbookmark : bookmark}
                      alt="bookmark"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleBookmarkClick(index)}
                    />
                    &nbsp;
                  </div>
                </div>
                <div className={styles.aboutProfile}>
                  <img
                    src={item.postId.mainImageURL}
                    alt={"postImage"}
                    className={styles.imgStyle}
                  />
                </div>
                <div>
                  <div className={styles.miniContent}>
                    <p className={styles.proInfo}>
                      {/* Opinion – Blockchain • Aug 23 • 8 min read */}
                      {item.postId.channelId.location}
                      <span className={styles.chatIcons}>
                        <Image src={doublechat} alt="doublechat" />
                      </span>
                      <span className={styles.numStyle}>127</span>
                    </p>
                  </div>
                  <h3 className={styles.profileHeading}>{item.postId.header}</h3>
                  <p className={styles.paraStyle}>{item.postId.bodyRichText}</p>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 2,
                    backgroundColor: "#707070",
                    opacity: 0.1,
                    marginTop: 7,
                  }}
                ></div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#707070",
            opacity: 0.1,
            marginTop: 7,
          }}
        ></div>
      </div>
    </>
  );
};

export default Bookmark;
