import React from 'react'
import {
    Card,  CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
  import "./Nocontent.css"

const Nocontent = ()=>{
    return(
        <div className="site-section">
          
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
            
               
                <Card body  style={{ backgroundColor: '#BFCBC2', borderColor: '#CBFCBC2' }}>
                    <CardBody>
                    <CardTitle tag="h2">GETTING STARTED?</CardTitle>
                    <CardSubtitle tag="h5" >Go to the search bar and search for the podacst of your favourite Genre!</CardSubtitle>
                    <CardText>Try out with sports, fashion, politics and many more..</CardText>
                    <CardText>If you cant use the site, then please Contact us by clicking on button below</CardText>
                    <Button  href="/contact" style={{ backgroundColor: '#001D4A', borderColor: '#001D4A' }}>
                      <span className="color">Contact Us!</span>
                      </Button>
                    </CardBody>
                </Card>
                
              </div>
              
              
            </div>
          </div>
        </div>
      
    );
}

export default Nocontent