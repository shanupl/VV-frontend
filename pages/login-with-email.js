import { useState, useEffect } from "react";
import styles from "../styles/login-with-email.module.css";
import Image from "next/image";
import logo from "../public/images/logo.svg";
import Link from "next/link";
import privacy from "../public/images/privacy.svg";
import envelope from "../public/images/envelope.svg";
import back from "../public/images/backwardarrow.svg";
import group from "../public/images/group.svg";
import login from "../public/images/login.svg";
import loginApi from "../api/login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginWithEmail = () => {
  const [deviceType, setDeviceType] = useState(() => {
    return typeof window !== "undefined" && window.innerWidth < 600
      ? "mobile"
      : "desktop";
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [successMessage, setsuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await loginApi(formData);

    if (data.data && data.data.token) {
      toast.success(data.message);
      const token = data.data.token;
      localStorage.setItem("token", token);
      setTimeout(() => {
        window.location.replace("/choose-topics");
      }, 2000);
    } else {
      toast.error("Invalid username or password");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleBackClick = () => {
    window.location.href = "/login";
  };

  return (
    <>
      <div className={styles.container}>
        <div
          style={{
            backgroundColor: "#F5F5F5",
            width: 30,
            height: 30,
            marginTop: 64,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            cursor: "pointer",
            borderRadius: "50%",
          }}
          onClick={handleBackClick}
        >
          <Image src={back} />
        </div>
        <div className={styles.heading}>
          <h1 className={styles.boardingHead}>
            <Image src={logo} alt="logo" />
            &nbsp;Login With Email
          </h1>
        </div>

        <div>            
            <p className={styles.boardingPara}>
              Login to start uploading content, discovering communities and
              more...
            </p>          
        </div>

        <form className={styles.mobileForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <Image src={envelope} alt="Email Icon" className={styles.icon} />
            <label className={styles.inputLabel}>Email</label>
            <br />
            <input
              type="email"
              name="email"
              placeholder="must4277@gmail.com"
              value={formData.email}
              className={styles.inputField}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <Image src={privacy} alt="Password Icon" className={styles.icon} />
            <label className={styles.inputLabel}>Password</label>
            <br />
            <div className={styles.paswordBox}>
              <Image
                src={group}
                alt="Password Icon"
                className={styles.passwordIcon}
                onClick={togglePasswordVisibility}
              />
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                placeholder="********"
                className={styles.inputField}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.bottomContainer}>
            <div className={styles.checkboxGroup}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                {/* <div className={styles.checkbox}></div> */}
                <div
                  className={`${styles.checkbox} ${
                    isChecked ? styles.checked : ""
                  }`}
                  onClick={handleCheckboxClick}
                ></div>
                <span htmlFor="rememberMe" className={styles.checkboxLabel}>
                  Remember Me
                </span>
              </div>
              <div>
                <Link href="/forgot-password" className={styles.forgotPassword}>
                  Forgot Password
                </Link>
              </div>
            </div>

            {successMessage && (
              <div
                style={{
                  color: "red",
                  fontFamily: `sans-serif`,
                  fontSize: "14px",
                }}
              >
                {successMessage}
              </div>
            )}

            <div className={styles.addAccount}>
              <p className={styles.addParaStyl}>
                Don&apos;t have account?{" "}
                <span className={styles.signStyl}>Sign Up</span>
              </p>
              <div className={styles.btnPosition}>
                <button type="submit" className={styles.submitButton}>
                  Login
                  <Image
                    src={login}
                    alt="Password Icon"
                    className={styles.loginIcon}
                  />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginWithEmail;
