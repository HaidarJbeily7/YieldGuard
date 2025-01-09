# Anomaly Detection using Autoencoders

This project implements an unsupervised anomaly detection system using an autoencoder neural network built with PyTorch. The model learns to reconstruct normal patterns in the data and identifies anomalies based on reconstruction error.

## Project Structure

    ```
        anomaly_detection/
        ├── __init__.py
        ├── data/
        │   └── __init__.py
        ├── models/
        │   └── __init__.py
        ├── utils/
        │   └── __init__.py
        ├── train.py
        ├── config.py
        ├── test_anomaly_detection.py
        └── requirements.txt
    ```

## Features

- Autoencoder-based anomaly detection
- Synthetic data generation for testing and development
- Data preprocessing and standardization
- Configurable model architecture and training parameters
- Unit tests for all major components

## Installation

1. Clone the repository
2. Create a virtual environment (recommended):

    ```bash
        python -m venv venv
        source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. Install dependencies:

    ```bash
        pip install -r requirements.txt
    ```

## Usage

### Training the Model

Run the training script:
```bash
python train.py
```

The script will:
1. Generate synthetic data
2. Preprocess the data
3. Train the autoencoder
4. Evaluate the model's performance

### Running Tests

Execute the test suite:
```bash
python -m unittest test_anomaly_detection.py -v
```

## Configuration

Model and training parameters can be adjusted in `config.py`:

- `LATENT_DIM`: Dimension of the latent space
- `INPUT_DIM`: Dimension of input features
- `BATCH_SIZE`: Training batch size
- `LEARNING_RATE`: Learning rate for optimization
- `NUM_EPOCHS`: Number of training epochs
- `TRAIN_TEST_SPLIT`: Train/test data split ratio
- `RANDOM_SEED`: Random seed for reproducibility

## How It Works

1. **Data Generation**: The system generates synthetic data with both normal samples and anomalies for training and testing.

2. **Preprocessing**: Data is standardized using StandardScaler to have zero mean and unit variance.

3. **Model Architecture**:
   - Encoder: Compresses input data into a lower-dimensional latent space
   - Decoder: Reconstructs the original data from the latent representation

4. **Anomaly Detection**:
   - The model learns to reconstruct normal patterns in the data
   - Anomalies are detected by measuring reconstruction error
   - Samples with high reconstruction error are classified as anomalies

5. **Evaluation**: The model's performance is evaluated using:
   - Reconstruction error distribution
   - Accuracy in detecting known anomalies

## Customization

To use your own dataset:
1. Replace the data generation in `utils/__init__.py` with your data loading logic
2. Adjust the `INPUT_DIM` in `config.py` to match your data dimensions
3. Modify preprocessing steps if needed

## Dependencies

- PyTorch >= 2.0.0
- NumPy >= 1.21.0
- Pandas >= 1.3.0
- scikit-learn >= 0.24.0
- Matplotlib >= 3.4.0

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.
