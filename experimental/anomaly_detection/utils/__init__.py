import numpy as np
from sklearn.preprocessing import StandardScaler

def generate_synthetic_data(n_samples, n_features, contamination=0.1):
    """Generate synthetic data with anomalies"""
    # Generate normal data
    normal_data = np.random.normal(0, 1, (int(n_samples * (1-contamination)), n_features))
    
    # Generate anomalies
    anomalies = np.random.uniform(-4, 4, (int(n_samples * contamination), n_features))
    
    # Combine and shuffle
    data = np.vstack([normal_data, anomalies])
    labels = np.zeros(n_samples)
    labels[int(n_samples * (1-contamination)):] = 1  # 1 for anomalies
    
    # Shuffle
    indices = np.arange(n_samples)
    np.random.shuffle(indices)
    
    return data[indices], labels[indices]

def preprocess_data(data):
    """Preprocess the data using StandardScaler"""
    scaler = StandardScaler()
    return scaler.fit_transform(data) 