from typing import List, Dict
import pandas as pd

class TransactionDataProcessor:
    @staticmethod
    def validate_transaction(transaction: Dict) -> bool:
        required_fields = ['id', 'source_account', 'amount', 'timestamp']
        return all(field in transaction for field in required_fields)
    
    @staticmethod
    def preprocess_transactions(transactions: List[Dict]) -> List[Dict]:
        valid_transactions = []
        for transaction in transactions:
            if TransactionDataProcessor.validate_transaction(transaction):
                valid_transactions.append(transaction)
        return valid_transactions 