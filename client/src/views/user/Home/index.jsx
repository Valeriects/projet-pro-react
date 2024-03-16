import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Home() {

    const {list} = useSelector((state) => state.movie);

    console.log(list);
    
    const settings = {
        dots: true,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2
    };
    
    return (
        
        <main className="home">
            <h1>Les films à l&rsquo;affiche</h1>

            <div className="carousel">
                <Slider {...settings}>
                    {list.map((item) => (
                        <div key={item.id}>
                        
                            <figure className="picture">
                                
                                <img src={`http://localhost:9000/img/${item.media[0].src}`} alt={item.media[0].alt} />

                                {/* <iframe width="560" height="315" src={item.media[1].src} title={item.media[1].alt} frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                                
                                <figcaption>{item.alt}</figcaption>
                                
                            </figure>
                        </div>

                    ))}
                </Slider>
            </div>  


            <section className="homeListe">
                {list.map((item) => (
                    <figure key={item.id}>
                        <img src={`http://localhost:9000/img/${item.media[0].src}`} alt={item.media[0].alt} />
                        
                        <figcaption>
                                
                            <h2>{item.title}</h2>
                            
                            <p>réal. : <span>{item.director}</span></p>
                            <p>acteurs : <span>{item.actor}</span></p>
                            <p>genre : <span>{item.categories.join(" - ")}</span></p>
                            <p>année : <span>{item.release_date}</span></p>
                            <p>durée : <span>{item.time}</span></p>

                        </figcaption>
                        <Link to={`/film/${item.id}`} className="clearfix">Voir plus...</Link>
                    </figure>



                ))}
            </section>

        </main>
    )

}

export default Home;