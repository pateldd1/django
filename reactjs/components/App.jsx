import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      handle: "",
      searching: false
    }
    this.search = this.search.bind(this);
    this.changeHandle = this.changeHandle.bind(this);
    this.searchResults = this.searchResults.bind(this);
  }

  search(e){
    e.preventDefault();
    this.setState({searching: true});
    this.props.requestFriends(this.state.handle)
    .then(()=> this.setState({searching:false}));
  }

  // This will be limited to 5 by using Twitter's API
  searchResults(){
    let fivenames = this.props.friends.map((friend, idx) =>{
      return (
        <div key={idx}>
          <h2>{idx+1}. {friend}</h2>
        </div>
      )
    })
    return (
      <div>
        {fivenames}
      </div>
    )
  }

  changeHandle(e){
    this.setState({ handle: e.currentTarget.value });
  }

  render(){
    return(
      <div>
         <form onSubmit={this.search}>
           <input onChange={this.changeHandle} value={this.state.handle} placeholder="ScreenName"></input>
           <input type="submit" value="Search" />
         </form>
         {this.state.searching ? "Crawling through user's twitter..." : this.searchResults()}
      </div>
    )
  }
}

export default App;
