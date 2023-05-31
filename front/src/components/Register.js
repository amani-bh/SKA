import {useState} from "react";
import axios from "axios";
import {Link, Navigate} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { signUp } from "../utils/user.auth.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);
    const { register, handleSubmit, formState: { errors }, getValues,} = useForm();

    const onSubmit = async (e) => {
        console.log(e.email)
       

        const result=await signUp(e.first_name,e.last_name, e.email,e.phone, e.password).then(user=>{
            if (user!=undefined){

           toast.success("SignUp  successfully!");
            setNavigate(true);


            }
        })
       

    }

    if (navigate) {
        return <Navigate to="/login"/>;
    }

    return (

        <div className="body_wrapper">
        <section className="signup_area signup_area_height">
            <div className="row ml-0 mr-0">
                <div className="sign_left signup_left">
                    {/* <h2>We are design changers do what matters.</h2> */}
                    <img className="position-absolute top" src="/front/img/signup/top_ornamate.png" alt="top"/>
                    <img className="position-absolute bottom" src="/front/img/signup/bottom_ornamate.png" alt="bottom"/>
                    <img className="position-absolute middle wow fadeInRight" src="/front/img/signup/man_image.png" alt="bottom"/>
                    <div className="round wow zoomIn" data-wow-delay="0.2s"></div>
                </div>
                <div className="sign_right signup_right">
                    <div className="sign_inner signup_inner">
                        <div className="text-center">
                            <h3>Create your SKA Account</h3>
                            <p>Already have an account? <Link to="/login">Sign in</Link></p>
                            <a href="#" className="btn-google"><img src="/front/img/signup/gmail.png" alt=""/><span className="btn-text">Sign up with Google</span></a>
                        </div>
                        <div className="divider">
                            <span className="or-text">or</span>
                        </div>
                        <form action="#" className="row login_form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="col-sm-6 form-group">
                                <div className="small_text">First name</div>
                                <input type="text" className={`form-control  ${errors.first_name && "invalid"}`} name="name" id="name" placeholder="Muhammad"onChange={e => setFirstName(e.target.value)}
                                 {...register("first_name", {
                                    required: "First Name is Required",
                                  })} />
                                   {errors.first_name && (
                    <small className="text-danger">{errors.first_name.message}</small>
                       )}
                            </div>
                            <div className="col-sm-6 form-group">
                                <div className="small_text">Last name</div>
                                <input type="text" className={`form-control  ${errors.last_name && "invalid"}`} name="lname" id="lname" placeholder="Jewel" onChange={e => setLastName(e.target.value)}
                                 {...register("last_name", {
                                    required: "Last Name is Required",
                                  })} />
                                   {errors.last_name && (
                    <small className="text-danger">{errors.last_name.message}</small>
                       )}
                            </div>
                            <div className="col-lg-6 form-group">
                                <div className="small_text">Your email</div>
                                <input type="email" className={`form-control  ${errors.email && "invalid"}`} id="email" placeholder="info@Docy.com" onChange={e => setEmail(e.target.value)}
                                 {...register("email", {
                                    required: "Email is Required",
                                    pattern: {
                                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                      message: "invalid email address"
                                    }
                                  })}
                                 
                                />
                                 {errors.email && (
                              <small className="text-danger">{errors.email.message}</small>
                                 )}
                            </div>
        
                            <div className="col-lg-6 form-group">
                                <div className="small_text">Your Phone</div>
                                <input type="text" className={`form-control  ${errors.phone && "invalid"}`} id="phone" placeholder="12345678" onChange={e => setPhone(e.target.value)}
                                 {...register("phone", {
                                    required: "Phone is Required",
                                    pattern: {
                                      value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                      message: "invalid phone number"
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Minimum Required length is 8",
                                      },
                                  })}
                                 
                                />
                                 {errors.phone && (
                              <small className="text-danger">{errors.phone.message}</small>
                                 )}
                            </div>
        
                            <div className="col-lg-6 form-group">
                                <div className="small_text">Password</div>
                                <input id="signup-password" name="password" type="password" className={`form-control  ${errors.password && "invalid"}`} placeholder="5+ characters required" autoComplete="off" onChange={e => setPassword(e.target.value)}
                               {...register("password", {
                                required: "Password is Required",
                                minLength: {
                                  value: 5,
                                  message: "Minimum Required length is 5",
                                },
                                maxLength: {
                                  value: 15,
                                  message: "Maximum allowed length is 15 ",
                                },
                              })}
                             
                            />
                             {errors.password && (
                        <small className="text-danger">{errors.password.message}</small>
                           )}
                            </div>
                            <div className="col-lg-6 form-group">
                                <div className="small_text">Confirm password</div>
                                <input id="confirm-password" name="confirm-password" type="password" className={`form-control  ${errors.confirmPassword && "invalid"}`} placeholder="5+ characters required" autoComplete="off"
                                
                                {...register("confirmPassword", {
                                    validate: (value) =>
                                           value === getValues("password")
                                })}

                                  />
                                  {errors.confirmPassword && errors.confirmPassword.type === "validate" && <small className="text-danger">Passwords do not match</small>}
                            </div>
                            {/* <div className="col-lg-12 form-group">
                                <div className="check_box">
                                    <input type="checkbox" value="None" id="squared2" name="check"/>
                                    <label className="l_text" htmlFor="squared2">I accept the <span>politic of confidentiality</span></label>
                                </div>
                            </div> */}
                            <div className="col-lg-12 text-center">
                                <button type="submit" className="btn action_btn thm_btn">Create an account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        </section>
        </div>
          )
}