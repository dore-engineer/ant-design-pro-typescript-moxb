import * as React from "react";
import { inject, observer } from "mobx-react";
import { Redirect } from "react-router-dom";
import { Keys } from "../stores/index";
import { AuthStore } from "../stores/auth";

export function Protected(Children) : any {
  @inject(Keys.auth)
  @observer
  class AuthenticatedComponent extends React.Component<{ auth: AuthStore, location: string }> {
    constructor(props) {
      super(props);
    }

    render() {
      const {authenticated} = this.props.auth;
      return (
        <div className="authComponent">
          {authenticated
            ? <Children {...this.props} />
            : !authenticated
              ? <Redirect
                to={{
                  pathname: "/login",
                  state: {from: this.props.location}
                }}
              />
              : null}
        </div>
      );
    }
  }

  return AuthenticatedComponent;
}
