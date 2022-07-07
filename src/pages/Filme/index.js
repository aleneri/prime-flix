import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import {toast} from  'react-toastify';

import api from '../../services/api';
import './filme.css'

function Filme(){

    const {id} = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const navigation = useNavigate(0);

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "0dd67f770b95cc2b90de1c5adb72fec8",
                    language: "pt-BR"
                }
            }).then((response) => {
                setFilme(response.data);
                setLoading(false);
            }).catch(() => {
                navigation('/', {replace: true});
                toast.error("Filme não encontrado!");
                return
            })
        }
        loadFilme();
        return () => {
            console.log('Componente desmontado');
        }
    }, [navigation, id])

    function salvarFilme(){
        
       const minhaLista = localStorage.getItem('@primeflix');
       
       let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);
    
        if(hasFilme){
            toast.info("Filme já está na sua lista!");
            return
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!");
    }

    if(loading){
        return (
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`http://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse:</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button><a href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`} target="blank" rel='external'>Trailer</a></button>
            </div>
        </div>
    )
}

export default Filme