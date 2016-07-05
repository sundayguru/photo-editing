import request from 'superagent';

export function ajaxPost(path, data, callback, errorCallback){
    data.append('csrfmiddlewaretoken', $('#form-token input').val());
    $.ajax({
      url: path,
      type: 'POST',
      contentType: false,
      processData: false,
      headers: {
        'X-CSRFToken': $('#form-token input').val()
      },
      data: data,
      success: callback,
      error: errorCallback
    });

}

export function send(method, path, data, file, callback){
    var req = request[method](path);
    if(method == 'post' || method == 'put'){
      if(data){
        req.send(data);
      }
    }
    if(file){
      req.attach('image', file)
    }
    req.set('xsrfCookieName', 'csrftoken');
    req.set('xsrfHeaderName', 'X-CSRFToken');
    req.set('X-CSRFToken', $('#form-token input').val());
    if(!file){
      req.set('Accept', 'application/json');
    }
    req.end(callback);
}

export function post(path, data, callback){
    send('post', path, data, null, callback);
}

export function put(path, data, callback){
    send('put', path, data, null, callback);
}

export function remove(path, callback){
    send('delete', path, null, null, callback);
}

export function get(path, callback){
    send('get', path, null, null, callback);
}
