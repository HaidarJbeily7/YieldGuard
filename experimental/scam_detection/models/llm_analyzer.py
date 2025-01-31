from typing import Dict, List
import openai
from tenacity import retry, stop_after_attempt, wait_exponential
import json
from ..config.settings import LLM_SETTINGS

class LLMAnalyzer:
    def __init__(self, api_key: str):
        openai.api_key = api_key
        self.model = LLM_SETTINGS['model']
        self.cache = {}  # Simple in-memory cache
        
    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=10))
    async def analyze_transaction(self, transaction: Dict) -> Dict:
        """Analyze transaction using GPT for sophisticated pattern recognition."""
        # Check cache first
        cache_key = self._generate_cache_key(transaction)
        if cache_key in self.cache:
            return self.cache[cache_key]

        prompt = self._create_analysis_prompt(transaction)
        
        try:
            response = await openai.ChatCompletion.acreate(
                model=self.model,
                messages=[
                    {"role": "system", "content": LLM_SETTINGS['system_prompt']},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3,
                max_tokens=LLM_SETTINGS['max_tokens']
            )
            
            result = self._parse_llm_response(response.choices[0].message.content)
            self.cache[cache_key] = result  # Cache the result
            return result
            
        except Exception as e:
            print(f"Error in LLM analysis: {e}")
            return {
                "risk_level": "unknown",
                "reasoning": str(e),
                "confidence": 0.0,
                "flags": []
            }
    
    def _create_analysis_prompt(self, transaction: Dict) -> str:
        return f"""
        Analyze this financial transaction for potential fraud indicators:
        
        Transaction Details:
        - Amount: {transaction['amount']}
        - Description: {transaction.get('description', 'N/A')}
        - Timestamp: {transaction['timestamp']}
        - Account Age: {transaction.get('age_of_account', 'N/A')} days
        - Transaction Pattern: {transaction.get('pattern', 'N/A')}
        - Previous Transaction Count: {transaction.get('previous_transaction_count', 'N/A')}
        
        Provide analysis in the following JSON format:
        {{
            "risk_level": "high/medium/low",
            "confidence": 0.0-1.0,
            "reasoning": "detailed explanation",
            "flags": ["list", "of", "specific", "concerns"]
        }}
        """
    
    def _parse_llm_response(self, response: str) -> Dict:
        try:
            # Extract JSON from response
            json_start = response.find('{')
            json_end = response.rfind('}') + 1
            json_str = response[json_start:json_end]
            
            analysis = json.loads(json_str)
            return {
                "risk_level": analysis.get("risk_level", "unknown"),
                "confidence": float(analysis.get("confidence", 0.0)),
                "reasoning": analysis.get("reasoning", ""),
                "flags": analysis.get("flags", [])
            }
        except Exception as e:
            print(f"Error parsing LLM response: {e}")
            return {
                "risk_level": "unknown",
                "confidence": 0.0,
                "reasoning": "Failed to parse LLM response",
                "flags": []
            }
    
    def _generate_cache_key(self, transaction: Dict) -> str:
        """Generate a cache key from transaction details."""
        return f"{transaction['amount']}_{transaction.get('description', '')}_{transaction['timestamp']}" 