import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country:"in",
    pageSize:8,
    category:"general"
  }
  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1
    }
  }
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1177b3a048de4154be66dc0465f085c3&page=1&pageSize=${this.props.pageSize}`;
    let data =await fetch(url);
    let parsedData = await data.json();
    this.setState({loading:true});
    this.setState({
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading: false
    })
  }
  handleNext = async() =>{
    if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1177b3a048de4154be66dc0465f085c3&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data =await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page : this.state.page +1,
        articles: parsedData.articles,
        loading: false
      })
    }

  }
  handlePrev = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1177b3a048de4154be66dc0465f085c3&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data =await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page : this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
  }
  render() {
    console.log("render")
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{margin: '35px 0px'}}>NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title:""} discription={element.description?element.description:""} ImgUrl={element.urlToImage} NewsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>

          })}
          
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrev}>	&larr; Previous</button>
          <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News