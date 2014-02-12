
// This script is used to update the database of groups used in recognising that a draft is
// really published by the right group as per the information provided.
//
// The database is not automatically up to date with the information available on the W3C
// web site since the latter is in RDF and in any case we don't wish to hit it up for every check.
// The process to update the database we have here is simple:
//
// 1. Visit http://kwz.me/8p. Copy the JSON into groups-sparql.json
// 2. Run this script

var src = require("./groups-sparql.json")
,   fs = require("fs")
,   pth = require("path")
,   res = {}
;

for (var i = 0, n = src.results.bindings.length; i < n; i++) {
    var group = src.results.bindings[i]
    ,   key = group.mailbox.value.replace("mailto:", "")
    ;
    res[key] = {
        url:    group.homepage.value
    ,   name:   group.name.value
    };
}

fs.writeFileSync(pth.join(__dirname, "../lib/groups-db.json"), JSON.stringify(res, null, 4));