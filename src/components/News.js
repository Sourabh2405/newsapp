import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setpage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  const updateNews = async () => {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);

    setLoading(false);

    setArticles(parsedData.articles);
    setTotalArticles(parsedData.totalResults);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    document.title = props.category;
  }, []);

  // const async componentDidMount() {
  //   this.props.setProgress(0);
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`;
  //   this.setState({
  //     loading: true,
  //   });
  //   let data = await fetch(url);
  //   this.props.setProgress(30);
  //   let parsedData = await data.json();
  //   this.props.setProgress(70);
  //   this.setState({
  //     loading: false,
  //   });
  //   this.setState({
  //     articles: parsedData.articles,
  //     totalArticles: parsedData.totalResults,
  //   });
  //   this.props.setProgress(100);
  // }

  // handlePrevClick = async () => {
  //   console.log("Previous");

  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${
  //     this.state.page - 1
  //   }&pageSize=${this.props.pageSize}`;
  //   this.setState({
  //     loading: true,
  //   });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     loading: false,
  //   });
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //   });
  // };

  // handleNextClick = async () => {
  //   console.log("Next");
  //   if (
  //     this.state.page + 1 <=
  //     Math.ceil(this.state.totalArticles / this.props.pageSize)
  //   ) {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${
  //       this.props.country
  //     }&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${
  //       this.state.page + 1
  //     }&pageSize=${this.props.pageSize}`;
  //     this.setState({
  //       loading: true,
  //     });
  //     let data = await fetch(url);
  //     let parsedData = await data.json();
  //     this.setState({
  //       loading: false,
  //     });
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parsedData.articles,
  //     });
  //   }
  // };

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apikey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setpage(page + 1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setLoading(false);
    setArticles(articles.concat(parsedData.articles));
    setTotalArticles(parsedData.totalResults);
  };

  return (
    <>
      <h2 className="text-center" style={{ marginTop: "90px" }}>
        NewMonkee Top {props.category} headlines
      </h2>
      {/* {this.state.loading && <Spinner />} */}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalArticles}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="container">
          <div className="row">
            {
              // !this.state.loading &&
              articles.map((element) => {
                // console.log(element);
                return (
                  element.url !== "https://removed.com" && (
                    <div className="col-md-4">
                      <NewsItem
                        key={element.url}
                        title={element.title.slice(0, 50)}
                        description={element.description}
                        imgUrl={element.urlToImage}
                        newsUrl={element.url}
                        publishedDate={element.publishedAt}
                        author={element.author}
                      />
                    </div>
                  )
                );
              })
            }
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalArticles / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
};

export default News;
