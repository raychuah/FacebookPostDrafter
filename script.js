const createPost = document.querySelector("._5rpu");
const savedPost = document.querySelector(".saved .body_wrapper");
const buttonSave = document.querySelector("#btn_save > div");
const buttonDelete = document.querySelectorAll(".delete_icon");
const savedSection = document.querySelector(".saved .body_wrapper");

//Render
renderPosts();

// Event Listener
createPost.addEventListener("input", () => {
  removePlaceholder();
  buttonSave.parentNode.classList.replace("rj84mg9z", "nhd2j8a9"); // cursor
  buttonSave.classList.replace("c98fg2ug", "s1i5eluu"); //bg color
  buttonSave.querySelector("span").classList.replace("o7e4w99y", "bwm1u5wc"); // text color
});

buttonSave.addEventListener("click", () => {
  const newPost = createPost.innerHTML;
  addDb(newPost);
  renderPosts();
  createPost.textContent = ""; //clear
});

savedSection.addEventListener("click", (event) => {
  if (event.target.parentNode.className === "delete_icon") {
    const id = Number(event.target.parentNode.parentNode.id);
    deleteDb(id);
    renderPosts();
  } else {
    // ( event.target.className === "post_body" ||
    //   event.target.parentNode.className === "post_body")
    removePlaceholder();
    const id = Number(event.target.closest(".post").id);
    const db = readOneDb(id);
    const content = db[0].content;
    createPost.innerHTML = content;
    // console.log(db[0].content);
  }
});

// Functions
function removePlaceholder() {
  const placeholderEl = createPost.parentNode.previousElementSibling;
  placeholderEl ? placeholderEl.remove() : null;
}

function addDb(post) {
  const db = readAllDb();
  if (db == null) {
    localStorage.setItem(
      "post",
      JSON.stringify([{ id: Date.now(), content: post }])
    );
  } else {
    localStorage.setItem(
      "post",
      JSON.stringify([...db, { id: Date.now(), content: post }])
    );
  }
}

function readAllDb() {
  return JSON.parse(localStorage.getItem("post"));
}

function readOneDb(id) {
  const db = JSON.parse(localStorage.getItem("post"));
  return db.filter((el) => el.id === id);
}

function deleteDb(id) {
  const currentposts = readAllDb();
  const filtposts = currentposts.filter((el) => el.id !== id);
  localStorage.setItem("post", JSON.stringify(filtposts));
}

function renderPosts() {
  savedPost.textContent = "";
  const posts = readAllDb();
  if (posts !== null) {
    posts.forEach((post) => {
      savedPost.append(savedPostToElement(post.id, post.content));
    });
  }
}

function htmlToElement(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content;
}

function savedPostToElement(id, postHtml) {
  let postTextEl;
  if (postHtml === "") {
    postTextEl = document.createTextNode("");
  } else {
    postTextEl = htmlToElement(postHtml);
  }
  const postBodyEl = document.createElement("div");
  postBodyEl.classList.add("post_body");
  postBodyEl.appendChild(postTextEl);
  const postEl = document.createElement("div");
  postEl.classList.add("post");
  postEl.id = id;
  postEl.appendChild(postBodyEl);
  const imgEl = document.createElement("img");
  imgEl.src = "./delete.png";
  const spanEl = document.createElement("span");
  spanEl.classList.add("delete_icon");
  spanEl.appendChild(imgEl);
  postEl.appendChild(spanEl);
  return postEl;
}
