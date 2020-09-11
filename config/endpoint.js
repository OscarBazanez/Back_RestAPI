const EndPoint = { // /apis/sps/helloworld
    movies: {
        api : {
            v1     : {
                baseURL     : '/apis/sps/helloworld/v1',
                favorites   : '/favorites',
                health      : '/health',
                user : {
                    signup  : '/signup',
                    login   : '/login',
                    profile : '/profile'
                }
            },
            v2 : '',
        }
    }
}
module.exports = EndPoint;