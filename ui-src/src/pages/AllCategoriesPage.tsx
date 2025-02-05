import * as React from 'react';
import * as redux from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import MainNav from "../components/MainNav";
import './AllCategoriesPage.css';

import JdenticonPlaceHolder from '../components/JdenticonFiller';
import { Container, Row, Col } from 'reactstrap';
import store from '../store'
import { fetchPOST } from '../utils'
import { ReduxAction } from '../../../types';

import { Hash } from '../../../holochain';

type AllApps = {
    Entry:{
     author: {Hash:Hash, Name:string},
     thumbnail: string,
     description: HTMLInputElement | string,
     title: string,
     uuid: string,
   },
   Hash: Hash}


type AllCategoriesPageProps = {
  AdminApps: Array<AllApps>,
  DevApps: Array<AllApps>,
  TopApps: Array<AllApps>,
  GameApps: Array<AllApps>,
  MusicApps: Array<AllApps>,
  LeisureApps: Array<AllApps>,
  FinanceApps: Array<AllApps>,
  EducationalApps: Array<AllApps>,
  MoviesApps: Array<AllApps>,
  currentAgent: {agent: {Hash: Hash, Name: string}},
  currentCategory: string,
  currentAppHash: string,
  appsByCategory: Array<{Hash,string}>,
  fetchAgent: () => void,
  fetchAllApps: () => void,
  getappsByCategory: (category) => void,
  registerAppHash: (appHash) => void,
}
/// games music leisure finance educational movies
class AllCategoriesPage extends React.Component <AllCategoriesPageProps, {}> {

  public static getDerivedStateFromProps(props, state) {
    if(props.AdminApps === null){
       props.getappsByCategory("admintools");
    }
    if(props.DevApps === null){
       props.getappsByCategory("devtools");
    }
    if(props.TopApps === null){
       props.getappsByCategory("topdownloads");
    }
    if(props.GameApps === null){
       props.getappsByCategory("games");
    }
    if(props.MusicApps === null){
       props.getappsByCategory("music");
    }
    if(props.LeisureApps === null){
       props.getappsByCategory("leisure");
    }
    if(props.FinanceApps === null){
       props.getappsByCategory("finance");
    }
    if(props.EducationalApps === null){
       props.getappsByCategory("educational");
    }
    if(props.MoviesApps === null){
       props.getappsByCategory("movies");
    }
  }
  public componentDidMount() {
    this.props.fetchAgent();
  }

  public handleSelectApp = (hash) => (e) => {
    this.props.registerAppHash(hash);
  }

