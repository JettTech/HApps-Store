use hdk::{
    holochain_core_types::{
        hash::HashString,
        json::JsonString,
        entry::Entry,
        error::HolochainError,
    }
};
use hdk::error::{
    ZomeApiError,
};
use std::convert::TryFrom;
use crate::holochain_core_types_derive;


pub fn handle_adding_category(category:String, tag:String, hash:HashString)->JsonString{
    // Requires the Anchors Zome
    // let category_base : Anchor_return = Anchor_return::try_from(anchor(category.clone(),"".into())).unwrap();
    hdk::debug("Category_base:: ");

    #[derive(Serialize, Deserialize, Debug, DefaultJson)]
    struct Anchor_return{
        ok:String,
        value:String,
        error:String,
    }

    let trying:JsonString = anchor(category.clone(),"".into());
    // hdk::debug(trying);
    let category_base : Anchor_return = Anchor_return::try_from(trying).unwrap();
    // hdk::debug(category_base.into());
    //
    // let tag_base : HashString = anchor(category.clone(),tags).to_string().into();
    // hdk::debug("Tag_base:: ");
    // hdk::debug(tag_base.to_string());

    // link_address(hash.clone(),&category_base,"category".into());
    // link_address(hash.clone(),&tag_base,"tag_category".into());
    // link_address(tag_base,&hash,"app_category".into());

    "whatever".into()
}

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
 struct Anchor {
     anchor_type: String,
     anchor_text: String,
 }

/*Anchor Calls*/
pub fn anchor(anchor_type:String,anchor_text:String)->JsonString{

 let anchor = Anchor {
     anchor_type,
     anchor_text
 };
    match hdk::call("anchors","main","create_anchor",anchor.into()){
        Ok(return_value)=>return_value,
        Err(e)=>e.into(),
    }
}

/*Coustom HC Functions*/
pub fn link_address(address:HashString,link_to_address:&HashString,entry_tag:String) -> HashString{
    // hdk::debug("entry_tag: ");
    // hdk::debug(entry_tag.clone());
    match hdk::link_entries(&link_to_address,&address,entry_tag){
        Ok(link_result)=>address.into(),
        Err(hdk_error)=>hdk_error.to_string().into(),
    }
}
