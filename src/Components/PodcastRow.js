import React from "react"

const PodcastRow = (props)=>{
    return(
        <React.Fragment>
            <li>
                <a href="#" onClick={props.onSelect} className="d-flex align-items-center  p-2">
                    <img src={props.image} alt="img" className="img-fluid mr-2"/>
                      <div className="podcaster">
                        <span className="d-block">{props.name}</span>
                        <span className="small">{props.categories}</span>
                      </div>
                </a>
            </li>
        </React.Fragment>
    )
}

export default PodcastRow