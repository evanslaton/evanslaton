window.onload = function() {

	//Set variables
	var fcc = "https://wind-bow.glitch.me/twitch-api/streams/freecodecamp";
	var featured = "https://wind-bow.glitch.me/twitch-api/streams/featured/?language=en";
	var fccData;
	var featuredData;

	//Retreives fcc's stream data
	$.getJSON(fcc, function(data) {
		fccData = data;
		
		//Create and insert img
		if (fccData.stream == null) {
			var fccImg = document.createElement("img");
			fccImg.setAttribute("src", "images/fcc_offline.jpg");
			fccImg.setAttribute("alt", "fcc logo offline.jpg");
			document.getElementById("fcc_div").append(fccImg);

			var fccName = document.createElement("p");
			var fccNameSpan = document.createElement("span");
			fccNameSpan.setAttribute("class", "bold");
			var fccNameSpanText = document.createTextNode("Display Name: ");
			fccNameSpan.append(fccNameSpanText);
			fccName.append(fccNameSpan);
			var fccNameText = document.createTextNode("freeCodeCamp");
			fccName.append(fccNameText);
			document.getElementById("fcc_div").append(fccName);
		} else {
			//Img
			var fccImg = document.createElement("img");
			fccImg.setAttribute("src", "fcc_logo.png");
			fccImg.setAttribute("alt", "fcc logo");
			document.getElementById("fcc_div").append(fccImg);

			//Display Name
			var fccName = document.createElement("p");
			var fccNameSpan = document.createElement("span");
			fccNameSpan.setAttribute("class", "bold");
			var fccNameSpanText = document.createTextNode("Display Name: ");
			fccNameSpan.append(fccNameSpanText);
			fccName.append(fccNameSpan);
			var fccNameText = document.createTextNode("freeCodeCamp");
			fccName.append(fccNameText);
			document.getElementById("fcc_div").append(fccName);

			//Followers
			var fccfollowers = document.createElement("p");
			var fccfollowersSpan = document.createElement("span");
			fccfollowersSpan.setAttribute("class", "bold");
			var fccfollowersSpanText = document.createTextNode("Followers: ");
			fccfollowersSpan.append(fccfollowersSpanText);
			fccfollowers.append(fccfollowersSpan);
			var fccfollowersText = document.createTextNode(fccData.featured[0].stream.channel.followers);
			fccfollowers.append(followers);
			document.getElementById("fcc_div").append(fccfollowers);

			//Views
			var fccViews = document.createElement("p");
			var fccViewsSpan = document.createElement("span");
			fccViewsSpan.setAttribute("class", "bold");
			var fccViewsSpanText = document.createTextNode("Views: ");
			fccViewsSpan.append(fccViewsSpanText);
			fccViews.append(fccViewsSpan);
			var fccViewsText = document.createTextNode(fccData.featured[0].stream.channel.views);
			fccName.append(fccViewsText);
			document.getElementById("fcc_div").append(fccViews);

			//Game
			var fccGame = document.createElement("p");
			var fccGameSpan = document.createElement("span");
			fccGameSpan.setAttribute("class", "bold");
			var fccGameSpanText = document.createTextNode("Game: ");
			fccGameSpan.append(fccGameSpanText);
			fccGame.append(fccGameSpan);
			var fccGameText = document.createTextNode("Game: N\/A" + fccData.featured[0].stream.channel.game);
			fccName.append(fccGameText);
			document.getElementById("fcc_div").append(fccGame);

			//Summary
			var fccSummary = document.createElement("p");
			var fccSummarySpan = document.createElement("span");
			fccSummarySpan.setAttribute("class", "bold");
			var fccSummarySpanText = document.createTextNode("Summary: ");
			fccSummarySpan.append(fccSummarySpanText);
			fccSummary.append(fccSummarySpan);
			var fccSummaryText = document.createTextNode("Summary: " + fccData.featured[0].text.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, ''));
			fccSummary.append(fccSummaryText);
			document.getElementById("fcc_div").append(fccSummary);
		};
	});
		
	//Retreives featured English streams data
	$.getJSON(featured, function(data) {
		featuredData = data;
	
		for (i = 0; i < featuredData.featured.length; i++) {

			//A
			var featuredA = document.createElement("a");
			featuredA.setAttribute("href", featuredData.featured[i].stream.channel.url);
			document.getElementById("container").append(featuredA)

			//Div
			var featuredDiv = document.createElement("div");
			featuredDiv.setAttribute("class", "streamers");
			featuredA.append(featuredDiv);

			//Img
			var featuredImg = document.createElement("img");
			featuredImg.setAttribute("src", featuredData.featured[i].image);
			featuredImg.setAttribute("alt", featuredData.featured[i].title + " logo");
			featuredDiv.append(featuredImg);

			//Display Name
			var featuredName = document.createElement("p");
			var featuredNameSpan = document.createElement("span");
			featuredNameSpan.setAttribute("class", "bold");
			var featuredNameSpanText = document.createTextNode("Display Name: ");
			featuredNameSpan.append(featuredNameSpanText);
			featuredName.append(featuredNameSpan);
			var featuredNameText = document.createTextNode(featuredData.featured[i].stream.channel.display_name);
			featuredName.append(featuredNameText);
			featuredDiv.append(featuredName);

			//Followers
			var featuredFollowers = document.createElement("p");
			var featuredFollowersSpan = document.createElement("span");
			featuredFollowersSpan.setAttribute("class", "bold");
			var featuredFollowersSpanText = document.createTextNode("Followers: ");
			featuredFollowersSpan.append(featuredFollowersSpanText);
			featuredFollowers.append(featuredFollowersSpan);
			var featuredFollowersText = document.createTextNode(featuredData.featured[i].stream.channel.followers);
			featuredFollowers.append(featuredFollowersText);
			featuredDiv.append(featuredFollowers);

			//Views
			var featuredViews = document.createElement("p");
			var featuredViewsSpan = document.createElement("span");
			featuredViewsSpan.setAttribute("class", "bold");
			var featuredViewsSpanText = document.createTextNode("Views: ");
			featuredViewsSpan.append(featuredViewsSpanText);
			featuredViews.append(featuredViewsSpan);
			var featuredViewsText = document.createTextNode(featuredData.featured[i].stream.channel.views);
			featuredViews.append(featuredViewsText);
			featuredDiv.append(featuredViews);

			//Game
			var featuredGame = document.createElement("p");
			var featuredGameSpan = document.createElement("span");
			featuredGameSpan.setAttribute("class", "bold");
			var featuredGameSpanText = document.createTextNode("Game: ");
			featuredGameSpan.append(featuredGameSpanText);
			featuredGame.append(featuredGameSpan);
			var featuredGameText = document.createTextNode(featuredData.featured[i].stream.game);
			featuredGame.append(featuredGameText);
			featuredDiv.append(featuredGame);

			//Summary
			var featuredSummary = document.createElement("p");
			var featuredSummarySpan = document.createElement("span");
			featuredSummarySpan.setAttribute("class", "bold");
			var featuredSummarySpanText = document.createTextNode("Summary: ");
			featuredSummarySpan.append(featuredSummarySpanText);
			featuredSummary.append(featuredSummarySpan);
			var featuredSummaryText = document.createTextNode(featuredData.featured[i].text.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, ''));
			featuredSummary.append(featuredSummaryText);
			featuredDiv.append(featuredSummary);
		};
	});
}