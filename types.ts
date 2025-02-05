import { Hash } from './holochain'
import { Map } from "immutable"
// import { List, Map } from "immutable"

// ================================
//       App State Types
// ================================

export type WelcomeMsg = string;

export type HCHCAppState = {
  AllApps: [{Entry:{AppDetailState}, Hash}] | null, // pairing of the app hash and the an obj with its title and thumbanil url path
  AdminApps: [{Entry:{AppDetailState}, Hash}] | null, // pairing of the app hash and the an obj with its title and thumbanil url path
  DevApps: [{Entry:{AppDetailState}, Hash}] | null, // pairing of the app hash and the an obj with its title and thumbanil url path
  TopApps: [{Entry:{AppDetailState}, Hash}] | null, // pairing of the app hash and the an obj with its title and thumbanil url path
  GameApps: [{Entry:{AppDetailState}, Hash}] | null, // pairing of the app hash and the an obj with its title and thumbanil url path
  MusicApps: [{Entry:{AppDetailState}, Hash}] | null, // pairing of the app hash and the an obj with its title and thumbanil url path
  LeisureApps: [{Entry:{AppDetailState}, Hash}] | null, // pairing of the app hash and the an obj with its title and thumbanil url path
  MoviesApps: [{Entry:{AppDetailState}, Hash}] | null, // pairing of the app hash and the an obj with its title and thumbanil url path
  EducationalApps: [{Entry:{AppDetailState}, Hash}] | null, // pairing of the app hash and the an obj with its title and thumbanil url path
  FinanceApps: [{Entry:{AppDetailState}, Hash}] | null, // pairing of the app hash and the an obj with its title and thumbanil url path

  currentAgent: {agent: {Hash: Hash, Name: string}}| null,
  currentCategory: string | null,
  currentAppHash: string,
  appsByCategory: Array<{Entry: AppDetailState, Hash: Hash}> | null, // A map parigin of the category string AND the array of app hashes and names(titles), belonging to that app Category...
  currentAppDetails: {Entry: AppDetailState, Hash: Hash} | null,
  appCode: AppDNACode | null,
  reviewEntries: [ReviewLog] | [{}],
  // reviewEntries: List<ReviewLog>,
  msgAuthorObj: {user: {Hash: Hash, Name: string}}| null,
};

export type AppDetailState = {
  author: {Hash: Hash, Name: string},
  thumbnail: string,
  description: HTMLInputElement | string,
  title: string,
  uuid: string,
}

export type AppDNACode = {
  fileload: Map<Hash, CodeParams>,
}

export type CodeParams = {
  dna: string,
  test: string
}

export type ReviewLog = {
  authorHash: Hash,
  authorName: string,
  rating: number,
  review: string,
  timestamp?: number
} | null


// ================================
//      Redux Action Typing
// ================================

export type ReduxAction
  = {type: 'RETURN_STATE'}
  | { type: 'FETCH_AGENT', agent: {Hash: Hash, Name: string}}
  | { type: 'REGISTER_CATEGORY', category: string }
  | { type: 'REGISTER_APP_HASH', appHash: string }

  | { type: 'FETCH_ALL_APPS', allApps: [{Entry:{AppDetailState}, Hash}] }
    | { type: 'FETCH_APPS_BY_CATEGORY', allApps: [{Entry:{AppDetailState}, Hash}] }
  | { type: 'GET_APPS_BY_CATEGORY', category :string,allApps: any }
  | { type: 'VIEW_APP', appDetails: AppDetailState }
  | { type: 'FETCH_APP_CODE', code: AppDNACode }

  | { type: 'CREATE_REVIEW', params: ReviewParams }
  | { type: 'FETCH_REVIEWS', reviewEntries: [ReviewLog]}
  | { type: 'FETCH_MSG_AUTHOR', user: {Hash: Hash, Name: string}}

  | { type: 'CREATE_NEW_APP_DETAILS', params: AppParams }
  | { type: 'CREATE_NEW_APP_CODE', params: CodeParams }
  | { type: 'SET_CURRENT_APP', agent: string }


export interface AppParams {
 author: string,
 description: string,
 fileload: string
}

export interface ReviewParams {
 appHash: Hash,
 // author: Map<Hash, string>,
 authorHash: Hash,
 authorName: string,
 rating: number,
 review: string,
timestamp?: number
}
