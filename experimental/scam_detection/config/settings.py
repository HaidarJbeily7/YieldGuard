from datetime import timedelta

DETECTION_SETTINGS = {
    'HIGH_FREQUENCY': {
        'threshold': 10,
        'timeframe': timedelta(minutes=5)
    },
    'AMOUNT_THRESHOLDS': {
        'min': 100,
        'max': 10000
    },
    'KNOWN_SCAM_PATTERNS': [
        'fake_charity',
        'investment_scam',
        'lottery_scam',
        'urgent_transfer',
        'prince_inheritance'
    ]
}

RISK_SCORE_WEIGHTS = {
    'high_frequency': 30,
    'unusual_amount': 25,
    'known_pattern': 45
}

ML_SETTINGS = {
    'anomaly_detection': {
        'contamination': 0.1,
        'n_estimators': 100
    },
    'text_classification': {
        'confidence_threshold': 0.7,
        'max_length': 512
    }
}

LLM_SETTINGS = {
    'model': 'gpt-4',
    'max_tokens': 500,
    'system_prompt': """You are a fraud detection expert analyzing financial transactions. 
    Your task is to identify potential fraud indicators and provide detailed analysis. 
    Focus on transaction patterns, amounts, and contextual clues that might indicate fraudulent activity.""",
    'cache_ttl': 3600,  # Cache lifetime in seconds
    'rate_limit': {
        'max_requests': 50,
        'time_window': 60  # seconds
    }
}

RISK_THRESHOLDS = {
    'ml_confidence': 0.7,
    'llm_confidence': 0.8,
    'anomaly_score': 0.9
} 