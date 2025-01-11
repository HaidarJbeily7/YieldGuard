from datetime import datetime
import asyncio
from models.detector import TransactionScamDetector
from utils.data_processor import TransactionDataProcessor
import dotenv
import os

dotenv.load_dotenv()

async def main():
    # Initialize detector with your OpenAI API key
    detector = TransactionScamDetector(
        api_key=os.getenv("OPENAI_API_KEY"),
        use_ml=True,
        use_llm=True
    )
    
    # Example transaction
    transaction = {
        'id': '1',
        'source_account': 'user123',
        'amount': 15000,
        'timestamp': datetime.now(),
        'description': 'Urgent investment opportunity - guaranteed returns!',
        'age_of_account': 5,
        'previous_transaction_count': 2
    }
    
    # Analyze transaction
    result = await detector.analyze_transaction_pattern(transaction)
    
    print("Analysis Result:")
    print(f"Suspicious: {result['is_suspicious']}")
    print(f"Risk Factors: {result['risk_factors']}")
    print(f"Confidence: {result['confidence']}")
    print(f"Detailed Analysis: {result['analysis']}")

if __name__ == "__main__":
    asyncio.run(main()) 