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

    // Request whitelist
    let outcome = user
        .call(contract.id(), "request_whitelist")
        .args_json(json!({
            "account_id": user.id(),
            "organization_id": null
        }))
        .transact()
        .await?;
    assert!(outcome.is_success());

    // Check pending state
    let metadata = contract
        .view("get_account_metadata")
        .args_json(json!({"account_id": user.id()}))
        .await?
        .json::<Option<serde_json::Value>>()?;
    assert!(metadata.is_some());
    let metadata = metadata.unwrap();
    assert_eq!(metadata.get("state").unwrap(), "Pending");

    // Approve whitelist request
    let outcome = owner
        .call(contract.id(), "approve_whitelist")
        .args_json(json!({"account_id": user.id()}))
        .transact()
        .await?;
    assert!(outcome.is_success());

    // Verify approved state
    let metadata = contract
        .view("get_account_metadata")
        .args_json(json!({"account_id": user.id()}))
        .await?
        .json::<Option<serde_json::Value>>()?;
    assert!(metadata.is_some());
    let metadata = metadata.unwrap();
    assert_eq!(metadata.get("state").unwrap(), "Approved");

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
            "tier": "Premium",
            "organization_id": null
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
    assert_eq!(metadata.get("state").unwrap(), "Approved");

    Ok(())
}

#[tokio::test]
async fn test_organization_operations() -> Result<(), Box<dyn std::error::Error>> {
    let (_, contract, owner, user) = setup_test_env().await?;
    let org_id = "test_org".to_string();

    // Add user to whitelist with organization
    let outcome = owner
        .call(contract.id(), "add_to_whitelist_with_tier")
        .args_json(json!({
            "account_id": user.id(),
            "tier": "Basic",
            "organization_id": org_id
        }))
        .transact()
        .await?;
    assert!(outcome.is_success());

    // Check organization members
    let members = contract
        .view("get_organization_members")
        .args_json(json!({"organization_id": org_id}))
        .await?
        .json::<Vec<String>>()?;
    
    assert_eq!(members.len(), 1);
    assert!(members.contains(&user.id().to_string()));

    Ok(())
}

#[tokio::test]
async fn test_interaction_tracking() -> Result<(), Box<dyn std::error::Error>> {
    let (_, contract, owner, user) = setup_test_env().await?;

    // Add user with Basic tier
    let outcome = owner
        .call(contract.id(), "add_to_whitelist_with_tier")
        .args_json(json!({
            "account_id": user.id(),
            "tier": "Basic",
            "organization_id": null
        }))
        .transact()
        .await?;
    assert!(outcome.is_success());

    // Record 100 interactions to upgrade to Premium
    for _ in 0..100 {
        let outcome = contract
            .call("record_interaction")
            .args_json(json!({"account_id": user.id()}))
            .transact()
            .await?;
        assert!(outcome.is_success());
    }

    // Verify Premium tier upgrade
    let metadata = contract
        .view("get_account_metadata")
        .args_json(json!({"account_id": user.id()}))
        .await?
        .json::<Option<serde_json::Value>>()?;
    
    assert!(metadata.is_some());
    let metadata = metadata.unwrap();
    assert_eq!(metadata.get("tier").unwrap(), "Premium");

    // Record 900 more interactions to upgrade to VIP
    for _ in 0..900 {
        let outcome = contract
            .call("record_interaction")
            .args_json(json!({"account_id": user.id()}))
            .transact()
            .await?;
        assert!(outcome.is_success());
    }

    // Verify VIP tier upgrade
    let metadata = contract
        .view("get_account_metadata")
        .args_json(json!({"account_id": user.id()}))
        .await?
        .json::<Option<serde_json::Value>>()?;
    
    assert!(metadata.is_some());
    let metadata = metadata.unwrap();
    assert_eq!(metadata.get("tier").unwrap(), "VIP");
    assert_eq!(metadata.get("total_interactions").unwrap(), 1000);

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
