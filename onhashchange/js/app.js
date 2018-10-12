(function(window, scope){
    
    let router = {};
    let store = {};

    router.dispatch = function(route, props){
        scope.innerHTML = '';
        if (this[route]){
            this[route](props);
        } else {
            this.error(404);
        }
    }

    router.render = function(template, props){
        axios
            .get('/template/' + template + '.html')
            .then(response => {
                let html = 
                    eval( '`' + response.data.replace(/`/g,'\\`') + '`');
                scope.insertAdjacentHTML('beforeend', html)
            })
            .catch(err => {
                alert('An error has occurred!');
                console.error(err);
            });
    }

    router.error = function(statusCode){
        this.render('error', {code: statusCode});
    }

    router.index = function(props){
        this.render('home', props);
    }
    
    router.aboutUs = function(props){
        this.render('aboutUs', props);
    }

    router.home = function(props){
        this.index(props);
    }

    router.contact = function(props){
        this.render('contact', props);
    }

    window.addEventListener('load', event => {
        let route = event.target.location.hash.substring(1);
        router.dispatch(route || 'index', store);
    });

    window.addEventListener('hashchange', event => {
        let route = event.target.location.hash.substring(1);
        router.dispatch(route || 'index', store);
    });
})(window, document.getElementById('app'));