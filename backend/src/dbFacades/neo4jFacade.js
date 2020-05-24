// Require Neo4j
const neo4j = require('neo4j-driver');

// Create Driver
const driver = new neo4j.driver("neo4j://localhost:7687", neo4j.auth.basic("neo4j", "test"));  //username, password (db is default)

/**
 * Returns 
 */
async function getAllOrders() {
    try {
        const session = driver.session();
        const result = await session.run('MATCH (n) RETURN n')
        session.close()
        return result.records;
    } catch (err) {
        console.log('ERROR: ', err)
        throw Error('A DB error happened')
    }
}

async function createOrder(order) {
    try {
        const session = driver.session();
        await session.run("CREATE (o:Order { name: $name, content: $content })", { name: order.name, content: order.content })
        session.close()
        return
    } catch (err) {
        console.log('ERROR: ', err)
        throw Error('A DB error happened')
    }
}

async function deleteAllNodesAndRelationships() {
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


// TESTING

async function testMultiple() {

    let testOrder = { name: "orderName", content: ["content1, content2"] }
    await createOrder(testOrder);

    console.log(await getAllOrders());

    await deleteAllNodesAndRelationships();

    driver.close();
}

testMultiple();
// module.exports = {
//     getAllOrders,
//     createPerson
// }