import "./PictureMode.css";
import Nayeon from "../assets/Nayeon.JPG"
import Jeongyeon from "../assets/Jeongyeon.JPG"
import Momo from "../assets/Momo.JPG"
import Sana from "../assets/Sana.JPG"
import Jihyo from "../assets/Jihyo.JPG"
import Mina from "../assets/Mina.JPG"
import Dahyun from "../assets/Dahyun.JPG"
import Chaeyoung from "../assets/Chaeyoung.JPG"
import Tzuyu from "../assets/Tzuyu.JPG"
import Twice from "../assets/Twice.JPG"

const PictureMode = () => {
    return (
        <main>
            <div className="main-container">
                <div className="main-title">
                    <div className="main-greeting">
                        <h1>welcome to your dashboard</h1>
                    </div>
                </div>

                <div className="main-cards">

                    <div className="card">
                        <img src={Nayeon}/>
                        <div className="card-title">
                            <p>Nayeon</p>
                        </div>
                    </div>

                    <div className="card">
                        <img src={Jeongyeon}/>
                        <div className="card-title">
                            <p>Jeongyeon</p>
                        </div>
                    </div>

                    <div className="card">
                        <img src={Momo}/>
                        <div className="card-title">
                            <p>Momo</p>
                        </div>
                    </div>

                    <div className="card">
                        <img src={Sana}/>
                        <div className="card-title">
                            <p>Sana</p>
                        </div>
                    </div>

                    <div className="card">
                        <img src={Jihyo}/>
                        <div className="card-title">
                            <p>Jihyo</p>
                        </div>
                    </div>

                    <div className="card">
                        <img src={Mina}/>
                        <div className="card-title">
                            <p>Mina</p>
                        </div>
                    </div>

                    <div className="card">
                        <img src={Dahyun}/>
                        <div className="card-title">
                            <p>Dahyun</p>
                        </div>
                    </div>

                    <div className="card">
                        <img src={Chaeyoung}/>
                        <div className="card-title">
                            <p>Chaeyoung</p>
                        </div>
                    </div>

                    <div className="card">
                        <img src={Tzuyu}/>
                        <div className="card-title">
                            <p>Tzuyu</p>
                        </div>
                    </div>

                    <div className="card">
                        <img src={Twice}/>
                        <div className="card-title">
                            <p>Twice Comeback!</p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )





};

export default PictureMode;