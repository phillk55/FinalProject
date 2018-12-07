
# PROJECT NAME

---

Name: Phillip Kfare

Date: December 3rd, 2018

Project Topic: Sports Teams

URL: https://final-project-h8v9ko2z7.now.sh

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`:     Name       `Type: String`
- `Field 2`:     Sport       `Type: String`
- `Field 3`:     Championships       `Type: Number`
- `Field 4`:     State      `Type: String`
- `Field 5`:     Stadium       `Type: String`
- `Field 6`:     Players       `Type: Array[String]`

Schema:
```javascript
{
  Name: {
       type: String,
       required: true
   },
   Sport: {
       type: String,
       required: true
   },
   Championships: {
       type: Number,
       required: true
   },
   State: {
     type: String,
     required: true
   },
   Stadium: {
       type: String,
       required: true
   },
   Players: [String]
}
```

### 2. Add New Data

HTML form route: `/create`

POST endpoint route: `/api/addTeam`

Example Node.js POST request to endpoint:
```javascript
var request = require("request");

var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/addTeam',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
      Name: 'Mets',
      Sport: 'Baseball',
      Championships: 2,
      State: 'New York',
      Stadium: 'Citi Field'
      Players: ["Michael Conforto", "Brandon Nimmo"]
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/Teams`

### 4. Search Data

Search Field: 'Name' (of anything that is being displayed)
  - EX: if you are on the players tab, you can search for a player

### 5. Navigation Pages

Navigation Filters
1. Players -> `  /Players  `
2. Sports -> `  /Sports  `
3. State -> `  /States  `
4. Alphabetical -> `  /Alphabetical  `
5. Championships -> `  /Championships  `

### 6. Other API endpoints!

1. /api/Teams
2. /api/addTeam
3. /api/deleteTeam/:Name
4. /api/deleteSport/:Sport
5. /api/deleteState/:State
