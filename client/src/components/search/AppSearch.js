import React from 'react';
import {
  InstantSearch,
  PoweredBy,
  RefinementList,
  Hits,
  RangeInput,
  Highlight,

  Configure,
  Pagination,

  connectSearchBox,
} from 'react-instantsearch-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

export default function AppSearch() {
  return (
    <InstantSearch
      appId="LPXZWTGHEO"
      apiKey="f4e905345d007fddef9651fa859614b2"
      indexName="dev_TutorUP_Profiles"
    >
      <Configure hitsPerPage={16} />
      <Header />
      <div className="content-wrapper">
        <RangeInput attribute="classes.availableFrom" />
        <RefinementList attribute="classes.classname" />
        <RefinementList attribute="major" />

        <Hits />
        <br />
        <Pagination />
        <PoweredBy />


      </div>
    </InstantSearch>
  );
}

const Header = () => (
  <header className="content-wrapper header">
    <ConnectedSearchBox />
    <br />
  </header>
);

const CustomSearchBox = ({ currentRefinement, refine }) => (
  <div className="input-group">
    <SearchIcon />
    <TextField 
    type="text"
    value={currentRefinement}
    onChange={e => refine(e.target.value)}
    autoComplete="off"
    id="q"
    />
  </div>
);

const CustomHits = ({ hits, refine, hasMore }) => {
  return (
    <main id="hits">
      {hits.map(hit => (
        <Hit item={hit} key={hit.objectID} />
      ))}
      <Button color="secondary" onClick={refine} disabled={!hasMore}>
        Load More
      </Button>
    </main>
  );
}


const ConnectedSearchBox = connectSearchBox(CustomSearchBox);

const Hit = ({ item }) => {
  return (
    <article className="hit">
      <div className="product-picture-wrapper">
        <div className="product-picture">
          <img
            src={item.avatar}
          />
        </div>
      </div>
      <div className="product-desc-wrapper">
        <div className="product-name">
          <Highlight attribute="handle" hit={item.handle} />
        </div>
        <div className="product-type">
          <Highlight attribute="classes.availableFrom" hit={item.classes.availableFrom} />
        </div>
        <div className="product-footer">
          <div className="product-price">{item.isTutor}</div>
        </div>
      </div>
    </article>
  );
};

