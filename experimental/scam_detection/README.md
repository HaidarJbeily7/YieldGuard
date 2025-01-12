# Transaction Scam Detection System

A sophisticated fraud detection system that combines rule-based detection, machine learning, and large language models (LLMs) to identify potential scams and fraudulent transactions.

## 🌟 Features

### Multi-layered Detection

- **Rule-based Detection**
  - Pattern recognition
  - Threshold monitoring
  - Known scam identification
- **Machine Learning**
  - Text classification with transformers
  - Anomaly detection using Isolation Forest
  - Feature-based analysis
- **LLM Integration**
  - Context-aware analysis using GPT-4
  - Natural language understanding
  - Sophisticated pattern recognition

## 🛠️ Installation

1. **Clone the Repository**

   ```
   git clone <repository-url>
   cd experimental/scam_detection
   ```

2. **Set Up Virtual Environment**

   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**

   ```
   pip install -r requirements.txt
   ```

4. **Environment Setup**
   ```
   cp .env.example .env
   # Edit .env with your OpenAI API key
   ```

## 📁 Project Structure

```
experimental/scam_detection/
├── README.md
├── requirements.txt
├── setup_project.py
├── run.py
├── models/
│   ├── __init__.py
│   ├── detector.py        # Main detector class
│   ├── ml_detector.py     # ML components
│   └── llm_analyzer.py    # LLM integration
├── utils/
│   ├── __init__.py
│   └── data_processor.py  # Data preprocessing
├── config/
│   ├── __init__.py
│   └── settings.py        # Configuration
└── tests/
    ├── __init__.py
    └── test_detector.py   # Unit tests
```

## 🚀 Quick Start

1. **Initialize Project**

   ```
   python setup_project.py
   ```

2. **Configure Settings**

   - Update `.env` with your OpenAI API key
   - Adjust settings in `config/settings.py`

3. **Run the System**
   ```
   python run.py
   ```

## �� Usage Example

```python
import asyncio
from models.detector import TransactionScamDetector

async def main():
    detector = TransactionScamDetector(
        api_key="your-openai-api-key",
        use_ml=True,
        use_llm=True
    )

    transaction = {
        'id': '1',
        'source_account': 'user123',
        'amount': 15000,
        'timestamp': datetime.now(),
        'description': 'Urgent investment opportunity',
        'age_of_account': 5
    }

    result = await detector.analyze_transaction_pattern(transaction)
    print(f"Analysis Result: {result}")

if __name__ == "__main__":
    asyncio.run(main())
```

## ⚙️ Configuration Options

### ML Settings

```python
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
```

### LLM Settings

```python
LLM_SETTINGS = {
    'model': 'gpt-4',
    'max_tokens': 500,
    'system_prompt': "Expert fraud detection analysis...",
    'cache_ttl': 3600
}
```

## 📊 Performance Optimization

- **Caching**: LLM responses cached to reduce API calls
- **Batch Processing**: Available for multiple transactions
- **Rate Limiting**: Built-in API call management
- **Error Handling**: Robust exception management

## 🔒 Security Considerations

- Secure API key storage
- Regular pattern updates
- False positive monitoring
- Data privacy compliance
- Input validation

## 🔄 Continuous Improvement

### Roadmap

- [ ] Enhanced ML models
- [ ] Real-time processing
- [ ] Database integration
- [ ] API endpoints
- [ ] Web interface
- [ ] Extended documentation

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 🆘 Support

For support:

- Open an issue
- Contact maintainers
- Check documentation

## ✨ Acknowledgments

- OpenAI for GPT-4
- Hugging Face for transformers
- scikit-learn community
- Project contributors
