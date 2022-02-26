import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
      let {title, discription, ImgUrl, NewsUrl, author, date, source}=this.props;
    return (
      <div className='my-3'>
          <div className="card">
          <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%",zIndex:'1'}}>
            {source}
          </span>
            <img src={!ImgUrl?"https://images.moneycontrol.com/static-mcnews/2022/02/nifty_sensex_stocks-770x433.jpg":ImgUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{discription}</p>
                <p className="card-text"><small className="text-muted">BY {!author?"Anonymous":author} on {new Date(date).toGMTString()}</small></p>
                <a href={NewsUrl} rel="noreferrer"  target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>
      </div>
    )
  }
}

export default NewsItem