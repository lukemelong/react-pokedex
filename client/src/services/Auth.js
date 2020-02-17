class Auth {
    login(login, cb){
        fetch(`${process.env.REACT_APP_API_URI}users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        })
        .then(res => {
            if(res.status === 200){
                localStorage.setItem("token", res.headers.get('x-auth-token'))
            }
            return res.json()
        })
        .then(json => {
            if(!this.isAuthenticated()){
                cb(json.message)
            } else {
                cb()
            }

        })

   }

    logout(){
        localStorage.removeItem('token')
    }

    register(register, cb){
        fetch(`${process.env.REACT_APP_API_URI}users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify(register)
        })
        .then((res) => {
            if(res.status === 200){
                localStorage.setItem("token", res.headers.get('x-auth-token'))
            }
            return res.json()
        })
        .then((json) => {
            if(!this.isAuthenticated()){
                cb(json.message)
            } else {
                cb()
            }
        })
    }
    
    getToken(){
        return localStorage.getItem('token')

    }
    isAuthenticated(){
        if(this.getToken()){
            return true
        }
        return false
    }

    getName () {
        let token = this.getToken();
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload).user;
    };
}


export default new Auth();