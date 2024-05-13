import { useState, useEffect } from "react";
import styles from "../styles/home.module.css";
import globalStyles from "../styles/global.module.css";
import channelStyles from "../styles/channel.module.css";
import Image from "next/image";
import Link from "next/link";
import channelImg from "../public/images/img1.png";
import channelImg3 from "../public/images/img3.png";
import chaticon from "../public/images/squarechat.svg";
import bookmark from "../public/images/outlinebookmark.svg";
import filledbookmark from "../public/images/filledbookmark.svg";
import menuicon from "../public/images/menu.svg";
import backarrow from "../public/images/backwardarrow.svg";
import doublechat from "../public/images/doublechat.svg";
import book from "../public/images/book.svg";
import profilesData from "../profileData.json";
import getProfileApi from "../api/getProfile";
import anantaraChannel from "../public/images/anantara-channel.png";
import journeysChannel from "../public/images/journeys-channel.png";
import getAllPostByChannelId from "../api/getAllPostByChannelId";
import followChannelApi from "../api/follow";
import { useRouter } from 'next/router';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setFips } from "crypto";

const Channel = ({ device }) => {
  const router = useRouter();
  const { channelId } = router.query;
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);
  const [showShareBox, setShowShareBox] = useState(false);
  const [bookmarkStates, setBookmarkStates] = useState(
    Array(profilesData.length).fill(false)
  );
  const [channelDetail, setChannelDetail] = useState([]);
  const [posts, setPosts] = useState([])
  const [follow, setfollow] = useState("");
  const totalPosts = posts.length;
  console.log(follow, "follow ///////");
 
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

  useEffect(() => {
    const channelData = async () => {
        if (channelId) {
            try {
              const response = await getProfileApi({ channelId });
              if (response && response.data) {
                setChannelDetail(response.data);
              }
            } catch (error) {
                console.error('Error fetching channel data:', error);
            }
        }
    };
    channelData();
}, [channelId]);

