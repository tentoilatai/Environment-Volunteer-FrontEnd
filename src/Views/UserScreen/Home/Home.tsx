import "./Home.scss";
import Banner from "../img/Green Creative Save Our Earth Banner - Copy.png";
import Call from "../img/image 3.svg";
import Location from "../img/image 4.svg";
import Card from "../../../Components/Card/Card";
import Mail from "../img/image 5.svg";
import FB from "../img/image 6.svg";
import ins from "../img/image 7.svg";
import { fakeData } from "../../AdminScreen/ProjectManagement/fakedata/fakelistproject";


const Home = () => {
    return (
        <div className="home">
            {/* Banner */}
            <div className="banner">
                <img src={Banner} alt="Banner" />
            </div>
            {/* Recently Projects */}
            <section className="projects">
                <h2>Recently project</h2>
                <div className="scroll-container">
                    <div className="project-list">
                        {fakeData.slice(0, 4).map((project) => (
                            <Card
                                key={project.Id}
                                imageSrc={project.Logo}
                                title={project.Title}
                                details={[
                                    `StartDate: ${project.StartDate}`,
                                    `EndDate: ${project.EndDate}`,
                                    `Location: ${project.Address}`,
                                    `Campaign: ${project.Campaign}`,
                                ]}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* News */}
            <section className="news">
                <h2>News</h2>
                <div className="scroll-container">
                    <div className="news-list">
                        {[...Array(4)].map((_, index) => (
                            <Card
                                key={index}
                                imageSrc=""
                                title="Title"
                                details={["Owner: "]}
                            />
                        ))}
                    </div>
                </div>
            </section>


            {/* Footer */}
            <footer>
                <div className="footer-section">
                    <h4>About us</h4>
                    <p>Nhà phát hành</p>
                </div>
                <div className="footer-section">
                    <h4>Contact</h4>
                    <p><img src={Call} alt="" className="icon" /> +84 0245845698</p>
                    <p><img src={Location} alt="" className="icon" /> 541 - Thanh Xuân - Hà Nội</p>
                    <p><img src={Mail} alt="" className="icon" /> XuanLopTruong@gmail.com</p>
                </div>
                <div className="footer-section">
                    <h4>More information</h4>
                    <a href=""><img src={FB} alt="" className="icon" />Facebook</a>
                    <a href=""><img src={ins} alt="" className="icon" />Instagram</a>
                </div>
            </footer>
        </div>
    );
};

export default Home;
