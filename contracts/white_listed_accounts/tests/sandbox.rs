use near_sdk::log;
use near_workspaces::network::Sandbox;
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

#[tokio::test]
async fn test_whitelist_with_tiers() -> Result<(), Box<dyn std::error::Error>> {
    // Reuse sandbox and contract setup
    let (_, contract, owner, user) = setup_test_env().await?;

    // Add user with Premium tier
    let outcome = owner
        .call(contract.id(), "add_to_whitelist_with_tier")
        .args_json(json!({
            "account_id": user.id(),
            "tier": "Premium"
        }))
        .transact()
        .await?;
    assert!(outcome.is_success());

    // Check user metadata
    let metadata = contract
        .view("get_account_metadata")
        .args_json(json!({"account_id": user.id()}))
        .await?
        .json::<Option<serde_json::Value>>()?;
    
    assert!(metadata.is_some());
    let metadata = metadata.unwrap();
    assert_eq!(metadata.get("tier").unwrap(), "Premium");

    Ok(())
}

#[tokio::test]
async fn test_unauthorized_operations() -> Result<(), Box<dyn std::error::Error>> {
    // Reuse sandbox and contract setup
    let (sandbox, contract, _, user) = setup_test_env().await?;
    let other_user = sandbox.dev_create_account().await?;

    // Try to add to whitelist from non-owner account
    let outcome = user
        .call(contract.id(), "add_to_whitelist")
        .args_json(json!({"account_id": other_user.id()}))
        .transact()
        .await;
    
    assert!(outcome.is_err());

    // Try to remove from whitelist from non-owner account
    let outcome = user
        .call(contract.id(), "remove_from_whitelist")
        .args_json(json!({"account_id": other_user.id()}))
        .transact()
        .await;

    assert!(outcome.is_err());

    Ok(())
}

#[tokio::test]
async fn test_interaction_tracking() -> Result<(), Box<dyn std::error::Error>> {
    // Reuse sandbox and contract setup
    let (_, contract, owner, user) = setup_test_env().await?;

    // Add user to whitelist
    let outcome = owner
        .call(contract.id(), "add_to_whitelist")
        .args_json(json!({"account_id": user.id()}))
        .transact()
        .await?;
    assert!(outcome.is_success());

    // Record interaction
    let outcome = contract
        .call("record_interaction")
        .args_json(json!({"account_id": user.id()}))
        .transact()
        .await?;
    assert!(outcome.is_success());

    // Check interaction count
    let metadata = contract
        .view("get_account_metadata")
        .args_json(json!({"account_id": user.id()}))
        .await?
        .json::<Option<serde_json::Value>>()?;
    
    assert!(metadata.is_some());
    let metadata = metadata.unwrap();
    assert_eq!(metadata.get("total_interactions").unwrap(), 1);

    Ok(())
}

// Helper function to setup test environment
async fn setup_test_env() -> Result<(near_workspaces::Worker<Sandbox>, near_workspaces::Contract, near_workspaces::Account, near_workspaces::Account), Box<dyn std::error::Error>> {
    let sandbox = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = sandbox.dev_deploy(&contract_wasm).await?;
    let owner = sandbox.dev_create_account().await?;
    let user = sandbox.dev_create_account().await?;

    // Initialize contract
    let outcome = owner.call(contract.id(), "new")
        .args_json(json!({"owner_id": owner.id()}))
        .transact()
        .await?;
    assert!(outcome.is_success());

    Ok((sandbox, contract, owner, user))
}
