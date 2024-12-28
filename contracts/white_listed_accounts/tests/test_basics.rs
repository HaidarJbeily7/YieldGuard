use near_sdk::log;
use serde_json::json;

#[tokio::test]
async fn test_whitelist_operations() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = near_workspaces::sandbox().await?;
    log!("Start the fun!");
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = sandbox.dev_deploy(&contract_wasm).await?;
    let owner = sandbox.dev_create_account().await?;
    let user = sandbox.dev_create_account().await?;
    
    // Initialize contract with owner
    let outcome = owner.call(contract.id(), "new")
        .args_json(json!({"owner_id": owner.id()}))
        .transact()
        .await?;
    assert!(outcome.is_success());

    // Add user to whitelist
    let outcome = owner
        .call(contract.id(), "add_to_whitelist")
        .args_json(json!({"account_id": user.id()}))
        .transact()
        .await?;
    assert!(outcome.is_success());

    // Check if user is whitelisted
    let is_whitelisted = contract
        .view("is_whitelisted")
        .args_json(json!({"account_id": user.id()}))
        .await?
        .json::<bool>()?;
    assert!(is_whitelisted);

    // Remove user from whitelist
    let outcome = owner
        .call(contract.id(), "remove_from_whitelist")
        .args_json(json!({"account_id": user.id()}))
        .transact()
        .await?;
    assert!(outcome.is_success());

    // Verify user is no longer whitelisted
    let is_whitelisted = contract
        .view("is_whitelisted")
        .args_json(json!({"account_id": user.id()}))
        .await?
        .json::<bool>()?;
    assert!(!is_whitelisted);

    Ok(())
}
