from typing import Dict, List, Union
from datetime import datetime, timedelta
import pandas as pd

class TransactionScamDetector:
    def __init__(self):
        self.suspicious_patterns = {
            'high_frequency': {'threshold': 10, 'timeframe': timedelta(minutes=5)},
            'unusual_amount': {'min': 100, 'max': 10000},
            'known_scammer_patterns': set(['fake_charity', 'investment_scam', 'lottery_scam'])
        }
        
    def detect_high_frequency(self, transactions: List[Dict]) -> List[Dict]:
        suspicious = []
        grouped = pd.DataFrame(transactions).groupby('source_account')
        
        for _, group in grouped:
            times = sorted(group['timestamp'])
            for i in range(len(times) - self.suspicious_patterns['high_frequency']['threshold']):
                window = times[i:i + self.suspicious_patterns['high_frequency']['threshold']]
                if (window[-1] - window[0]) <= self.suspicious_patterns['high_frequency']['timeframe']:
                    suspicious.extend(group.iloc[i:i + self.suspicious_patterns['high_frequency']['threshold']].to_dict('records'))
        return suspicious

    def detect_unusual_amounts(self, transaction: Dict) -> bool:
        amount = transaction['amount']
        return not (self.suspicious_patterns['unusual_amount']['min'] <= amount <= 
                   self.suspicious_patterns['unusual_amount']['max'])

    def analyze_transaction_pattern(self, transaction: Dict) -> Dict[str, Union[bool, str]]:
        result = {
            'is_suspicious': False,
            'risk_factors': []
        }
        
        if any(pattern in transaction.get('description', '').lower() 
               for pattern in self.suspicious_patterns['known_scammer_patterns']):
            result['is_suspicious'] = True
            result['risk_factors'].append('matches_known_scam_pattern')
            
        if self.detect_unusual_amounts(transaction):
            result['is_suspicious'] = True
            result['risk_factors'].append('unusual_amount')
            
        return result

    def scan_transactions(self, transactions: List[Dict]) -> Dict[str, List]:
        results = {
            'suspicious_transactions': [],
            'high_frequency_groups': [],
            'risk_scores': {}
        }
        
        high_freq = self.detect_high_frequency(transactions)
        if high_freq:
            results['high_frequency_groups'].extend(high_freq)
        
        for transaction in transactions:
            analysis = self.analyze_transaction_pattern(transaction)
            if analysis['is_suspicious']:
                results['suspicious_transactions'].append({
                    'transaction': transaction,
                    'risk_factors': analysis['risk_factors']
                })
                
            risk_score = len(analysis['risk_factors']) * 25
            results['risk_scores'][transaction['id']] = min(risk_score, 100)
            
        return results 