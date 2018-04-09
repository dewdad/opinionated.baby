// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'rmwc/Typography';

type Props = {
}

class FourOhFour extends Component<Props> {

  render() {
    return (
      <Link to="/">
        <Typography use="display4" tag="div">
          FourOhFour
        </Typography>
      </Link>
    );
  }
}

export default FourOhFour;