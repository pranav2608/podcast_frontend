import React from 'react'

const Episode = (props)=>{
    return (
        <React.Fragment>
           <div className="d-block d-md-flex podcast-entry bg-white mb-5">
              <div className="image" style={{backgroundImage: `url(${props.image})`}}></div>
              <div className="text">
                <h3 className="font-weight-light"><a href="single-post.html">{props.title}</a></h3>
                <div className="text-white mb-3"><span className="text-black-opacity-05"><small>By {props.name} <span className="sep"></span><span className="sep"></span></small></span></div>

                <div className="player">
                  <audio id="player2" preload="none" controls controlsList="nodownload" style={{width: "100%"}}>
                    <source src={props.trackURL} type="audio/mp3" />
                  </audio>
                </div>

              </div>
            </div>
        </React.Fragment>
    )
}

export default Episode