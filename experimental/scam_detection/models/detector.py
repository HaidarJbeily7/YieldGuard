from typing import Dict, List, Union
from datetime import datetime, timedelta
import pandas as pd
from .ml_detector import MLScamDetector
from .llm_analyzer import LLMAnalyzer
from ..config.settings import RISK_THRESHOLDS

class TransactionScamDetector:
    def __init__(self, api_key: str, use_ml: bool = True, use_llm: bool = True):
        self.suspicious_patterns = {
            'high_frequency': {'threshold': 10, 'timeframe': timedelta(minutes=5)},
            'unusual_amount': {'min': 100, 'max': 10000},
            'known_scammer_patterns': set(['fake_charity', 'investment_scam', 'lottery_scam'])
        }
        
        if use_ml:
            self.ml_detector = MLScamDetector()
        if use_llm:
            self.llm_analyzer = LLMAnalyzer(api_key=api_key)
        
        self.use_ml = use_ml
        self.use_llm = use_llm

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

    def analyze_transaction_pattern(self, transaction: Dict) -> Dict[str, Union[bool, str, List]]:
        result = {
            'is_suspicious': False,
            'risk_factors': [],
            'confidence': 0.0,
            'analysis': {}
        }
        
        if any(pattern in transaction.get('description', '').lower() 
               for pattern in self.suspicious_patterns['known_scammer_patterns']):
            result['is_suspicious'] = True
            result['risk_factors'].append('matches_known_scam_pattern')
            
        if self.detect_unusual_amounts(transaction):
            result['is_suspicious'] = True
            result['risk_factors'].append('unusual_amount')
            
        if self.use_ml:
            # ML-based analysis
            text_analysis = self.ml_detector.analyze_text_content(
                transaction.get('description', '')
            )
            
            if text_analysis['scam_probability'] > RISK_THRESHOLDS['ml_confidence']:
                result['is_suspicious'] = True
                result['risk_factors'].append('ml_text_flag')
                result['analysis']['ml_text'] = text_analysis
        
        if self.use_llm:
            # LLM analysis
            llm_analysis = self.llm_analyzer.analyze_transaction(transaction)
            
            if llm_analysis['confidence'] > RISK_THRESHOLDS['llm_confidence']:
                result['is_suspicious'] = True
                result['risk_factors'].extend(llm_analysis['flags'])
                result['analysis']['llm'] = llm_analysis
        
        # Calculate overall confidence
        result['confidence'] = self._calculate_overall_confidence(result)
        
        return result
    
    def _calculate_overall_confidence(self, result: Dict) -> float:
        """Calculate overall confidence based on all detection methods."""
        confidence_scores = []
        
        # Rule-based confidence
        if result['risk_factors']:
            confidence_scores.append(0.7)  # Base confidence for rule-based detection
            
        # ML confidence
        if 'ml_text' in result.get('analysis', {}):
            confidence_scores.append(result['analysis']['ml_text']['scam_probability'])
            
        # LLM confidence
        if 'llm' in result.get('analysis', {}):
            confidence_scores.append(result['analysis']['llm']['confidence'])
            
        return max(confidence_scores) if confidence_scores else 0.0

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