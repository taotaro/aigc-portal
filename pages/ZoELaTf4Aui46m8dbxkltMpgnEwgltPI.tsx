import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { throttle } from "../util/index";
import Judge from "../components/judge";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import InputField from "../components/input-field";

export default function Login() {
    const { t } = useTranslation("common");
    const [fixedBgHeight, setFixedBgHeight] = useState(200);
    const [password, setPassword] = useState("");
    const [valid, setValid] = useState(false);
    const [token, setToken] = useState("");

    const LogoList = [
        { name: "Alibaba", logo: "/images/ali.jpeg" },
        { name: "GamingNoodleSoup", logo: "/images/gns.png" },
        { name: "Materia Logic", logo: "/images/ml.png" },
        { name: "HKFEW", logo: "/images/teachers.jpeg" },
        { name: "Aitle", logo: "/images/aitle.png" },
    ];

    const sponsorList = [
        { name: "SteelSeries", logo: "/images/steelseries.png" },
        { name: "Lawsgroup", logo: "/images/LAWSGROUP.png" },
        { name: "LawsKnitters", logo: "/images/Laws Knitters Logo.png" },
    ];

    function onWindowResize() {
        const $fixedBg = document.getElementById("fixed-bg");
        const height = $fixedBg?.getBoundingClientRect()?.height || 200;
        setFixedBgHeight(height);
    }

    const throttledResize = throttle(onWindowResize, 200);

    useEffect(() => {
        window.scrollTo(0, 0);
        onWindowResize();
        window.addEventListener("resize", throttledResize);
        return () => {
            window.removeEventListener("resize", throttledResize);
        };
    }, []);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async () => {
        console.log("submit");
        const payload = {
            password: password,
        };

        console.log(payload);
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/common/login",
                payload
            );
            console.log(response);
            if (response.data.code === "2000") {
                console.log("invalid");
                toast.error("invalid password");
            } else {
                setValid(true);
                setToken(response.data.data.token);
            }
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    };

    const handleDownload = async () => {
        console.log("download");
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/common/excel",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    responseType: "blob",
                }
            );
            console.log("response: ", response);
            const url = window.URL.createObjectURL(
                new Blob([response.data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                })
            );
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Registration_Data.xlsx"); // Filename for download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Cleanup the DOM
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    };

    return (
        <>
            <NextSeo
                title={"雲遊通義 阿里雲校際AI比賽"}
                description={
                    "雲遊通義 – 阿里雲香港10週年校際生成式AI比賽發佈會"
                }
            />
            <div
                style={{
                    width: "100%",
                    height: "80px",
                    backgroundImage: `url('/images/index-bg.jpeg')`,
                }}
            />
            <div className="module-container">
                <section
                    className="position-relative intro-box"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                    <div
                        className="input-container"
                        style={{
                            marginBottom: "20px",
                            width: "100%",
                            maxWidth: "400px",
                        }}
                    >
                        <InputField
                            inputLabel="Enter password to access excel file"
                            inputName="password"
                            inputValue={password}
                            onInputChange={handlePasswordChange}
                            inputType="text"
                            isRequired={true}
                            inputOptions={[]}
                            errorMessage="Please enter a valid password"
                            isSubmitted={false}
                        />
                    </div>
                    {valid ? (
                        <div
                            className="module-button"
                            onClick={handleDownload}
                            style={{
                                background: "#FE6A00",
                                cursor: "pointer",
                                padding: "10px 20px",
                                color: "white",
                                borderRadius: "5px",
                                textAlign: "center",
                                width: "100%", // Full width of the button container
                                maxWidth: "400px", // Restrict button width
                            }}
                        >
                            Download Excel
                        </div>
                    ) : (
                        <div
                            className="module-button"
                            onClick={handleSubmit}
                            style={{
                                background: "#FE6A00",
                                cursor: "pointer",
                                padding: "10px 20px",
                                color: "white",
                                borderRadius: "5px",
                                textAlign: "center",
                                width: "100%", // Full width of the button container
                                maxWidth: "400px", // Restrict button width
                            }}
                        >
                            Submit
                        </div>
                    )}
                </section>

                {/* {valid ? (
                    <section className="position-relative intro-box">
                        <button onClick={handleDownload}>Download Excel</button>
                    </section>
                ) : null} */}
                {/* {footer} */}
                <section className="position-relative module-box">
                    <p className="module-title">活動主辦</p>
                    <div className="module-logos">
                        {LogoList.filter((item) => item.name === "Alibaba").map(
                            (item) => {
                                return (
                                    <div
                                        className={`module-logo module-logo-${item.name}`}
                                        key={item.name}
                                    >
                                        <img
                                            className="module-logo__img"
                                            src={item.logo}
                                            alt={item.name}
                                        />
                                    </div>
                                );
                            }
                        )}
                    </div>
                    <p className="module-title" style={{ paddingTop: "24px" }}>
                        支持單位
                    </p>
                    <div className="module-logos">
                        {LogoList.filter((item) => item.name !== "Alibaba").map(
                            (item) => {
                                return (
                                    <div
                                        className={`module-logo module-logo-${item.name}`}
                                        key={item.name}
                                    >
                                        <img
                                            className="module-logo__img"
                                            src={item.logo}
                                            alt={item.name}
                                        />
                                    </div>
                                );
                            }
                        )}
                    </div>
                    <p className="module-title" style={{ paddingTop: "24px" }}>
                        活動贊助
                    </p>
                    <div className="module-logos">
                        {sponsorList
                            .filter((item) => item.name !== "Alibaba")
                            .map((item) => {
                                return (
                                    <div
                                        className={`module-logo module-logo-${item.name}`}
                                        key={item.name}
                                        style={{ minHeight: "150px" }}
                                    >
                                        <img
                                            className="module-logo__img"
                                            src={item.logo}
                                            alt={item.name}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </section>
            </div>
            <Toaster
                position="bottom-center" // Set the default position for all toasts
                reverseOrder={false} // Optional: display the newest toast at the bottom
                toastOptions={{
                    style: {
                        // height: "100px",
                        fontSize: "36px",
                        minWidth: "25%",
                        // text: "24px",
                    },
                }}
            />
        </>
    );
}
