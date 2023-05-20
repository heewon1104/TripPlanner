import './login.css';

import logo_img from './assets/logo.PNG';

const Mylogin = () =>{
    return (
        <div class="mainbox">
            <div className="home-container">
                <div className="img_box">
                    <div class="img_airplane" ></div>
                </div>
                <div className="login_box">
                    <div class="home_box1 ">
                        <img class="img_logo" src={logo_img} alt="airplane"></img>
                            <form class="login_form" method="get" action="main">
                                <div class="home_box2 box">
                                    <input id="login_id" class="input_login" type="text" placeholder="user ID" name="button_id"/>
                                </div>
                                <div class="home_box2 box">
                                    <input id="login_pw" class="input_login" type="password" placeholder="user PW" name="button_pw"/>
                                </div>
                                <input id="login_btn" class="btn_login box" type="submit" disabled value="로그인"/>
                            
                            </form>
                        </div>
                        <div class="home_box3">
                            <div class="register">
                                <a class="regi_link" href="https://www.naver.com/">Register</a>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}


export default Mylogin;