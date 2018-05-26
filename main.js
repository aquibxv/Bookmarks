// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// function for saving Bookmarks
function saveBookmark(e){

    var sitename = document.getElementById("sitename").value;
    var siteUrl = document.getElementById("siteURL").value;


    // Calling validation function and checking if it returns not true;
    if(!validation(sitename,siteUrl))
        return false;

    // bookmark array
    var bookmark = {
        name : sitename,
        url : siteUrl
    }

    if(localStorage.getItem('bookmarks') === null){ 
    // Creating a bookmark aray
    var bookmarks = [];

    // Pushing the bookmark object into the array
    bookmarks.push(bookmark);

    // Setting the value for the key as bookmarks
    // Stores as a string formatted JSON Array
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    else{
    // Converting the JS string to JSON Object
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }

    // Clear form
    document.getElementById("myForm").reset();

    // Re-fetch Bookmark
    fetchBookmark();

    // Prevent form from submitting
    e.preventDefault();
}

// deleteBookmartk function 
function deleteBookmark(url){
    // Converting the JS string to JSON Object
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i=0;i<bookmarks.length;i++){
        if(bookmarks[i].url == url){
            // Delete the url
            bookmarks.splice(i, 1);
        }
    }

    // Setting the bookmarks key after deleting the url
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    // Re-fetch Bookmark
    fetchBookmark();

}



// Function for fetching bookmarsk
function fetchBookmark(){
    // Converting the JS string to JSON Object
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Getting the output Id
    var bookmarkResults = document.getElementById("bookmarksResults");

    // Building the output
    bookmarkResults.innerHTML = '';

    // Running a loop to fetch the name and url
    for(var i=0;i<bookmarks.length;i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

    bookmarkResults.innerHTML +=    '<div class="box-container" >' + 
                                    '<h3>' + name + 
                                    '<a class="box" target="_blank" href="'+url+'"> Visit </a>  ' +
                                    '<a class="btn btn-danger" onclick="deleteBookmark(\''+url+'\')" href="#">Delete</a>' +
                                    '</h3>' +
                                    '</div>' ;
    }
}

// function for validation
function validation(sitename,siteUrl){
    
    // Checking if the url and name feild are empty
    if(!sitename||!siteUrl){
        alert("Please fill a bookmark");

        document.getElementById("sitename").focus();
        return false;
    }

    // Validating the Url
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
  
    if(!siteUrl.match(regex)){
      alert('Please use a valid URL');
      return false;
    }

    return true;
}