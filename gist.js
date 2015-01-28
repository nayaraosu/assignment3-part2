
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
		console.log(gist_obj);
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
	var url = gist.repos_url;
	var idhtml = "<b>id: </b>" + id +"<br>";
	var deschtml = "<b>id: </b>" + description +"<br>";
	var ownerhtml = "<b>id: </b>" + owner +"<br>";
	var langhtml = "<b>id: </b>" + language +"<br>";
	var rephtml = "<b>rep: </b>" + url +"<br>";
	var btn =  '<button id="find" onclick="favorite(this.id)">Find Gists</button>';

	var gisthtml = "<div>" + idhtml + deschtml +ownerhtml + langhtml +rephtml+btn+"</div>";
	console.log(gisthtml);
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
	var httpRequest = new XMLHttpRequest();
	httpRequest.open('GET',"https://api.github.com/gists");
	httpRequest.send(null);

	httpRequest.onreadystatechange = function(){
		if(httpRequest.status == 200)
		{
			console.log("All good!");
			var response = JSON.parse(httpRequest.responseText);
			displayGists(response);
			//return response;
			/*
			console.log(response.length);
			for(var i = 0; i<response.length; i++)
			{
				console.log(JSON.stringify(response[i]));
			} */
			
		}
		else
		{

			console.log("All bad!");
		}
	};
}