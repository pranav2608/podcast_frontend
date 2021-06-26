import React from 'react'
import "./About.css"

const About = ()=>{
    return(
      <div className="center">
          <img className="pic" src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"/>
            <div class="container">
                <h4><b>John Doe</b></h4>
                <p>Architect and Engineer</p>
            </div>
       </div>
    );
}

export default About