useEffect(() => {
  const allPost = async () => {
      if (channelId) {
          try {
            const response = await getAllPostByChannelId({ channelId });
            if (response && response.data) {
              setPosts(response.data);
            }
          } catch (error) {
              console.error('Error fetching channel data:', error);
          }
      }
  };
  allPost();
}, [channelId]);

  const handleMenuIconClick = (index) => {
    setShowShareBox(!showShareBox);
    setSelectedMenuIndex(index);
  };

  const handleChannelFollow = async () => { 
    try {
      const response = await followChannelApi( {channelId} );

      if (response.status == 201) {
        setfollow(response.data.status);
        toast.success(response.message);
      }

      if(response.status == 400) {
        setfollow(response.data.status);
        toast.error(response.message)
      }
    } catch (error) {
        console.error('Error fetching channel data:', error);
    }
  } 

  const handleBookmarkClick = (index) => {
    const newBookmarkStates = [...bookmarkStates];
    newBookmarkStates[index] = !newBookmarkStates[index];
    setBookmarkStates(newBookmarkStates);
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <>
      <div className={channelStyles.container}>
        <div className={channelStyles.heading}>
          <Link className={globalStyles.link} href="#" onClick={handleBackClick}>
          <Image
            src={backarrow}
            alt="backarrow"
            className={channelStyles.backarrow}
          />
          </Link>

          <Image
            src={channelDetail.channelIconImageUrl}
            alt="channelImg"
            className={channelStyles.img}
            width="30px"
            height="30px"
          />
          <span
            
            className={`${styles.boardingHead} ${channelStyles.boardingHead}`}
          >
            &nbsp;
            {channelDetail.channelName}
          </span>
        </div>

         <div style={{width: "100%", height: 2, backgroundColor: '#707070', opacity: 0.1, marginTop:0, marginBottom:0}}></div>
      </div>

      <div className={channelStyles.container}>
        <div className={styles.homeNav}>
          <ul className={styles.navbar}>
            <li className={styles.listStyle}>
              <Link
                href="/channel"
                className={`${styles.linkStyle} ${styles.active}`}
              >
                Latest
              </Link>
            </li>
            <li className={styles.listStyle}>
              <Link href="#" className={styles.linkStyle}>
                Style
              </Link>
            </li>
            <li className={styles.listStyle}>
              <Link href="#" className={styles.linkStyle}>
                Explore
              </Link>
            </li>
            <li className={styles.listStyle}>
              <Link href="#" className={styles.linkStyle}>
                Inspire
              </Link>
            </li>
            <li className={styles.listStyle}>
              <Link href="#" className={styles.linkStyle}>
                Dine
              </Link>
            </li>
            <li className={styles.listStyle}>
              <Link href="#" className={styles.linkStyle}>
                Stay
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div style={{width: "100%", height: 2, backgroundColor: '#707070', opacity: 0.1, marginTop:0, marginBottom:0}}></div>

      <div        
        className={channelStyles.aboutChannel}
      >
        <div className={channelStyles.parentBox}>
          <div className={channelStyles.childBox}>
            <Image
              src={channelDetail.channelIconImageUrl}
              alt="channelimage"
              width="59px"
              height="59px"
            />
          </div>
          <div className={channelStyles.childBox}>
            <h3 className={channelStyles.childhHeading}>
            {channelDetail.profileTitle}</h3>
            <p className={channelStyles.childParagraph}>
            {channelDetail.profileHandle}</p>
            <p className={channelStyles.childDescription}>
              {channelDetail.about}
            </p>
            <p className={channelStyles.childEmail}>{channelDetail.email}</p>
          </div>
          <div className={channelStyles.childBox}>
            {follow ? <button className={channelStyles.followingBtn} onClick={handleChannelFollow}>Followimg</button> :  <button className={channelStyles.btn} onClick={handleChannelFollow}>Follow</button> 
            }
          </div>
        </div>
        <div className={channelStyles.parentBox}>
          <div className={channelStyles.contentBox_1}>
            <div className={channelStyles.messageBox}>
              <Image
                src={chaticon}
                alt="chaticon"
                className={channelStyles.chatImage}
                style={{ cursor: "pointer" }}
              />
              <p className={channelStyles.message}>Message</p>
            </div>
          </div>
          <div className={channelStyles.contentBox_2}>
            <div className={channelStyles.box}>
              <p className={channelStyles.numStyle}>{totalPosts}</p>
              <p className={channelStyles.contentStyle}>Posts</p>
            </div>
            <div className={channelStyles.box}>
              <p className={channelStyles.numStyle}>2</p>
              <p className={channelStyles.contentStyle}>Editions</p>
            </div>
            <div className={channelStyles.box}>
              <p className={channelStyles.numStyle}>114</p>
              <p className={channelStyles.contentStyle}>Following</p>
            </div>
            <div className={channelStyles.box}>
              <p className={channelStyles.numStyle}>2147</p>
              <p className={channelStyles.contentStyle}>Followers</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.userProfileContainer}>
          <div>
          {posts.map((post, index) => (
            <div key={index} className={styles.profileDetails}>
                <div style={{width: "100%", height: 2, backgroundColor: '#707070', opacity: 0.1, marginTop:0, marginBottom:-5}}></div>
                  <div className={styles.profileContent}>
                    <div className={styles.alignCenter}>
                      <img
                        src={channelDetail.channelIconImageUrl}
                        className={styles.smallImg}
                      />
                      &nbsp;
                      <p className={styles.profileName}>{channelDetail.channelName}</p>
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
                        src={bookmark}
                        alt="bookmark"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleBookmarkClick(index)}
                      />
                      &nbsp;
                    </div>
                  </div>

                  <div style={{width: "100%", height: 2, backgroundColor: '#707070', opacity: 0.1, marginTop:-10, marginBottom:5}}></div>

                  <div className={styles.aboutProfile} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                  <Image
                    src={channelDetail.channelIconImageUrl}
                    className={styles.imgStyle}
                    style={{ width: '50%', objectFit: 'contain' }}
                  />
                    <span className={channelStyles.editionText}>
                      {post.bodyRichText}
                      {/* See the world as Anantara does, through unique expressions of the world’s most captivating locales – dining under 
                      star-lit Arabian skies, heritage discoveries in Vietnam, saluting the sun in Mauritius, and more. We hope 
                      you enjoy our first edition. We’re glad you’ve joined us on the journey. */}
                      </span>
                  </div>
                  
                  <div>
                    <div className={styles.miniContent} style={{marginTop:6}}>
                      <p className={styles.proInfo}>
                        Travel • Aug 23 
                        <span className={styles.chatIcons}>
                          <Image
                            src={doublechat}
                            alt="doublechat"
                            style={{ cursor: "pointer" }}
                          />
                        </span>
                        <span className={styles.numStyle} style={{marginLeft:26}}>127</span>
                      </p>
                      <span className={styles.icons}>
                        <Image
                          src={book}
                          alt="book"
                          style={{ cursor: "pointer" }}
                        />
                      </span>
                    </div>
                  </div>
            </div>
          ))}

            {/* <div className={styles.profileDetails}>
                <div style={{width: "100%", height: 2, backgroundColor: '#707070', opacity: 0.1, marginTop:0, marginBottom:-5}}></div>
                  <div className={styles.profileContent}>
                  <div className={styles.alignCenter}>
                    <img
                      src={'https://plus.unsplash.com/premium_photo-1679314213957-909df10381ac?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                      className={styles.smallImg}
                    />
                    &nbsp;
                    <p className={styles.profileName}>Anantara Journeys, Edition 1</p>
                  </div>
                  <div className={`${styles.alignCenter} ${styles.shareContainer}`}>
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
                    src={bookmark}
                    alt="bookmark"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleBookmarkClick(index)}
                  />
                  &nbsp;
                </div>
              </div>

  <div style={{width: "100%", height: 2, backgroundColor: '#707070', opacity: 0.1, marginTop:-10, marginBottom:5}}></div>

  <div className={styles.aboutProfile} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
    <Image
      src={anantaraChannel}
      className={styles.imgStyle}
      style={{width:'50%', objectFit:'contain'}}
    />
    
    <span className={channelStyles.editionText}>
      See the world as Anantara does, through unique expressions of the world’s most captivating locales – dining under 
      star-lit Arabian skies, heritage discoveries in Vietnam, saluting the sun in Mauritius, and more. We hope 
      you enjoy our first edition. We’re glad you’ve joined us on the journey.</span>
  </div>
  
  <div>
    <div className={styles.miniContent} style={{marginTop:6}}>
      <p className={styles.proInfo}>
        Travel • Aug 23 
        <span className={styles.chatIcons}>
          <Image
            src={doublechat}
            alt="doublechat"
            style={{ cursor: "pointer" }}
          />
        </span>
        <span className={styles.numStyle} style={{marginLeft:26}}>127</span>
      </p>
      <span className={styles.icons}>
        <Image
          src={book}
          alt="book"
          style={{ cursor: "pointer" }}
        />
      </span>
    </div>
   
  </div>
  <div style={{width: "100%", height: 2, backgroundColor: '#707070', opacity: 0.1, marginTop:5, marginBottom:5}}></div>
            </div> */}
          </div>
        </div>
      </div> 
    </>
  );
};

export default Channel;
