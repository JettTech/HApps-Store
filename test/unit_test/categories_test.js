const test = require('tape');

module.exports = (app) => {
  test('add Category ', (t) => {
    const App1 = {
      uuid: "762934-19234-123495-12354",
      title: "Errand",
      description: "A better Trello",
      thumbnail: "/IMG.jpg"
    }
    t.plan(1)
    const app_address = app.call("happs", "main", "create_app", App1);
    t.equal(app_address.length, 46)
    console.log("APP ADDRESS:: ",app_address);

    t.plan(2)
    const result1 = app.call("categories", "main", "add_category", {category:"Zo",tag:"El",hash:app_address})
    t.equal(result1, "QmTxzzUST47GVCrba6RLMeCf8wxDgTEm9Ku5khatFoCJCs")

  })
}
