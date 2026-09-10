require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Project = require("./models/Project");
const Event = require("./models/Event");
const Achievement = require("./models/Achievement");

const projects = [
  {
    title: "Personalized Fitness / Diet / Workout Recommendation System",
    description:
      "A project focused on providing personalized fitness, diet and workout recommendations based on user information and goals.",
    technologies: ["Full-Stack", "Personalization", "Web Development"],
    githubUrl: "",
    liveUrl: "",
    featured: true
  },
  {
    title: "Reading Website",
    description:
      "A web-based project created to provide a simple and user-friendly reading experience.",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "",
    liveUrl: "",
    featured: true
  },
  {
    title: "Short URL Generator",
    description:
      "A web project that converts long URLs into shorter and easier-to-share links.",
    technologies: ["Web Development", "REST API"],
    githubUrl: "",
    liveUrl: "",
    featured: true
  },
  {
    title: "Academic Front-End Website",
    description:
      "A website created as part of academic/project work to demonstrate front-end development skills.",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "",
    liveUrl: "",
    featured: false
  }
];

const events = [
  {
    title: "Hackathon Participation",
    type: "Hackathon",
    description:
      "Contributed to website front-end development, idea presentation and team collaboration.",
    date: ""
  }
];

async function seed() {
  await connectDB();

  await Promise.all([
    Project.deleteMany({}),
    Event.deleteMany({}),
    Achievement.deleteMany({})
  ]);

  await Project.insertMany(projects);
  await Event.insertMany(events);

  console.log("Seed data inserted successfully.");
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
