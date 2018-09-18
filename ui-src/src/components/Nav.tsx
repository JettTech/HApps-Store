import * as React from "react";
import { connect } from 'react-redux';
import { fetchPOST } from '../utils'
import "./Nav.css";
import SearchBar from "./SearchBar";

class Nav extends React.Component<any, {}> {
  constructor(props) {
    super(props);
    this.state = {
      allAppCategories: [],
      selectedApp: null,
    };
  }

  // public appSearch = (appSearchTerm) => {
  //   JSONFETCH ({url: URL_BASE_HERE, term: appSearchTerm}, (data) => {
  //       console.log(data);
  //       this.setState({
  //           allAppCategories: data,
  //           selectedApp: data[0]
  //       });
  //     });
  // }

  public render() {
    if (!this.props.currentAgent) {
      return <div/>
    }
    // const searchTerm = _.debounce(term => {this.appSearch(term)}, 300);
    const { agent } = this.props.currentAgent!;
    return (
      <nav className="nav nav-pills flex-column flex-sm-row">
          <div className="fade-in-logo"><img className="app-logo brand-logo" src="/holo-logo.png" /></div>
          <a className="flex-sm-fill text-sm-center nav-link" href="/appstore/Categories">All Apps</a>
          <a className="flex-sm-fill text-sm-center nav-link" href="#">
            Search Bar
            {/* <SearchBar onSearchTermUpdate={ searchTerm } /> */}
          </a>
          <a className="flex-sm-fill text-sm-center nav-link active" href={`/profile/${agent.Hash}`}>{`${agent.Name}'s Profile`}</a>
      </nav>
    )
  }
}

const mapStateToProps = ({ currentAgent }) => ({ currentAgent });
const mapDispatchToProps = dispatch => ({
fetchAgent: () => {
  fetchPOST('/fn/whoami/getAgent')
    .then(agent => {
      dispatch({ type: 'FETCH_AGENT', agent })
    })
  },
  //TODO : REQUEST THE SEARCH QUERY / SEARCH CATEGORY FUNCTION FROM Backend....
searchCategories: (category) => {
  fetchPOST('/fn/bridgeToCategories/getAppByCategory', category)
    .then(apps => {
      dispatch({ type: 'SEARCH_BY_CATEGORY', apps })
    })
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
