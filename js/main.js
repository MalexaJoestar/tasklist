
var host = 'https://api-nodejs-todolist.herokuapp.com';
var access_token = "";
var task_id = "";

function getToken() {

  document.getElementById("form_login").addEventListener("click", function (event) {
    event.preventDefault()
  });

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  fetch(host + '/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    }),
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {

      if (typeof (response.token) !== 'undefined') {
        console.log('GET TOKEN');
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', response.token)
        console.log('access_token:', response.token)
        console.log('*****************************');
        window.location.href = "todolist.html";
      }
      else {
        alert('error al iniciar sesión');
      }


    });

}

function logout() {

  document.getElementById("form_todolist").addEventListener("click", function (event) {
    event.preventDefault()
  });

  fetch(host + '/user/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('LOGOUT');
      console.log('*****************************');
      localStorage.removeItem('access_token');
      window.location.href = "index.html";
    });

}

function add_task() {

  document.getElementById("form_todolist").addEventListener("click", function (event) {
    event.preventDefault()
  });

  var description = document.getElementById("description").value;

  fetch(host + '/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    },
    body: JSON.stringify({
      description
    }),
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('ADD TASK');
      console.log('COMPLETADO?:', response.data.completed)
      console.log('ID:', response.data._id)
      console.log('DESCRIPCION:', response.data.description)
      console.log('PROPIETARIO:', response.data.owner)
      console.log('FECHA DE CREACIÓN:', response.data.createdAt)
      console.log('FECHA DE ACTUALIZACIÓN:', response.data.updatedAt)
      console.log('*****************************');
    });

}

function get_all_task() {

  document.getElementById("form_todolist").addEventListener("click", function (event) {
    event.preventDefault()
  });

  fetch(host + '/task', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {

      console.log('GET ALL TASK');
      const object = response.data;

      object.forEach(function (data, index) {

        document.getElementById("tb_tasklist").innerHTML += "<th scope='row'>" + index + "</th> <td>" + data.description + "</td> <td>" + data.completed + "</td> <td> <button type='submit' class='btn btn-danger' onclick='delete_task_by_id(`" + data._id + "`);'>Delete</button> <button type='submit' class='btn btn-success ms-1' onclick='update_task_by_id(`" + data._id + "`," + data.completed + ");' >Finished</button> </td>";
        console.log(data.completed);
      })

    });

}

function get_task_by_id(_id) {

  document.getElementById("form_todolist").addEventListener("click", function (event) {
    event.preventDefault()
  });

  fetch(host + '/task/' + _id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('GET TASK LIST BY ID');
      console.log('completado?:', response.data.completed)
      console.log('ID:', response.data._id)
      console.log('DESCRIPCION:', response.data.description)
      console.log('PROPIETARIO:', response.data.owner)
      console.log('FECHA DE CREACIÓN:', response.data.createdAt)
      console.log('FECHA DE ACTUALIZACIÓN:', response.data.updatedAt)
      console.log('*****************************');
    });

}

function get_task_by_completed(_completed) {

  document.getElementById("form_todolist").addEventListener("click", function (event) {
    event.preventDefault()
  });

  fetch(host + '/task?completed=' + _completed, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      if (typeof (response.data[0]) !== 'undefined') {
        console.log('GET TASK BY COMPLETED');
        console.log('*****************************');
      }

    });

}

function get_task_by_pagination(_limit, _skip) {

  document.getElementById("form_todolist").addEventListener("click", function (event) {
    event.preventDefault()
  });

  fetch(host + '/task?limit=' + _limit + '&skip=' + _skip, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('GET TASK BY PAGINATION');
      console.log('*****************************');
    });

}

function update_task_by_id(_id, _completed) {

  document.getElementById("form_todolist").addEventListener("click", function (event) {
    event.preventDefault()
  });

  if (_completed) {
    completed = false
  } else {
    completed = true
  }

  fetch(host + '/task/' + _id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    },
    body: JSON.stringify({
      completed
    }),
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('UPDATE TASK BY ID');
      console.log('*****************************');
      // location.reload();
    });

}

function delete_task_by_id(_id) {

  document.getElementById("form_todolist").addEventListener("click", function (event) {
    event.preventDefault()
  });

  fetch(host + '/task/' + _id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('DELETE TASK BY ID');
      console.log('*****************************');
      location.reload();
    });

}

// getToken('malexandracordoba10@gmail.com', '12345678');
// add_task('una tarea más');
// get_all_task();
// get_task_by_id('61885457c84ac30017d0079c');
// get_task_by_completed(false);
// get_task_by_pagination(1, 0);
// update_task_by_id('61885457c84ac30017d0079c', false);
// delete_task_by_id('');
