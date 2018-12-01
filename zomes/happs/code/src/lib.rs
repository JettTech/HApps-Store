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

pub mod entry;
pub mod z_fn;

define_zome! {
    entries: [
        entry::app_definitions(),
        entry::bundle_definitions()
    ]

    genesis: || { Ok(()) }

    functions: {
        main (Public) {
            create_app: {
                inputs:| uuid:String,title:String,description:String,thumbnail:String |,
                outputs: |result: serde_json::Value|,
                handler: z_fn::handle_creating_app
            }
            adding_DNA: {
                inputs:| app_hash:hdk::holochain_core_types::hash::HashString,dna_bundle:String |,
                outputs: |result: serde_json::Value|,
                handler: z_fn::handle_adding_DNA
            }
            getting_dna: {
                inputs:| app_hash:hdk::holochain_core_types::hash::HashString|,
                outputs: |result: serde_json::Value|,
                handler: z_fn::handle_getting_dna
            }
        }
    }
}
