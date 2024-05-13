import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import styles from "../styles/home.module.css";
import postDetailsStyles from "../styles/post-detail.module.css";
import Image from "next/image";
import Link from "next/link";
import brownlogo from "../public/images/brownlogo.svg";
import anantara from "../public/images/anantara.png";
import backarrow from "../public/images/backwardarrow.svg";
import community from "../public/images/community.svg";
import like from "../public/images/like.svg";
import unlike from "../public/images/unlike.svg";
import chat from "../public/images/chat.svg";
import setting from "../public/images/Cog.svg";
import share from "../public/images/bluetooth.svg";
import bookmark from "../public/images/outlinebookmark.svg";
import filledbookmark from "../public/images/filledbookmark.svg";
import menuicon from "../public/images/menu.svg";
import doublechat from "../public/images/doublechat.svg";
import book from "../public/images/book.svg";
import profilesData from "../profileData.json";
import dummyData from "../versoviewDummyData.json";
import getPostByIdApi from "../api/getPostById";
import getProfileApi from "../api/getProfile";
import bookmarkApi from "../api/addBookmarks";
import removeBookmarkApi from "../api/removebookmark";
import upvoteApi from "../api/upvote";
import downvoteApi from "../api/downvote";
import votingApi from "../api/voting";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostDetail = ({ device }) => {
  const router = useRouter();
  const { postId } = router.query;
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);
  const [showShareBox, setShowShareBox] = useState(false);
  const [bookmarkStates, setBookmarkStates] = useState(
    []
  );
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [downvoteCount, setDownvoteCount] = useState(0);
  const [dummyDataState, setDummyDataState] = useState(dummyData);
  const [post, setPost] = useState({});
  const [channelName, setchannelName] = useState("");
  const [channelImage, setchannelImage] = useState("");
  const channelId = post.channelId;
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (postId) {
          const postData = await getPostByIdApi({postId});
          setPost(postData);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        if (postId) {
          const postData = await getProfileApi({channelId});
          setchannelName(postData.data.channelName);
          setchannelImage(postData.data.url);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchChannel();
  }, [channelId]);

 
  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const voteData = await votingApi({ postId });

        let trueCount = 0;
        let falseCount = 0;

        voteData.data.forEach(vote => {
          if (vote.voteType === true) {
            trueCount++;
          } else if (vote.voteType === false) {
            falseCount++;
          }
        });

        setUpvoteCount(trueCount);
        setDownvoteCount(falseCount);
      } catch (error) {
        console.error('Error fetching votes:', error);
      }
    };
    fetchVotes();
  }, [postId]);

  const handleLikeClick = async (postId) => {
    await upvoteApi({postId});
    window.location.reload();
  };

  const handleDislikeClick = async (postId) => {
    await downvoteApi({postId});
    window.location.reload();
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

  const handleBackButtonClick = () => {
    router.push('/home');
  };

  return (
    <>
      <div className={styles.container}>
        <div
          style={{marginTop: -10 }}
          className={`${styles.heading} ${postDetailsStyles.heading}`}
        >
          <h1 className={styles.boardingHead} onClick={handleBackButtonClick}>
            <Image src={backarrow} alt="backarrow" style={{cursor: "pointer"}}/>
          </h1>
          <div className={postDetailsStyles.header}>
            <div className={postDetailsStyles.totalCountingDiv}>
              <Image
                src={community}
                alt="community"
                className={styles.userIcon}
                style={{marginTop:30}}
              />
              <span className={postDetailsStyles.count}>23</span>
            </div>

            <Image
              src={setting}
              alt="setting"
              className={postDetailsStyles.settingIcon}
            />
          </div>
        </div>

        <div style={{width: "100%", height: 2, backgroundColor: '#707070', opacity: 0.1, marginTop:7}}></div>

        <div>
          <div className={styles.userProfileContainer}>
            <div>
              <div className={styles.profileDetails}>
                <div className={styles.profileContent}>
                  <div className={styles.alignCenter}>
                    <Image
                      src={channelImage}
                      alt="brownlogo"
                      width="20px"
                      height="20px"
                      style={{width:20, height:20}}
                    />
                    <p className={styles.profileName} style={{marginLeft:10}}>{channelName}</p>
                  </div>
                  <div
                    className={`${styles.alignCenter} ${styles.shareContainer}`}
                  >
                    <Image
                      src={menuicon}
                      alt="menuicon"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleMenuIconClick()}
                    />
                    {showShareBox && (
                      <div className={styles.shareBox}>
                        <p>SHARE</p>
                      </div>
                    )}
                    &nbsp;&nbsp;
                    <Image
                      src={bookmarkStates[post._id] ? filledbookmark : bookmark}
                      alt="bookmark"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        bookmarkStates[post._id]
                          ? handleRemoveBookmarkClick(post._id)
                          : handleBookmarkClick(post._id)
                      }
                      className={postDetailsStyles.bookmarkIcon}
                    />
                    &nbsp;
                  </div>
                </div>
                <div className={styles.aboutProfile}>
                  <img
                    src={post.mainImageURL}
                    alt={"postImage"}
                    className={styles.imgStyle}
                  />
                </div>
                <div>
                  <div className={styles.miniContent}>
                    <p className={styles.proInfo}>
                      {dummyData[0].subHeading}
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
                  <div style={{width: "100%", height: 2, backgroundColor: '#707070', opacity: 0.1, marginTop:7, marginBottom:7}}></div>
                  <div className={postDetailsStyles.statusBox}>
                    <div className={postDetailsStyles.statusBoxChild}>
                      <div className={postDetailsStyles.statusSubBox}>
                        <Image
                          src={chat}
                          alt="chatimage"
                          style={{ cursor: "pointer" }}
                        />
                        <span className={postDetailsStyles.spanStyle1}>
                          {dummyData[0].totalChats}
                        </span>
                      </div>
                      <div className={postDetailsStyles.statusSubBox}>
                        <Image
                          src={like}
                          alt="upvoteimage"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleLikeClick(post._id)}
                        />
                        <span className={postDetailsStyles.spanStyle2}>
                          {upvoteCount}
                        </span>
                      </div>
                      <div className={postDetailsStyles.statusSubBox}>
                        <Image
                          src={unlike}
                          alt="downvoteimage"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDislikeClick(post._id)}
                        />
                        <span className={postDetailsStyles.spanStyle3}>
                          {downvoteCount}
                        </span>
                      </div>
                    </div>
                    <div className={postDetailsStyles.statusBoxChild}>
                      <Image
                        src={share}
                        alt="share"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                  <div style={{width: "100%", height: 2, backgroundColor: '#707070', opacity: 0.1, marginTop:7}}></div>
                  <p className={postDetailsStyles.smallPara}>
                    {post.credits}
                  </p>
                  <h3 className={postDetailsStyles.profileHeading}>
                    {post.section}
                  </h3>
                  <p className={styles.paraStyle}>{post.bodyRichText}</p>

                  <p className={styles.paraStyle}>{post.bodyRichText}</p>

                  <p className={styles.paraStyle}>{post.bodyRichText}</p>
                </div>
                <div
                  style={{
                    height: 1,
                    backgroundColor: "#70707019",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PostDetail;