//React dependencies
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Material UI
import CssBaseline from '@material-ui/core/CssBaseline';

//Redux
import { fetchProductInfo } from './appSlice.js';

//Components
import Loadable from 'react-loadable';
import Loading from './loading.jsx';

const OverviewLoadable = Loadable({
  loader: () => import('./overview/overview.jsx'),
  loading: Loading
});

const RRLoadable = Loadable({
  loader: () => import('./ratingsReviews/ratingsReviews.jsx'),
  loading: Loading
});

const QALoadable = Loadable({
  loader: () => import('./questionsAnswers/questionsAnswers.jsx'),
  loading: Loading
});

const RICLoadable = Loadable({
  loader: () => import('./relatedItemsComparison/relatedItemsComparison.jsx'),
  loading: Loading
});

const EVLoadable = Loadable({
  loader: () => import('./overview/imageGallery/galleryExpanded.jsx'),
  loading: Loading
});

const MagVLoadable = Loadable({
  loader: () => import('./overview/imageGallery/galleryMagnified.jsx'),
  loading: Loading
});

//App component
var App = () => {
  const productId = useSelector((state) => state.app.productId);
  const viewExpanded = useSelector((state) => state.overview.expanded);
  const viewMagnified = useSelector((state) => state.overview.magnified);
  const dispatch = useDispatch();

  const container = {
    display: 'flex',
    width: '100vw',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const item = {
    flexGrow: 1,
    flexShrink: 1,
    width: '75%'
  }
;
  useEffect(() => {
    document.title = `Let's OverReact!`;
    dispatch(fetchProductInfo(productId));
  });

  if (viewMagnified) {
    return (
      <React.Fragment>
        <CssBaseline />
        <MagVLoadable/>
      </React.Fragment>
    );
  } else if (viewExpanded) {
    return (
      <React.Fragment>
        <CssBaseline />
        <EVLoadable/>
      </React.Fragment>
    );
  } else {
    return (
      <div style={container}>
        <CssBaseline />
        <div style={item}>
          <OverviewLoadable />
        </div>
        <div style={item}>
          <RICLoadable />
        </div>
        <div style={item}>
          <QALoadable />
        </div>
        <div style={item}>
          <RRLoadable />
        </div>
      </div>
    );
  }
};

export default App;
