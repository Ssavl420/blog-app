const postTitleNode = document.querySelector('#postFieldTitle');
const postNode = document.querySelector('#postFieldText');
const wallPostsNode = document.querySelector('#wallPosts');
const addPostBtn = document.querySelector('#addPost');
const delPostBtn = document.querySelector('#delPost');

const LimitedValueTitle = 50;
const LimitedValuePost = 200;

const valueTitle = document.querySelector('#valueItem');
const valueTitleMessage = document.querySelector('#valueTitleMessage');
const valuePost = document.querySelector('#valueText');
const valuePostMessage = document.querySelector('#valuePostMessage');

const valueTitleHTML = document.querySelector('#valueTitleCounter');
const valuePostHTML = document.querySelector('#valuePostCounter');


const empty = "";

let days = [];
let times = [];
let postsTitles = [];
let posts = [];

addPostBtn.addEventListener('click', getPost);
addPostBtn.addEventListener('click', showWall);
postNode.addEventListener('keydown', resize);
postTitleNode.addEventListener('keydown', resize);
postTitleNode.addEventListener('input', checkTitleValue);
postNode.addEventListener('input', checkPostValue);
postTitleNode.addEventListener('focus', showValue);
postTitleNode.addEventListener('blur', notShowValueTitle);
postNode.addEventListener('focus', showValue);
postNode.addEventListener('blur', notShowValuePost);

// Получение данных из полей ввода в массив, получение дат постов.
function getPost () {
  const post = postNode.value;
  const postTitle = postTitleNode.value;
  event.preventDefault();
  if (!post || !postTitle && postNode.value.length > LimitedValuePost || postTitleNode.value.length > LimitedValueTitle) {
    return
  }
  let optionTime = {
    hour: 'numeric',
    minute: 'numeric',
  };
  let optionDay = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
  }
  const day = new Date().toLocaleString("ru", optionDay).replace(/ г.*/, empty)
  const time = new Date().toLocaleString("ru", optionTime)

  if (!post || !postTitle && postNode.value.length > LimitedValuePost || postTitleNode.value.length > LimitedValueTitle) {
    return null;
  }

  posts.unshift(post);
  postsTitles.unshift(postTitle);
  days.unshift(day);
  times.unshift(time);
}
// Вывод постов (массивов Days, Times, PostTitles, Posts) в HTML
function showWall() {
  if (postNode.value.length === 0 || postTitleNode.value.length === 0 && postNode.value.length > LimitedValuePost || postTitleNode.value.length > LimitedValueTitle) {
    return null;
  } 

  let wallListHTML = '';
  for (let i = 0; i < posts.length; i++) {
  
  wallListHTML += `
    <div class="post">
      <div class="post__header">
        <div class="post__data">
          <span class="post__day">${days[i]}</span>
          <span class="post__time">${times[i]}</span>
        </div>
        <p class="post__title">${postsTitles[i]}</p>
      </div>
      <p class="post__body">${posts[i].split('\n').join('<br>')}</p>
    </div>`
  }
  wallPostsNode.innerHTML = wallListHTML;
  postNode.value = empty;
  postTitleNode.value =  empty;
  valueTitleHTML.innerHTML = 0 + '/' + LimitedValueTitle;
  valuePostHTML.innerHTML = 0 + '/' + LimitedValuePost;
  postNode.style.cssText = 'height:auto;';
  postTitleNode.style.cssText = 'height:auto;';
}
// Изменение высоты элемента при появлении вертикальной полосы прокрутки (скролла)
function resize() {
  let el = this;
  setTimeout(function() {
    el.style.cssText = 'height:auto;';
    el.style.cssText = 'height:' + (el.scrollHeight + 3) + 'px';
  }, 1);
}
// Проверка количества введенных символов в поле ввода "Заголовок"
function checkTitleValue() {
  console.log(postTitleNode.value.length)

  valueTitleHTML.innerHTML = (postTitleNode.value.length + '/' + LimitedValueTitle);

  if (postTitleNode.value.length > LimitedValueTitle) {
    valueTitle.style.color = "red";
    valueTitleMessage.classList.add('js-active');
  } else if (postTitleNode.value.length <= LimitedValueTitle) {
    valueTitle.style.color = "#828282";
    valueTitleMessage.classList.remove('js-active');
  }
}
// Проверка количества введенных символов в поле ввода "Пост"
function checkPostValue() {
  console.log(postNode.value.length)

  valuePostHTML.innerHTML = (postNode.value.length + '/' + LimitedValuePost);

  if (postNode.value.length > LimitedValuePost) {
    valuePost.style.color = "red";
    valuePostMessage.classList.add('js-active');
  } else if (postNode.value.length <= LimitedValuePost) {
    valuePost.style.color = "#828282";
    valuePostMessage.classList.remove('js-active');
  }
}
// Показ количества введенных символов для поля ввода
function showValue() {
  if (postTitleNode === document.activeElement) {
    valueTitle.classList.add('js-active');
  } 
   else if (postNode === document.activeElement) {
    valuePost.classList.add('js-active');
  } 
}
// Отключение показа количества введенных символов для поля ввода "Пост"
function notShowValuePost() {
  if (postNode.value.length <= LimitedValuePost) {
    valuePost.classList.remove('js-active');
  }
}
// Отключение показа количества введенных символов для поля ввода "Заголовок"
function notShowValueTitle() {
  if (postTitleNode.value.length <= LimitedValueTitle) {
    valueTitle.classList.remove('js-active');
  }
}