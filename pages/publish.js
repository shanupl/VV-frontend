import { useState, useEffect, useRef } from "react";
import styles from "../styles/upload.module.css";
import Image from "next/image";
import logo from "../public/images/logo.svg";
import cameraIcon from "../public/images/camera-icon.svg";
import roundedRect from "../public/images/rounded-rect.svg";
import gallary from "../public/images/gallary.svg";
import menuicon from "../public/images/menu.svg";
import BottomNav from "../components/bottom-nav";
import LeftSidebar from "../components/left-sidebar";
import PdfViewer from "../components/pdf-viewer";
import FormSection from "../components/post-form";
import styles1 from "../styles/publish-page.module.css";
import globalStyles from "../styles/global.module.css";
import desktopLogo from "../public/images/desktop-logo.svg";
import postApi from "../api/post";
import {ToastContainer,  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadPage = () => {
  const [deviceType, setDeviceType] = useState(() => {
    return typeof window !== "undefined" && window.innerWidth < 600
      ? "mobile"
      : "desktop";
  });

  const fileInputRef = useRef(null);

  const handleCameraIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];

    const imageUrl = URL.createObjectURL(selectedFile);
    setFormData((prevFormData) => ({
      ...prevFormData,
      mainImageURL: imageUrl,
    }));
  };

  const [selectedPdf, setSelectedPdf] = useState(null);
  const [formData, setFormData] = useState({
    section: "",
    subSection: "",
    header: "",
    standFirst: "",
    credits: "",
    bodyRichText: "",
    mainImageURL: "",
  });

  const [successMessage, setsuccessMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await postApi(formData);

    if (data.status === 201) {
      toast.success("Post created successfully");
      setTimeout(() => {
        window.location.replace("/home");
      }, 2000);
    } else if (data.status === 401) {
      toast.error(data.message);
    }else {
      toast.error("Something went wrong while creating the post");
      setTimeout(() => {
        window.location.replace("/publish");
      }, 2000);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePdfSelected = (pdfFile) => {
    setSelectedPdf(pdfFile);
  };

  useEffect(() => {
    const detectDeviceType = () => {
      const width = window.innerWidth;

      if (width < 600) {
        setDeviceType("mobile");
      } else {
        setDeviceType("desktop");
      }
    };
    const handleResize = () => {
      detectDeviceType();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className={`${styles.container} ${globalStyles.onlyMobileBlock}`}>
        <form onSubmit={handleSubmit}>
          <div className={styles.headingTop}>
            <p>MAIN IMAGE</p>
            <p>UPLOAD IMAGE</p>
          </div>

          <div className={styles.cameraIcon} onClick={handleCameraIconClick}>
            <Image src={cameraIcon} alt="cameraicon" style={{ width: 50 }} />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />

          <div className={styles.heading}>
            <div>
              <p>SECTION</p>
              <input
                type="text"
                name="section"
                placeholder="Latest"
                className="publishInput"
                onChange={handleChange}
              />
            </div>
            <div>
              <p>SUBSECTION(OPTIONAL)</p>
              <input
                type="text"
                name="subSection"
                placeholder="NTFs"
                onChange={handleChange}
              />
            </div>
          </div>

          <p className={styles.headStyle}>HEADER</p>
          <textarea
            className={styles.textarea1}
            type="text"
            name="header"
            placeholder="BoredApeYatchClub v2 Launch Sell Out in Under Two Hours"
            onChange={handleChange}
          />
          <p className={styles.headStyle}>STAND-FIRST</p>
          <textarea
            className={styles.textarea2}
            type="text"
            name="standFirst"
            placeholder="Bored Ape Yacht Club became internet rock stars by 
                making NFTs of grungy simians that aren’t just viral images — they’re tickets to a whole new lifestyle"
            onChange={handleChange}
          />
          <p className={styles.headStyle}>CREDITS</p>
          <textarea
            className={styles.textarea3}
            type="text"
            name="credits"
            placeholder="Suzy Tan & Hadaway Smythe"
            onChange={handleChange}
          />
          <div className={styles.editFeature}>
            <p className={styles.pt}>π B I U $ TT tt Tt T¹ T1</p>
            <p className={`${styles.pt} ${styles.display}`}>
              <Image src={gallary} alt="gallaryicon" className={styles.img} />
              &nbsp;&nbsp;
              <Image src={menuicon} alt="menuicon" />
            </p>
          </div>
          <p className={styles.headStyle}>BODY COPY</p>
          <textarea
            className={styles.textarea4}
            type="text"
            name="bodyRichText"
            placeholder="Body Copy"
            onChange={handleChange}
          >
            The phenomenal nature of it all has to do with the recent
            appearance, all over the internet, of images of grungy apes with
            unimpressed expressions on their faces and human clothes on their
            sometimes-multicolored, sometimes-metal bodies. Most of the apes
            look like characters one might see in a comic about hipsters in
            Williamsburg — some are smoking and some have pizza hanging from
            their lips, while others don leather jackets, beanies, and grills.
            He&apos;s also the only one in the group that wasn&apos;t working a
            normal nine-to-five before the sudden tsunami of their current
            successes — and that&apos;s because he&apos;s never had a “real job.
            Not bad for a high school dropout,” he says through a smirk.
            Although Goner and his comrades&apos; aesthetic and rapport mirror
            that of a musical act freshly thrust into stardom, they&apos;re
            actually the creators of Yuga Labs, a Web3 company.
          </textarea>

          {successMessage ? (
            <div
              style={{
                color: "red",
                fontFamily: `sans-serif`,
                fontSize: "14px",
              }}
            >
              {successMessage}
            </div>
          ) : (
            ""
          )}

          <button
            className={styles.btn}
            style={{ marginBottom: 100 }}
            type="submit"
          >
            Save & Preview
          </button>
        </form>
        <BottomNav activePage="publish" />
      </div>

        <div className={styles1.container}>

        <div className={`${globalStyles.onlyDesktop} ${globalStyles.topBarDesktop}`}>
            <Image
                src={desktopLogo}
                alt="desktopLogo"
                className={globalStyles.logo}
                
            />

            <span style={{fontSize:28, fontFamily:'SF-SemiBold', marginTop:0, marginLeft:100}}>Home Beautiful</span>
       </div>

        <div className={styles1.mainContent}>
          <LeftSidebar onPdfSelected={handlePdfSelected} />
          {selectedPdf ? (
            <PdfViewer pdfFile={selectedPdf} />
          ) : (
            <PdfViewer pdfFile={selectedPdf} />
          )}
          <FormSection />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UploadPage;