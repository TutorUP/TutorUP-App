import React from 'react';
import {
  InstantSearch,
  PoweredBy,
  HierarchicalMenu,
  RefinementList,
  Hits,
  RangeInput,
  Stats,
  ClearRefinements,
  RatingMenu,
  Highlight,
  Panel,
  Configure,
  Pagination,

  connectSearchBox,
  connectInfiniteHits,
  connectStateResults,
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

const Product = ({ hit }) => {
  return (
      <div>
        <Highlight attribute="handle" hit={hit} />

      </div>
  );
}

const Header = () => (
  <header className="content-wrapper header">
    <ConnectedSearchBox />
    <br />
  </header>
);

const Facets = () => (
  <aside>
    <ClearRefinements
      translations={{
        reset: 'Clear all filters',
      }}
    />

    <section className="facet-wrapper">
      <div className="facet-category-title facet">Refine By</div>


      <div className="facet-category-title facet">Show results for</div>
      <HierarchicalMenu
        attributes={[
          'hierarchicalCategories.lvl0',
          'hierarchicalCategories.lvl1',
          'hierarchicalCategories.lvl2',
        ]}
      />


      <Panel header={<h5>Type</h5>}>
        <RefinementList attribute="type" operator="or" limit={5} />
      </Panel>

      <Panel header={<h5>Handle</h5>}>
        <RefinementList attributesForFaceting="handle" operator="or" limit={5} searchable />
      </Panel>

      <Panel header={<h5>Rating</h5>}>
        <RatingMenu attribute="rating" max={5} />
      </Panel>

      <Panel header={<h5>Date</h5>}>
        <RangeInput attribute="availableFrom" />
      </Panel>
    </section>
  </aside>
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
const ConnectedHits = connectInfiniteHits(CustomHits);

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

const CustomResults = connectStateResults(({ searchState, searchResult }) => {
  if (searchResult && searchResult.nbHits === 0) {
    return (
      <div className="results-wrapper">
        <div className="no-results">
          No results found matching{' '}
          <span className="query">{searchState.query}</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="results-wrapper">
        <section id="results-topbar">
          <Stats />
        </section>
        <ConnectedHits />
      </div>
    );
  }
});


