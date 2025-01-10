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