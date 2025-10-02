/*
This Component Home Page
*/

import "./home.css";

import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import mohsalem_image from "../Assets/MohSalemProfile.jpeg";

const Home = () => {



  return (
    <div className="home">
        {/* <h1>Hero</h1> */}

        <div className="home-left">
            <h2>NEW ARRIVALS ONLY</h2>
            <div>
                <div className="hand-hand-icon">
                    <p>new</p>
                    <img className="hand" src={hand_icon} alt="" />
                </div>
                <p>collections</p>
                <p>for everyone</p>
            </div>

            <div>
                <button className="home-btn">
                    Most Pupular
                    <img src={arrow_icon} alt="" />
                </button>
                    
           </div>
        </div>


        {/* ////////////// */}

        <div className="home-right">
            <img className="mohsalem_img" src={mohsalem_image} alt="" />
        </div>



    </div>
  )
}

export default Home;
