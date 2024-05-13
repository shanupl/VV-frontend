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

const Following = ({ device }) => {
  
  const [showShareBox, setShowShareBox] = useState(true);
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
          <span
            style={{ marginTop: '25%', marginBottom: 10 }}
            className={styles.boardingHead1}
          >
            {device === "mobile" ? <Image src={logo} alt="logo" /> : null}
            Following
          </span>
          {device === "mobile" ? (
            <div className={styles.totalCountingDiv}>
              <Image
                src={community}
                alt="community"
                className={styles.userIcon}
              />
              <span className={styles.count}>23</span>
            </div>
          ) : null}
        </div>

        <div
          style={{
            border: "2px solid #70707019",
            height: "70%",
            padding: "0px 20px",
            overflowY: "auto",
          }}
        >
          <div className={styles.homeNav}>
            <ul className={styles.navbar}>
              {device === "mobile" ? (
                <>
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
                </>
              ) : null}
              <li className={styles.listStyle}>
                <Link href="/following" className={`${styles.linkStyle1}`} style={{fontSize:12, fontFamily:'SF-Bold', fontWeight:'bold'}}>
                  Following
                </Link>
              </li>
            </ul>
          </div>

          <div
            style={
              device === "mobile"
                ? {
                    height: 1,
                    backgroundColor: "#70707019",
                    marginTop: 0,
                    marginBottom: 10,
                  }
                : {
                    height: 1,
                    backgroundColor: "#70707019",
                    marginTop: -10,
                    marginBottom: 1,
                  }
            }
          />

          <div className={followingStyle.channelBar}>
            {device === "mobile" ? (
              <>
                {
                  <div className={followingStyle.channelName}>
                    <Image src={img} alt="img" />
                    <span>
                      <p className={followingStyle.title}>Home Beautiful</p>
                      <p className={followingStyle.subTitle}>Home & Decor</p>
                    </span>
                  </div>
                }
                <Image
                  src={menuicon}
                  alt="menuicon"
                  style={{ cursor: "pointer" }}
                  className={followingStyle.menuIconMain}
                />
              </>
            ) : null}
          </div>

          <div className={followingStyle.viewContent}>
            <span className={followingStyle.paraStyle} style={{fontSize:12, fontFamily:'SF-Bold'}}>VIEW BY</span>
            <Image
              src={showData ? uparrow : downarrow}
              alt="arrow"
              style={{ cursor: "pointer" }}
              className={followingStyle.arrowIcon}
            />
          </div>

          <div
            style={{
              height: 1,
              backgroundColor: "#70707019",
              marginTop: 0,
              marginBottom: 10,
            }}
          />

          <div>
            {!showData &&
              dummyData.map((item, index) => {
                return (
                  <div key={item.id}>
                    <div className={followingStyle.content}>
                      <div
                        style={{ marginRight: "12px" }}
                        className={followingStyle.displayFlex}
                      >
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
                            style={
                              device === "desktop" ? { left: "-17px" } : null
                            }
                            className={followingStyle.imageStyling}
                          />
                          {item.view && (
                            <p
                              style={
                                device === "desktop" ? { left: "1px" } : null
                              }
                              className={followingStyle.totalview}
                            >
                              7k+
                            </p>
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
                            style={{ cursor: "pointer" }}
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
                                        style={{ cursor: "pointer" }}
                                        className={followingStyle.arrowStyle}
                                      />
                                      <Image
                                        src={downarrow}
                                        alt="downarrow"
                                        style={{ cursor: "pointer" }}
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
                                        style={{ cursor: "pointer" }}
                                        className={followingStyle.arrowStyle}
                                      />
                                      <Image
                                        src={downarrow}
                                        alt="downarrow"
                                        style={{ cursor: "pointer" }}
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

                    <div
                      style={{
                        height: 1,
                        backgroundColor: "#70707019",
                        marginTop: 0,
                        marginBottom: 12,
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Following;
