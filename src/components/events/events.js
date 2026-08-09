import webinarPoster from "./posters/webinar.PNG";
import xenithPoster from "./posters/xenith.PNG";
import techBlocksPoster from "./posters/techblocks.jpg";
import workshopsPoster from "./posters/workshop.jpeg";
import researchPoster from "./posters/research_forum.jpeg";
import luminaPoster from "./posters/lumina.PNG";

const events = [
  {
    id: 1,
    title: "WORKSHOPS",
    description:
      "Hands-on sessions designed to help students learn emerging technologies through practical experience.",
    accent: "#00B7FF",
    image: workshopsPoster,
  },

  {
    id: 2,
    title: "WEBINARS",
    description:
      "Interactive talks with industry experts, researchers, and professionals sharing real-world insights.",
    accent: "#8B5CF6",
    image: webinarPoster,
  },

  {
    id: 3,
    title: "RESEARCH FORUM",
    description:
      "An immersive 2-day research paper writing workshop designed to introduce students to the world of academic research and scholarly writing.",
    accent: "#EC4899",
    image: researchPoster,
  },

  {
    id: 4,
    title: "IEEE DAY",
    description:
      "Celebrating innovation, collaboration, and the global IEEE community together.",
    accent: "#14B8A6",
    image: workshopsPoster, // Temporary
  },

  {
    id: 5,
    title: "TECH BLOCKS",
    description:
      "Focused technical sessions exploring cutting-edge technologies and engineering concepts.",
    accent: "#F97316",
    image: techBlocksPoster,
  },

  {
    id: 6,
    title: "XENITH",
    description:
      "Our flagship technical festival featuring competitions, workshops, and innovation.",
    accent: "#2563EB",
    image: xenithPoster,
  },

  {
    id: 7,
    title: "LUMINA",
    description:
      "A creative and engaging event bringing together ideas, innovation, and exciting experiences.",
    accent: "#F59E0B",
    image: luminaPoster,
  },
];

export default events;