import React, { useState } from "react";
import '../../assets/css/main.css'
import { useNavigate } from "react-router-dom";
import mainimage from '../../assets/images/section1img.png'
import aboutimg from '../../assets/images/aboutus.png'
import car from '../../assets/images/car.png'
import cleaning from '../../assets/images/cleaning.png'
import garden from '../../assets/images/garden.png'
import hair from '../../assets/images/hair.png'
import makeup from '../../assets/images/makeup.png'
import pet from '../../assets/images/pet.png'
import tutor from '../../assets/images/tutor.png'
import fitness from '../../assets/images/fitness.png'
import contactus from '../../assets/images/contactus.png'
import { FaBarsStaggered } from "react-icons/fa6";

export default function Landing(){
    const navigate=useNavigate()
    const[openNav,setOpenNav]=useState(false)
    return(
        <>
            <div>
            <section className="firstSection">
                <div className="navsection">
                    <nav>
                        <div className="Lanlogo">
                            <h1>Service Harbour</h1>
                        </div>
                        <ul className={openNav ? "navOpen":""}>
                            <li><a href="#">Home</a></li>
                            <li><a href="#About">About us</a></li>
                            <li><a href="#Service">Service</a></li>
                            <li><a href="#career">Career</a></li>
                            <li><a href="#contact">Contact us</a></li>
                        </ul>
                        <div className="bars" onClick={()=>{
                            setOpenNav(!openNav)
                        }}>
                            <FaBarsStaggered />
                        </div>
                    </nav>
                </div>
                <div className="mainContent">
                    <div className="content">
                        <h1>Service Harbour</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis perferendis reprehenderit quaerat asperiores recusandae sequi soluta tenetur accusamus delectus, rem eveniet. Nisi architecto commodi iure, sed similique ab dolor ullam eveniet quia expedita repellendus at dolorum sequi! Rem, cum accusantium nulla, eum magni quae, perspiciatis consectetur distinctio tenetur non dolor.</p>
                        <button onClick={()=>navigate('/signup')} className="srvcbtn">Join now</button>
                    </div>
                    <div className="mainImage">
                        <img src={mainimage} alt="No image" />
                    </div>
                </div>
            </section>
            <section className="aboutus" id="About">
                <div className="aboutcontent">
                    <div className="aboutusallContent">
                        <div className="aboutImage">
                            <img src={aboutimg} alt="no image"/>
                        </div>
                        <div className="aboutcontents">
                            <h1>About us</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex id quisquam nostrum ut? Excepturi, dicta voluptates? Quibusdam quisquam id vitae, excepturi ab sunt, numquam a tenetur deserunt omnis repudiandae similique iusto, eligendi minima culpa at. Quos animi totam adipisci laboriosam voluptate minima expedita enim laudantium incidunt, explicabo, fugit deleniti, dolorem amet? Quae eligendi laboriosam at autem assumenda libero amet eius quisquam et voluptas. Adipisci sed nulla autem possimus dolores cum harum esse repudiandae debitis modi sint, ratione porro impedit alias sequi suscipit in est maiores natus neque. Reiciendis perferendis tenetur saepe totam, consequatur ipsam ipsum numquam! Iure quis voluptatem numquam ut perferendis voluptates, molestias beatae vero laborum incidunt, non, eligendi porro modi quos autem. Aspernatur exercitationem similique doloribus pariatur! Minima nisi, cupiditate voluptate molestiae possimus, illo, dicta dolores laboriosam voluptas nostrum neque nemo deserunt! Libero similique excepturi illo provident corporis nemo ex est eos! Nesciunt magnam vitae incidunt placeat nostrum.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="servicesSection" id="Service">
                <div className="serviceContent">
                    <h1>Services</h1>
                    <div className="serviceCards">
                        <div className="card">
                            <div className="serviceImg">
                                <img src={tutor} alt="No image" />
                            </div>
                            <div className="cardcontent">
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat aperiam dolorem modi cumque veniam, facere saepe dolor quam! Unde sit repudiandae odio, aliquam delectus dolorem enim! Culpa quos neque tempore!</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="serviceImg">
                                <img src={car} alt="No image" />
                            </div>
                            <div className="cardcontent">
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat aperiam dolorem modi cumque veniam, facere saepe dolor quam! Unde sit repudiandae odio, aliquam delectus dolorem enim! Culpa quos neque tempore!</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="serviceImg">
                                <img src={pet} alt="No image" />
                            </div>
                            <div className="cardcontent">
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat aperiam dolorem modi cumque veniam, facere saepe dolor quam! Unde sit repudiandae odio, aliquam delectus dolorem enim! Culpa quos neque tempore!</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="serviceImg">
                                <img src={makeup} alt="No image" />
                            </div>
                            <div className="cardcontent">
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat aperiam dolorem modi cumque veniam, facere saepe dolor quam! Unde sit repudiandae odio, aliquam delectus dolorem enim! Culpa quos neque tempore!</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="serviceImg">
                                <img src={garden} alt="No image" />
                            </div>
                            <div className="cardcontent">
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat aperiam dolorem modi cumque veniam, facere saepe dolor quam! Unde sit repudiandae odio, aliquam delectus dolorem enim! Culpa quos neque tempore!</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="serviceImg">
                                <img src={fitness} alt="No image" />
                            </div>
                            <div className="cardcontent">
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat aperiam dolorem modi cumque veniam, facere saepe dolor quam! Unde sit repudiandae odio, aliquam delectus dolorem enim! Culpa quos neque tempore!</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="serviceImg">
                                <img src={cleaning} alt="No image" />
                            </div>
                            <div className="cardcontent">
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat aperiam dolorem modi cumque veniam, facere saepe dolor quam! Unde sit repudiandae odio, aliquam delectus dolorem enim! Culpa quos neque tempore!</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="serviceImg">
                                <img src={hair} alt="No image" />
                            </div>
                            <div className="cardcontent">
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat aperiam dolorem modi cumque veniam, facere saepe dolor quam! Unde sit repudiandae odio, aliquam delectus dolorem enim! Culpa quos neque tempore!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="career" id="career">
                <h1>Careers</h1>
            </section>
            <section className="contactus" id="contact">
                <div className="contactDetails">
                    <h1>Contact us</h1>
                    <div className="contactform">
                        <div className="contactformDetails">
                            <div className="contact_title">
                                <h1>Contact us</h1>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, blanditiis?</p>
                            </div>                            
                            
                            <h1>Phonenumber:<span>+1 8569740231</span></h1>
                        </div>
                        <div className="conatactfields">
                            <form action="#">
                                <div className="form_details">
                                    <input type="text" name="Fullname" id="" />
                                    <label htmlFor="Fullname">Full name:</label>
                                </div>
                                <div className="form_details">
                                    <input type="number" name="Phonenumber" id="" />
                                    <label htmlFor="Phonenumber">Phonenumber:</label>
                                </div>
                                <div className="form_details">
                                    <input type="email" name="Email" id="" />
                                    <label htmlFor="Email">Email:</label>
                                </div>
                                <div className="form_details">
                                    <textarea type="text" name="Message" id="" />
                                    <label htmlFor="Message">Message :</label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        </>
    )
}