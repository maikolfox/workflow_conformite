import base64 from 'react-native-base64';
import React from 'react'
import {
    Route,
    BrowserRouter as Router,
    Switch, 
    Redirect,
  } from 'react-router-dom';
//   function canAccessToThisPage(profil,tabProfile){
//     var correctProf=false;
//     if(tabProfile===undefined || tabProfile===null || tabProfile.length===0)
//     return correctProf
//     tabProfile.map(el=>{
//        if(el.idProfil===profil){
//         correctProf=true
//        }
//     })
//     return correctProf
// }
const Auth = 
{
    username:"dXNlcm5hbWU=",//username in base 64
    displayname:"ZGlzcGxheU5hbWU=",// Display name in base 64
    profileOb:"cHJvZmlsZU9i",
    authResp:2,
    authOrga:5,
    authActeur:1,
    authDGRC:4,
    
    canAccessToThisPage(profil,tabProfile){
        var correctProf=false;
        if(tabProfile===undefined || tabProfile===null || tabProfile.length===0)
        return correctProf
        tabProfile.map(el=>{
           if(el.idProfil===profil){
            correctProf=true
           }
        })
        return correctProf
    },
    remove()
    {
        localStorage.clear();
        console.log("click")      
    },

    getUsername(){
        if(localStorage.getItem(this.username)===null ||localStorage.getItem(this.username)===undefined ) return null;
        return this.decodeLocalStorage(localStorage.getItem(this.username))+"@bridgebankgroup.com";
    },
    getDisplayName(){
        if(localStorage.getItem(this.username)===null ||localStorage.getItem(this.username)===undefined ) return "";
        return this.decodeLocalStorage(localStorage.getItem(this.displayname));
    },
    encodeLocalStorage(str){
        return base64.encode(str) ;
    },

    decodeLocalStorage(str){
        if(localStorage.getItem(this.username)===null ||localStorage.getItem(this.username)===undefined ) return null;
        return base64.decode(str)
    },
    setLocalStorage(username,displayName)
    {
        localStorage.setItem(this.username,this.encodeLocalStorage(username));
        localStorage.setItem(this.displayname,this.encodeLocalStorage(displayName))
    },
    setProfile(profile){
        return localStorage.setItem(this.profileOb,this.encodeLocalStorage(JSON.stringify(profile)));
    },
    getProfileTab(){
        var obj=[];
        var prof=this.decodeLocalStorage(localStorage.getItem(this.profileOb))
        if (prof!==null || prof !==undefined) return JSON.parse(prof);
        return obj;
   },
   
   getAuth() 
   {   
       if(this.getUsername()!==null && this.getUsername()!==undefined ) return true
       else return false
   },

   //autorisation function
   getAuthResp(profileTab)
   {    
    return this.canAccessToThisPage(this.authResp,profileTab);
   },    
   getAuthOrga(profileTab)
   {
     return this.canAccessToThisPage(this.authOrga,profileTab);
   },
   getAuthActeur(profileTab)
   {
       return this.canAccessToThisPage(this.authActeur,profileTab);
   },
   getAuthDGRC(profileTab)
   {    
        return this.canAccessToThisPage(this.authDGRC,profileTab);
    
   }
  
};
export default Auth;