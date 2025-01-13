import React, { useState } from "react";
import styles from  '../assets/ProjectIntroPage.module.css';
import 침 from '../assets/images/chim.jpg';

const ProjectIntroPage = () => {
  const [currentGeneration, setCurrentGeneration] = useState("12기");

  const projects = [
    {
      generation: "12기",
      projects: [
        { title: "팜투마켓", description: "설명", image: 침 },
        { title: "D.LIFEBOAT", description: "설명", image: 침},
        // 추가 프로젝트
      ],
    },
    {
      generation: "11기",
      projects: [
        { title: "Challengers", description: "설명", image: 침 },
        { title: "Apply", description: "설명", image: 침},
        // 추가 프로젝트
      ],
    },
  ];

  const filteredProjects = projects.find(
    (p) => p.generation === currentGeneration
  )?.projects || []; 

  return (
    <div className={styles.ProjectIntroPage}>
      <header className={styles.header}>
      <h1 className={styles.title}>프로젝트</h1>
      <div className={styles.generationButtons}>
          <button
            onClick={() => setCurrentGeneration("12기")}
            className={
              currentGeneration === "12기"
                ? `${styles.button} ${styles.active}`
                : styles.button
            }
          >
            12기
          </button>
          <button
            onClick={() => setCurrentGeneration("11기")}
            className={
              currentGeneration === "11기"
                ? `${styles.button} ${styles.active}`
                : styles.button
            }
          >
            11기
          </button>
        </div>
      </header>

      <main className={styles.projectsContainer}>
        {filteredProjects.map((project, index) => (
          <div key={index} className={styles.projectCard}>
            <img src={project.image} alt={project.title} className={styles.image} />
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectDescription}>{project.description}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default ProjectIntroPage;