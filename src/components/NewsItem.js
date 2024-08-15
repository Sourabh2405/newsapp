import React from "react";

const NewsItem = (props) => {
  let { title, description, imgUrl, newsUrl, author, publishedDate } = props;
  return (
    <div className="my-3">
      <div className="card">
        <img
          src={
            imgUrl
              ? imgUrl
              : "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-980x653.jpg"
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}</p>
          <a href={newsUrl} target="blank" className="btn btn-sm btn-dark">
            Read more..
          </a>
          <p className="card-text">
            <small className="text-body-secondary">
              By {author == null ? "Unknown" : author} on{" "}
              {new Date(publishedDate).toGMTString()}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
