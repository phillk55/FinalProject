var fs = require('fs');

function loadData() {
    return JSON.parse(fs.readFileSync('data.json'));
}

function saveData(data) {
	// poke.json stores the pokemon array under key "pokemon",
	// so we are recreating the same structure with this object
	var obj = {
		teams: data
	};

	fs.writeFileSync('data.json', JSON.stringify(obj));
}

function getAllNames(data) {
    var allTags = [];
    for(var i = 0; i < data.length; i++) {
        var tags = data[i].Name;
        console.log(tags);
        if(!~allTags.indexOf(tags)) allTags.push(tags);
    }
    return allTags;
}

function getSportNames(data) {
    var allTags = [];
    for(var i = 0; i < data.length; i++) {
        var tags = data[i].Sport;
        console.log(tags);
        if(!~allTags.indexOf(tags)) allTags.push(tags);
    }
    return allTags;
}

function getStateNames(data) {
    var allTags = [];
    for(var i = 0; i < data.length; i++) {
        var tags = data[i].State;
        console.log(tags);
        if(!~allTags.indexOf(tags)) allTags.push(tags);
    }
    return allTags;
}

function getPlayerNames(data) {
    var allTags = [];
    for(var i = 0; i < data.length; i++) {
        var tags = data[i].Players;
        console.log(tags);
        for (var j = 0; j < tags.length; j++) {
          if(!~allTags.indexOf(tags[j])) allTags.push(tags[j]);
        }
    }
    return allTags;
}

module.exports = {
    loadData: loadData,
    saveData: saveData,
    getAllNames: getAllNames,
    getSportNames: getSportNames,
    getStateNames: getStateNames,
    getPlayerNames: getPlayerNames,
}
