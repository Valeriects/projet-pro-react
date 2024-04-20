import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import useMenuToggle from "../../../hook/useMenuToggle";
import CardTime from "../Movie/Components/CardTime";
import { convertDate, formattedTime } from "../../../utils/formatDate.js";

function Home() {
    useMenuToggle()
    const { list } = useSelector((state) => state.movie);
    
    const settings = {
        dots: true,
        lazyLoad: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 1000,
    };
    
    return (
        
        <main className="home">
            <h1>Les films à l&rsquo;affiche</h1>

            <div className="carousel">
                <Slider {...settings}>
                    {list.map((item) => (
                        <div key={item.id}>
                        
                            <figure className="picture">
                                
                                <img src={`${import.meta.env.VITE_API_URL}/img/${item.media[0]?.src_img}`} alt={item.media[0]?.alt_img} />
                                
                            </figure>
                        </div>

                    ))}
                </Slider>
            </div>  


            <section className="homeListe">
                {list.map((item) => (
                    <figure key={item.id}>
                        <img src={`${import.meta.env.VITE_API_URL}/img/${item.media[0]?.src_img}`} alt={item.media[0]?.alt_img} />
                        
                        <figcaption>
                                
                            <h2>{item.title}</h2>
                            
                            <p>réal. : <span>{item.director}</span></p>
                            <p>acteurs : <span>{item.actor}</span></p>
                            <p>genre : <span>{item.categories.join(" - ")}</span></p>
                            <p>année : <span>{convertDate(item.release_date)}</span></p>
                            <p>durée : <span>{formattedTime(item.time)}</span></p>

                        </figcaption>
                        

                        <p>Horaires :</p>
                        <CardTime item={item} />
                        
                        <Link to={`/film/${item.id}`} className="clearfix">Voir plus...</Link>
                    </figure>

                ))}
            </section>

        </main>
    )

}

export default Home;