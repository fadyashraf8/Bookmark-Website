
var myFrom = document.getElementById("myForm")



myFrom.addEventListener("submit", saveMyBookmark)


function saveMyBookmark(e) {
  var siteName = document.getElementById("siteName").value
  var siteUrl = document.getElementById("siteUrl").value

  if (!validation(siteName, siteUrl)) {
    return false
  }

  var Bookmark = {
    name: siteName,
    url: siteUrl,
  }
  if (localStorage.getItem("bookmarks") === null) {
    var bookmarks = []
    bookmarks.push(Bookmark)
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
  } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    bookmarks.push(Bookmark)
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
  }
  document.getElementById("myForm").reset()
  fetchBookmarks()
  e.preventDefault()
}




function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
  var bookmarksResults = document.getElementById("bookmarksResults")
  cartona = ""
  for (let i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name
    var url = bookmarks[i].url
    cartona += `
  <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">${name}</th>
      <th scope="col"> <a class="btn btn-danger" href="${url}" target="_blank" rel="noopener noreferrer">visit</a></th>
      <th scope="col"><a onclick="deleteBookmark(${i})" class="btn btn-danger" href="#">Delete</a></th>
    </tr>
  </thead>
</table>
  `
  }
  bookmarksResults.innerHTML = cartona
  console.log(url);
}


function deleteBookmark(i) {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
  bookmarks.splice(i, 1)
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
  fetchBookmarks()
}


function validation(siteName, siteUrl) {
  if (!siteName || !siteUrl) {

    alert("please fill in the form")
    return false
  }
  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {

    alert("not a valid url")
    return false
  }
  return true
}