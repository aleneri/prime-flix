import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {toast} from  'react-toastify';


import './favoritos.css'

function Favoritos() {

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem('@primeflix');
        setFilmes(JSON.parse(minhaLista)|| []);
    }, [])

    function excluirFilme(id){
        toast.success("Filme excluído com sucesso!");
        const minhaLista = localStorage.getItem('@primeflix');
        let filmes = JSON.parse(minhaLista).filter((filmeSaved) => filmeSaved.id !== id);
        setFilmes(filmes)
        localStorage.setItem('@primeflix', JSON.stringify(filmes));
    }

  return (
    <div className='meus-filmes'>
      <h1>Meus Filmes</h1>
       { filmes.length === 0 && <span>Você não possui nenhum filme salvo :( </span> }
      <ul>
        {
            filmes.map((filme) => {
                return (
                    <li key={filme.id}>
                        <span>{filme.title}</span>
                        <div>
                            <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                            <button onClick={()=>excluirFilme(filme.id)}>Excluir</button>
                        </div>
                    </li>
                )
            })
        }
      </ul>
    </div>
  );
}

export default Favoritos;