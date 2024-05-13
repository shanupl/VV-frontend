import { useState, useEffect } from "react";
import styles from "../styles/home.module.css";
import followingStyle from "../styles/following.module.css";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/logo.svg";
import community from "../public/images/community.svg";
import menuicon from "../public/images/menu.svg";
import downarrow from "../public/images/downarrow.svg";
import uparrow from "../public/images/uparrow.svg";
import star from "../public/images/outlinestar.svg";
import filledstar from "../public/images/filledstar.svg";
import img from "../public/images/following.png";
import dummyData from "../dummyData.json";
import BottomNav from "../components/bottom-nav";

const FollowingMobileView = ({ device }) => {
  
  const [showShareBox, setShowShareBox] = useState(false);
  const [showData, setShowData] = useState(false);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);
  const [starState, setStarState] = useState(
    Array(dummyData.length).fill(false)
  );

  const handleMenuIconClick = (index) => {
    setShowShareBox(!showShareBox);
    setSelectedMenuIndex(index);
  };

  const handleStarClick = (index) => {
    const newStarStates = [...starState];
    newStarStates[index] = !newStarStates[index];
    setStarState(newStarStates);
  };

  const toggleShowData = () => {
    setShowData(!showData);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showShareBox && !event.target.closest(`.${styles.shareContainer}`)) {
        setShowShareBox(false);
        setSelectedMenuIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showShareBox]);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.heading}>
        <div className={styles.headContainer}>
            <Image
              src={logo}
              alt="logo"
              style={
                device === "mobile"
                  ? { width: 22, height: 18 }
                  : { width: 22, height: 18 }
              }
            />
            <span className={styles.boardingHead} style={{marginLeft:7}}>
            Home
           </span>
           </div>
          <div className={styles.totalCountingDiv}>
            <Image
              src={community}
              alt="community"
              className={styles.userIcon}
            />
            <span className={styles.count}>23</span>
          </div>
        </div>

        <div style={{width: "100%", height: 1.5, backgroundColor: '#707070', opacity: 0.1}}></div>

        <div className={styles.homeNav}>
          <ul className={styles.navbar}>
            <li className={styles.listStyle}>
              <Link href="/home" className={styles.linkStyle}>
                Latest
              </Link>
            </li>
            <li className={styles.listStyle}>
              <Link href="/recently-viewed" className={styles.linkStyle}>
                Recently Viewed
              </Link>
            </li>
            <li className={styles.listStyle}>
              <Link
                href="/following"
                className={`${styles.linkStyle} ${styles.active}`}
              >
                Following
              </Link>
            </li>
          </ul>
        </div>
        
        <div style={{width: "100%", height: 2, backgroundColor: '#707070', opacity: 0.1, marginTop:-3}}></div>

        <div className={followingStyle.channelBar}>
          <div className={followingStyle.channelName}>
            <Image src={img} alt="img" />
            <span>
              <p className={followingStyle.title}>Home Beautiful</p>
              <p className={followingStyle.subTitle}>Home & Decor</p>
            </span>
          </div>
          <Image
            src={menuicon}
            alt="menuicon"
            className={followingStyle.menuIconMain}
          />
        </div>

        {device === "mobile" &&
            <div style={{width: "100%", height: 2, backgroundColor: '#707070', opacity: 0.1, marginTop:15}}></div>
        }


        <div className={followingStyle.viewContent}>
          <span className={followingStyle.paraStyle}>VIEW BY</span>
          <Image
            src={showData ? uparrow : downarrow}
            alt="arrow"
            className={followingStyle.arrowIcon}
            onClick={toggleShowData}
          />
        </div>

        <div style={{width: "100%", height: 2, backgroundColor: '#707070', opacity: 0.1, marginTop:-2, marginBottom:6}}></div>

        <div>
          {!showData &&
            dummyData.map((item, index) => {
              return (
                <div key={item.id}>
                  <div className={followingStyle.content}>
                    <div className={followingStyle.displayFlex}>
                      <Image
                        src={starState[index] ? filledstar : star}
                        alt="star"
                        onClick={() => handleStarClick(index)}
                        className={followingStyle.starIcon}
                      />
                      <div className={followingStyle.positionRelative}>
                        <Image
                          src={img}
                          alt="img"
                          className={followingStyle.imageStyling}
                        />
                        {item.view && (
                          <p className={followingStyle.totalview}>7k+</p>
                        )}
                      </div>
                    </div>
                    <div className={followingStyle.displayFlex1}>
                      <div>
                        <span>
                          <p className={followingStyle.title}>{item.title}</p>
                          <p className={followingStyle.subTitle}>
                            {item.subTitle}
                          </p>
                        </span>
                      </div>
                      <div className={styles.shareContainer}>
                        <Image
                          src={menuicon}
                          alt="menuicon"
                          onClick={() => handleMenuIconClick(index)}
                          className={followingStyle.menuIcon}
                        />
                        {starState[index] === true &&
                          showShareBox &&
                          selectedMenuIndex === index && (
                            <div className={followingStyle.popupContainer}>
                              <div className={followingStyle.popup}>
                                <div className={followingStyle.popupStyle}>
                                  PINNED
                                </div>
                                <hr />
                                <div className={followingStyle.popupStyle}>
                                  BY GENRE
                                </div>
                                <hr />
                                <div className={followingStyle.popupStyle}>
                                  <div style={{ display: "flex" }}>
                                    A-Z
                                    <Image
                                      src={uparrow}
                                      alt="uparrow"
                                      className={followingStyle.arrowStyle}
                                    />
                                    <Image
                                      src={downarrow}
                                      alt="downarrow"
                                      className={followingStyle.arrowStyle1}
                                    />
                                  </div>
                                </div>
                                <hr />
                                <div className={followingStyle.popupStyle}>
                                  <div style={{ display: "flex" }}>
                                    RECENT
                                    <Image
                                      src={uparrow}
                                      alt="uparrow"
                                      className={followingStyle.arrowStyle}
                                    />
                                    <Image
                                      src={downarrow}
                                      alt="downarrow"
                                      className={followingStyle.arrowStyle1}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  <div style={{width: "100%", height: 1, backgroundColor: '#707070', opacity: 0.1, marginTop:4, marginBottom:4}}></div>

                </div>
              );
            })}
        </div>
        <BottomNav activePage="home" />
      </div>
    </>
  );
};

export default FollowingMobileView;
