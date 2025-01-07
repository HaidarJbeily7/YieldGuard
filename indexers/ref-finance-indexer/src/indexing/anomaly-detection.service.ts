import { Injectable } from '@nestjs/common';
import { FeatureExtractionService } from './feature-extraction.service';

@Injectable()
export class AnomalyDetectionService {
  constructor(private featureExtraction: FeatureExtractionService) {}

  async detectAnomalies(transaction: Transaction, historicalData: Transaction[]) {
    const features = this.featureExtraction.extractFeatures(transaction, historicalData);
    
    // Calculate anomaly score using weighted features
    const anomalyScore = this.calculateAnomalyScore(features);
    
    // Classify anomaly type if score exceeds threshold
    const anomalyType = this.classifyAnomaly(features, anomalyScore);
    
    return {
      anomalyScore,
      anomalyType,
      anomalyFeatures: features
    };
  }

  private calculateAnomalyScore(features: any) {
    const weights = {
      volumeDeviation: 0.3,
      timePatternScore: 0.2,
      contractRiskScore: 0.3,
      userBehaviorScore: 0.2
    };

    return Object.entries(features).reduce((score, [key, value]) => {
      return score + (weights[key] * value);
    }, 0);
  }

  private classifyAnomaly(features: any, score: number) {
    if (score < 0.7) return null;
    
    // Classify based on dominant feature
    const dominantFeature = Object.entries(features)
      .reduce((max, [key, value]) => value > max.value ? {key, value} : max, 
        {key: '', value: -1});

    const anomalyTypes = {
      volumeDeviation: 'UNUSUAL_VOLUME',
      timePatternScore: 'UNUSUAL_TIMING',
      contractRiskScore: 'SUSPICIOUS_CONTRACT',
      userBehaviorScore: 'UNUSUAL_BEHAVIOR'
    };

    return anomalyTypes[dominantFeature.key];
  }
} 