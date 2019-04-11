import React from "react";

import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const Question = ({ text, handleAnswer, index }) => {
  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">{text}</FormLabel>
        <RadioGroup
          aria-label={text}
          name="questionGroup"
          onChange={event => {
            handleAnswer(index, event.target.value);
          }}
        >
          <FormControlLabel value="True" control={<Radio />} label="True" />
          <FormControlLabel value="False" control={<Radio />} label="False" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

Question.propTypes = {
  text: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  handleAnswer: PropTypes.func.isRequired
};

export default Question;
