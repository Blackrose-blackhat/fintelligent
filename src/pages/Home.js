import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import BlogSection from "../components/BlogSection";
import { RingLoader } from "react-spinners";
import Tags from "../components/Tags";
import MostPopular from "../components/MostPopular";
// import Spinner from "../components/spinner";
const Home = ({ setActive, user, active }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          console.log(tags);
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setBlogs(list);
        setLoading(false);
        setActive("home");
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, [setActive, active]);

  if (loading) {
    return (
      <div
        className="loader"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RingLoader color="#0a293b" size={190} />
      </div>
    );
  }

  console.log("blogs", blogs);
  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container-padding">
        <div className="row mx-0">
          <h2>Trending</h2>
          <div className="col-md-8">
            <BlogSection blogs={blogs} user={user} />
          </div>
          <div className="col-md-3">
            <Tags tags={tags} />
            <MostPopular blogs={blogs} />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
