export const setAuthUser= (data)=>{
    localStorage.setItem('user', data)
}

export const getAuthUser= () =>{
    let user= localStorage.getItem('user');
    return JSON.parse(user);
}

export const setAuthToken= (token) =>{
    localStorage.setItem('token', token);
}

export const getAuthToken= () =>{
    return localStorage.getItem('token');
}