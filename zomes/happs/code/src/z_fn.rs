
use hdk::{
    holochain_core_types::{
        json::JsonString,
        entry::Entry,
        entry::entry_type::EntryType,
        hash::HashString,
    },
    api::AGENT_ADDRESS,
    api::debug,
};
use crate::entry;

pub fn handle_creating_app(uuid:String,title:String,description:String,thumbnail:String)->JsonString{
    let app_entry = Entry::new(EntryType::App("app".into()),
        entry::App {
            uuid: uuid.to_string(),
            title: title.to_string(),
            author: AGENT_ADDRESS.to_string().into(),
            description: description.to_string(),
            thumbnail:thumbnail.to_string(),
        }
    );
    //TODO: Link to an anchor nt AGENT_ADDRESS
    commit_n_link(app_entry,"app_tag".into(),&AGENT_ADDRESS).into()
}

/*
Functions needed to be handeled by the HCHC
*/
pub fn handle_adding_UISkins(app_hash:HashString,ui_code:String){
    
}

pub fn handle_adding_DNA(){

}


/*Coustom Function*/
pub fn commit_n_link(entry:Entry,entry_tag:String,base_hash:&HashString) -> JsonString{

    match hdk::commit_entry(&entry) {
        Ok(address) => {
            let link_result = hdk::link_entries(
                &base_hash,
                &address,
                entry_tag
            );
            if link_result.is_err(){
                return link_result.into()
            }
            address.into()
        }
        Err(hdk_error) => hdk_error.into()
    }
}
