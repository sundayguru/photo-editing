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
    data['csrfmiddlewaretoken'] = $('#form-token input').val();
    if(method == 'post' || method == 'put'){
      req.send(data);
    }

    if(file){
      req.attach(file.name, file)
    }
    req.set('xsrfCookieName', 'csrftoken');
    req.set('xsrfHeaderName', 'X-CSRFToken');
    req.set('X-CSRFToken', data['csrfmiddlewaretoken']);
    req.set('Accept', 'application/json');
    req.end(callback);
}

export function post(path, data, callback){
    send('post', path, data, null, callback);
    return;
    var req = request.post(path);
    data['csrfmiddlewaretoken'] = $('#form-token input').val();
    req.send(data);
    req.set('xsrfCookieName', 'csrftoken');
    req.set('xsrfHeaderName', 'X-CSRFToken');
    req.set('X-CSRFToken', data['csrfmiddlewaretoken']);
    req.set('Accept', 'application/json');
    req.end(callback);
}

export function put(path, data, callback){
    var req = request.put(path);
    data['csrfmiddlewaretoken'] = $('#form-token input').val();
    req.send(data);
    req.set('xsrfCookieName', 'csrftoken');
    req.set('xsrfHeaderName', 'X-CSRFToken');
    req.set('X-CSRFToken', data['csrfmiddlewaretoken']);
    req.set('Accept', 'application/json');
    req.end(callback);
}

export function remove(path, callback){
    var req = request.delete(path);
    req.set('xsrfCookieName', 'csrftoken');
    req.set('xsrfHeaderName', 'X-CSRFToken');
    req.set('X-CSRFToken',$('#form-token input').val());
    req.set('Accept', 'application/json');
    req.end(callback);
}

export function get(path, callback){
    var req = request.get(path);
    req.end(callback);
}
