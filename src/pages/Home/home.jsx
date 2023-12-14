import "./home.css"
import React from 'react';
import NavHead from '../NavBar/navHead'; 
import Footer from '../Footer/footer';

import { Container, Row, Col  } from 'reactstrap';

export default function Home(){
    return (
        <>
       <NavHead />
        <div>
            <Container fluid className="mainDiv">
                <Row >
                    <Col lg={7} md={7} sm={12} xs={12}>
                        <div className='banner-text'>
                            <h1 className="banner-heading">Good F🥗🥗d</h1>
                            <h1 className="banner-heading">Good M😋😋d</h1>
                            <p className="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                    </Col>
                    <Col lg={5} md={5} sm={12} xs={12}>
                        <div className="image_outer_div ">
                            <img className=""  src="/assets/image/home/seafood.png"></img>

                        </div>
                        
                    </Col>
                </Row>
                <Row className='about-us'>
                    <Col lg={5} md={5} sm={12} xs={12} className='mt-3'>
                        <div className="image_outer_div ">
                            <img className="" src="/assets/image/home/noodles.png"></img>
                        </div>
                    </Col>
                    <Col lg={7} md={7} sm={12} xs={12}>
                        <div className='my-5 '>
                            <h4>About Us</h4>
                            <h2>Simple Ways to eating delicious food</h2>
                            <p>Keep healthy food eating. when you get hungry you're more likely to eat the first thing you see at the front of your eyes</p>
                        </div>
                    </Col>
                </Row>
                <Row className='feedback-section'>
                    <h6>Features</h6>
                    <h3>Our Awesome Services</h3>
                    <Col lg={3} md={3} sm={12} xs={12} className='mt-3'>
                        <div className="feedback-div">
                            <img className="feedback-image" src="/assets/image/home/home_banner.png" ></img>
                            <p>Take taste of awesome food anywhere anytime just order awesome food from once place and single click</p>
                        </div>
                    </Col>
                    <Col lg={3} md={3} sm={12} xs={12} className='mt-3'>
                        <div className="feedback-div">
                            <img className="feedback-image" src="/assets/image/home/home_banner.png" ></img>
                            <p>Take taste of awesome food anywhere anytime just order awesome food from once place and single click</p>
                        </div>
                    </Col>
                    <Col lg={3} md={3} sm={12} xs={12} className='mt-3'>
                        <div className="feedback-div">
                            <img className="feedback-image" src="/assets/image/home/home_banner.png" ></img>
                            <p>Take taste of awesome food anywhere anytime just order awesome food from once place and single click</p>
                        </div>
                    </Col>
                    <Col lg={3} md={3} sm={12} xs={12} className='mt-3'>
                        <div className="feedback-div">
                            <img className="feedback-image" src="/assets/image/home/home_banner.png" ></img>
                            <p>Take taste of awesome food anywhere anytime just order awesome food from once place and single click</p>
                        </div>
                    </Col>
                    
                </Row>
            </Container >
        </div>
        <Footer />
      
        </>
    )
}