import webinarPoster from "./posters/webinar.PNG";
import xenithPoster from "./posters/xenith.PNG";
import techBlocksPoster from "./posters/tbnew.jpg";
import workshopsPoster from "./posters/workshop.PNG";

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
    title: "QUIZZES",
    description:
      "Challenge your technical knowledge, compete with peers, and win exciting prizes.",
    accent: "#EC4899",
    image: workshopsPoster, // Temporary
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
];

export default events;