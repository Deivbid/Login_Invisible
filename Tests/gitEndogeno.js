      /* global gapi */
      import React from 'react';
      import  { Redirect } from 'react-router-dom';
      import Base64 from 'js-base64'
      // Client ID and API key from the Developer Console
      
      const CLIENT_ID = '583322247611-32m3uipfk3m87e3qbt7qkc9br3vppud2.apps.googleusercontent.com';
      const API_KEY = 'AIzaSyDRJbu8wJr-3laJMla_tQK1Bzziro9slXM';

      // Array of API discovery doc URLs for APIs used by the quickstart
      const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4", "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/gmail.send";

      const authorizeButton = document.getElementById('authorize_button');
      const signoutButton = document.getElementById('signout_button');



      let gapo;

      export function handleClientLoad(resolve,reject) {
        gapi.load('client:auth2', {
          callback: function() {
            initClient(resolve,reject);
          }});
      }

String.prototype.format = function() {
        let a = this;
        for (let k in arguments) {
          a = a.replace("{" + k + "}", arguments[k])
        }
        return a
      }
      var EMAIL = 'Content-Type: text/plain; charset="us-ascii"\nMIME-Version: 1.0\nContent-Transfer-Encoding: 7bit\nfrom: {0}\nto: {1}\nsubject: {2}\n\n{3}'      


    function initClient(resolve,reject) {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(() => updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get(),resolve,reject));

          gapi.auth2.getAuthInstance().signIn();
        });
      }


     function updateSigninStatus(isSignedIn,resolve,reject) {
        if(isSignedIn)
        {
          listMajors(resolve,reject);
        } 
      }

      export function handleAuthClick(event) {
        gapo.auth2.getAuthInstance().signIn();
        //window.gapi.auth2.getAuthInstance().signIn();
      }


      export function handleSignoutClick() {
         window.gapi.load('client:auth2', initSignOut);
      }

      function initSignOut(){
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          window.gapi.auth2.getAuthInstance().signOut();
        });
      }      

      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }

       function listMajors(resolve, reject) {
        window.gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1gIEsRp537qKIqjnlyvh2wr-JXnd_oFc3G66Jc6PYIMI',
          range: 'Master!A2:AH',
        }).then(function(response) {
          var range = response.result;
          console.log(range.values)
          var email = gapi.auth2.getAuthInstance().currentUser.Ab.w3.U3;
          let obj = {}
          if (range.values.length > 0) {
            for (let i = 0; i < range.values.length; i++) {
              var row = range.values[i];
              console.log(row[18]);
              if(email == row[18]){
                obj.code = row[3]
                obj.gender = row[28]
                obj.company = row[0]
                obj.name = row[2]
                obj.email = row[18]
                obj.phone = row[19]
                obj.botName = row[23]
                obj.botPhone = row[24]
                obj.RLM = row[8]
                obj.opener = row[26]
                obj.closer = row[27]
                obj.rlmMail = row[25]
                //hacer algo con estos datos
               localStorage.setItem("item", JSON.stringify(obj));
                resolve("soy un pro");
              }
            }
          } else {
            reject('No data found.');
          }
        }, function(response) {
          reject('Error: ' + response.result.error.message);
        });
      }

 function ti(res){
        console.log(res)
      }

      export function loadMessage(t, s, msg) {
         window.gapi.load('client:auth2', () => initMessage(t, s, msg));
      }

      function initMessage(t, s, msg){
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          makeEmail(t, s, msg);
        });
      }

      function makeEmail(to, subject, msg){
        sendMessage(EMAIL.format(gapi.auth2.getAuthInstance().currentUser.Ab.w3.U3, to, subject, msg), ti)
      }

      function sendMessage(email, callback) {
        // Using the js-base64 library for encoding:
        // https://www.npmjs.com/package/js-base64
        var base64EncodedEmail = Base64.Base64.encodeURI(email);
        var request = gapi.client.gmail.users.messages.send({
          'userId': 'me',
          'resource': {
            'raw': base64EncodedEmail
          }
        });
        request.execute(callback);
      }