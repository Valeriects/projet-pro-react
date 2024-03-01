import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {

    const {list} = useSelector((state) => state.movie);

    console.log("hello");
    console.log(list);
    
    return (
        
        <main className="home">
            <h1>Les films à l&rsquo;affiche</h1>
            {list.map((item) => (
                
                <section key={item.id} className="carousel">
                    {item.media.map((data) => (
                        
                        <figure key={data.id}>
                            <img src={data[0]} alt={data} />
                            {/* <iframe width="560" height="315" src={data[1].src} title={data[1].alt} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                         
                            <figcaption>{data.alt}</figcaption>
                            
                        </figure>

                    )) }
                </section>
            ))}

            {list.map((item) => (

                <section key={item.id} className="homeListe">
                    <h2>{item.title}</h2>
                    <p>{item.director}</p>
                    <p>{item.actor}</p>
                    <p>{item.categories.join(" - ")}</p>
                    <Link to={`/film/${item.id}`}>Voir plus...</Link>
                   

                </section>
            ))}

        </main>
    )

}

export default Home;