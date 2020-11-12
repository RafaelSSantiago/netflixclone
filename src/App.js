import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb';
import MovieRow from './compoments/MovieRow'
import FeaturedMovie from './compoments/FeaturedMovie';
import Header from './compoments/Header';

export default () => {
  
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setblackHeader]= useState(false);

useEffect(()=>{
   const loadAll = async () => {

    let list = await Tmdb.getHomeList();
    setMovieList(list);


    let originals = list.filter(i=>i.slug === 'originals');
    let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length));
    let chosen = originals[0].items.results[randomChosen];
    let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
    setFeaturedData(chosenInfo);
   }

   loadAll();
}, []);

useEffect(()=>{
  const scrollListener = () =>{
      if(window.scrollY > 10){
        setblackHeader(true);
      }else{
        setblackHeader(false);
      }
  }

  window.addEventListener('scroll', scrollListener);

  return () =>{
    window.removeEventListener('scroll', scrollListener);
  }
}, []);

  return (
    <div className = "page">

      <Header black={blackHeader} />

      {featuredData &&
      <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
      <footer>
       feito por Rafael Santiago para estudo de react, todos os direitos das imagens são da Netflix.
        Dados Extraidos de https://www.themoviedb.org/
      </footer>
    </div>
  )
}