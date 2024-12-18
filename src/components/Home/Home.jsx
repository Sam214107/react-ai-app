import React,{useState} from 'react'
import reportImage from '../../report.jpg';
import TextComponent from '../AuthComponents/TextComponent';
import LoginComponent from '../AuthComponents/LoginComponent';
import SignupComponent from '../AuthComponents/SignupComponent';

const Home = () => {

    const [buttonState, setStates] = useState({
        textButton: true,
        loginButton: false,
        signUpButton: false,
      });

      const handleClick = (button) => {
        setStates({
            textButton: button === 'tb',
            loginButton: button === 'lb',
            signUpButton: button === 'sb',
        });
      };
    

  return (
    <div className="container hero-container">
      <div className="row align-items-center">
        {buttonState.textButton && <TextComponent onClick={() => handleClick('lb')} />}
        {buttonState.loginButton && <LoginComponent onClick={() => handleClick('sb')}  />}
        {buttonState.signUpButton && <SignupComponent onClick={() => handleClick('lb')}/>}
        <div className="col-md-6">
          <img 
            src={reportImage} // Use the imported image variable here
            alt="AI Reporting Illustration" 
            className="img-fluid" 
          />
        </div>
      </div>
    </div>
  )
}

export default Home
