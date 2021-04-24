/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Answers from './Answers.jsx';
import AddAModal from './AddAnswer.jsx';

import { incrementHelpfulQuestionCount } from './qaSlice.js';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary
  }
}));

const Question = props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  // const firstTwoAnswers = props.answers[props.index].slice(0, 2);
  const questionId = props.question.question_id;

  const [questionHelpfulnessCount, setQuestionHelpfulnessCount] = useState(props.question.question_helpfulness);
  const [helpfulQClicked, setHelpfulQClicked] = useState(false);
  const [reported, setReported] = useState(false);

  const onReportClick = (questionId) => {
    axios.put(`/api/?endpoint=qa/questions/${questionId}/report`)
      .then(setReported(true));
  };

  return (
    <Paper className={classes.paper}>
      <div>
        <span><b>Q: {props.question.question_body}</b></span>
        <span style={{ float: "right" }}>
          Helpful? <u>
            {!helpfulQClicked ?
              <a
                onClick={() => {
                  dispatch(incrementHelpfulQuestionCount(questionId));
                  setQuestionHelpfulnessCount(questionHelpfulnessCount + 1);
                  setHelpfulQClicked(true);
                }}>Yes</a> : '   '
            }
          </u>
            ({questionHelpfulnessCount}) &nbsp; | &nbsp; <u style={{ display: 'inline-block' }}>
            <AddAModal questionId={questionId}/></u> &nbsp; | &nbsp;
          {!reported ? <u onClick={() => onReportClick(questionId)}>Report</u> : 'Reported!'}
        </span>
        <div>
          <Answers answers={props.answers} index={props.index}/>
        </div>
      </div>
    </Paper>
  );
};

export default Question;
