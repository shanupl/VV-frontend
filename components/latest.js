import { useState, useEffect } from "react";
import styles from "../styles/home.module.css";
import globalStyles from "../styles/global.module.css";
import { useRouter } from 'next/router';
import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/logo.svg";
import community from "../public/images/community-icon.svg";
import bookmark from "../public/images/outlinebookmark.svg";
import filledbookmark from "../public/images/filledbookmark.svg";
import menuicon from "../public/images/menu.svg";
import doublechat from "../public/images/doublechat.svg";
import book from "../public/images/book.svg";
import profilesData from "../profileData.json";
import divider from "../public/images/divider.svg";
import getAllPost from "../api/getAllPost";
import image1 from "../public/images/AnantaraSriLanka.png";
import image2 from "../public/images/aavegotchi.png";
import bookmarkApi from "../api/addBookmarks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import removeBookmarkApi from "../api/removebookmark";
import getAllChannelApi from "../api/getAllChannel";
import filterPostApi from "../api/filterPostByTopics";

const Latest = ({ device}) => {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);
  const [showShareBox, setShowShareBox] = useState(false);
  const [channels, setchannels] = useState([]);
  const [bookmarkStates, setBookmarkStates] = useState(
    []
  );
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);

  console.log(channels, "channels -------------------------")

  useEffect(() => {
   const fetchcChannelData = async () => {
      const channelData = await getAllChannelApi();
      setchannels(channelData);
   }
   fetchcChannelData();
  }, [])

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
  
  const handlePostClick = (postId) => {
    router.push(`/post-detail?postId=${postId}`);
  };

  useEffect(() => {
    getAllPost()
      .then((data) => {
        const modifiedData = data.map((post) => {
          if (post.mainImageURL.startsWith("blob:")) {  
            post.mainImageURL = post.mainImageURL.substring(5);
          }
          return post;
        });

        setPosts(modifiedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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

  const handleMenuIconClick = (index) => {
    setSelectedMenuIndex(index);
    setShowShareBox(!showShareBox);
  };

  const handleShareClick = (postId) => {
    const shareLink = `whatsapp://send?text=${encodeURIComponent(
      window.location.href
    )}%0A%0A${encodeURIComponent(postId)}`;
    window.open(shareLink);
  };

  const handleBookmarkClick = async (index) => {
    try {
      const response = await bookmarkApi(index);
      const newBookmarkStates = [...bookmarkStates];
      newBookmarkStates[index] = !newBookmarkStates[index];
      setBookmarkStates(newBookmarkStates);
      if (response.status === 409) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
      }
    } catch (error) {
      console.error("Error bookmarking post:", error);
    }
  };

  const handleRemoveBookmarkClick = async (index) => {
    try {
      const response = await removeBookmarkApi(index);
      const newBookmarkStates = [...bookmarkStates];
      newBookmarkStates[index] = !newBookmarkStates[index];
      setBookmarkStates(newBookmarkStates);
      if (response.status === 404) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
      }
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  const handleChannelClick = (channelId) => {
    router.push({
        pathname: '/channel', 
        query: { channelId: channelId }
    });
  };

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
            <span className={styles.boardingHead} style={{ marginLeft: 7 }}>
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

        <div
          style={{
            width: "100%",
            height: 1.5,
            backgroundColor: "#707070",
            opacity: 0.1,
          }}
        ></div>

        <div className={styles.homeNav} style={{ marginTop: 0 }}>
          <ul className={styles.navbar}>
            <li className={styles.listStyle}>
              <Link
                href="/home"
                className={`${styles.linkStyle} ${styles.active}`}
              >
                Latest
              </Link>
            </li>
            <li className={styles.listStyle}>
              <Link href="/recently-viewed" className={styles.linkStyle}>
                Recently viewed
              </Link>
            </li>
            {device === "mobile" ? (
              <li className={styles.listStyle}>
                <Link href="/following" className={styles.linkStyle}>
                  Following
                </Link>
              </li>
            ) : null}
          </ul>
        </div>

        <div
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#707070",
            opacity: 0.1,
            marginTop: -3,
          }}
        ></div>

        <div className={styles.userProfileContainer}>
          <div className={styles.userProfileRow}>
            {channels.map((item) => (
              <div
                key={item._id}
                className={`${styles.profile}`}
                onClick={() => handleChannelClick(item.channelData._id)}
              >
                <img
                  src={item.channelIconImageUrl}
                  alt={"channel image"}
                  width="45px"
                  height="45px"
                />
                {item.postCount !== 0 && (
                  <div className={styles.totalBadge}>
                    <span>{item.postCount}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {device === "mobile" && (
            <div
              style={{
                width: "100%",
                height: 2,
                backgroundColor: "#707070",
                opacity: 0.1,
                marginTop: 7,
              }}
            ></div>
          )}

          <div>
            {filteredPosts.map((item, index) => {
              return (
                <div key={item._id} className={styles.profileDetails}>
                   <div onClick={() => handlePostClick(item._id)}>
                  <div className={styles.profileContent}>
                    <div className={styles.alignCenter}>
                      <img
                        src={item.mainImageURL}
                        alt="image"
                        className={styles.smallImg}
                      />

                      <span
                        className={styles.profileName}
                        style={{ marginLeft: 5 }}
                      >
                        {/* {item.header} */}
                        {/* Channel Name */}
                        {item.channelData.data.channelName}
                      </span>
                    </div>

                    <div
                      className={`${styles.alignCenter} ${styles.shareContainer}`}
                    >
                      <Image
                        src={menuicon}
                        alt="menuicon"
                        style={
                          device === "mobile"
                            ? { cursor: "pointer", width: 20, height: 3 }
                            : { cursor: "pointer", width: 20, height: 3 }
                        }
                        onClick={() => handleMenuIconClick(index)}
                      />
                      {showShareBox && selectedMenuIndex === index && (
                        <div className={styles.shareBox}>
                          <p onClick={() => handleShareClick(item._id)}>
                            SHARE
                          </p>
                        </div>
                      )}

                      <Image
                        src={
                          bookmarkStates[item._id] ? filledbookmark : bookmark
                        }
                        alt="bookmark"
                        style={
                          device === "mobile"
                            ? {
                                cursor: "pointer",
                                width: 11,
                                height: 15,
                                marginLeft: 25,
                              }
                            : {
                                cursor: "pointer",
                                width: 11,
                                height: 15,
                                marginLeft: 25,
                              }
                        }
                        // onClick={() => handleBookmarkClick(item._id)}
                        onClick={() =>
                          bookmarkStates[item._id]
                            ? handleRemoveBookmarkClick(item._id)
                            : handleBookmarkClick(item._id)
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.aboutProfile}>
                    <img
                      src={item.mainImageURL}
                      alt="image"
                      className={styles.imgStyle}
                    />
                  </div>
                  <div>
                    <div
                      className={styles.miniContent}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p className={styles.proInfo}>
                        {item.location} • Aug 21 • 7 min read 122
                        <span className={styles.chatIcons}>
                          <Image
                            src={doublechat}
                            alt="doublechat"
                            style={
                              device === "mobile"
                                ? { cursor: "pointer", width: 17, height: 15 }
                                : {
                                    cursor: "pointer",
                                    width: 17,
                                    height: 15,
                                    marginLeft: 10,
                                  }
                            }
                          />
                        </span>
                        <span className={styles.numStyle}>127</span>
                      </p>
                      <span className={styles.icons}>
                        <Image
                          src={book}
                          alt="book"
                          style={
                            device === "mobile"
                              ? {
                                  cursor: "pointer",
                                  width: 16,
                                  height: 14,
                                  marginTop: -5,
                                }
                              : {
                                  cursor: "pointer",
                                  width: 16,
                                  height: 14,
                                  marginTop: -5,
                                }
                          }
                        />
                      </span>
                    </div>
                    <h3 className={styles.profileHeading}>{item.header}</h3>
                    <span className={styles.paraStyle}>
                      {item.bodyRichText}
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 2,
                      backgroundColor: "#707070",
                      opacity: 0.1,
                      marginTop: 12,
                    }}
                  ></div>
                </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Latest;
