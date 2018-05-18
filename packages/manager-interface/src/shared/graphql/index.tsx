import dynamic, { DynamicOptions } from 'next/dynamic';
import React, { ComponentType } from 'react';
import isElectron from '~/shared/isElectron';

type ApiMode = 'ipc' | 'remote';

function resolveApiMode(mode: string?): ApiMode {
  if (mode === 'ipc' || mode === 'remote') {
    return mode;
  }

  // By default, we use 'ipc' in electron and the hosted
  // graphql server in the browser.
  return isElectron() ? 'ipc' : 'remote';
}

function withApollo(BaseComponent: ComponentType<any>) {
  const options: DynamicOptions<any, any> = {
    modules: props => {
      const {
        api = {
          mode: process.env.GRAPHQL_REMOTE as string,
          ws: process.env.GRAPHQL_REMOTE_WS as string,
          http: process.env.GRAPHQL_REMOTE_HTTP as string,
        },
      } = props;

      const hoc = resolveApiMode(api.mode) === 'ipc' ?
        import('./ipc').then(m => m.default()) :
        import('./remote').then(m => m.default(api.http, api.ws));

      const component = hoc.then(enhance => enhance(BaseComponent));

      return {
        EnhancedComponent: component,
      };
    },
    render: (props, { EnhancedComponent }) => <EnhancedComponent {...props} />,
  };

  // TODO: This is obviously incorrect (options is not of type "Promise<ComponentType<any>>").
  // This requires a fix in the ustream next.js code to fix the typing on dynamic().
  return dynamic(options as Promise<ComponentType<any>>);
};

export default withApollo;
