from typing import Dict, List
import numpy as np
from transformers import pipeline
from sklearn.ensemble import IsolationForest
import torch
from sklearn.preprocessing import StandardScaler

class MLScamDetector:
    def __init__(self):
        # Initialize text classification pipeline
        try:
            self.text_classifier = pipeline(
                "text-classification",
                model="microsoft/deberta-v3-base",  # Using a pre-trained model as base
                device=0 if torch.cuda.is_available() else -1
            )
        except Exception as e:
            print(f"Warning: Text classifier initialization failed: {e}")
            self.text_classifier = None
            
        # Initialize anomaly detection
        self.anomaly_detector = IsolationForest(
            contamination=0.1,
            random_state=42,
            n_estimators=100
        )
        
        self.scaler = StandardScaler()
        
    def analyze_text_content(self, text: str) -> Dict[str, float]:
        """Analyze transaction description using transformer model."""
        if not text or not self.text_classifier:
            return {'scam_probability': 0.0, 'label': 'unknown'}
            
        try:
            result = self.text_classifier(text)[0]
            return {
                'scam_probability': float(result['score']),
                'label': result['label']
            }
        except Exception as e:
            print(f"Error in text analysis: {e}")
            return {'scam_probability': 0.0, 'label': 'unknown'}

    def detect_anomalies(self, transactions: List[Dict]) -> np.ndarray:
        """Detect anomalous transactions using Isolation Forest."""
        features = self._extract_features(transactions)
        
        # Scale features
        scaled_features = self.scaler.fit_transform(features)
        
        # -1 for anomalies, 1 for normal instances
        predictions = self.anomaly_detector.fit_predict(scaled_features)
        
        # Convert to anomaly scores (0 to 1, higher means more anomalous)
        scores = self.anomaly_detector.score_samples(scaled_features)
        normalized_scores = (scores - scores.min()) / (scores.max() - scores.min())
        
        return predictions, normalized_scores
    
    def _extract_features(self, transactions: List[Dict]) -> np.ndarray:
        """Extract numerical features from transactions."""
        features = []
        for tx in transactions:
            feature_vector = [
                float(tx['amount']),
                self._calculate_velocity(tx),
                float(tx.get('age_of_account', 0)),
                float(tx.get('previous_transaction_count', 0)),
                float(tx.get('average_transaction_amount', 0))
            ]
            features.append(feature_vector)
        return np.array(features)
    
    def _calculate_velocity(self, transaction: Dict) -> float:
        """Calculate transaction velocity based on recent activity."""
        recent_count = transaction.get('recent_transaction_count', 0)
        time_window = transaction.get('time_window_hours', 24)
        return recent_count / time_window if time_window > 0 else 0 