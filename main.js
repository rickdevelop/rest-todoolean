$(document).ready(function () {
  var baseUrl = 'http://157.230.17.132:3019/todos';

  getAllTodos(printUlFrom);

  $('#newList').click(function () {
    var textUser = $('input').val();
    if (textUser !== '') {
      newTodo(textUser);
    }
  });

  $(document).on('click', '.modifica', function () {
    var id = $(this).parent().find('span').html();
    var newText = prompt('modifica la tua nota');
    updateTodoBy(id, newText);
  });

  $(document).on('click', '.elimina', function () {
    var id = $(this).parent().find('span').html();
    deleteTodoById(id);
  });


  function getAllTodos(successCallback) {
    ajaxCall(baseUrl, 'GET', successCallback);
  }

  function getTodoBy(id, successCallback) {
    var completeUrl = baseUrl + '/' + id;
    ajaxCall(completeUrl, 'GET', successCallback);
  }

  function newTodo(todoText) {
    ajaxCall(baseUrl, 'POST', printUlFrom, { text: todoText });
  }


  function updateTodoBy(id, todoText) {
    var completeUrl = baseUrl + '/' + id;
    ajaxCall(completeUrl, 'PUT', printUlFrom, { text: todoText });
  }


  function deleteTodoById(id) {
    var completeUrl = baseUrl + '/' + id;
    ajaxCall(completeUrl, 'DELETE', printUlFrom);
  }

  function ajaxCall(url, method, successCallback, data) {

    $.ajax({
      url: url,
      method: method,
      data: data,
      success: function (apiData) {
        console.log('API RETURNS');
        console.log(method + ' request OK');

        if (method !== 'GET') {
          console.log('UPDATED TODOLIST');
          ajaxCall(baseUrl, 'GET', successCallback);
        } else {
          successCallback(apiData, '#todolean', method);
        }
      },

      fail: function (error) {
        console.log(error);
      },
    });

  }

  function printUlFrom(todos, ulSelector, method) {

    var btnModifica = '<button class="modifica" type="button" name="button">Modifica-nota</button>';
    var btnElimina = '<button class="elimina" type="button" name="button">Elimina-nota</button>';

    var ulInnerHtml = todos.reduce(function (acc, todo) {
      return acc += '<li class="todo ' + todo.id + '"><span>' + todo.id + '</span> - ' + todo.text + btnModifica + btnElimina + '</li>';
    }, '');

    $(ulSelector).html(ulInnerHtml);

  }

});
