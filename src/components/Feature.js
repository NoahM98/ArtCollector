import React, { Fragment } from 'react';
import { fetchQueryResultsFromTermAndValue } from '../api';

const Searchable = ({ searchTerm, searchValue, setIsLoading, setSearchResults }) => {

    return (
        <span className="content">
            <a href="#" onClick={async (event) => {
                event.preventDefault();
                setIsLoading(true);
                try {
                    const response = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue.replaceAll(' ', '-'));
                    setSearchResults(response);
                } catch (err) {
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            }}>{searchValue}</a>
        </span>
    )
}

const Feature = ({ featuredResult, setIsLoading, setSearchResults }) => {
    const searchFacts = ['culture', 'technique', 'medium'];
    const otherFacts = ['description', 'dated', 'style', 'dimensions', 'department', 'division', 'contact', 'creditline'];
    return (
        <>
            {
                !featuredResult ?
                    <main id="feature"></main> :
                    <main id="feature">
                        <div className="object-feature">
                            <header>
                                <h3>{featuredResult.title}</h3>
                                <h4>{featuredResult.dated}</h4>
                            </header>
                            <section className="facts">
                                {searchFacts.map((el, ind) => {
                                    return (
                                        <React.Fragment key={ind + el} >
                                            {featuredResult[el] ?
                                                <>
                                                    <span className="title" style={{ "textTransform": "capitalize" }}>{el}</span>
                                                    <Searchable searchValue={featuredResult[el]} searchTerm={el} setIsLoading={setIsLoading} setSearchResults={setSearchResults} />
                                                </> :
                                                null}
                                        </React.Fragment>
                                    )
                                })}
                                {featuredResult.people ?
                                    featuredResult.people.map((el, ind) => {
                                        return (
                                            <React.Fragment key={ind + el.displayname}>
                                                <span className="title" style={{ "textTransform": "capitalize" }}>person</span>
                                                <Searchable searchValue={el.displayname} searchTerm={'displayname'} setIsLoading={setIsLoading} setSearchResults={setSearchResults} />
                                            </React.Fragment>
                                        )
                                    }) : null}
                                {otherFacts.map((el, ind) => {
                                    return (
                                        <React.Fragment key={ind + el}>
                                            {featuredResult[el] ?
                                                <>
                                                    <span className="title" style={{ "textTransform": "capitalize" }}>{el}</span>
                                                    <span className="content">{featuredResult[el]}</span>
                                                </> :
                                                null}
                                        </React.Fragment>
                                    )
                                })}
                            </section>
                            <section className="photos">
                                {featuredResult.images ?
                                    featuredResult.images.map((el, ind) => {
                                        return <img key={`${ind}-${el.imageid}`} src={el.baseimageurl} alt={el.alttext} />
                                    }) : null}
                            </section>
                        </div>
                    </main >
            }
        </>
    )
}

export default Feature;
