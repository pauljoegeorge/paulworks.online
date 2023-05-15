import Blogs from "./index";

const BlogRoutes = [
  {
    component: Blogs,
    path: "/blogs",
    exact: true,
    type: "public",
  },
];

export default BlogRoutes;
