import Cookies from 'universal-cookie';
const cookies=new Cookies();
const Auth = 
{
 
    authenticate(login,displayName) {
    this.login = login;
    this.displayName=displayName;
    },
    remove()
    {
        cookies.remove("userId");
        cookies.remove("displayName");

    },
    getAuth() 
    {   
        if(cookies.get("userId")===null || cookies.get("userId")===undefined)  return false
        else return true
    }
    
};
export default Auth;