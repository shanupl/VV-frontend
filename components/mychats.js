import { useState, useEffect } from "react";
import styles from "../styles/home.module.css";
import chatsStyle from "../styles/chats.module.css";
import mydmsStyle from "../styles/mydms.module.css";
import globalStyles from "../styles/global.module.css";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/logo.svg";
import search from "../public/images/search1.svg";
import rarible from "../public/images/rarible.png";
import community from "../public/images/community.svg";
import chatimg1 from "../public/images/chatimg1.svg";
import chatimg2 from "../public/images/chatimg2.svg";
import bookmark from "../public/images/outlinebookmark.svg";
import filledbookmark from "../public/images/filledbookmark.svg";
import menuicon from "../public/images/menu.svg";
import backarrow from "../public/images/backwardarrow.svg";
import BottomNav from "../components/bottom-nav";
import ChatData from "../chatData.json";
import dummyData from "../mydmsDummyData.json";
import { FaLeftLong } from "react-icons/fa6";
import { useRouter } from 'next/router';


const MyChats = ({ device }) => {

  const [showShareBox, setShowShareBox] = useState(false);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);
  const [bookmarkStates, setBookmarkStates] = useState(
    Array(ChatData.length).fill(false)
  );

  const [activeTab, setActiveTab] = useState('chats');
  const [chatScreenVisible, setChatScreenVisible] = useState(false);

  const router = useRouter();

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


  const handleBookmarkClick = (index) => {
    const newBookmarkStates = [...bookmarkStates];
    newBookmarkStates[index] = !newBookmarkStates[index];
    setBookmarkStates(newBookmarkStates);
  };

  const handleMenuIconClick = (index) => {
    setSelectedMenuIndex(index);
    setShowShareBox(!showShareBox);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };


  const goBack = () => {

      if(chatScreenVisible){
        setChatScreenVisible(false);
      }else{
        router.back();
      }
  }



  return (

    <>
      <div className={styles.container}>

        <div
          className={`${globalStyles.onlyDesktopFlex} ${globalStyles.searchOnDesktop}`}
        >
          <Image
            src={search}
            alt="searchIcon"
            style={{ width: 20, height: 20 }}
          />
          <span>
            <input
              type="text"
              placeholder="Search"
              className={chatsStyle.searchInput}
            />
          </span>
        </div>


        <div className={globalStyles.onlyDesktopFlex} style={{ width: "100%", height: 1.5, backgroundColor: '#707070', opacity: 0.1, marginTop: 6 }}></div>

        <div className={styles.heading}>
          <span
            className={styles.boardingHead1}
          >

            <Image className={globalStyles.onlyMobileFlex} src={logo} alt="logo" />

            <span className={globalStyles.onlyDesktopFlex} style={{ marginTop: -3 }}>My Chats</span>

            <span className={globalStyles.onlyMobileFlex} style={{ marginLeft: 10 }}>Chats</span>
          </span>

          <div className={`${styles.totalCountingDiv} ${globalStyles.onlyMobileFlex}`}>
            <Image
              src={community}
              alt="community"
              className={styles.userIcon}
            />
            <span className={styles.count}>23</span>
          </div>

        </div>

        <div className={globalStyles.onlyMobileFlex} style={{ width: "100%", height: 1.5, backgroundColor: '#707070', opacity: 0.1 }}></div>

        <div className={chatsStyle.boxContainer}>

          <div className={styles.homeNav}>
            <ul className={`${styles.navbar} ${chatsStyle.navbar}`}>


            {device == 'mobile' ?
              <Image
                src={backarrow}
                alt="backarrow"
                style={{ cursor: "pointer" }}
                className={`${chatsStyle.backarrow} ${globalStyles.onlyMobileFlex}`}
                onClick={goBack}
              />
              :
              <>       
              {chatScreenVisible &&        
                  <Image
                      src={backarrow}
                      alt="backarrow"
                      style={{ cursor: "pointer" }}
                      className={`${chatsStyle.backarrow} ${globalStyles.onlyDesktopFlex}`}
                      onClick={goBack}
                  />  
              }             
              
              </>
            }


              <li className={styles.listStyle}>
                <span
                  onClick={() => handleTabChange("chats")}
                  className={`${chatsStyle.linkStyle} ${activeTab === 'chats' ? chatsStyle.active : ''}`}
                >
                  My Chats
                </span>
              </li>
              <li className={styles.listStyle}>
                <span
                  onClick={() => handleTabChange("dms")}
                  className={`${chatsStyle.linkStyle} ${activeTab === 'dms' ? chatsStyle.active : ''}`}
                >
                  My DMs
                </span>
                <span className={chatsStyle.totalChat}>23</span>
              </li>
            </ul>
          </div>

          <div style={{ width: "100%", height: 2, backgroundColor: '#707070', opacity: 0.1 }}></div>


          {!chatScreenVisible ?
            <div style={{ marginTop: 15 }}>

              {activeTab === "chats"
                ? ChatData.map((item, index) => {
                  return (
                    <div key={item.id}>
                      <div

                        className={chatsStyle.chatConent}
                      >
                        <span className={chatsStyle.comment}>{item.heading}</span>
                      </div>
                      <div
                        className={chatsStyle.channelBar}
                      >
                        <div className={chatsStyle.channelName}>
                          <Image
                            src={chatimg2}
                            alt="chatimg2"
                            width="36px"
                            height="36px"
                          />
                          <span>
                            <p className={chatsStyle.title}>{item.title}</p>
                            <p
                              className={chatsStyle.subTitle}
                            >
                              Nov 8&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;02:53 pm
                            </p>
                          </span>
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
                            <div className={chatsStyle.shareBox}>
                              <p>SHARE</p>
                            </div>
                          )}
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <Image
                            src={
                              bookmarkStates[index] ? filledbookmark : bookmark
                            }
                            alt="bookmark"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleBookmarkClick(index)}
                          />
                        </div>
                      </div>
                      <div className={chatsStyle.chatBox}>
                        <div className={chatsStyle.chatline}></div>
                        <div className={chatsStyle.chatContent}>
                          <p className={chatsStyle.heading}>
                            {item.dummyHeading}
                          </p>
                          <p className={chatsStyle.description}>
                            {item.dummyDesc}
                          </p>
                        </div>
                        <div
                          className={chatsStyle.chatContentBox}
                        >
                          <p>{item.dummyPara}</p>
                        </div>
                      </div>
                      <div style={{ marginBottom: 15 }}>
                        {index === ChatData.length - 1 ? (
                          <div className={chatsStyle.alignItem}>
                            <p className={chatsStyle.viewstyle}>
                              View all comments
                            </p>
                            <a className={chatsStyle.reply}>Reply</a>
                          </div>
                        ) : (
                          <div className={chatsStyle.alignSingleItem}>
                            <a className={chatsStyle.reply}>Reply</a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
                : dummyData.map((item, index) => {
                  return (
                    <div key={item.id}>
                      <div className={mydmsStyle.outerContainer}>
                        <div className={chatsStyle.channelBar}>
                          <div className={chatsStyle.channelName}>
                            <Image
                              src={rarible}
                              alt="chatimg2"
                              className={mydmsStyle.img}
                            />
                            <span className={mydmsStyle.title}>{item.title}</span>
                          </div>
                        </div>
                      </div>
                      <div className={mydmsStyle.outerMessageBox}>
                        <div
                          className={mydmsStyle.messageBox}
                        >
                          <span className={mydmsStyle.textRegular}>{item.chat}</span>
                        </div>

                        <div className={mydmsStyle.messageTime}>
                          <span className={mydmsStyle.date}>Date&nbsp;&nbsp;|&nbsp;&nbsp;07:03 pm</span>

                          <a onClick={() => setChatScreenVisible(true)}
                            className={mydmsStyle.reply}
                          >
                            Reply
                          </a>

                        </div>
                      </div>
                    </div>
                  );
                })}





            </div>
            :


            <div style={{ marginTop: 15 }}>
              {ChatData.map((item, index) => {
                return (
                  <div key={item.id}>
                    <div className={chatsStyle.channelBar}>
                      <div className={chatsStyle.channelName}>
                        <Image
                          src={chatimg2}
                          alt="chatimg2"
                          width="36px"
                          height="36px"
                        />
                        <span>
                          <span className={chatsStyle.title}>{item.title}</span>
                          <p className={chatsStyle.subTitle}>Nov 8&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;2:53 pm</p>
                        </span>
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
                          <div className={chatsStyle.shareBox}>
                            <p>SHARE</p>
                          </div>
                        )}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Image
                          src={bookmarkStates[index] ? filledbookmark : bookmark}
                          alt="bookmark"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleBookmarkClick(index)}
                        />
                      </div>
                    </div>
                    <div className={chatsStyle.chatBox}>
                      <div
                        style={
                          device === "desktop"
                            ? { marginTop: "2px", width: "73%" }
                            : null
                        }
                        className={chatsStyle.chatSenderContentBox}
                      >
                        <p>{item.senderChat}</p>
                      </div>
                      <div style={{ marginTop: 10 }}>
                        <div className={mydmsStyle.messageTime}>
                          <span className={mydmsStyle.date}>
                            Date&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;7:03 pm
                          </span>
                        </div>
                      </div>
                      <div
                        style={
                          device === "desktop"
                            ? { marginTop: "2px", width: "73%" }
                            : null
                        }
                        className={chatsStyle.chatRecieverContentBox}
                      >
                        <p>{item.recieverChat}</p>
                      </div>
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <div className={mydmsStyle.messageTime}>
                        <span className={mydmsStyle.date}>
                          Date&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;7:03 pm
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          }
        </div>
      </div>
    </>

  );
};

export default MyChats;
