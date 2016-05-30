/*global fetch*/
require('es6-promise').polyfill()
require('isomorphic-fetch')
/*
A version of HNService which concumes the Firebase REST
endpoint (https://www.firebase.com/docs/rest/api/). This
is used when a user has enabled 'Offline Mode' in the
Settings panel and ensures responses can be easily fetched
and cached when paired with Service Worker. This cannot be
trivially done using just Web Sockets with the default
Firebase API and provides a sufficient fallback that works.
 */
var endPoint = 'https://hacker-news.firebaseio.com/v0'
var options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
}

function storiesRef(path) {
  return fetch(endPoint + '/' + path + '.json', options)
}

function itemRef(id) {
  return fetch(endPoint + '/item/' + id + '.json', options)
}

function userRef(id) {
  return fetch(endPoint + '/user/' + id + '.json', options)
}

function updatesRef() {
  return fetch(endPoint + '/updates/items/' + '.json', options)
}

function fetchItem(id, cb) {
  itemRef(id).once('value', function(snapshot) {
    cb(snapshot.val())
  })
}

function fetchItems(ids, cb) {
  var items = []
  ids.forEach(function(id) {
    fetchItem(id, addItem)
  })
  function addItem(item) {
    items.push(item)
    if (items.length >= ids.length) {
      cb(items)
    }
  }
}

module.exports = {
  fetchItem,
  fetchItems,
  storiesRef,
  itemRef,
  userRef,
  updatesRef
}
