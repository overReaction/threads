import React from 'react';
import { useDispatch } from 'react-redux';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';
import { removeFromOutfit } from '../outfitSlice.js';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  icon: {
    color: 'white'
  }
}));

const OutfitCard = ({ productInfo, index }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleOutfitClick = () => {
    console.log(index);
    dispatch(removeFromOutfit(index));
  };

  return (
    <div data-testid="outfitCard">
      <GridListTile >
        <img src={productInfo.photo} style={{ height: '100%', maxHeight: 400, width: 'auto' }}/>
        <GridListTileBar
          title={productInfo.name}
          subtitle={`$${productInfo.default_price}`}
          actionIcon={
            <IconButton onClick={() => handleOutfitClick()}>
              <ClearIcon className={classes.icon}/>
            </IconButton>
          }
          className={classes.titleBar}
        />
      </GridListTile>
    </div>
  );
};

export default OutfitCard;

