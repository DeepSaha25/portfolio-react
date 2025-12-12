import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { experienceData, projectData } from './data';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function App() {
  const typedElement = useRef(null);
  const [init, setInit] = useState(false);

  // 1. Initialize Particles
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // 2. Initialize Typed.js
  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: ["Web Developer", "Student", "Speaker", "Tech Enthusiast"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, []);

  // 3. Initialize GSAP ScrollTrigger for Navbar Links
  useEffect(() => {
    const sections = ["about", "experience", "projects", "services", "contact"];

    sections.forEach(id => {
      const section = document.getElementById(id);
      const link = document.querySelector(`nav ul li a[href="#${id}"]`);
      
      if (section && link) {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => link.classList.add("active-link"),
          onLeave: () => link.classList.remove("active-link"),
          onEnterBack: () => link.classList.add("active-link"),
          onLeaveBack: () => link.classList.remove("active-link"),
        });
      }
    });
  }, []);

  const particlesOptions = {
    fpsLimit: 60,
    interactivity: {
      events: { onHover: { enable: true, mode: "repulse" }, resize: true },
      modes: { repulse: { distance: 100, duration: 0.4 } },
    },
    particles: {
      color: { value: "#ffffff" },
      links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.3, width: 1 },
      move: { enable: true, speed: 1 },
      number: { value: 80, density: { enable: true, area: 800 } },
      opacity: { value: 0.1 },
      size: { value: { min: 1, max: 5 } },
    },
    detectRetina: true,
  };

  return (
    <div className="app-container">
      {/* Background Particles */}
      {init && (
        <Particles
          id="tsparticles"
          options={particlesOptions}
          style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}
        />
      )}
      
      <header>
        <nav>
          <div className="left">Deep's Portfolio</div>
          <div className="right">
            <ul>
              <li><a href="#about">About me</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="firstSection">
          <div className="leftSection">
            Hi, My name is <span className="purple">Deep Saha</span>
            <div>I am a passionate</div>
            <span ref={typedElement} className="element"></span>
            <div className="buttons">
              <button className="btn">Download Resume</button>
              <button className="btn" onClick={() => window.open('https://github.com/DeepSaha25', '_blank')}>Visit Github</button>
            </div>
          </div>
          <div className="rightSection">
            <img src="/img/pro.png" alt="Profile" />
          </div>
        </section>
        
        <hr />

        {/* About Section */}
        <section className="aboutSection" id="about">
          <span className="text-grey">Hi, I'm Deep Saha</span>
          <h1>A bit about me</h1>
          <h3>Georgian || Aspiring SDE || Web Development Enthusiast || CodeSprint 2.0 qualified || OSCI’25 || Hacktoberfest SuperContributor</h3>
          <p>
            B.Tech CSE student at JIS University, passionate about coding, tech, and problem-solving. I would enjoy building projects, learning new tools, and applying skills to real-world challenges. Always open to opportunities to learn, grow, and collaborate
          </p>
        </section>
        
        <hr />

        {/* Experience Section */}
        <section className="secondSection" id="experience">
          <span className="text-grey">What I have done so far</span>
          <h1>Experience</h1>
          
          <div className="experience-container">
            {experienceData.map((exp) => (
              <div key={exp.id} className="experience-card">
                <div className="card-header">
                  <img src={exp.img} alt={exp.title} className="exp-icon"/>
                  <span className="exp-date">{exp.date}</span>
                </div>
                <h3>{exp.title}</h3>
                <p>{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>
        
        <hr />

        {/* Projects Section */}
        <section className="projectSection" id="projects">
          <span className="text-grey">Have a look at some of my projects....</span>
          <h1>(Force.displacement)</h1>
          <div className="boxholder">
            {projectData.map((project) => (
              <a key={project.id} href={project.link} target="_blank" rel="noreferrer" className="box-link">
                <div className="box">
                  <img src={project.img} alt="Project" />
                </div>
              </a>
            ))}
          </div>
        </section>

        <hr />

        {/* Services Section */}
        <section className="serviceSection" id="services">
          <span className="text-grey">What I can help you with?</span>
          <h1>Services I Offer</h1>
          <ul>
            <li>Frontend Development</li>
            <li>Landing Page Design & Develop</li>
            <li>Content Writing</li>
          </ul>
        </section>

        <hr />

        {/* Contact Section */}
        <section className="contactSection" id="contact">
          <span className="text-grey">Wanna a have talk to me??</span>
          <h1>Contact Details</h1>
          <ul>
            <li>Mobile no - 8617764637</li>
            <li>Email - ideepsaha25@gmail.com</li>
            <li><a href="https://www.linkedin.com/in/deep-saha-13a4bb365/">LinkedIn</a></li>
            <li><a href="https://github.com/DeepSaha25">Github</a></li>
          </ul>
        </section>

        <hr />
      </main>

      <footer>
        <div className="footer">
          <div className="footer-first">
            <h4>Made with ♥ || Deep Saha || Copyright © Deep Saha </h4>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;