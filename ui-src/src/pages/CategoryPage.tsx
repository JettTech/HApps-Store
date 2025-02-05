import * as React from 'react';
import * as redux from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import MainNav from "../components/MainNav";
import './CategoryPage.css';

import JdenticonPlaceHolder from '../components/JdenticonFiller';

import store from '../store'
import { fetchPOST } from '../utils'
import { ReduxAction } from '../../../types';

import { Hash } from '../../../holochain';

type CategoryPageProps = {
  AllApps: Array<{
    Entry:{
     author: {Hash:Hash, Name:string},
     thumbnail: string,
     description: HTMLInputElement | string,
     title: string,
     uuid: string,
   },
   Hash: Hash}>,
  currentAgent: {agent: {Hash: Hash, Name: string}},
  currentCategory: string,
  currentAppHash: string,
  appsByCategory: Array<{Hash,string}>,
  fetchAgent: () => void,
  fetchAllApps: () => void,
  getappsByCategory: (category) => void,
  registerAppHash: (appHash) => void,
}

class CategoryPage extends React.Component <CategoryPageProps, {}> {
  public componentDidMount() {
    this.props.fetchAgent();
    // this.props.fetchAllApps();
    this.props.getappsByCategory(this.props.currentCategory);
    console.log("this.props.currentCategory", this.props.currentCategory);
  }

  public handleSelectApp = (hash) => (e) => {
    console.log("app.Hash", hash);
    this.props.registerAppHash(hash);
  }

  public render() {
    const greeting: string = "Category Page";
    if (!this.props.AllApps) {
      return <div>
        <h4 className="loading-text">Loading...</h4>
      </div>
    }
    else if (!this.props.currentAgent || !this.props.currentAgent && !this.props.AllApps) {
      location.assign(`/appstore`);
    }
    console.log("this.props", this.props);

    const { agent } = this.props.currentAgent;
    const { currentCategory, AllApps} = this.props;

    const renderApps = AllApps.map(app => {
      console.log("this.props.AllApps --> app.Entry.title", app.Entry.title);
      return (
        <Link to={`/appstore/${currentCategory}/${app.Hash}`} key={app.Hash}>
        <div className="appstore-app-icons" onClick={this.handleSelectApp(app.Hash)}>
          <JdenticonPlaceHolder className={`${app.Hash} jdenticon`} size={150} hash={ app.Hash } />
          <h4>{app.Entry.title}</h4>
        </div>
        </Link>
      )
    })

    return (
      <div>
        <MainNav/>
        <div style={{ textAlign: 'center' }}>
          <h1 className="category-header">{ greeting }</h1>
          <hr className="category-header-line"/>
          {renderApps}
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ AllApps, currentAgent, appsByCategory, currentCategory, currentAppHash }) => ({ AllApps, currentAgent, appsByCategory, currentCategory, currentAppHash });
const mapDispatchToProps = dispatch => ({
  fetchAgent: () => {
    fetchPOST('/fn/whoami/getAgent')
      .then(agent => {
        dispatch({ type: 'FETCH_AGENT', agent })
      })
  },
  fetchAllApps: () => {
    fetchPOST('/fn/happs/getAllApps')
      .then(allApps => {
        dispatch({ type: 'FETCH_ALL_APPS', allApps })
    })
},
  getappsByCategory: (category) => {
    fetchPOST('/fn/categories/getAppsByCategories', {category})
      .then( allApps => {
        dispatch({ type: 'FETCH_APPS_BY_CATEGORY', allApps })
      })
  },
  registerAppHash: (appHash) => {
    dispatch({ type: 'REGISTER_APP_HASH', appHash })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
