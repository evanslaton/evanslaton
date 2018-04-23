window.onload = function() {

	//Set variables
	var wikiStart = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=";
	var wikiUserSearch;
	var wikiEnd = "&origin=*&utf8=&format=json"
	var jsonData;
	var resultsLocation = document.getElementById("search-results");

	//Event listener to begin search
	document.getElementById("search").addEventListener("keypress", searchWiki, false);

	//Retreiving data from Wikipedia
		function searchWiki(e) {
		if (13 == e.keyCode && document.getElementById("search") != '') {
			wikiUserSearch = document.getElementById("search").value.split(" ").join("%20");

			var clearLastSearch = document.getElementById("search-results");
			while (clearLastSearch.firstChild) {
	    		clearLastSearch.removeChild(clearLastSearch.firstChild);
			}

			$.getJSON(wikiStart + wikiUserSearch + wikiEnd, function(data) {
					jsonData = data;

				//Removes keyboard from screen on mobile/touch devices
				document.getElementById("search").blur();

				//Adds Wikipedia content to the page
				for (i = 0; i < jsonData.query.search.length; i++) {
					var title = jsonData.query.search[i].title;
					var snippet = jsonData.query.search[i].snippet.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '');

					var link = "https://en.wikipedia.org/wiki/" + title.split(" ").join("_");

					var div = document.createElement("div");
					div.setAttribute("class", "article");

					var a = document.createElement("a");
					a.setAttribute("href", link);
					a.setAttribute("class", "temporary");

					var heading = document.createElement("h2");
					var headingText = document.createTextNode(title);

					var summary = document.createElement("p");
					var summaryText = document.createTextNode(snippet + "...");

					resultsLocation.appendChild(a);
					a.appendChild(div);
					div.appendChild(heading).appendChild(headingText);
					div.appendChild(summary).appendChild(summaryText);
				}
			});
		}
	};
};