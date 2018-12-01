const test = require('tape');

module.exports = (app) => {

  test('Commit the ratings for a ', (t) => {
    const App1 = {
      uuid: "762934-19234-123495-12354",
      title: "Errand",
      description: "A better Trello",
      thumbnail: "/IMG.jpg"
    }
    const App2 = {
      uuid: "762932-14534-16495-19852",
      title: "Clutter",
      description: "A better Twiter",
      thumbnail: "/IMG.jpg"
    }
    const app_address = app.call("happs", "main", "create_app", App1);

    app.call("happs", "main", "create_app", App2);

    t.plan(1)
    // console.log("Creating App : ",app_address);
    t.equal(app_address.length, 46)

    t.plan(2)
    const dna_bundle_hash = app.call("happs", "main", "adding_DNA", {
      app_hash: app_address,
      dna_bundle: "{219y9c7b64290182b4c5710918732rbc79q8nxocbq4tboc7nqrfo83x}"
    })
    t.equal(dna_bundle_hash.length, 46)

    t.plan(3)
    const dna_bundle = app.call("happs", "main", "getting_dna", {
      app_hash: app_address
    })
    t.equal(dna_bundle.dna_bundle, '{219y9c7b64290182b4c5710918732rbc79q8nxocbq4tboc7nqrfo83x}')

    t.plan(4)
    const app_list = app.call('happs', "main", "get_allApps", {})
    t.equal(app_list.length, 2)

  })
}
