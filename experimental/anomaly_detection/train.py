import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset
import numpy as np
from sklearn.model_selection import train_test_split

from models import Autoencoder
from utils import generate_synthetic_data, preprocess_data
from config import Config

def train_model():
    # Set random seeds
    torch.manual_seed(Config.RANDOM_SEED)
    np.random.seed(Config.RANDOM_SEED)
    
    # Generate synthetic data
    X, y = generate_synthetic_data(1000, Config.INPUT_DIM)
    X = preprocess_data(X)
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, 
        train_size=Config.TRAIN_TEST_SPLIT,
        random_state=Config.RANDOM_SEED
    )
    
    # Create dataloaders
    train_dataset = TensorDataset(torch.FloatTensor(X_train))
    train_loader = DataLoader(
        train_dataset,
        batch_size=Config.BATCH_SIZE,
        shuffle=True
    )
    
    # Initialize model, loss, and optimizer
    model = Autoencoder(Config.INPUT_DIM, Config.LATENT_DIM)
    criterion = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=Config.LEARNING_RATE)
    
    # Training loop
    for epoch in range(Config.NUM_EPOCHS):
        model.train()
        total_loss = 0
        
        for batch_data in train_loader:
            data = batch_data[0]
            
            # Forward pass
            output = model(data)
            loss = criterion(output, data)
            
            # Backward pass
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            
            total_loss += loss.item()
        
        # Print progress
        if (epoch + 1) % 10 == 0:
            print(f'Epoch [{epoch+1}/{Config.NUM_EPOCHS}], '
                  f'Loss: {total_loss/len(train_loader):.6f}')
    
    # Evaluate
    model.eval()
    with torch.no_grad():
        test_output = model(torch.FloatTensor(X_test))
        reconstruction_errors = torch.mean((test_output - torch.FloatTensor(X_test))**2, dim=1)
        
        # Simple threshold-based anomaly detection
        threshold = reconstruction_errors.mean() + 2 * reconstruction_errors.std()
        predictions = (reconstruction_errors > threshold).float().numpy()
        
        # Calculate accuracy
        accuracy = np.mean(predictions == y_test)
        print(f'\nTest Accuracy: {accuracy:.4f}')

if __name__ == "__main__":
    train_model() 