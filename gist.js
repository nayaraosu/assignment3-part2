
window.onload = function()
{
	//document.getElementById("gist_area").innerHTML = "<b>stuff</b>";
	displayFavorites();
}
function clearFavorites()
{

	document.getElementById("favorites-area").innerHTML = "";

}
function displayFavorites()
{
	clearFavorites();
	if (localStorage.getItem("favorite-gists")) 
	{
		var fav_str = localStorage.getItem("favorite-gists");
		var fav_tokens = fav_str.split(",");
		var html_str = "<div>"
		for(var i =0;i<fav_tokens.length;i++)
		{
			getSingleGist(fav_tokens[i]);
		}
	};
}

function removeFavorite(fav_gist_id)
{
	var gist_id = fav_gist_id.split("fav-")[1];
	console.log(gist_id);
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
	inFavorites(gist_id);
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
	displayFavorites();
	getGists();

}
function inFavorites(gist_id)
{
	if (localStorage.getItem("favorite-gists"))
	{
		var favs = localStorage.getItem("favorite-gists");
		var fav_tokens = favs.split(",");
		for(i=0;i<fav_tokens.length;i++)
		{
			gist = fav_tokens[i];
			if(gist == gist_id )
			{
				//console.log("has gist");
				return true
			}
		}
		return false;
	}

}
function filterGist(gist, pychk, sqlchk, jsonchk, javachk)
{
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
	var files = gist.files;
	//console.log(chosenlangs);
	//console.log()
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
							return false;
						}
					}
					
				}
			}
		}

	}
	return true;
}
function getLanguage(gist)
{
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
{	var main = document.getElementById("gist-area");
	var python = document.getElementById("python").checked;
	var json = document.getElementById("json").checked;
	var javascript = document.getElementById("javascript").checked;
	var sql = document.getElementById("sql").checked;	
	for(var i = 0; i<gists.length; i++)
	{
		var gist_obj =  JSON.stringify(gists[i]);
		gist_obj = gists[i];
		var files = gist_obj.files;
		var gist_id = gist_obj['id'];

		if (filterGist(gist_obj, python,sql,json,javascript) && !inFavorites(gist_id))
		{
			// for (var prop in files)
			// {
			// 	//console.log(prop);
			// 	var dict = files[prop];
			// 	for(var item in dict)
			// 	{
			// 		//console.log(item);
			// 		if(item == "language")
			// 		{
			// 			//console.log(dict.language);
			// 		}
			// 	}
			// }
			

			var gist_owner = gist_obj.owner;
			var gist_created = gist_obj.created_at;
			var gist_desc = gist_obj.description;
			var gist_repo = gist_obj.html_url;
			var idhtml = "<b>id: </b><a href="+gist_repo+">" + gist_id +"</a><br>";
			var deschtml = "<b>Description: </b>" + gist_desc +"<br>";
			//var ownerhtml = "<b>Owner: </b>" + gist_owner +"<br>";
			var langhtml = "<b>Language: </b>" + getLanguage(gist_obj) +"<br>";
			//var rephtml = "<b>repo: </b>" + gist_repo +"<br>";
			var btn =  '<button id="'+gist_id+'" onclick="addFavorite(this.id)">Add to Favorites</button>';
			var gisthtml = "<div class='gist-item'>" + idhtml + deschtml +langhtml+btn+"<br></div>";	
			var elem = document.createElement("div");
			elem.id = "div-"+gist_id;
			elem.innerHTML = gisthtml;
			
			//var main = document.getElementById("gist-area");
			//main.innerHTML = "";
			main.appendChild(elem);
		}
	} 
}
// function doSomething(){

// 	var gist = {id: "1234",
// 				owner: "ash",
// 				language: "Python",
// 				description: "test gist",
// 				repos_url: "http//ashoknayar.com"	};


// 	var id = gist.id
// 	var owner = gist.owner;
// 	var language = gist.language;
// 	var description = gist.description;
// 	var files = gist.files;
// 	var url = gist.repos_url;
// 	var idhtml = "<b>id: </b>" + id +"<br>";
// 	var deschtml = "<b>id: </b>" + description +"<br>";
// 	var ownerhtml = "<b>id: </b>" + owner +"<br>";
// 	var langhtml = "<b>id: </b>" + language +"<br>";
// 	var rephtml = "<b>rep: </b>" + url +"<br>";
// 	var btn =  '<button id="find" onclick="favorite(this.id)">Find Gists</button>';

// 	var gisthtml = "<div class='gist-item'>" + idhtml + deschtml +ownerhtml + langhtml +rephtml+btn+"</div>";
// 	console.log(files);
// 	var elem = document.createElement("div");
// 	elem.innerHTML = gisthtml;
// 	eleme.appendChild(elem);

// 	//create gist html
// 	//insert into a new div
// 	// append to main div\

// }

function clear()
{
	var mainDiv = document.getElementById("gist-area");
	mainDiv.innerHTML = "";
	console.log("Page cleared");

}

function getGists()
{	
	clear();
	var main = document.getElementById("gist-area");
	//main.innerHTML = "";
	var pages = document.getElementById("gist-pages").value;
	var totalGists = [];
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
	else
	{
		var header = document.createElement("h2");
		header.innerHTML = "Please enter page between 1 and 5.<br><br>";
		main.appendChild(header);

	}

	//console.length("Total: "+totalGists.length);

}
function getSingleGist(gist_id)
{
	var httpRequest = new XMLHttpRequest();
	var gisturl = "https://api.github.com/gists/"+gist_id;
	console.log(gisturl);
	httpRequest.open('GET',gisturl);
	httpRequest.send(null);
		httpRequest.onreadystatechange = function()
		{
			if(httpRequest.readyState == 4)
			{
				if(httpRequest.status == 200)
				{
					console.log("All good! - Fav"  );
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
			

		//var main = document.getElementById("gist-area");
		//main.innerHTML = "";
		main.appendChild(elem);

}
function getGistPage(page)
{
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
					console.log("All good!" + page );
					var response = JSON.parse(httpRequest.responseText);
					console.log(response.length);
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
function getAllGists()
{
	var totalgists = [];
	var pages = document.getElementById("gist-pages").value;
	var chosenlangs = [];
	var pychk = document.getElementById("python").checked;
	var sqlchk = document.getElementById("sql").checked;
	var javachk = document.getElementById("javascript").checked;
	var jsonchk = document.getElementById("json").checked;
	params = []
	for(i=1; i<=pages; i++)
	{
		params.push("page="+i);
	}
	param_str = params.join("&");

	
	//for(var pagex=1;pagex<5;pagex++)
	{
		var httpRequest = new XMLHttpRequest();
		var gisturl = "https://api.github.com/gists?page=1&page=2&per_page=100";//+pagex;
		console.log(gisturl);
		httpRequest.open('GET',gisturl);
		httpRequest.send(null);
		httpRequest.onreadystatechange = function()
		{
			if(httpRequest.readyState == 4)
			{
				if(httpRequest.status == 200)
				{
					console.log("All good!" );
					var response = JSON.parse(httpRequest.responseText);
					console.log(response.length);
					return response;
				}
				else
				{
					console.log("All bad!");
				}
			}
		};
	}
}