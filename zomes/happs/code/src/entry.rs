use hdk::holochain_core_types::{
    dna::zome::entry_types::Sharing,
    error::HolochainError,
    json::JsonString,
};
use hdk::{
    self,
    entry_definition::ValidatingEntryType,
};
use serde_json;

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
pub struct App {
    pub uuid:String,
    pub title:String,
    pub author:String,
    pub description:String,
    pub thumbnail:String,
}
#[derive(Serialize, Deserialize, Debug, DefaultJson)]
pub struct DNA_Bundle {
    pub dna_bundle:String,
}

pub fn app_definitions()-> ValidatingEntryType{
    entry!(
        name: "app",
        description: "Details of the app",
        sharing: Sharing::Public,
        native_type: App,
        validation_package: || {
            hdk::ValidationPackageDefinition::ChainFull
        },

        validation: |_app: App, _ctx: hdk::ValidationData| {
            Ok(())
        }
    )
}

pub fn bundle_definitions()-> ValidatingEntryType{
    entry!(
        name: "dna_code_bundle",
        description: "dna code bundel for the app",
        sharing: Sharing::Public,
        native_type: DNA_Bundle,
        validation_package: || {
            hdk::ValidationPackageDefinition::ChainFull
        },

        validation: |_app: DNA_Bundle, _ctx: hdk::ValidationData| {
            Ok(())
        }
    )
}
