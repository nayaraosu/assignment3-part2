
window.onload = function()
{
	displayFavorites();
}

function clearFavorites()
{
	// Clear the favorites area by seeting the html to a blank string
	document.getElementById("favorites-area").innerHTML = "";

}
function displayFavorites()
{
	// Clear favorites being reconstructing it
	clearFavorites();

	// If the local storage area exists, pull the string,
	// split by comma, and send it off to AJAX to query github
	if (localStorage.getItem("favorite-gists")) 
	{
		var fav_str = localStorage.getItem("favorite-gists");
		var fav_tokens = fav_str.split(",");
		for(var i =0;i<fav_tokens.length;i++)
		{
			getSingleGist(fav_tokens[i]);
		}
	};
}

function removeFavorite(fav_gist_id)
{
	// Check to see if ID is in the favorite list
	// If so, loop through the list and add everything
	// but the matching ID to the new list. Join the new
	// List by comma and re-insert back into local storage
	// Display favorites again
	var gist_id = fav_gist_id.split("fav-")[1];
	if(inFavorites(gist_id))
	{
		var newFavs = []
		var favs = localStorage.getItem("favorite-gists");
		var fav_tokens = favs.split(",");
		for(i=0;i<fav_tokens.length;i++)
		{
			gist = fav_tokens[i];
			if(gist != gist_id )
			{
				newFavs.push(gist);
			}
		}
		localStorage.setItem("favorite-gists",newFavs.join());
		displayFavorites();
	}
}

function addFavorite(gist_id)
{
	// Check to see if the gist id is not in the list alreadyy
	// If local storage exists, add it to the string
	// If not, add the single id

	if (!inFavorites(gist_id))
	{
		if (localStorage.getItem("favorite-gists"))
		{
			var favs = localStorage.getItem("favorite-gists");
			favs = favs+","+gist_id;
			if(!inFavorites(gist_id))
			{
				localStorage.setItem("favorite-gists", favs);

			}
		}
		else
		{
			localStorage.setItem("favorite-gists", gist_id);
		}

		// Reconstruct the favorites list and the requested gists
		displayFavorites();
		getGists();
	}
}
function inFavorites(gist_id)
{
	// Check to see if the gist is already in the favorites list
	// Return true if it is, false if not
	if (localStorage.getItem("favorite-gists"))
	{
		var favs = localStorage.getItem("favorite-gists");
		var fav_tokens = favs.split(",");
		for(i=0;i<fav_tokens.length;i++)
		{
			gist = fav_tokens[i];
			if(gist == gist_id )
			{
				return true
			}
		}
		return false;
	}
	return false;
}

function filterGist(gist, pychk, sqlchk, jsonchk, javachk)
{
	// Add the requested languages to be displayed
	var chosenlangs = []
	if(pychk)
	{
		chosenlangs.push("python");
	}
	if(sqlchk)
	{
		chosenlangs.push("sql");
	}

	if(javachk)
	{
		chosenlangs.push("javascript");
	}
	if(jsonchk)
	{
		chosenlangs.push("json");
	}

	// If no languages are selected, just return all any and all results
	if (chosenlangs.length == 0)
	{
		return true;
	}
	// Dig down through the "files" values and find the language
	// Match it up against any of the user requested languages.
	// If they match,  return true.
	// KNOWN ISSUE: Sometimes Javascript files will have two languages: HTML and Javascript.
	//	HTML will show up if a provided Javascript file is also there
	var files = gist.files;
	for (var prop in files)
	{
		
		var dict = files[prop];
		for(var item in dict)
		{
			if(item == "language")
			{
				gist_lang = dict.language;
				for(var i = 0; i<chosenlangs.length;i++)
				{	
					if(gist_lang != null)
					{	
						if(gist_lang.toLowerCase() == chosenlangs[i])
						{
							return true;
						}
					}
					
				}
			}
		}

	}
	return false;
}
function getLanguage(gist)
{
	// Goes through the gist object and finds the language
	var files = gist.files;
	for (var prop in files)
	{
		var dict = files[prop];
		for(var item in dict)
		{
			if(item == "language")
			{
				return dict.language;
			}
		}
	}

}

