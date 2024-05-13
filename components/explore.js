import { useState, useEffect } from "react";
import styles from "../styles/home.module.css";
import exploreStyle from "../styles/explore.module.css";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/logo.svg";
import menuicon from "../public/images/menu.svg";
import bookmark from "../public/images/outlinebookmark.svg";
import filledbookmark from "../public/images/filledbookmark.svg";
import book from "../public/images/book.svg";
import doublechat from "../public/images/doublechat.svg";
import searchicon from "../public/images/search.svg";
import profilesData from "../profileData.json";
import filterPostApi from "../api/filterPostByTopics"

const Explore = ({ device }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [bookmarkStates, setBookmarkStates] = useState(
    Array(profilesData.length).fill(false)
  );
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExploreData = filteredPosts.filter((item) =>
    item.channelData.data.channelName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSelectedTopics = localStorage.getItem("selectedTopics");
      if (storedSelectedTopics) {
        const parsedSelectedTopics = JSON.parse(storedSelectedTopics);
        setSelectedTopics(parsedSelectedTopics);
      }
    }
  }, []);

  useEffect(() => {
    const filterPosts = async (selectedTopics) => {
      try {
        if (selectedTopics && selectedTopics.length > 0) {
          const filteredPostsResponse = await filterPostApi(selectedTopics);
          setFilteredPosts(filteredPostsResponse);
        }
      } catch (error) {
        console.error('Error filtering posts:', error);
      }
    };
    
    filterPosts(selectedTopics);
  }, [selectedTopics]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleBookmarkClick = (index) => {
    const newBookmarkStates = [...bookmarkStates];
    newBookmarkStates[index] = !newBookmarkStates[index];
    setBookmarkStates(newBookmarkStates);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(`.${styles.shareContainer}`)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.heading} ${exploreStyle.heading}`}>
          <span className={`${styles.boardingHead} `}>
            <Image src={logo} alt="logo" />
            &nbsp;Explore
          </span>
        </div>

        <div style={{width: "100%", height: 1, backgroundColor: '#707070', opacity: 0.1}}></div>

        <div className={exploreStyle.searchBar} style={{marginTop:4}}>

          <form>
            <div className={exploreStyle.inputGroup}>
              <input
                type="search"
                style={device === "desktop" ? { width: "440px" } : null}
                className={exploreStyle.searchInput}
                placeholder="NFT"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className={exploreStyle.searchIconPosition}>
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
              className={exploreStyle.menuIcon}
            /> 
            {isMenuOpen && (
              <div className={exploreStyle.popupContainer}>
                <div className={exploreStyle.popup}>
                  <div className={exploreStyle.popupStyle}>ARTICLES</div>
                  <div style={{width: "100%", height: 1, backgroundColor: '#707070', opacity: 0.1, marginTop:10, marginBottom:10}}></div>
                  <div className={exploreStyle.popupStyle}>USERS</div>
                  <div style={{width: "100%", height: 1, backgroundColor: '#707070', opacity: 0.1, marginTop:10, marginBottom:10}}></div>
                  <div className={exploreStyle.popupStyle}>
                    <span className={exploreStyle.chatIcons}>
                      <Image
                        src={doublechat}
                        alt="doublechat"
                        style={{ cursor: "pointer" }}
                        className={exploreStyle.iconPos}
                      />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CHATS
                    </span>
                  </div>
                </div>
              </div>
            )}
          </span>
        </div>

        <div style={{width: "100%", height: 1, backgroundColor: '#707070', opacity: 0.1, marginTop:3}}></div>

        <div>
          {filteredExploreData.map((item, index) => {
            return (
              <div key={item.id} className={styles.profileDetails}>
                <div className={styles.profileContent}>
                  <div className={exploreStyle.alignCenter}>
                    <img
                      src={item.mainiImageUrl}
                      alt={"channelImage"}
                      className={styles.smallImg}
                    />
                    &nbsp;
                    <p className={styles.profileName}>{item.channelData.data.channelName}</p>
                  </div>
                  <div className={styles.alignCenter}>
                    <Image
                      src={bookmarkStates[index] ? filledbookmark : bookmark}
                      alt="bookmark"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleBookmarkClick(index)}
                    />
                  </div>
                </div>

                <div>
                  <div className={styles.miniContent}>
                    <p className={styles.proInfo}>
                      {item.channelData.data.location} • Aug 23 • 8 min read
                      <span className={styles.chatIcons}>
                        <Image
                          src={doublechat}
                          alt="doublechat"
                          style={{ cursor: "pointer" }}
                        />
                      </span>
                      <span className={styles.numStyle}>127</span>
                    </p>
                    <span className={styles.icons}>
                      <Image
                        src={book}
                        alt="book"
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                  </div>
                  <h3 className={styles.profileHeading}>{item.header}</h3>
                  <p className={styles.paraStyle}>{item.bodyRichText}</p>
                </div>
                <div
                  style={{
                    height: 1,
                    backgroundColor: "#70707019",
                    marginTop: 10,
                  }}
                />
              </div>
            );
          })}
        </div>
        <hr />
      </div>
    </>
  );
};

export default Explore;
