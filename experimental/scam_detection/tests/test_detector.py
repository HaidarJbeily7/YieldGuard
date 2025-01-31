import unittest
from datetime import datetime
from ..models.detector import TransactionScamDetector

class TestTransactionScamDetector(unittest.TestCase):
    def setUp(self):
        self.detector = TransactionScamDetector()
        
    def test_unusual_amounts(self):
        transaction = {
            'id': '1',
            'source_account': 'test_user',
            'amount': 15000,  # Above threshold
            'timestamp': datetime.now()
        }
        self.assertTrue(self.detector.detect_unusual_amounts(transaction))
        
    def test_scam_pattern_detection(self):
        transaction = {
            'id': '2',
            'source_account': 'test_user',
            'amount': 500,
            'timestamp': datetime.now(),
            'description': 'investment_scam opportunity'
        }
        result = self.detector.analyze_transaction_pattern(transaction)
        self.assertTrue(result['is_suspicious'])
        self.assertIn('matches_known_scam_pattern', result['risk_factors'])

if __name__ == '__main__':
    unittest.main() 