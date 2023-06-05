import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Title from './components/Title';
import Loading from './components/Loading';
import Search from './components/Search';
import Preview from './components/Preview';
import Feature from './components/Feature';

const App = () => {
  const [searchResults, setSearchResults] = useState({ info: {}, records: [] });
  const [featuredResult, setFeaturedResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  useEffect(() => {
    console.log(featuredResult);
  }, [featuredResult]);

  return <div className="app">
    <Title />
    <Search setIsLoading={setIsLoading} setSearchResults={setSearchResults} setFeaturedResult={setFeaturedResult} />
    <Preview searchResults={searchResults} setIsLoading={setIsLoading} setSearchResults={setSearchResults} setFeaturedResult={setFeaturedResult} />
    <Feature featuredResult={featuredResult} setIsLoading={setIsLoading} setSearchResults={setSearchResults} />
    {isLoading ? <Loading /> : null}
  </div>
}

ReactDOM.render(<App />, document.getElementById('app'))
