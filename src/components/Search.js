import React, { useEffect, useState } from 'react';
import { fetchAllCenturies, fetchAllClassifications, fetchQueryResults } from '../api';
import SuggestType from './SuggestType';

const Search = ({ setIsLoading, setSearchResults, setFeaturedResult }) => {

  const [centuryList, setCenturyList] = useState([]);
  const [classificationList, setClassificationList] = useState([]);
  const [queryString, setQueryString] = useState('');
  const [century, setCentury] = useState('any');
  const [classification, setClassification] = useState('any');
  const [suggest, setSuggest] = useState({});

  useEffect(() => {
    try {
      const classificationPromise = fetchAllClassifications();
      const centuryPromise = fetchAllCenturies();
      Promise.all([classificationPromise, centuryPromise])
        .then((data) => {
          setClassificationList(data[0]);
          setCenturyList(data[1]);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return <form id="search" onSubmit={async (event) => {
    // write code here
    event.preventDefault();
    setIsLoading(true);
    try {
      let result = await fetchQueryResults({ century, classification, queryString });
      setSearchResults(result);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }}>
    <fieldset>
      <label htmlFor="keywords">Query</label>
      <input
        id="keywords"
        type="text"
        placeholder="enter keywords..."
        value={queryString}
        onChange={async (event) => {
          setQueryString(event.target.value);
          const results = await fetchQueryResults({ century, classification, queryString, });
          setSuggest(results);
        }} />
    </fieldset>
    <fieldset>
      <label htmlFor="select-classification">Classification <span className="classification-count">({classificationList.length})</span></label>
      <select
        name="classification"
        id="select-classification"
        value={classification}
        onChange={(event) => {
          setClassification(event.target.value);
        }}>
        <option value="any">Any</option>
        {/* map over the classificationList, return an <option /> */}
        {classificationList.map((el) => {
          return <option key={el.id}>{el.name}</option>
        })}
      </select>
    </fieldset>
    <fieldset>
      <label htmlFor="select-century">Century <span className="century-count">({centuryList.length})</span></label>
      <select
        name="century"
        id="select-century"
        value={century}
        onChange={(event) => {
          setCentury(event.target.value);
        }}>
        <option value="any">Any</option>
        {/* map over the centuryList, return an <option /> */}
        {centuryList.map((el) => {
          return <option key={el.id} >{el.name}</option>
        })}
      </select>
    </fieldset>
    <button>SEARCH</button>
    {suggest.records ?
      <ul id="suggesting">
        {suggest.records.map((record, ind) => {
          return <SuggestType key={record.id + ind} title={record.title} setFeaturedResult={setFeaturedResult} record={record} setSuggest={setSuggest} />
        })}
      </ul> : null}
  </form>
}

export default Search;