  public render() {
    const greeting: string = "All Categories";
    if (!this.props.currentAgent || !this.props.currentAgent) {
      location.assign(`/appstore`);
    }
    const { agent } = this.props.currentAgent;
    const { currentCategory, AdminApps, DevApps, TopApps, GameApps, MusicApps, LeisureApps, FinanceApps, EducationalApps, MoviesApps } = this.props;
    let renderAdminApps= [<h4 key={"1"} className="no-app-message">"No Apps"</h4>]
    let renderDevApps= [<h4 key={"2"} className="no-app-message">"No Apps"</h4>]
    let renderTopApps= [<h4 key={"3"} className="no-app-message">"No Apps"</h4>]
    let renderGameApps= [<h4 key={"4"} className="no-app-message">"No Apps"</h4>]
    let renderMusicApps= [<h4 key={"5"} className="no-app-message">"No Apps"</h4>]
    let renderLeisureApps= [<h4 key={"6"} className="no-app-message">"No Apps"</h4>]
    let renderFinanceApps= [<h4 key={"7"} className="no-app-message">"No Apps"</h4>]
    let renderEducationalApps= [<h4 key={"8"} className="no-app-message">"No Apps"</h4>]
    let renderMoviesApps= [<h4 key={"9"} className="no-app-message">"No Apps"</h4>]

    if(AdminApps!==null){
      renderAdminApps = AdminApps.map(app => {
        return (
          <Link to={`/appstore/admintools/${app.Hash}`} key={app.Hash}>
          <div className="appstore-app-icons" onClick={this.handleSelectApp(app.Hash)}>
            <JdenticonPlaceHolder className={`${app.Hash} jdenticon`} size={150} hash={ app.Hash } />
            <h4>{app.Entry.title}</h4>
          </div>
          </Link>
        )
      })
    }
    if(DevApps!==null){
      renderDevApps = DevApps.map(app => {
        return (
          <Link to={`/appstore/devtools/${app.Hash}`} key={app.Hash}>
          <div className="appstore-app-icons" onClick={this.handleSelectApp(app.Hash)}>
            <JdenticonPlaceHolder className={`${app.Hash} jdenticon`} size={150} hash={ app.Hash } />
            <h4>{app.Entry.title}</h4>
          </div>
          </Link>
        )
      })
    }
    if(TopApps!==null){
      renderTopApps = TopApps.map(app => {
        return (
          <Link to={`/appstore/topdownloads/${app.Hash}`} key={app.Hash}>
          <div className="appstore-app-icons" onClick={this.handleSelectApp(app.Hash)}>
            <JdenticonPlaceHolder className={`${app.Hash} jdenticon`} size={150} hash={ app.Hash } />
            <h4>{app.Entry.title}</h4>
          </div>
          </Link>
        )
      })
    }
    console.log("----------->",GameApps, MusicApps,MoviesApps,LeisureApps,EducationalApps,FinanceApps)
    if(GameApps!==null){
      renderGameApps = GameApps.map(app => {
        return (
          <Link to={`/appstore/games/${app.Hash}`} key={app.Hash}>
          <div className="appstore-app-icons" onClick={this.handleSelectApp(app.Hash)}>
            <JdenticonPlaceHolder className={`${app.Hash} jdenticon`} size={150} hash={ app.Hash } />
            <h4>{app.Entry.title}</h4>
          </div>
          </Link>
        )
      })
    }
    if(MusicApps!==null){
      renderMusicApps = MusicApps.map(app => {
        return (
          <Link to={`/appstore/music/${app.Hash}`} key={app.Hash}>
          <div className="appstore-app-icons" onClick={this.handleSelectApp(app.Hash)}>
            <JdenticonPlaceHolder className={`${app.Hash} jdenticon`} size={150} hash={ app.Hash } />
            <h4>{app.Entry.title}</h4>
          </div>
          </Link>
        )
      })
    }
    if(LeisureApps!==null){
      renderLeisureApps = LeisureApps.map(app => {
        return (
          <Link to={`/appstore/leisure/${app.Hash}`} key={app.Hash}>
          <div className="appstore-app-icons" onClick={this.handleSelectApp(app.Hash)}>
            <JdenticonPlaceHolder className={`${app.Hash} jdenticon`} size={150} hash={ app.Hash } />
            <h4>{app.Entry.title}</h4>
          </div>
          </Link>
        )
      })
    }
    if(FinanceApps!==null){
      renderFinanceApps = FinanceApps.map(app => {
        return (
          <Link to={`/appstore/finance/${app.Hash}`} key={app.Hash}>
          <div className="appstore-app-icons" onClick={this.handleSelectApp(app.Hash)}>
            <JdenticonPlaceHolder className={`${app.Hash} jdenticon`} size={150} hash={ app.Hash } />
            <h4>{app.Entry.title}</h4>
          </div>
          </Link>
        )
      })
    }

    if(EducationalApps!==null){
      renderEducationalApps = EducationalApps.map(app => {
        return (
          <Link to={`/appstore/educational/${app.Hash}`} key={app.Hash}>
          <div className="appstore-app-icons" onClick={this.handleSelectApp(app.Hash)}>
            <JdenticonPlaceHolder className={`${app.Hash} jdenticon`} size={150} hash={ app.Hash } />
            <h4>{app.Entry.title}</h4>
          </div>
          </Link>
        )
      })
    }
    if(MoviesApps!==null){
      renderMoviesApps = MoviesApps.map(app => {
        return (
          <Link to={`/appstore/music/${app.Hash}`} key={app.Hash}>
          <div className="appstore-app-icons" onClick={this.handleSelectApp(app.Hash)}>
            <JdenticonPlaceHolder className={`${app.Hash} jdenticon`} size={150} hash={ app.Hash } />
            <h4>{app.Entry.title}</h4>
          </div>
          </Link>
        )
      })
    }

    return (
      <div>
        <MainNav/>
        <div style={{ textAlign: 'center' }}>
          <h1 className="category-header">{ greeting }</h1>
          <hr className="category-header-line"/>
          <Row key={'1'} className="category-container">
            <Col className="category-header-name">
              <h3>Admin Tools</h3>
              <hr/>
              {renderAdminApps}
            </Col>
          </Row>
          <Row key={'2'} className="category-container">
            <Col className="category-header-name">
              <h3>Dev Tools</h3>
              <hr/>
              {renderDevApps}
            </Col>
          </Row>
          <Row key={'3'} className="category-container">
            <Col className="category-header-name">
              <h3>Top Downloads</h3>
              <hr/>
              {renderTopApps}
            </Col>
          </Row>
          <Row key={'4'} className="category-container">
            <Col className="category-header-name">
              <h3>Game Apps</h3>
              <hr/>
              {renderGameApps}
            </Col>
          </Row>
          <Row key={'5'} className="category-container">
            <Col className="category-header-name">
              <h3>Music Apps</h3>
              <hr/>
              {renderMusicApps}
            </Col>
          </Row>
          <Row key={'6'} className="category-container">
            <Col className="category-header-name">
              <h3>Leisure Apps</h3>
              <hr/>
              {renderLeisureApps}
            </Col>
          </Row>
          <Row key={'7'} className="category-container">
            <Col className="category-header-name">
              <h3>Educational Apps</h3>
              <hr/>
              {renderEducationalApps}
            </Col>
          </Row>
          <Row key={'8'} className="category-container">
            <Col className="category-header-name">
              <h3>Movie Apps</h3>
              <hr/>
              {renderMoviesApps}
            </Col>
          </Row>
          <Row key={'9'} className="category-container">
            <Col className="category-header-name">
              <h3>Finance Apps</h3>
              <hr/>
              {renderFinanceApps}
            </Col>
          </Row>



        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ AdminApps, DevApps, TopApps,GameApps,MusicApps,MoviesApps,EducationalApps,LeisureApps,FinanceApps, currentAgent, appsByCategory, currentCategory, currentAppHash }) => ({ AdminApps, DevApps, TopApps, GameApps,MusicApps,MoviesApps,EducationalApps,LeisureApps,FinanceApps,currentAgent, appsByCategory, currentCategory, currentAppHash });
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
        dispatch({ type: 'GET_APPS_BY_CATEGORY',category, allApps })
      })
  },
  registerAppHash: (appHash) => {
    dispatch({ type: 'REGISTER_APP_HASH', appHash })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCategoriesPage);
