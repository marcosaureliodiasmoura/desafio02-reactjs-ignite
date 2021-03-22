import { useEffect, useState } from 'react';
import { api } from '../services/api';

import { MovieCard } from '../components/MovieCard';
import '../styles/content.scss';


interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

// 2.0 Recebe a propriedade passada no App.jsx => app iniciado, padrão id 1, ação.
export function Content({ selectedGenreId }) {


  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);


  useEffect(() => {
    if(selectedGenreId !== 0){ //3.0 Se existir (ação), recebe o id do genero e faz a requisição no axios, e seta o valor em movies, renderizando a aplicação.
      api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
        setMovies(response.data);
      });
  
      //3.2 Trás o nome da categoria atual
      api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
        setSelectedGenre(response.data);
      })
    }
  }, [selectedGenreId]); //3.1 Se receber algum dado, irá executar novamente.

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}