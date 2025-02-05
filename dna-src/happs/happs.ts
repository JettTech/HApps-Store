'use strict';

export = 0;
let module = {};
// -----------------------------------------------------------------
//  Public Functions
// Author : Zo-El
// -----------------------------------------------------------------
// Description :
// This zome can be used to manage the apps that are going to be added to the HC of HC
// It includes :
// - adding creating an apps
// -----------------------------------------------------------------


// -----------------------------------------------------------------
//  Exposed Public Functions
// -----------------------------------------------------------------

function getApp({ app_hash }): GetResponse {
  return get(app_hash, { GetMask: HC.GetMask.Entry });
}

// To get all apps in the HC
function getAllApps() {
  return getLinks(App.DNA.Hash, "app_tag", { Load: true }).map((e) => {
    return {
      "Entry": e.Entry,
      "Hash": e.Hash
    }
  });
}

// Public functions to get the app code
function getAppDNA({ app_hash }) {
  const details = call("bridge_request", "getAppDNA", { app_hash })
  return details;
}


// Public functions to get the app code
function getAppUISkin({ app_hash }) {
  const details = call("bridge_request", "getAppUISkin", { app_hash })
  return details;
}

// -----------------------------------------------------------------
//  Non-Exposed Public Functions
// -----------------------------------------------------------------

//TODO : Decde if all the apps need to be linked to the App.DNA.Hash
// @parms : appParam = {uuid,title,author,description,thumbnail};
function createApp({ appParam }) {
  const hash: Hash = commit("app", appParam);
  commit("app_link", {
    Links: [
      { Base: App.DNA.Hash, Link: hash, Tag: 'app_tag' }
    ]
  });
  return hash;
}

// -----------------------------------------------------------------
//  The Genesis Function https://developer.holochain.org/genesis
// -----------------------------------------------------------------

function genesis() {
  return true;
}

// -----------------------------------------------------------------
//  Validation functions for every change to the local chain or DHT
// -----------------------------------------------------------------

function validateCommit(entryName, entry, header, pkg, sources) {
  // debug("entryName: " + entryName + " entry: " + entry + " header: " + header + " pkg: " + pkg + " sources: " + sources)
  switch (entryName) {
    case "app":
      return true;
    case "app_link":
      return true;
    default:
      return false;
  }
}

function validatePut(entryName, entry, header, pkg, sources) {
  // debug("entryName: " + entryName + " entry: " + entry + " header: " + header + " pkg: " + pkg + " sources: " + sources)
  switch (entryName) {
    case "app":
      return true;
    case "app_link":
      return true;
    default:
      return false;
  }
}

function validateMod(entryName, entry, header, replaces, pkg, sources) {
  switch (entryName) {
    default:
      return false;
  }
}

function validateDel(entryName, hash, pkg, sources) {
  switch (entryName) {
    default:
      return false;
  }
}
function validateLink(entryName, baseHash, links, pkg, sources) {
  // debug("entryName: " + entryName + " baseHash: " + baseHash + " links: " + links + " pkg: " + pkg + " sources: " + sources)
  switch (entryName) {
    case "app_link":
      return true;
    default:
      return false;
  }
}
function validatePutPkg(entryName) {
  return null;
}
function validateModPkg(entryName) {
  return null;
}
function validateDelPkg(entryName) {
  return null;
}
function validateLinkPkg(entryName) {
  return null;
}
