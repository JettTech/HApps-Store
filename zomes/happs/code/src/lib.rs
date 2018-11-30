#![feature(try_from)]
#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate serde_json;
#[macro_use]
extern crate holochain_core_types_derive;

// see https://developer.holochain.org/api/0.0.2/hdk/ for info on using the hdk library
pub mod entry;
pub mod z_fn;

define_zome! {
    entries: [
        entry::definitions()
    ]

    genesis: || { Ok(()) }

    functions: {
        main (Public) {
            create_app: {
                inputs:| uuid:String,title:String,description:String,thumbnail:String |,
                outputs: |result: serde_json::Value|,
                handler: z_fn::handle_creating_app
            }
        }
    }
}
