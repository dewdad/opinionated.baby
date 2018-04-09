// @flow

import cookie from 'js-cookie';
import React, { Component } from 'react';
import {
  graphql,
  QueryRenderer
} from 'react-relay';
import {
  Environment,
} from 'relay-runtime';

import Page from './Page.js';

type Props = {
  environment: Environment
}

class Root extends Component<Props> {

  render() {
    return (
      <QueryRenderer
        environment={this.props.environment}
        variables={{
          access_token: cookie.get('access_token')
            ? cookie.get('access_token') : ''
        }}
        query={graphql`
          query RootQuery($access_token: String!) {
            ...TopBarQuery @arguments(access_token: $access_token)
          }
        `}
        render={({error, props}) => {
          if (error) {
            console.log(error);
            return <div />;
          } else {
            return <Page data={props} />;
          }
        }}
      />
    );
  }
}

export default Root;