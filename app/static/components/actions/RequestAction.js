import request from 'superagent';

export function post(path, data, callback){
    var req = request.post(path);
    req.send(data);
    req.set('xsrfCookieName', 'csrftoken');
    req.set('xsrfHeaderName', 'X-CSRFToken');
    req.set('Accept', 'application/json');
    req.end(callback);
}

export function get(path, callback){
    var req = request.get(path);
    req.end(callback);
}
