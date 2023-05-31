import React from 'react'

export default function Footer() {
  return (
    <footer className="doc_footer_area">
    <div className="doc_footer_top bg-transparent">
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-sm-6">
                    <div className="f_widget doc_about_widget wow fadeInUp" data-wow-delay="0.2s">
                        <a href="#">
                            <img src="img/logo.png" srcSet="img/logo-2x.png 2x" alt=""/>
                        </a>
                        <p>I’m available for commissions and collaborations, and i’m excited to hear from you
                            about
                            new projects.!!</p>
                        <ul className="list-unstyled">
                            <li><a href="#"><i className="social_facebook"></i></a></li>
                            <li><a href="#"><i className="social_twitter"></i></a></li>
                            <li><a href="#"><i className="social_vimeo"></i></a></li>
                            <li><a href="#"><i className="social_linkedin"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-2 col-sm-6">
                    <div className="f_widget doc_service_list_widget pl-30 wow fadeInUp" data-wow-delay="0.3s">
                        <h3 className="f_title_two">Solutions</h3>
                        <ul className="list-unstyled">
                            <li><a href="#"><img src="img/new/smile2.png" alt=""/>Help Docs</a></li>
                            <li><a href="#"><img src="img/new/doc2.png" alt=""/>Docbuzz</a></li>
                            <li><a href="#"><img src="img/new/house2.png" alt=""/>User Frontend</a></li>
                            <li><a href="#"><img src="img/new/bag2.png" alt=""/>Lightbox</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <div className="f_widget doc_service_list_widget pl-100 wow fadeInUp" data-wow-delay="0.4s">
                        <h3 className="f_title_two">Support</h3>
                        <ul className="list-unstyled">
                            <li><a href="#">Help Desk</a></li>
                            <li><a href="#">Knowledge Base</a></li>
                            <li><a href="#">Live Chat</a></li>
                            <li><a href="#">Integrations</a></li>
                            <li><a href="#">Reports</a></li>
                            <li><a href="#">Messages</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <div className="f_widget doc_service_list_widget pl-70 wow fadeInUp" data-wow-delay="0.5s">
                        <h3 className="f_title_two">Company</h3>
                        <ul className="list-unstyled">
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Testimonials</a></li>
                            <li><a href="#">Affiliates</a></li>
                            <li><a href="#">Partners</a></li>
                            <li><a href="#">Careers</a></li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="doc_footer_bottom">
        <div className="container d-flex justify-content-between">
            <ul className="doc_footer_menu list-unstyled wow fadeInUp" data-wow-delay="0.2s">
                <li><a href="#">Blog</a></li>
                <li><a href="#">Latest Projects</a></li>

            </ul>
            <p className="wow fadeInUp" data-wow-delay="0.3s">© 2021 All Rights Reserved Design by
                <span>Spider-themes</span>
            </p>
        </div>
    </div>
</footer>
  )
}
