let addToy = false;

// Event Listeners

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchToys()
});

document.querySelector('.add-toy-form').addEventListener('submit', handleSubmit)

// Event Handlers 

function handleSubmit(e) {
  e.preventDefault();
  let toyObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0,
  };
  renderToys(toyObj);
  addNewToy(toyObj);
};

// Server Functions

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toyData => toyData.forEach(toy => renderToys(toy)))
};


function addNewToy(toyObj) {
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
}

function updateLikes(toyObj) {
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
}

function throwAwayToy(id) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'DELETE',
    header: {
      'Content-Type': 'application/json',
    }
  })
}

// DOM manipulation functions

function renderToys(toy) {
  const toyContainer = document.querySelector("#toy-collection");
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar"/>
      <p>${toy.likes}</p>
    <div>
      <button class="like-btn" id="${toy.id}">Like ❤️</button>
      <button class="delete-btn">Throw Away</button>
    </div>
    `
  card.querySelector('.like-btn').addEventListener('click', () => {
    toy.likes += 1
    card.querySelector('p').textContent = toy.likes;
    updateLikes(toy);
  })
  card.querySelector('.delete-btn').addEventListener('click', () => {
    card.remove()
    throwAwayToy(toy.id)
  })
  toyContainer.appendChild(card);
};





