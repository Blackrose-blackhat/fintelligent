import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import BlogSection from "../components/BlogSection";
import { RingLoader } from "react-spinners";
// import Spinner from "../components/spinner";
const Home = ({ setActive, user }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
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
  }, []);

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
            <h2>Tags</h2>
            <h2>Most Popular </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
