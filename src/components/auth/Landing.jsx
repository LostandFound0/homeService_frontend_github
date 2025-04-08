import React, { useState } from "react";
import '../../assets/css/landing.css';
import { useNavigate } from "react-router-dom";
import mainimage from '../../assets/images/section1img.png';
import aboutimg from '../../assets/images/aboutus.png';
import car from '../../assets/images/car.png';
import cleaning from '../../assets/images/cleaning.png';
import garden from '../../assets/images/garden.png';
import hair from '../../assets/images/hair.png';
import makeup from '../../assets/images/makeup.png';
import pet from '../../assets/images/pet.png';
import tutor from '../../assets/images/tutor.png';
import fitness from '../../assets/images/fitness.png';
import { FaBars, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function Landing() {
    const navigate = useNavigate();
    const [openNav, setOpenNav] = useState(false);

    return (
        <div className="landing-container">
            <header className="header">
                <div className="container">
                    <div className="header-content">
                        <div className="logo">
                            <h1>Service Harbour</h1>
                        </div>

                        <nav className={`nav ${openNav ? "open" : ""}`}>
                            <button className="close-btn" onClick={() => setOpenNav(false)}>
                                <IoClose />
                            </button>
                            <ul>
                                <li><a href="#" onClick={() => setOpenNav(false)}>Home</a></li>
                                <li><a href="#about" onClick={() => setOpenNav(false)}>About</a></li>
                                <li><a href="#services" onClick={() => setOpenNav(false)}>Services</a></li>
                                <li><a href="#careers" onClick={() => setOpenNav(false)}>Careers</a></li>
                                <li><a href="#contact" onClick={() => setOpenNav(false)}>Contact</a></li>
                            </ul>
                        </nav>

                        <button className="join-btn" onClick={() => navigate('/signup')}>Join Now</button>

                        <button className="menu-btn" onClick={() => setOpenNav(!openNav)}>
                            <FaBars />
                        </button>
                    </div>
                </div>
            </header>

            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1>Your Trusted Service Provider</h1>
                            <p>Connecting you with top-quality service professionals for all your needs. From home maintenance to personal care, we've got you covered.</p>
                            <div className="hero-buttons">
                                <button className="primary-btn" onClick={() => navigate('/signup')}>Get Started</button>
                                <button className="secondary-btn">Learn More</button>
                            </div>
                        </div>
                        <div className="hero-image">
                            <img src={mainimage} alt="Service Harbour" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="about" id="about">
                <div className="container">
                    <div className="section-header">
                        <h2>About Us</h2>
                        <p>Who we are and what we stand for</p>
                    </div>
                    <div className="about-content">
                        <div className="about-image">
                            <img src={aboutimg} alt="About Service Harbour" />
                        </div>
                        <div className="about-text">
                            <h3>Our Story</h3>
                            <p>Service Harbour was founded with a simple mission: to make finding reliable service professionals effortless. We understand the challenges of finding trustworthy help, and we've built a platform that connects you with vetted experts in your area.</p>
                            <p>Our team is dedicated to ensuring quality service and customer satisfaction. We carefully screen all service providers to maintain high standards across all categories.</p>
                            <div className="about-stats">
                                <div className="stat">
                                    <h4>500+</h4>
                                    <p>Service Providers</p>
                                </div>
                                <div className="stat">
                                    <h4>10K+</h4>
                                    <p>Happy Customers</p>
                                </div>
                                <div className="stat">
                                    <h4>24/7</h4>
                                    <p>Customer Support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="services" id="services">
                <div className="container">
                    <div className="section-header">
                        <h2>Our Services</h2>
                        <p>Comprehensive solutions for all your needs</p>
                    </div>
                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-icon">
                                <img src={tutor} alt="Tutoring" />
                            </div>
                            <h3>Tutoring</h3>
                            <p>Expert tutors for all subjects and grade levels, available for in-person or online sessions.</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">
                                <img src={car} alt="Auto Services" />
                            </div>
                            <h3>Auto Services</h3>
                            <p>Professional mechanics and detailers to keep your vehicle in top condition.</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">
                                <img src={pet} alt="Pet Care" />
                            </div>
                            <h3>Pet Care</h3>
                            <p>Grooming, walking, sitting, and veterinary services for your furry friends.</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">
                                <img src={makeup} alt="Beauty" />
                            </div>
                            <h3>Beauty</h3>
                            <p>Professional makeup artists, hairstylists, and beauty technicians for any occasion.</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">
                                <img src={garden} alt="Gardening" />
                            </div>
                            <h3>Gardening</h3>
                            <p>Landscaping, lawn care, and gardening services to enhance your outdoor space.</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">
                                <img src={fitness} alt="Fitness" />
                            </div>
                            <h3>Fitness</h3>
                            <p>Personal trainers and fitness instructors to help you achieve your health goals.</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">
                                <img src={cleaning} alt="Cleaning" />
                            </div>
                            <h3>Cleaning</h3>
                            <p>Thorough and reliable cleaning services for homes and offices.</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">
                                <img src={hair} alt="Hair Care" />
                            </div>
                            <h3>Hair Care</h3>
                            <p>Professional stylists for cuts, coloring, treatments, and special occasion styling.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="careers" id="careers">
                <div className="container">
                    <div className="careers-content">
                        <div className="careers-text">
                            <h2>Join Our Team</h2>
                            <p>We're always looking for talented professionals to join our network of service providers.</p>
                            <p>At Service Harbour, we value quality, reliability, and excellent customer service. If you're a skilled professional looking to grow your business, we'd love to hear from you.</p>
                            <button className="primary-btn">View Open Positions</button>
                        </div>
                        <div className="careers-benefits">
                            <h3>Why Join Us?</h3>
                            <ul>
                                <li>Access to a large customer base</li>
                                <li>Flexible scheduling</li>
                                <li>Competitive earnings</li>
                                <li>Marketing and promotion support</li>
                                <li>Easy payment processing</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact" id="contact">
                <div className="container">
                    <div className="section-header">
                        <h2>Contact Us</h2>
                        <p>We'd love to hear from you</p>
                    </div>
                    <div className="contact-content">
                        <div className="contact-info">
                            <div className="info-card">
                                <div className="info-icon"><FaPhone /></div>
                                <h3>Phone</h3>
                                <p>+1 856-974-0231</p>
                                <p>Mon-Fri: 9am-6pm</p>
                            </div>
                            <div className="info-card">
                                <div className="info-icon"><FaEnvelope /></div>
                                <h3>Email</h3>
                                <p>info@serviceharbour.com</p>
                                <p>support@serviceharbour.com</p>
                            </div>
                            <div className="info-card">
                                <div className="info-icon"><FaMapMarkerAlt /></div>
                                <h3>Location</h3>
                                <p>123 Service Street</p>
                                <p>Harbour City, HC 12345</p>
                            </div>
                            <div className="info-card">
                                <div className="info-icon"><FaClock /></div>
                                <h3>Hours</h3>
                                <p>Monday-Friday: 9am-6pm</p>
                                <p>Saturday: 10am-4pm</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-logo">
                            <h2>Service Harbour</h2>
                            <p>Connecting you with quality service professionals</p>
                        </div>
                        <div className="footer-links">
                            <div className="link-group">
                                <h3>Company</h3>
                                <ul>
                                    <li><a href="#about">About Us</a></li>
                                    <li><a href="#services">Services</a></li>
                                    <li><a href="#careers">Careers</a></li>
                                    <li><a href="#contact">Contact</a></li>
                                </ul>
                            </div>
                            <div className="link-group">
                                <h3>Support</h3>
                                <ul>
                                    <li><a href="#">Help Center</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Terms of Service</a></li>
                                    <li><a href="#">FAQs</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; {new Date().getFullYear()} Service Harbour. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