function displayGists(gists)
{	// Get the <div> area for gists
	var main = document.getElementById("gist-area");

	// Get the user requested languages
	var python = document.getElementById("python").checked;
	var json = document.getElementById("json").checked;
	var javascript = document.getElementById("javascript").checked;
	var sql = document.getElementById("sql").checked;	
	
	// For every gist, pull out description, id, and url. 
	// Create and html string and inject it into the "gist-area"
	for(var i = 0; i<gists.length; i++)
	{
		var gist_obj =  JSON.stringify(gists[i]);
		gist_obj = gists[i];
		var files = gist_obj.files;
		var gist_id = gist_obj['id'];

		if (filterGist(gist_obj, python,sql,json,javascript) && !inFavorites(gist_id))
		{	
			console.log("displaying");
			var gist_owner = gist_obj.owner;
			var gist_created = gist_obj.created_at;
			var gist_desc = gist_obj.description;
			var gist_repo = gist_obj.html_url;
			var idhtml = "<b>id: </b><a href="+gist_repo+">" + gist_id +"</a><br>";
			var deschtml = "<b>Description: </b>" + gist_desc +"<br>";
			var langhtml = "<b>Language: </b>" + getLanguage(gist_obj) +"<br>";
			var btn =  '<button id="'+gist_id+'" onclick="addFavorite(this.id)">Add to Favorites</button>';
			var gisthtml = "<div class='gist-item'>" + idhtml + deschtml +langhtml+btn+"<br></div>";	
			var elem = document.createElement("div");
			elem.id = "div-"+gist_id;
			elem.innerHTML = gisthtml;
			main.appendChild(elem);
		}
	} 
}

function clear()
{	
	// Clear out the "gist-area" before rebuilding it
	var mainDiv = document.getElementById("gist-area");
	mainDiv.innerHTML = "";

}

function getGists()
{	
	// Clear the gist-area
	clear();

	// Get gist-area of page
	var main = document.getElementById("gist-area");
	
	// Get number of pages and make sure it is between 1-5
	var pages = document.getElementById("gist-pages").value;
	var totalGists = [];

	// Request each page 
	if(pages >=1 && pages <=5)
	{
		var header = document.createElement("h2");
		header.innerHTML = "Search Results:<br><br>";
		main.appendChild(header);

		for(i=1; i<=pages; i++)
		{
			getGistPage(i);
		}
	}
	// If the request is not between 1-5, let the user know
	else
	{
		var header = document.createElement("h2");
		header.innerHTML = "Please enter page between 1 and 5.<br><br>";
		main.appendChild(header);
	}
}


function getSingleGist(gist_id)
{
	// Create AJAX request for a single gist id
	var httpRequest = new XMLHttpRequest();
	var gisturl = "https://api.github.com/gists/"+gist_id;
	httpRequest.open('GET',gisturl);
	httpRequest.send(null);
		httpRequest.onreadystatechange = function()
		{
			if(httpRequest.readyState == 4)
			{
				if(httpRequest.status == 200)
				{
					console.log("All good!");
					var response = JSON.parse(httpRequest.responseText);
					insertFavorite(response);
					return response;
				}
				else
				{
					console.log("All bad!");
				}
			}
		};
}
function insertFavorite(response)
{
		// Appends a gist to the favorites area

		var main = document.getElementById("favorites-area");

		var gist_id = response['id'];
		var gist_owner = response.owner;
		var gist_created = response.created_at;
		var gist_desc = response.description;
		var gist_repo = response.html_url;
		var idhtml = "<b>id: </b><a href="+gist_repo+">" + gist_id +"</a><br>";
		var deschtml = "<b>Description: </b>" + gist_desc +"<br>";
		var btn =  '<button id="fav-'+gist_id+'" onclick="removeFavorite(this.id)">Remove Favorite</button>';		
		var gisthtml = "<div class='favorite-item'>" + idhtml + deschtml +btn+"<br></div>";	
		var elem = document.createElement("div");
		elem.id = "div-fav-"+gist_id;
		elem.class = "favorite-item";
		elem.innerHTML = gisthtml;
			

		main.appendChild(elem);

}
function getGistPage(page)
{		
		// Request a page of gits using AJAX
		var httpRequest = new XMLHttpRequest();
		var gisturl = "https://api.github.com/gists?page="+page;
		console.log(gisturl);
		httpRequest.open('GET',gisturl);
		httpRequest.send(null);
		httpRequest.onreadystatechange = function()
		{
			if(httpRequest.readyState == 4)
			{
				if(httpRequest.status == 200)
				{
					console.log("All good!"  );
					var response = JSON.parse(httpRequest.responseText);
					displayGists(response);
					return response;
				}
				else
				{
					console.log("All bad!");
				}
			}
		};


}