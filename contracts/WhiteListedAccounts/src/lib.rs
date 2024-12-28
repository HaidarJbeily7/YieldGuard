use near_sdk::{log, near, AccountId, env};
use std::collections::HashSet;

#[near(contract_state)]
pub struct Contract {
    owner_id: AccountId,
    whitelisted_accounts: HashSet<AccountId>,
}

impl Default for Contract {
    fn default() -> Self {
        Self {
            owner_id: env::predecessor_account_id(),
            whitelisted_accounts: HashSet::new(),
        }
    }
}

#[near]
impl Contract {
    #[init]
    pub fn new(owner_id: AccountId) -> Self {
        Self {
            owner_id,
            whitelisted_accounts: HashSet::new(),
        }
    }

    pub fn add_to_whitelist(&mut self, account_id: AccountId) {
        self.assert_owner();
        self.whitelisted_accounts.insert(account_id.clone());
        log!("Added {} to whitelist", account_id);
    }

    pub fn remove_from_whitelist(&mut self, account_id: AccountId) {
        self.assert_owner();
        self.whitelisted_accounts.remove(&account_id);
        log!("Removed {} from whitelist", account_id);
    }

    pub fn is_whitelisted(&self, account_id: AccountId) -> bool {
        self.whitelisted_accounts.contains(&account_id)
    }

    pub fn get_whitelist(&self) -> Vec<AccountId> {
        self.whitelisted_accounts.iter().cloned().collect()
    }

    fn assert_owner(&self) {
        assert_eq!(
            env::predecessor_account_id(),
            self.owner_id,
            "Only the owner can call this method"
        );
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::test_utils::VMContextBuilder;
    use near_sdk::testing_env;

    fn get_context(predecessor: AccountId) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder.predecessor_account_id(predecessor);
        builder
    }

    #[test]
    fn test_new() {
        let owner: AccountId = "owner.near".parse().unwrap();
        let context = get_context(owner.clone());
        testing_env!(context.build());

        let contract = Contract::new(owner.clone());
        assert_eq!(contract.owner_id, owner);
        assert_eq!(contract.get_whitelist().len(), 0);
    }

    #[test]
    fn test_add_to_whitelist() {
        let owner: AccountId = "owner.near".parse().unwrap();
        let context = get_context(owner.clone());
        testing_env!(context.build());

        let mut contract = Contract::new(owner);
        let account: AccountId = "alice.near".parse().unwrap();
        
        contract.add_to_whitelist(account.clone());
        assert!(contract.is_whitelisted(account.clone()));
        assert_eq!(contract.get_whitelist().len(), 1);
    }

    #[test]
    fn test_remove_from_whitelist() {
        let owner: AccountId = "owner.near".parse().unwrap();
        let context = get_context(owner.clone());
        testing_env!(context.build());

        let mut contract = Contract::new(owner);
        let account: AccountId = "alice.near".parse().unwrap();
        
        contract.add_to_whitelist(account.clone());
        assert!(contract.is_whitelisted(account.clone()));
        
        contract.remove_from_whitelist(account.clone());
        assert!(!contract.is_whitelisted(account));
        assert_eq!(contract.get_whitelist().len(), 0);
    }

    #[test]
    #[should_panic(expected = "Only the owner can call this method")]
    fn test_add_to_whitelist_not_owner() {
        let owner: AccountId = "owner.near".parse().unwrap();
        let context = get_context(owner.clone());
        testing_env!(context.build());

        let mut contract = Contract::new(owner);
        
        let not_owner: AccountId = "not_owner.near".parse().unwrap();
        let context = get_context(not_owner);
        testing_env!(context.build());

        let account: AccountId = "alice.near".parse().unwrap();
        contract.add_to_whitelist(account);
    }
}
