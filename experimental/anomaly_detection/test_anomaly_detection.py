import unittest
import numpy as np
import torch
from models import Autoencoder
from utils import generate_synthetic_data, preprocess_data
from config import Config

class TestAnomalyDetection(unittest.TestCase):
    def setUp(self):
        # Set random seeds for reproducibility
        torch.manual_seed(Config.RANDOM_SEED)
        np.random.seed(Config.RANDOM_SEED)
        
        # Initialize model
        self.model = Autoencoder(Config.INPUT_DIM, Config.LATENT_DIM)
    
    def test_model_architecture(self):
        """Test if model architecture is correct"""
        # Test input/output dimensions
        test_input = torch.randn(1, Config.INPUT_DIM)
        output = self.model(test_input)
        
        self.assertEqual(output.shape, test_input.shape,
                        "Input and output dimensions should match")
    
    def test_data_generation(self):
        """Test synthetic data generation"""
        n_samples = 1000
        X, y = generate_synthetic_data(n_samples, Config.INPUT_DIM)
        
        # Test shapes
        self.assertEqual(X.shape, (n_samples, Config.INPUT_DIM),
                        "Data shape is incorrect")
        self.assertEqual(y.shape, (n_samples,),
                        "Labels shape is incorrect")
        
        # Test label distribution
        unique_labels = np.unique(y)
        self.assertEqual(len(unique_labels), 2,
                        "Should have exactly 2 classes (normal and anomaly)")
        
        # Test contamination ratio
        anomaly_ratio = np.mean(y)
        self.assertAlmostEqual(anomaly_ratio, 0.1, delta=0.02,
                             msg="Anomaly ratio should be close to 0.1")
    
    def test_data_preprocessing(self):
        """Test data preprocessing"""
        # Generate sample data
        X, _ = generate_synthetic_data(1000, Config.INPUT_DIM)
        
        # Preprocess data
        X_processed = preprocess_data(X)
        
        # Check if data is standardized
        mean_tolerance = 1e-10
        std_tolerance = 0.1
        
        # Check mean close to 0
        self.assertTrue(np.all(np.abs(X_processed.mean(axis=0)) < mean_tolerance),
                       "Preprocessed data should have mean close to 0")
        
        # Check std close to 1
        self.assertTrue(np.all(np.abs(X_processed.std(axis=0) - 1) < std_tolerance),
                       "Preprocessed data should have std close to 1")
    
    def test_model_training(self):
        """Test if model can be trained for one epoch"""
        # Generate small dataset
        X, _ = generate_synthetic_data(100, Config.INPUT_DIM)
        X = preprocess_data(X)
        X_tensor = torch.FloatTensor(X)
        
        # Setup training
        optimizer = torch.optim.Adam(self.model.parameters(), lr=Config.LEARNING_RATE)
        criterion = torch.nn.MSELoss()
        
        # Single forward and backward pass
        output = self.model(X_tensor)
        loss = criterion(output, X_tensor)
        
        # Test if loss is finite
        self.assertFalse(torch.isnan(loss).any(),
                        "Loss should not be NaN")
        self.assertFalse(torch.isinf(loss).any(),
                        "Loss should not be infinite")
        
        # Test backward pass
        loss.backward()
        optimizer.step()
    
    def test_anomaly_detection(self):
        """Test anomaly detection functionality"""
        # Generate and preprocess data
        X, true_labels = generate_synthetic_data(100, Config.INPUT_DIM)
        X = preprocess_data(X)
        X_tensor = torch.FloatTensor(X)
        
        # Get reconstruction error
        with torch.no_grad():
            output = self.model(X_tensor)
            reconstruction_error = torch.mean((output - X_tensor)**2, dim=1)
        
        # Test if reconstruction error shape is correct
        self.assertEqual(reconstruction_error.shape, (100,),
                        "Reconstruction error shape should match number of samples")
        
        # Test if reconstruction error is non-negative
        self.assertTrue(torch.all(reconstruction_error >= 0),
                       "Reconstruction error should be non-negative")

if __name__ == '__main__':
    unittest.main() 