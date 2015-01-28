
window.onload = function()
{
	//document.getElementById("gist_area").innerHTML = "<b>stuff</b>";
}

function displayGists(gists)
{	var main = document.getElementById("gist-area");
	main.innerHTML = "";

	//var allGists = getAllGists();
	for(var i = 0; i<gists.length; i++)
	{
		var gist_obj =  JSON.stringify(gists[i]);
		gist_obj = gists[i];
		var files = gist_obj.files;
		for (var prop in files)
		{
			//console.log(prop);
			var dict = files[prop];
			for(var item in dict)
			{
				//console.log(item);
				if(item == "language")
				{
					//console.log(dict.language);
				}
			}
		}
		
		var gist_id = gist_obj['id'];
		var gist_owner = gist_obj.owner;
		var gist_created = gist_obj.created_at;
		var gist_desc = gist_obj.description;
		var gist_repo = gist_obj.url;
		var idhtml = "<b>id: </b>" + gist_id +"<br>";
		var deschtml = "<b>Description: </b>" + gist_desc +"<br>";
		//var ownerhtml = "<b>Owner: </b>" + gist_owner +"<br>";
		//var langhtml = "<b>Language: </b>" + gist_lang +"<br>";
		var rephtml = "<b>repo: </b>" + gist_repo +"<br>";
		var btn =  '<button id="'+gist_id+'" onclick="favorite(this.id)">Find Gists</button>';
		var gisthtml = "<div>" + idhtml + deschtml +rephtml+btn+"</div>";	
		var elem = document.createElement("div");
		elem.id = "div-"+gist_id;
		elem.innerHTML = gisthtml;
		
		//var main = document.getElementById("gist-area");
		//main.innerHTML = "";
		main.appendChild(elem);

	} 


}
function doSomething(){

	var gist = {id: "1234",
				owner: "ash",
				language: "Python",
				description: "test gist",
				repos_url: "http//ashoknayar.com"	};


	var id = gist.id
	var owner = gist.owner;
	var language = gist.language;
	var description = gist.description;
	var files = gist.files;
	var url = gist.repos_url;
	var idhtml = "<b>id: </b>" + id +"<br>";
	var deschtml = "<b>id: </b>" + description +"<br>";
	var ownerhtml = "<b>id: </b>" + owner +"<br>";
	var langhtml = "<b>id: </b>" + language +"<br>";
	var rephtml = "<b>rep: </b>" + url +"<br>";
	var btn =  '<button id="find" onclick="favorite(this.id)">Find Gists</button>';

	var gisthtml = "<div>" + idhtml + deschtml +ownerhtml + langhtml +rephtml+btn+"</div>";
	console.log(files);
	var elem = document.createElement("div");
	elem.innerHTML = gisthtml;
	var eleme = document.getElementById("gist-area");
	eleme.innerHTML = "";
	eleme.appendChild(elem);

	//create gist html
	//insert into a new div
	// append to main div\

}
function favorite(p)
{
	var favdiv = document.getElementById("favorites");
	favdiv.textContent = p;

}

function getAllGists()
{
	var totalgists = []
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
		chosenlangs.push("JSON");
	}
	var httpRequest = new XMLHttpRequest();
	var gisturl = "https://api.github.com/gists?"+param_str;
	console.log(gisturl);
	httpRequest.open('GET',gisturl);
	httpRequest.send(null);
	httpRequest.onreadystatechange = function()
	{
		if(httpRequest.status == 200)
		{
			console.log("All good!");
			var response = JSON.parse(httpRequest.responseText);
			console.log(response.length);
		}
		else
		{
			console.log("All bad!");
		}
	};

}