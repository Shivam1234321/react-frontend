const checkAuth=()=>{
     const auth= localStorage.getItem('user');
     return auth;
}

export default checkAuth;