import {useEffect, useState} from "react";
import axios from "axios";
import {Link, Navigate} from "react-router-dom";
import { getCurrentUser } from "../utils/user.auth.service";

export default function Home() {
    // 

    return (
        <div className="body_wrapper">
          

          <section className="recommended_topic_area">
            <div className="container">
              <div className="recommended_topic_inner">
                <img className="doc_shap_one" src="/front/img/new/shap.png" alt="" />
                <div
                  className="doc_round one"
                  data-parallax='{"x": -80, "y": -100, "rotateY":0}'
                ></div>
                <div
                  className="doc_round two"
                  data-parallax='{"x": -10, "y": 70, "rotateY":0}'
                ></div>
                <div className="doc_title text-center">
                  <h2 className="wow fadeInUp" data-wow-delay="0.2s">
                    Recommended Topics
                  </h2>
                  <p className="wow fadeInUp" data-wow-delay="0.4s">
                    Loaded with awesome features like Documentation, Knowledgebase,
                    Forum & more!
                  </p>
                </div>
                <div className="row">
                  <div className="col-lg-3 col-6">
                    <div
                      className="recommended_item wow fadeInUp"
                      data-wow-delay="0.2s"
                    >
                      <img src="/front/img/new/smile.png" alt="" />
                      <a href="#">
                        <h3>Getting Started</h3>
                      </a>
                      <ul className="list-unstyled">
                        <li>
                          <a href="#">Welcome to Ghost</a>
                        </li>
                        <li>
                          <a href="#">Writing posts with Ghost</a>
                        </li>
                        <li>
                          <a href="#">Publishing options</a>
                        </li>
                        <li>
                          <a href="#">Managing admin settings</a>
                        </li>
                        <li>
                          <a href="#">Organising your content</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-6">
                    <div
                      className="recommended_item wow fadeInUp"
                      data-wow-delay="0.3s"
                    >
                      <img src="/front/img/new/house.png" alt="" />
                      <a href="#">
                        <h3>Advanced Usage</h3>
                      </a>
                      <ul className="list-unstyled">
                        <li>
                          <a href="#">Getting started</a>
                        </li>
                        <li>
                          <a href="#">Become a Pro</a>
                        </li>
                        <li>
                          <a href="#">Admin & Billing</a>
                        </li>
                        <li>
                          <a href="#">Mobile App</a>
                        </li>
                        <li>
                          <a href="#">Guides</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-6">
                    <div
                      className="recommended_item wow fadeInUp"
                      data-wow-delay="0.4s"
                    >
                      <img src="/front/img/new/doc.png" alt="" />
                      <a href="#">
                        <h3>Knowledge Base</h3>
                      </a>
                      <ul className="list-unstyled">
                        <li>
                          <a href="#">Organising content in Ghost</a>
                        </li>
                        <li>
                          <a href="#">Using the editor</a>
                        </li>
                        <li>
                          <a href="#">General publication settings</a>
                        </li>
                        <li>
                          <a href="#">Publishing Options</a>
                        </li>
                        <li>
                          <a href="#">Knowledge Base</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-6">
                    <div
                      className="recommended_item wow fadeInUp"
                      data-wow-delay="0.5s"
                    >
                      <img src="/front/img/new/bag.png" alt="" />
                      <a href="#">
                        <h3>User Settings</h3>
                      </a>
                      <ul className="list-unstyled">
                        <li>
                          <a href="#">How do I reset my password</a>
                        </li>
                        <li>
                          <a href="#">Managing your team</a>
                        </li>
                        <li>
                          <a href="#">Can I add my social accounts</a>
                        </li>
                        <li>
                          <a href="#">Imports and exports</a>
                        </li>
                        <li>
                          <a href="#">Design Settings</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="text-center wow fadeInUp" data-wow-delay="0.2s">
                  <a href="#" className="question_text">
                    Want to know more or have a Question?
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section className="doc_community_area">
            <img
              className="shap_one"
              src="/front/img/new/community_bg_shap_one.png"
              alt=""
            />
            <img
              className="shap_two"
              src="/front/img/new/community_bg_shap_two.png"
              alt=""
            />
            <div className="container">
              <div className="doc_title text-center">
                <h2 className="wow fadeInUp" data-wow-delay="0.2s">
                  How Docy works
                </h2>
                <p className="wow fadeInUp" data-wow-delay="0.4s">
                  Learn languages online with the world's best tutors
                </p>
              </div>
              <div className="doc_community_info">
                <div
                  className="doc_community_item wow fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div className="doc_community_icon">
                    <i className="icon_folder-alt"></i>
                  </div>
                  <div className="doc_entry_content">
                    <a href="#">
                      <h4>The Intercom Messenger</h4>
                    </a>
                    <p>
                      Setting up and customizing your Messenger to start chatting
                      with customers
                    </p>
                    <div className="doc_entry_info">
                      <ul className="list-unstyled author_avatar">
                        <li>
                          <img src="/front/img/new/img_02.png" alt="" />
                        </li>
                        <li>
                          <img src="/front/img/new/img_03.png" alt="" />
                        </li>
                        <li>
                          <img src="/front/img/new/img_04.png" alt="" />
                        </li>
                        <li>+2</li>
                      </ul>
                      <div className="text">
                        76 articles in this collection Written by Ruairí Galavan,
                        Jack Jenkins, DJ and 7 others
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="doc_community_item wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="doc_community_icon">
                    <i className="icon_comment_alt"></i>
                  </div>
                  <div className="doc_entry_content">
                    <a href="#">
                      <h4>The Intercom Messenger</h4>
                    </a>
                    <p>
                      Setting up and customizing your Messenger to start chatting
                      with customers
                    </p>
                    <div className="doc_entry_info">
                      <ul className="list-unstyled author_avatar">
                        <li>
                          <img src="/front/img/new/img_02.png" alt="" />
                        </li>
                        <li>
                          <img src="/front/img/new/img_03.png" alt="" />
                        </li>
                        <li>
                          <img src="/front/img/new/img_04.png" alt="" />
                        </li>
                        <li>+2</li>
                      </ul>
                      <div className="text">
                        76 articles in this collection Written by Ruairí Galavan,
                        Jack Jenkins, DJ and 7 others
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="doc_community_item wow fadeInUp"
                  data-wow-delay="0.4s"
                >
                  <div className="doc_community_icon">
                    <i className=" icon_lightbulb_alt"></i>
                  </div>
                  <div className="doc_entry_content">
                    <a href="#">
                      <h4>The Intercom Messenger</h4>
                    </a>
                    <p>
                      Setting up and customizing your Messenger to start chatting
                      with customers
                    </p>
                    <div className="doc_entry_info">
                      <ul className="list-unstyled author_avatar">
                        <li>
                          <img src="/front/img/new/img_02.png" alt="" />
                        </li>
                        <li>
                          <img src="/front/img/new/img_03.png" alt="" />
                        </li>
                        <li>
                          <img src="/front/img/new/img_04.png" alt="" />
                        </li>
                        <li>+2</li>
                      </ul>
                      <div className="text">
                        76 articles in this collection Written by Ruairí Galavan,
                        Jack Jenkins, DJ and 7 others
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center wow fadeInUp" data-wow-delay="0.4s">
                  <a href="#" className="question_text">
                    Contact us and we’ll get back to you as soon as we can.
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section className="doc_testimonial_area">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="doc_testimonial_slider">
                    <div className="item">
                      <h3>
                        Tinkety tonk old fruit victoria sponge squiffy bleeder twit
                        the bee's knees loo David, buggered haggle pear shaped
                        bubble and squeak.”
                      </h3>
                      <div className="name">
                        Penny Tool, <span>Director of Sales and Success</span>
                      </div>
                      <a href="#" className="sign">
                        <img src="/front/img/new/sign.png" alt="" />
                      </a>
                    </div>
                    <div className="item">
                      <h3>
                        Hendrerit laoreet incidunt molestie eum placeat, neque
                        ridiculus? Maecenas incididunt aperiam tempora cumque quos?”
                      </h3>
                      <div className="name">
                        Penny Tool, <span>Director of Sales and Success</span>
                      </div>
                      <a href="#" className="sign">
                        <img src="/front/img/new/sign.png" alt="" />
                      </a>
                    </div>
                    <div className="item">
                      <h3>
                        Curabitur vitae dignissimos pulvinar eligendi ullamcorper,
                        laoreet, accusantium numquam habitant quaerat minim
                        consequatur”
                      </h3>
                      <div className="name">
                        Penny Tool, <span>Director of Sales and Success</span>
                      </div>
                      <a href="#" className="sign">
                        <img src="/front/img/new/sign.png" alt="" />
                      </a>
                    </div>
                    <div className="item">
                      <h3>
                        Tinkety tonk old fruit victoria sponge squiffy bleeder twit
                        the bee's knees loo David, buggered haggle pear shaped
                        bubble and squeak.”
                      </h3>
                      <div className="name">
                        Penny Tool, <span>Director of Sales and Success</span>
                      </div>
                      <a href="#" className="sign">
                        <img src="/front/img/new/sign.png" alt="" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="doc_img_slider">
                    <div className="item">
                      <img className="dot" src="/front/img/new/dot.png" alt="" />
                      <div className="round one"></div>
                      <div className="round two"></div>
                      <img src="/front/img/new/feedback_img.jpg" alt="" />
                    </div>
                    <div className="item">
                      <img className="dot" src="/front/img/new/dot.png" alt="" />
                      <div className="round one"></div>
                      <div className="round two"></div>
                      <img src="/front/img/new/feedback_img_02.jpg" alt="" />
                    </div>
                    <div className="item">
                      <img className="dot" src="/front/img/new/dot.png" alt="" />
                      <div className="round one"></div>
                      <div className="round two"></div>
                      <img src="/front/img/new/feedback_img_03.jpg" alt="" />
                    </div>
                    <div className="item">
                      <img className="dot" src="/front/img/new/dot.png" alt="" />
                      <div className="round one"></div>
                      <div className="round two"></div>
                      <img src="/front/img/new/feedback_img_04.jpg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="doc_subscribe_area">
            <div className="container">
              <div className="doc_subscribe_inner">
                <img
                  className="one"
                  src="/front/img/new/subscribe_shap.png"
                  alt=""
                />
                <img
                  className="two"
                  src="/front/img/new/subscribe_shap_two.png"
                  alt=""
                />
                <div className="text wow fadeInLeft" data-wow-delay="0.2s">
                  <h2>Great Customer </h2>
                </div>
                <form
                  action="#"
                  className="doc_subscribe_form wow fadeInRight mailchimp"
                  data-wow-delay="0.4s"
                  method="post"
                >
                  <div className="form-group">
                    <div className="input-fill">
                      <input
                        type="email"
                        name="EMAIL"
                        id="email"
                        className="memail"
                        placeholder="Your work email"
                      />
                    </div>
                    <button type="submit" className="submit_btn">
                      Get started
                    </button>
                    <p className="mchimp-errmessage"></p>
                    <p className="mchimp-sucmessage"></p>
                  </div>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">Messenger</a>
                    </li>
                    <li>
                      <a href="#">Product Tours</a>
                    </li>
                    <li>
                      <a href="#">Inbox and more</a>
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </section>
         
        </div>
      );
    }