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

async function createCourse() {
  const course = new Course({
    name: "Node",
    author: "Mosh H",
    tags: ["node"],
    isPublished: true,
    price: 3500,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  return await Course.find({ isPublished: true, tags: "node" })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}

async function displayCourses() {
  const courses = await getCourses();
  console.log(courses);
}

// displayCourses();
// createCourse();

async function updateCourseRetrieving(id) {
  const course = await Course.findById(id);
  if (!course) return;
  //   course.isPublished = true;
  //   course.author = "Puneet Superstar";
  course.set({
    isPublished: true,
    author: "Rockey Superstar",
  });
  const result = await course.save();
  console.log(result);
}

// updateCourseRetrieving("63138ad144169673599c6d67");

async function updateCourseDirectly(id) {
  const result = await Course.update(
    { _id: id },
    {
      $set: {
        author: "Mosh",
        isPublished: false,
      },
    }
  );
  console.log(result);
}

// updateCourseDirectly("63138ad144169673599c6d67");

async function updateCourseDirectlyAndGetObject(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Rockey Superstar",
        isPublished: false,
      },
    },
    { new: true }
  );
  console.log(course);
}

// updateCourseDirectlyAndGetObject("63138ad144169673599c6d67");

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id }); //for one
  //const course = await Course.deleteMany({ _id: id }); //for many
  console.log(result);
}

// removeCourse("63138ad144169673599c6d67");

async function removeAndGetCourse(id) {
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}

removeAndGetCourse("63138ad144169673599c6d67");
