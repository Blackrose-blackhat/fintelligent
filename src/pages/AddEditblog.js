import React from "react";
import { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import { getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import "@pathofdev/react-tag-input/build/index.css";
import { ref } from "@firebase/storage";
import { storage } from "../services/firebase";

const initialState = {
  title: "",
  description: "",
  tags: [],
  trending: "no",
};

const categoryOptions = [
  "PersonalFinance",
  "StockMarket",
  "FinancialPlanning",
  "Real Estate",
  "Loans",
  "FinTech",
  "FinancialEducation",
  "LifeStyle and Money",
];

const AddEditblog = () => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const { title, tags, category, trending, description } = form;
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            // toast.info("Image upload to firebase successfully");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTag = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const oncategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };
  const handleSubmit = async (e) => {};
  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12 text-center">
          <div className="text-center heading py-2">Create Blog</div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form action="" className="row big-form" onSubmit={handleSubmit}>
              <div className="col-12 py-3">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="col-12 py-3">
                <ReactTagInput
                  tags={tags}
                  placeholder="tags"
                  onChange={handleTag}
                />
              </div>
              <div className="col-12 py-3">
                <p className="trending">Is it trending?</p>
                <div className="form-check-inline ms-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="trending"
                    value="yes"
                    checked={trending === "yes"}
                    onChange={handleTrending}
                  ></input>
                  <label htmlFor="radioOption" className="form-check-label">
                    Yes &nbsp;
                  </label>
                </div>
                <div className="form-check-inline ms-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="trending"
                    value="no"
                    checked={trending === "no"}
                    onChange={handleTrending}
                  ></input>
                  <label htmlFor="radioOption" className="form-check-label">
                    No &nbsp;
                  </label>
                </div>
              </div>
              <div className="col-12 py-3">
                <select
                  value={category}
                  onChange={oncategoryChange}
                  className="catg-dropdown"
                >
                  <option>Please select category</option>
                  {categoryOptions.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 py-3">
                <textarea
                  className="form-control description-box"
                  placeholder="description"
                  value={description}
                  onChange={handleChange}
                  name="description"
                />
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                ></input>
              </div>

              <div className="col-12 py-3 text-center">
                <button
                  className="btn btn-add"
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditblog;
