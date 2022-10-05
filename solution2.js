const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:/mongo-exercises")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.log("Error occured while connecting to db...", err));

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

const Course = new mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course.find({
    isPublished: true,
    tags: { $in: ["node", "javascript"] },
  })
    .sort({ price: -1 })
    .select("name author price");
}

async function displayCourses() {
  const courses = await getCourses();
  console.log(courses);
}

displayCourses();
