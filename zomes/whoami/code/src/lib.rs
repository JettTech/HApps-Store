#![feature(try_from)]

#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate holochain_core_types_derive;

pub mod fn_def;


define_zome! {
    entries: [
    ]

    genesis: || { Ok(()) }



    functions: {
        main (Public) {
            get_user: {
                inputs:| |,
                outputs: |result: serde_json::Value|,
                handler: fn_def::handle_get_agent
            }
        }
    }
}
