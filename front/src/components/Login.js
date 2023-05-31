
import {Link, Navigate} from "react-router-dom";
import {useState} from "react";
import GoogleLogin from "react-google-login";
import { googleLogin, login } from "../utils/user.auth.service";
import { useForm } from 'react-hook-form';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);
    const [token, setToken] = useState(null);
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors }, } = useForm();



    const onSubmit = async (e) => {

        const result = await login(e.email, e.password).then((u)=>{
          if(u!=undefined){
            setNavigate(true);

          }
          else setError("Email or password is not correct")

        }).catch((error) => {
        console.log("error",error);

        });
     
    }
  

    const responseGoogle = async (response) => {
      console.log(response)
      const guser = {
        first_name: response.profileObj.givenName,
        last_name: response.profileObj.familyName,
        email: response.profileObj.email,
        image_url:response.profileObj.imageUrl
      };
    setToken(response.tokenId);
    const token = response.tokenId;
    if (token) {
      try {
        const result = await googleLogin(token)
          .then((prod) => {
            localStorage.setItem("user",JSON.stringify(guser))
            setNavigate(true);
          })
          .catch((error) => {});
      } catch (error) {
        console.log(error);
      }
    }
  };

 
  
    if (navigate) {
        return <Navigate to="/home"/>;
    }

    return (
   
        <div className="body_wrapper">
          <section className="signup_area">
            <div className="row ml-0 mr-0">
              <div className="sign_left signin_left">
                {/* <h2>We are design changers do what matters.</h2> */}
                <img
                  className="position-absolute top"
                  src="/front/img/signup/top_ornamate.png"
                  alt="top"
                />
                <img
                  className="position-absolute bottom"
                  src="/front/img/signup/bottom_ornamate.png"
                  alt="bottom"
                />
                <img
                  className="position-absolute middle"
                  src="/front/img/signup/login.png"
                  alt="bottom"
                />
                <div className="round"></div>
              </div>
              <div className="sign_right signup_right">
                <div className="sign_inner signup_inner">
                  <div className="text-center">
                    <h3>Sign in to Sharing knowledge Platform</h3>
                    <p>
                      Don’t have an account yet?{" "}
                      <Link to="/register">Sign up here</Link>
                    </p>
                    {token ? (
                      <div>Connecté avec succès</div>
                    ) : (
                      <GoogleLogin
                        clientId="767545735730-dbak9de0g63e2n8ou2vnuefgm0c74jvq.apps.googleusercontent.com"
                        buttonText="Se connecter avec Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                      />
                    )}
                    {/* <a href="#" className="btn-google"><img src="/front/img/signup/gmail.png" alt=""/><span className="btn-text">Sign in with Gmail</span></a> */}
                  </div>
                  <div className="divider">
                    <span className="or-text">or</span>
                  </div>
                  <form className="row login_form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-lg-12 form-group">
                      <div className="small_text">Your email</div>
                      <input
                        type="text"
                        className={`form-control  ${errors.email && "invalid"}`}
                        id="email"
                        placeholder="info@capgemini.com"
                        onChange={(e) => setEmail(e.target.value)}
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
                    <div className="col-lg-12 form-group">
                      <div className="small_text">Password</div>
                      <div className="confirm_password">
                        <input
                          id="confirm-password"
                          name="confirm-password"
                          type="password"
                          className={`form-control  ${errors.password && "invalid"}`}
                          placeholder="5+ characters required"
                          autoComplete="off"
                          onChange={(e) => setPassword(e.target.value)}
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
                        {/* <a href="#" className="forget_btn">
                          Forgotten password?
                        </a> */}
                      </div>
                    </div>
    
                    <div className="col-lg-12 text-center">
                      <button type="submit" className="btn action_btn thm_btn">
                        Sign in
                      </button>
                    </div>
                  </form>
                  <div className="mt-2 p-5">
                    <h4 className="error">{error}</h4>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }