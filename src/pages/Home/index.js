import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './home.css';

function Home(){

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadFilmes(){
            const response = await api.get('/movie/now_playing', {
                params:{
                    api_key: "0dd67f770b95cc2b90de1c5adb72fec8",
                    language: "pt-BR",
                    page: 1
                }
            })
            setFilmes(response.data.results);
        }
        loadFilmes();
        setLoading(false);
    }, []);

    if(loading){
        return (
            <div className='loading'>
                <h2>Carregando filmes...</h2>
            </div>
        )
    }
    return (
        <div className='container'>
            <div className='lista-filmes'>
                {
                    filmes.map(filme => {
                        return (
                            <article key={filme.id}>
                                <strong>{filme.title}</strong>
                                <img src={`http://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                                <Link to={`/filme/${filme.id}`}>Acessar</Link>
                            </article>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home

