import { useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import './styles/global.scss';


export function App() {

  //1. Inicializa o app com o valor 1, ação, já executando o componente Content.
  const [genreId, setGenreId] = useState<number>(1);

  //Clicando no menu da SideBar

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>

        <SideBar onSelectGenreId={(id) => setGenreId(id)} /> 
        <Content selectedGenreId={genreId} />

    </div>
  )
}
