use near_sdk::{log, near, AccountId, env};
use std::collections::{HashSet, HashMap};


#[near(serializers = [borsh, json])]
#[derive(Default)]
pub struct AccountMetadata {
    added_timestamp: u64,
    tier: WhitelistTier,
    total_interactions: u64,
}

#[near(serializers = [borsh, json])]
#[derive(Default, PartialEq)]
pub enum WhitelistTier {
    #[default]
    Basic,
    Premium,
    VIP,
}

#[near(contract_state)]
pub struct Contract {
    owner_id: AccountId,
    whitelisted_accounts: HashSet<AccountId>,
    // Track when accounts were added and their tier level
    account_metadata: HashMap<AccountId, AccountMetadata>,
}


impl Default for Contract {
    fn default() -> Self {
        Self {
            owner_id: env::predecessor_account_id(),
            whitelisted_accounts: HashSet::new(),
            account_metadata: HashMap::new(),
        }
    }
}

#[near]
impl Contract {
    #[init]
    #[private] 
    pub fn new(owner_id: AccountId) -> Self {
        Self {
            owner_id,
            whitelisted_accounts: HashSet::new(),
            account_metadata: HashMap::new(),
        }
    }

    pub fn add_to_whitelist(&mut self, account_id: AccountId) {
        self.assert_owner();
        self.whitelisted_accounts.insert(account_id.clone());
        self.account_metadata.insert(account_id.clone(), AccountMetadata {
            added_timestamp: env::block_timestamp(),
            ..Default::default()
        });
        log!("Added {} to whitelist", account_id);
    }

    pub fn add_to_whitelist_with_tier(&mut self, account_id: AccountId, tier: WhitelistTier) {
        self.assert_owner();
        self.whitelisted_accounts.insert(account_id.clone());
        self.account_metadata.insert(account_id.clone(), AccountMetadata {
            added_timestamp: env::block_timestamp(),
            tier,
            total_interactions: 0,
        });
        log!("Added {} to whitelist with custom tier", account_id);
    }

    pub fn remove_from_whitelist(&mut self, account_id: AccountId) {
        self.assert_owner();
        self.whitelisted_accounts.remove(&account_id);
        self.account_metadata.remove(&account_id);
        log!("Removed {} from whitelist", account_id);
    }

    pub fn is_whitelisted(&self, account_id: AccountId) -> bool {
        self.whitelisted_accounts.contains(&account_id)
    }

    pub fn get_whitelist(&self) -> Vec<AccountId> {
        self.whitelisted_accounts.iter().cloned().collect()
    }

    pub fn get_account_metadata(&self, account_id: AccountId) -> Option<&AccountMetadata> {
        self.account_metadata.get(&account_id)
    }

    pub fn record_interaction(&mut self, account_id: AccountId) {
        if let Some(metadata) = self.account_metadata.get_mut(&account_id) {
            metadata.total_interactions += 1;
            
            // Auto-upgrade tiers based on interactions
            if metadata.total_interactions >= 100 && metadata.tier == WhitelistTier::Basic {
                metadata.tier = WhitelistTier::Premium;
                log!("Account {} upgraded to Premium tier!", account_id);
            } else if metadata.total_interactions >= 1000 && metadata.tier == WhitelistTier::Premium {
                metadata.tier = WhitelistTier::VIP;
                log!("Account {} upgraded to VIP tier!", account_id);
            }
        }
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

    #[test]
    fn test_add_to_whitelist_with_tier() {
        let owner: AccountId = "owner.near".parse().unwrap();
        let context = get_context(owner.clone());
        testing_env!(context.build());

        let mut contract = Contract::new(owner);
        let account: AccountId = "alice.near".parse().unwrap();
        
        contract.add_to_whitelist_with_tier(account.clone(), WhitelistTier::Premium);
        assert!(contract.is_whitelisted(account.clone()));
        
        let metadata = contract.get_account_metadata(account).unwrap();
        assert!(matches!(metadata.tier, WhitelistTier::Premium));
    }

    #[test]
    fn test_record_interaction_tier_upgrade() {
        let owner: AccountId = "owner.near".parse().unwrap();
        let context = get_context(owner.clone());
        testing_env!(context.build());

        let mut contract = Contract::new(owner);
        let account: AccountId = "alice.near".parse().unwrap();
        
        contract.add_to_whitelist(account.clone());
        
        // Record 100 interactions to upgrade to Premium
        for _ in 0..100 {
            contract.record_interaction(account.clone());
        }
        
        let metadata = contract.get_account_metadata(account.clone()).unwrap();
        assert!(matches!(metadata.tier, WhitelistTier::Premium));
        
        // Record 900 more interactions to upgrade to VIP
        for _ in 0..900 {
            contract.record_interaction(account.clone());
        }
        
        let metadata = contract.get_account_metadata(account).unwrap();
        assert!(matches!(metadata.tier, WhitelistTier::VIP));
    }

    #[test]
    fn test_get_account_metadata() {
        let owner: AccountId = "owner.near".parse().unwrap();
        let context = get_context(owner.clone());
        testing_env!(context.build());

        let mut contract = Contract::new(owner);
        let account: AccountId = "alice.near".parse().unwrap();
        
        // Test non-existent account
        assert!(contract.get_account_metadata(account.clone()).is_none());
        
        // Add account and verify metadata
        contract.add_to_whitelist(account.clone());
        let metadata = contract.get_account_metadata(account).unwrap();
        assert_eq!(metadata.total_interactions, 0);
        assert!(matches!(metadata.tier, WhitelistTier::Basic));
    }
}
