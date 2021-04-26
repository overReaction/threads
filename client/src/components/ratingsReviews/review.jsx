import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markHelpful } from './ratingsReviewsSlice.js';
import StarRating from '../starRating.jsx';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Container from '@material-ui/core/Container';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1em'
  },
  modal: {
    outline: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const Review = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const [photoOpen, openPhoto] = useState(false);
  const [helpfulness, addHelpfulness] = useState(review.helpfulness);
  const helpfulReviews = useSelector((state) => state.reviews.markedHelpful);
  const classes = useStyles();
  const dispatch = useDispatch();

  const dateOptions = {
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  };

  let date = new Date(review.date);
  let dateFormat = new Intl.DateTimeFormat('en-us', dateOptions);
  let dateString = dateFormat.format(date);

  const handleOpen = () => {
    openPhoto(true);
  };

  const handleClose = () => {
    openPhoto(false);
  };

  const handleHelpfulClick = () => {
    addHelpfulness(helpfulness + 1);
  };

  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item xs={9}>
          <StarRating rating={review.rating}/>
        </Grid>
        <Grid item xs={3}>
          <div style={{ textAlign: 'right' }}>
            {review.reviewer_name} | {dateString}
          </div>
        </Grid>
      </Grid>

      <Grid container>
        {/*If the review body length > 250 characters & expanded = false*/}
        {review.body.length > 250 && expanded === false ?
          <Grid item xs={12}>
            <h3>{review.summary.slice(0, 51)}
              {review.summary.length > 50 ? ('...') : ('')}
            </h3>
            <p>{review.summary.slice(51)} {review.body.slice(0, 251)}</p>
            <a href="#"
              onClick={() => setExpanded(true)}
            >Show more</a>
          </Grid> :
          <span/>
        }

        {/*If the review body length > 250 characters & expanded = true*/}
        {review.body.length > 250 && expanded === true ?
          <Grid item xs={12}>
            <h3>{review.summary.slice(0, 51)}
              {review.summary.length > 50 ? ('...') : ('')}
            </h3>
            <p>{review.summary.slice(51)} {review.body}</p>
          </Grid> :
          <span/>
        }

        {/*If the review body length <= 250 characters*/}
        {review.body.length <= 250 ?
          <Grid item xs={12}>
            <h3>{review.summary.slice(0, 51)}
              {review.summary.length > 50 ? ('...') : ('')}
            </h3>
            <p>{review.summary.slice(51)} {review.body}</p>
          </Grid> :
          <span/>
        }

        {/*If the review has photos */}
        {review.photos.length > 0 ?
          <Grid item xs={12}>
            <GridList cols={5}>
              {review.photos.map((photo, index) => {
                return (
                  <GridListTile key={index} >
                    <img src={photo.url} onClick={handleOpen}/>
                    <Modal
                      open={photoOpen}
                      onClose={handleClose}
                      BackdropComponent={Backdrop}
                      className={classes.modal}
                    >
                      <Container className={classes.modal}>
                        <img src={photo.url}
                          style={{ maxHeight: '50%', maxWidth: '50%' }}/>
                      </Container>
                    </Modal>
                  </GridListTile>
                );
              })}
            </GridList>
          </Grid> :
          <span/>
        }

        {/*If the review is recommended */}
        {review.recommend === true ?
          <Grid item xs={12} container alignItems="center" justify="flex-start">
            <Grid item>
              <CheckCircleOutlineIcon/>
            </Grid>
            <Grid item>
              <h4>I recommend this product</h4>
            </Grid>
          </Grid> :
          <span/>}

        {/*If the review has a response */}
        {review.response ?
          <Grid item xs={12} container>
            <div style= {{ backgroundColor: '#D3D3D3' }}>
              <div><b>Response from seller:</b></div>
              <div>{review.response}</div>
            </div>
          </Grid> :
          <span/>
        }

        <Grid item xs={12}>
          Was this review helpful? &nbsp;
          <a href="#RatingsReviews"
            onClick={() => {
              if (helpfulReviews.indexOf(review.review_id) === -1) {
                dispatch(markHelpful(review.review_id));
                handleHelpfulClick();
              }
            }}>Yes</a> ({helpfulness}) | &nbsp;
          <a href="#">No</a> ({review.nonhelpfulness || 0}) | &nbsp;
          <a href="#">Report</a>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Review;
