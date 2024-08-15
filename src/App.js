import "./App.css";
import Navbar from "./components/Navbar";
import React, { useState } from "react";
import News from "./components/News";
import NewsItem from "./components/NewsItem";

import LoadingBar from "react-top-loading-bar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const apikey = "2f132ed16f7748fa8e50b2f9a3cf5f01"; // alexter key
  // apikey = "3dbe4f5d1e794ea38b770b69cb527c3d"; // sourabh key
  const [progress, setProgress] = useState(0);
  const handleSetProgress = (pg) => {
    // this.setState({ progress: pg });
    setProgress(pg);
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <LoadingBar
          color="#f11946"
          progress={progress}
          // progress={10}
          // onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          {/* <Route index element={<Home />} /> */}
          <Route
            path="/general"
            element={
              <News
                setProgress={handleSetProgress}
                apikey={apikey}
                key="general"
                pageSize={5}
                country="in"
                category="general"
              />
            }
          />
          <Route
            path="/"
            element={
              <News
                setProgress={handleSetProgress}
                apikey={apikey}
                key="general"
                pageSize={5}
                country="in"
                category="general"
              />
            }
          />
          <Route
            path="/sports"
            element={
              <News
                setProgress={handleSetProgress}
                apikey={apikey}
                key="sports"
                pageSize={5}
                country="in"
                category="sports"
              />
            }
          />
          <Route
            path="/technology"
            element={
              <News
                setProgress={handleSetProgress}
                apikey={apikey}
                key="technology "
                pageSize={5}
                country="in"
                category="technology"
              />
            }
          />
          <Route
            path="/science"
            element={
              <News
                setProgress={handleSetProgress}
                apikey={apikey}
                key="science"
                pageSize={5}
                country="in"
                category="science"
              />
            }
          />
          <Route
            path="/health"
            element={
              <News
                setProgress={handleSetProgress}
                apikey={apikey}
                key="health"
                pageSize={5}
                country="in"
                category="health"
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News
                setProgress={handleSetProgress}
                apikey={apikey}
                key="entertainment"
                pageSize={5}
                country="in"
                category="entertainment"
              />
            }
          />
          <Route
            path="/business"
            element={
              <News
                setProgress={handleSetProgress}
                apikey={apikey}
                key="business"
                pageSize={5}
                country="in"
                category="business"
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
