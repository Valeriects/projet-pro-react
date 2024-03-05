import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {

    const {list} = useSelector((state) => state.movie);

    // console.log("hello");
    console.log(list);
    
    return (
        
        <main className="home">
            <h1>Les films à l&rsquo;affiche</h1>

            <section  className="carousel">
            {list.map((item) => (
                
                        
                <figure key={item.id} className="picture">
                    <img src={`http://localhost:9000/img/${item.media[0].src}`} alt={item.media[0].alt} />

                    {/* <iframe width="560" height="315" src={item.media[1].src} title={item.media[1].alt} frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                    
                    <figcaption>{item.alt}</figcaption>
                    
                </figure>

            ))}
            </section>  

            {list.map((item) => (

                <section key={item.id} className="homeListe">
                    <h2>{item.title}</h2>

                    <img src={`http://localhost:9000/img/${item.media[0].src}`} alt={item.media[0].alt} />

                    <p>{item.director}</p>
                    <p>{item.actor}</p>
                    <p>{item.categories.join(" - ")}</p>
                    <p>{item.release_date}</p>
                    <p>{item.time}</p>


                    <Link to={`/film/${item.id}`}>Voir plus...</Link>

                </section>
            ))}

        </main>
    )

}

export default Home;