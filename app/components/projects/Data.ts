// constants/index.ts

export interface ProjectTag {
  id: number;
  name: string;
  path: string;
}

export interface Project {
  title: string;
  desc: string;
  subdesc: string;
  href?: string;
  linkLabel?: string;
  HasUrl?: boolean;
  texture?: string;
  logo: string;
  logoStyle?: React.CSSProperties;
  spotlight: string;
  tags: ProjectTag[];
}

export const myProjects: Project[] = [
  {
    title: "PFE Console Verse – PC Components Platform",
    desc: "PFE Console Verse is a final-year project built with Laravel, CSS, MySQL, Bootstrap, and JavaScript. It's a platform where users can configure their own PCs by selecting components, with dedicated dashboards for both users and administrators.",
    subdesc:
      "A key feature is 'The Expedition,' a Deepseek R1-based chatbot that guides customers. The admin can manage product requests, and accept or refuse user-made PC configurations.",
    href: "https://github.com/Brando-karim/PFE-PC", // Assuming no direct link was provided, can be updated later if available
    linkLabel: "Check Live Site",
    HasUrl: true,
    texture: "/assets/textures/project_pfe.mp4", // Placeholder texture
    logo: "/assets/consoleverse.png", // Placeholder logo
    logoStyle: {
      backgroundColor: "#1e1e1e",
      border: "0.2px solid #6C63FF",
      boxShadow: "0px 0px 60px 0px #3a3a3a",
    },
    spotlight: "/assets/spotlight5.png", // Placeholder spotlight
    tags: [
      { id: 1, name: "Laravel", path: "/assets/laravel.png" },
      { id: 2, name: "CSS", path: "/assets/css.png" },
      { id: 3, name: "MySQL", path: "/assets/mysql.png" },
      { id: 4, name: "Bootstrap", path: "/assets/bootstrap.png" },
      { id: 5, name: "JavaScript", path: "/assets/js.png" },
    ],
  },
  {
    title: "Quick Annonce – E-commerce Website",
    desc: "Quick Annonce is an e-commerce platform inspired by Avito, allowing users to search, filter, and contact sellers and buyers across different cities and categories. This robust system is built to facilitate seamless transactions.",
    subdesc:
      "Developed with React, Node.js, MongoDB, Express.js, and Next.js, the platform delivers a modern and scalable solution for a dynamic online marketplace experience.",
    href: "https://github.com/Brando-karim/QuickAnnonce", // Assuming no direct link was provided, can be updated later if available
    linkLabel: "Check Live Site",
    HasUrl: true,
    texture: "/assets/textures/project_annone.mp4", // Placeholder texture
    logo: "/assets/QucikAnnonce.png", // Placeholder logo
    logoStyle: {
      backgroundColor: "#2a2a2a",
      border: "0.2px solid #00C853",
      boxShadow: "0px 0px 60px 0px #1c1c1c",
    },
    spotlight: "/assets/spotlight3.png", // Placeholder spotlight
    tags: [
      { id: 1, name: "React.js", path: "/assets/react.svg" },
      { id: 2, name: "Node.js", path: "/assets/node.png" },
      { id: 3, name: "MongoDB", path: "/assets/mongodb.png" },
      { id: 4, name: "Express.js", path: "/assets/expressjs.png" },
      { id: 5, name: "Next.js", path: "/assets/nextjs.png" },
      { id: 5, name: "Docker", path: "/assets/Docker.png" },
    ],
  },
  {
    title: "ENT – OFPPT ISTA NTIC Tanger Website",
    desc: "ENT is an internship project for OFPPT ISTA NTIC Tanger. This website provides essential resources for students and teachers, offering courses, a live chat, and a space for finding internships.",
    subdesc:
      "Built with MySQL, Laravel, Next.js, and other tools, this platform centralizes institutional resources and enhances collaboration within the academic community.",
    href: "#", // Assuming no direct link was provided, can be updated later if available
    linkLabel: "More Info",
    HasUrl: false,
    texture: "/assets/textures/project_ent.mp4", // Placeholder texture
    logo: "ent-logo.png", // Placeholder logo
    logoStyle: {
      backgroundColor: "#2e2e2e",
      border: "0.2px solid #63dbff",
      boxShadow: "0px 0px 60px 0px #1a1a1a",
    },
    spotlight: "/assets/spotlight2.png", // Placeholder spotlight
    tags: [
      { id: 1, name: "MySQL", path: "/assets/mysql.png" },
      { id: 2, name: "Laravel", path: "/assets/laravel.png" },
      { id: 3, name: "Next.js", path: "/assets/nextjs.png" },
      
      { id: 5, name: "HTML", path: "/assets/html.png" },
      { id: 6, name: "CSS", path: "/assets/css.png" },
      { id: 7, name: "JavaScript", path: "/assets/js.png" },
    ],
  },
];