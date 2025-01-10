from datetime import datetime
from models.detector import TransactionScamDetector
from utils.data_processor import TransactionDataProcessor

def main():
    # Initialize detector
    detector = TransactionScamDetector()
    
    # Example transactions
    test_transactions = [
        {
            'id': '1',
            'source_account': 'user123',
            'amount': 15000,
            'timestamp': datetime.now(),
            'description': 'Investment opportunity'
        },
        {
            'id': '2',
            'source_account': 'user123',
            'amount': 500,
            'timestamp': datetime.now(),
            'description': 'Regular payment'
        }
    ]
    
    # Preprocess transactions
    processed_transactions = TransactionDataProcessor.preprocess_transactions(test_transactions)
    
    # Scan for suspicious activity
    results = detector.scan_transactions(processed_transactions)
    
    # Print results
    print("Suspicious Transactions:", len(results['suspicious_transactions']))
    print("High Frequency Groups:", len(results['high_frequency_groups']))
    print("Risk Scores:", results['risk_scores'])

if __name__ == "__main__":
    main() 