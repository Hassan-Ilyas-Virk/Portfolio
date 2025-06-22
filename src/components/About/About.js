import './about.css'

export default function About() {
    return (
        <section id="about" className="fullpage-section about-section">
            <div className="section-content">
                <div className="about-grid">
                    {/* Left Column - Profile and Bio */}
                    <div className="left-column">
                        <div className="about-widget profile-widget">
                            <div className="shape shape-circle"></div>
                            <div className="shape shape-square"></div>
                            <div className="shape shape-triangle"></div>
                            <div className="profile-image">
                                <img src="/medias/profile.jpg" alt="Profile" />
                            </div>
                            <h2>Hassan Ilyas Virk</h2>
                        </div>  
                        <div className="about-widget bio-widget">
                            <h3>Software Engineer</h3>
                            <p>3D Visual Desginer</p>
                        </div>
                    </div>

                    {/* Right Column - Skills */}
                    <div className="right-column">
                        <div className="about-widget skills-widget development-widget">
                            <h3>Development</h3>
                            <div className="skills-categories">
                                <div className="skill-category">
                                    <h4> Programming Languages</h4>
                                    <ul className="skills-list">
                                        <li>
                                            <i className="devicon-cplusplus-plain"></i>
                                            <span>C++</span>
                                        </li>
                                        <li>
                                            <i className="devicon-csharp-plain"></i>
                                            <span>C#</span>
                                        </li>
                                        <li>
                                            <i className="devicon-java-plain"></i>
                                            <span>Java</span>
                                        </li>
                                        <li>
                                            <i className="devicon-javascript-plain"></i>
                                            <span>JavaScript</span>
                                        </li>
                                        <li>
                                            <i className="devicon-python-plain"></i>
                                            <span>Python</span>
                                        </li>
                                        <li>
                                            <i className="devicon-kotlin-plain"></i>
                                            <span>Kotlin</span>
                                        </li>
                                        <li>
                                            <i className="fas fa-database"></i>
                                            <span>SQL</span>
                                        </li>
                                        <li>
                                            <i className="devicon-swift-plain"></i>
                                            <span>Swift</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="skill-category">
                                    <h4> Development</h4>
                                    <ul className="skills-list">
                                        <li>
                                            <i className="devicon-mongodb-plain"></i>
                                            <span>MongoDB</span>
                                        </li>
                                        <li>
                                            <i className="devicon-express-original"></i>
                                            <span>Express</span>
                                        </li>
                                        <li>
                                            <i className="devicon-react-original"></i>
                                            <span>React</span>
                                        </li>
                                        <li>
                                            <i className="devicon-nodejs-plain"></i>
                                            <span>Node.js</span>
                                        </li>
                                        <li>
                                            <i className="devicon-spring-plain"></i>
                                            <span>Spring</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="skill-category">
                                    <h4> Tools & Software</h4>
                                    <ul className="skills-list">
                                        <li>
                                            <i className="devicon-git-plain"></i>
                                            <span>Git</span>
                                        </li>
                                        <li>
                                            <i className="devicon-github-original"></i>
                                            <span>GitHub</span>
                                        </li>
                                        <li>
                                            <i className="devicon-docker-plain"></i>
                                            <span>Docker</span>
                                        </li>
                                        <li>
                                            <i className="fas fa-paper-plane"></i>
                                            <span>Postman</span>
                                        </li>
                                        <li>
                                            <i className="devicon-jira-plain"></i>
                                            <span>Jira</span>
                                        </li>
                                        <li>
                                            <i className="devicon-figma-plain"></i>
                                            <span>Figma</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="skill-category">
                                    <h4> Testing</h4>
                                    <ul className="skills-list">
                                        <li>
                                            <i className="fas fa-check-circle"></i>
                                            <span>TestFX</span>
                                        </li>
                                        <li>
                                            <i className="fas fa-vials"></i>
                                            <span>JUnit</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="about-widget skills-widget design-widget">
                            <h3>Design</h3>
                            <div className="skill-category">
                                <h4>3D Design</h4>
                                <div className="skills-grid three-d">
                                    <div className="skill-item">
                                        <i className="devicon-blender-original"></i>
                                        <span>Blender</span>
                                    </div>
                                    <div className="skill-item">
                                        <i className="devicon-maya-plain"></i>
                                        <span>ZBrush</span>
                                    </div>
                                    <div className="skill-item">
                                        <i className="fa-solid fa-paint-brush"></i>
                                        <span>Substance Painter</span>
                                    </div>
                                    <div className="skill-item">
                                        <i className="fa-solid fa-tshirt"></i>
                                        <span>Marvelous Designer</span>
                                    </div>
                                </div>
                            </div>

                            <div className="skill-category">
                                <h4>2D Design</h4>
                                <div className="skills-grid">
                                    <div className="skill-item">
                                        <i className="devicon-photoshop-plain"></i>
                                        <span>Photoshop</span>
                                    </div>
                                    <div className="skill-item">
                                        <i className="devicon-aftereffects-plain"></i>
                                        <span>After Effects</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 