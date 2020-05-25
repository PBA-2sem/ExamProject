const neo4j = require('neo4j-driver');  //npm install --save neo4j-driver

const driver = new neo4j.driver("neo4j://localhost:7687", neo4j.auth.basic("neo4j", "test"));  //username, password (db is default)


/**
 * Get top 3 color names as array in descending order (largest to lowest)
 */
async function getTop3Colors(age) {

    let ageGroup = _getAgeGroup(age)

    try {
        const session = driver.session();
        const result = await session.run('MATCH (n)-[r:ADDED]->(m) WHERE n.name = $name RETURN m, count(DISTINCT r) AS num ORDER BY num DESC LIMIT 3;', { name: ageGroup })
        session.close()
        return result.records.map(record => record['_fields'][0]['properties']['name']);
    } catch (err) {
        console.log('ERROR: ', err)
        throw Error('A DB error happened')
    }
}

/**
 * CREATE given age & color nodes (if not already exist, else MERGE), and CREATE relationship between them.
 * @param {*} age, number 
 * @param {*} color, string
 */
async function registerAgeAndColor(age, color) {

    let ageGroup = _getAgeGroup(age)


    try {
        const session = driver.session();

        // Merge agegroup
        await session.run("MERGE (:agegroup{name: $name})", { name: ageGroup })

        //merge color
        await session.run("MERGE (:color{name: $name})", { name: color })

        //create relationship
        await session.run("MATCH (a:agegroup),(c:color) WHERE a.name = $name AND c.name = $color CREATE (a)-[r:ADDED]->(c) RETURN type(r);", { name: ageGroup, color: color })

        session.close()
        return
    } catch (err) {
        console.log('ERROR: ', err)
        throw Error('A DB error happened')
    }
}

/**
 * Helper method: return corresponding ageGroup category as string for given age in number.
 * @param {*} age, number
 */
function _getAgeGroup(age) {

    let ageGroup = "other"

    if (age >= 13 && age <= 20) ageGroup = "teens"
    if (age >= 20 && age <= 30) ageGroup = "twenties"
    if (age >= 30 && age <= 40) ageGroup = "thirties"
    if (age >= 40 && age <= 50) ageGroup = "fourties"
    if (age >= 50 && age <= 60) ageGroup = "fifties"
    if (age >= 60 && age <= 70) ageGroup = "sixties"
    if (age >= 70 && age <= 80) ageGroup = "seventies"
    if (age >= 80 && age <= 90) ageGroup = "eighties"
    if (age >= 90 && age <= 100) ageGroup = "nineties"
    if (age >= 100 && age <= 200) ageGroup = "hundreds"

    return ageGroup
}

/**
 * Helper method: delete ll nodes & relationships in the database
 */
async function _deleteAllNodesAndRelationships() {
    try {
        const session = driver.session();
        await session.run('MATCH (n) DETACH DELETE n')
        session.close()
        return
    } catch (err) {
        console.log('ERROR: ', err)
        throw Error('A DB error happened')
    }
}

function _getRandomNumber() {
    return Math.floor(Math.random() * (100 - 1) + 1);
}
function _getrandomColor() {
    let colors = [
        "Aquamarine",
        "Blue",
        "Crimson",
        "Fuscia",
        "Goldenrod",
        "Green",
        "Indigo",
        "Khaki",
        "Maroon",
        "Mauv",
        "Orange",
        "Pink",
        "Puce",
        "Purple",
        "Red",
        "Teal",
        "Turquoise",
        "Violet",
        "Yellow"
    ]
    return colors[Math.floor(Math.random() * colors.length)];
}


async function _fillNumberOfDummyRecommendationsAndRelationships(number) {

    for (let i = 0; i < number; i++) {
        await registerAgeAndColor(_getRandomNumber(), _getrandomColor());
    }

    driver.close();
}

// DUMMY DATA
async function fillDummyData() {
    await _fillNumberOfDummyRecommendationsAndRelationships(500);
    driver.close();
}

// fillDummyData();


module.exports = {
    getTop3Colors,
    registerAgeAndColor
}