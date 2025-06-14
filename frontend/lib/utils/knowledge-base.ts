import { calculateEmbedding, cosineSimilarity } from './text-embedding';

export interface KnowledgeItem {
  id: number;
  path: string;
  route: string;
  content: string;
  embedding?: number[];
}

let knowledgeBase: KnowledgeItem[] = [];
let isInitialized = false;

// Add a query cache to avoid re-computing searches for the same query
const queryCache: Record<string, KnowledgeItem[]> = {};

export async function initKnowledgeBase(): Promise<void> {
  if (isInitialized) return;
  
  try {
    const response = await fetch('/knowledge-base.json');
    if (!response.ok) {
      throw new Error('Failed to load knowledge base');
    }
    
    const data = await response.json();
    
    // Calculate embeddings for each item
    knowledgeBase = data.map((item: KnowledgeItem) => ({
      ...item,
      embedding: calculateEmbedding(item.content)
    }));
    
    isInitialized = true;
    console.log(`Knowledge base initialized with ${knowledgeBase.length} items`);
  } catch (error) {
    console.error('Error initializing knowledge base:', error);
    throw error;
  }
}

export async function queryKnowledgeBase(query: string, limit: number = 3): Promise<KnowledgeItem[]> {
  if (!isInitialized) {
    await initKnowledgeBase();
  }
  
  // Normalize the query for caching
  const normalizedQuery = query.trim().toLowerCase();
  
  // Check cache first
  const cacheKey = `${normalizedQuery}_${limit}`;
  if (queryCache[cacheKey]) {
    console.log('Using cached query results');
    return queryCache[cacheKey];
  }
  
  // Simplified search for short queries (less than 4 words)
  const words = normalizedQuery.split(/\s+/);
  if (words.length < 4) {
    const quickResults = knowledgeBase
      .filter(item => {
        const lowerContent = item.content.toLowerCase();
        return words.some(word => word.length > 3 && lowerContent.includes(word));
      })
      .slice(0, limit);
      
    if (quickResults.length > 0) {
      queryCache[cacheKey] = quickResults;
      return quickResults;
    }
  }
  
  // Calculate query embedding
  const queryEmbedding = calculateEmbedding(query);
  
  // Calculate similarity for each item
  const results = knowledgeBase
    .map(item => ({
      item,
      similarity: cosineSimilarity(queryEmbedding, item.embedding!)
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)
    .map(result => result.item);
  
  // Cache the results
  queryCache[cacheKey] = results;
  
  return results;
} 