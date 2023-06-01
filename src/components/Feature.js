import React, { Fragment } from 'react';

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from '../api';

/**
 * We need a new component called Searchable which:
 *
 * Has a template like this:
 *
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 *
 * When someone clicks the anchor tag, you should:
 *
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 *
 * Then start a try/catch/finally block:
 *
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch:
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
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

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 *
 * <main id="feature"></main>
 *
 * And like this when one is:
 *
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 *
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style,
 * technique, medium, dimensions, people, department, division, contact, creditline
 *
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 *
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 *
 * This component should be exported as default.
 */
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
                                {/* <span className="title">Culture</span>
                                <Searchable searchValue={featuredResult.culture} searchTerm='culture' setIsLoading={setIsLoading} setSearchResults={setSearchResults} />
                                {featuredResult.technique ?
                                    <>
                                        <span className="title">Technique</span>
                                        <span className="content">{featuredResult.technique}</span>
                                    </> :
                                    null} */}
                                {searchFacts.map((el, ind) => {
                                    return (
                                        <>
                                            {featuredResult[el] ?
                                                <>
                                                    <span key={`1-${ind}${el}`} className="title" style={{ "text-transform": "capitalize" }}>{el}</span>
                                                    <Searchable key={`2-${ind}${el}`} searchValue={featuredResult[el]} searchTerm={el} setIsLoading={setIsLoading} setSearchResults={setSearchResults} />
                                                </> :
                                                null}
                                        </>
                                    )
                                })}
                                {featuredResult.people ?
                                    featuredResult.people.map((el, ind) => {
                                        return (
                                            <>
                                                <span key={`1-${ind}${el.displayname}`} className="title" style={{ "text-transform": "capitalize" }}>person</span>
                                                <Searchable key={`2-${ind}${el.displayname}`} searchValue={el.displayname} searchTerm={'displayname'} setIsLoading={setIsLoading} setSearchResults={setSearchResults} />
                                            </>
                                        )
                                    }) : null}
                                {otherFacts.map((el, ind) => {
                                    return (
                                        <>
                                            {featuredResult[el] ?
                                                <>
                                                    <span key={`1-${ind}${el}`} className="title" style={{ "text-transform": "capitalize" }}>{el}</span>
                                                    <span key={`2-${ind}${el}`} className="content">{featuredResult[el]}</span>
                                                </> :
                                                null}
                                        </>
                                    )
                                })}
                            </section>
                            <section className="photos">
                                {featuredResult.images.map((el) => {
                                    return <img key={el.imageid} src={el.baseimageurl} alt={el.alttext} />
                                })}
                            </section>
                        </div>
                    </main >
            }
        </>
    )
}

export default Feature;
