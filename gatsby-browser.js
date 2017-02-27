
var ReactGA = require('react-ga');
//ReactGA.initialize('UA-92709510-1');



export var onRouteUpdate = function (state) {
  
    ReactGA.set({ page: state.pathname });
    ReactGA.pageview(state.pathname);

}