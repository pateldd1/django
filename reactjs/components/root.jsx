import React from 'react';
import { render } from "react-dom"
import { Provider } from 'react-redux';
import AppContainer from './AppContainer';
import configureStore from '../store/store';

class Root extends React.Component {
  render(){
    return(
      <Provider store={ configureStore() }>
        <AppContainer />
      </Provider>
    );
  }
}

render(<Root />, document.getElementById('root'));
