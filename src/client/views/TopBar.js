// @flow

import type {TopBarQuery} from './__generated__/TopBarQuery.graphql.js';

import React, { Component } from 'react';
import {
  createFragmentContainer,
  commitMutation,
  graphql
} from 'react-relay';
import {
  Environment,
} from 'relay-runtime';
import {
  Toolbar,
  ToolbarIcon,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
} from 'rmwc/Toolbar';
import url from 'url';

type Props = {
  data: ?TopBarQuery,
  blockUntilReload: () => void,
  relay: {
    environment: Environment
  }
}

class TopBar extends Component<Props> {

  static defaultProps = {
    relay: {
      environment: null
    }
  }

  componentDidMount() {
    const url_parts = url.parse(window.location.href, true);
    if (url_parts.query && url_parts.query.code) {
      this.login(url_parts.query.code);
    }
  }

  render() {
    let title = <ToolbarTitle>{process.env.TITLE}</ToolbarTitle>;
    let icon = (
      <ToolbarIcon
        use="settings"
        onClick={() => this.googleAuth()}
      />
    );
    const data = this.props.data;
    if (data != null) {
      const me = data.me;
      if (me != null && me.googleID != undefined && me.googleID != '0') {
        title = <ToolbarTitle>{process.env.TITLE}</ToolbarTitle>;
        icon = (
          <div>
            {me.email}
            <ToolbarIcon
              use="exit_to_app"
              onClick={() => this.logout()}
            />
          </div>
        );
      }
    }
    return (
      <Toolbar>
        <ToolbarRow>
          <ToolbarSection alignStart>
            {title}
          </ToolbarSection>
          <ToolbarSection alignEnd>
            {icon}
          </ToolbarSection>
        </ToolbarRow>
      </Toolbar>
    );
  }

  googleAuth(): void {
    const data = this.props.data;
    if (data != null) {
      window.location = data.loginURL;
    }
  }

  login(code: string): void {
    commitMutation(
      this.props.relay.environment,
      {
        mutation: graphql`
          mutation TopBarLoginMutation($code: String!) {
            login(code: $code) {
              ...TopBarQuery
            }
          }
        `,
        variables: {
          code: code
        },
        onCompleted: (response, errors) => {
          window.location = '/';
        }
      }
    );
    this.props.blockUntilReload();
  }

  logout(): void {
    commitMutation(
      this.props.relay.environment,
      {
        mutation: graphql`
          mutation TopBarLogoutMutation {
            logout {
              ...TopBarQuery
            }
          }
        `,
        variables: {},
        onCompleted: (response, errors) => {
          window.location = '/';
        }
      }
    );
    this.props.blockUntilReload();
  }
}

export default createFragmentContainer(
  TopBar,
  graphql`
    fragment TopBarQuery on Query {
      loginURL,
      me {
        googleID,
        email
      }
    }
  `,
);
