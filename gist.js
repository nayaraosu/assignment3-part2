
window.onload = function()
{
	//document.getElementById("gist_area").innerHTML = "<b>stuff</b>";
}

function doSomething(){
	var gist = {id: "1234",
				owner: "ash",
				language: "Python",
				description: "test gist",
				repos_url: "http//ashoknayar.com"	}
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
			console.log(response.length);
			for(var i = 0; i<response.length; i++)
			{
				console.log(JSON.stringify(response[i]));
			}
			
		}
		else
		{

			console.log("All bad!");
		}
	};
}