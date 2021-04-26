import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { fetchRelated } from '../relatedSlice.js';

import RelatedProductCard from '../relatedProductCard/relatedProductCard.jsx';

const RelatedProductsList = () => {
  const dispatch = useDispatch();
  const productId = useSelector((state) => state.app.productId);
  const relatedList = useSelector((state) => state.related.related);

  useEffect(() => {
    dispatch(fetchRelated(productId));
  }, [productId]);


  if (relatedList.length > 0) {
    return (
      <Grid data-testid="relatedProductsList" container alignItems="center"> Related Products
        {relatedList.map((product) => {
          return (
            < RelatedProductCard key={product.id} productInfo={product}/>
          );
        }
        )}
      </Grid>
    );
  } else {
    return (
      <div>Loading</div>
    );
  }
};

export default RelatedProductsList;

