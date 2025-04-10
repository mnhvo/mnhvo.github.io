const blogPosts = [
  {
    id: 1,
    title: "Understanding JavaScript Closures",
    author: "John Doe",
    content:
      "Closures are a powerful feature in JavaScript that allow functions to access variables from an outer function's scope even after the outer function has finished executing...",
    date: "2024-08-01",
    tags: ["JavaScript", "Programming", "Web Development"],
  },
  {
    id: 2,
    title: "A Beginner's Guide to CSS Grid",
    author: "Jane Smith",
    content:
      "CSS Grid Layout is a two-dimensional layout system for the web that allows developers to create complex layouts with ease. In this guide, we will explore the basics of CSS Grid and how to get started...",
    date: "2024-08-05",
    tags: ["CSS", "Web Design", "Frontend"],
  },
  {
    id: 3,
    title: "10 Tips for Effective Remote Work",
    author: "Alex Johnson",
    content:
      "Remote work has become increasingly common, and with it comes the challenge of staying productive and maintaining a healthy work-life balance. Here are ten tips to help you succeed while working remotely...",
    date: "2024-08-10",
    tags: ["Productivity", "Remote Work", "Lifestyle"],
  },
];

//console.log(blogPosts);
const gridContainer = document.querySelector("#grid-container");
//console.log(gridContainer);

for (let i = 0; i < blogPosts.length; i++) {
 //   console.log(blogPosts(i).author);
formattedContent += '
<section id="box${i + 1}">
<h1>$blogposts[i].title </h1>
<p>${blogPosts[i]} </p>
<section>
';
}
