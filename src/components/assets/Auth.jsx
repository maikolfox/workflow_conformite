import base64 from 'react-native-base64'
const Auth = 
{
    username:"dXNlcm5hbWU=",//username in base 64
    displayname:"ZGlzcGxheU5hbWU=",// Display name in base 64
    profileOb:"cHJvZmlsZU9i",
    authResp:2,
    authOrga:5,
    authActeur:1,
    authDGRC:4,
    remove()
    {
        console.log("remove --->")
    },
    getUsername(){
        if(localStorage.getItem(this.username)===null ||localStorage.getItem(this.username)===undefined ) return null;
        return this.decodeLocalStorage(localStorage.getItem(this.username))+"@bridgebankgroup.com";
    },
    getDisplayName(){
        return this.decodeLocalStorage(localStorage.getItem(this.displayname));
    },
    encodeLocalStorage(str){
        return base64.encode(str) ;
    },

    decodeLocalStorage(str){
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
        if (prof!==null || prof !==undefined) return JSON.parse(this.decodeLocalStorage(localStorage.getItem(this.profileOb)));
        return obj;
    },
   getAuth() 
   {   
       if(this.getUsername()!==null && this.getUsername()!==undefined ) return true
       else return false
   },
   getAuthResp(profile)
   {    
       if (profile.length===0 || profile===null) return false
    
       return this.authResp
   },    
   getAuthOrga()
   {
       return this.authOrga
   },
   getAuthOrga()
   {
       return this.authOrga
   },
   getAuthDGRC()
   {
       return this.authOrga
   }
  
};
export default Auth;