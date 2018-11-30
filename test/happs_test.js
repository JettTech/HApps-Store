const test = require('tape');

module.exports = (app) => {

  test('Commit the ratings for a ', (t) => {
    const app_address = app.call("happs", "main", "create_app",{
    uuid:"762934-19234-123495-12354",
    title:"Errand",
    description:"A better Trello",
    thumbnail:"/IMG.jpg"});
    t.plan(1)
    console.log("Creating App : ",app_address);
    t.equal(app_address.length, 46)
  })
}
