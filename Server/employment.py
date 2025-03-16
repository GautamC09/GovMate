from flask import Flask, request, jsonify
from flask_cors import CORS
from pinecone import Pinecone
from sentence_transformers import SentenceTransformer
from groq import Groq
from typing import List, Dict
import os

app = Flask(__name__)
CORS(app)

# Initialize Pinecone
PINECONE_API_KEY = "pcsk_kftV6_MTNWxHsa7F2Q4Gp3j12dr8sEiV5knhhU7PTfU9ujDkV8QrKtD9sQPkQ64BnVFca"
PINECONE_ENV = "us-east-1"
index_name = "employment"

pc = Pinecone(api_key=PINECONE_API_KEY)
index = pc.Index(index_name)

# Initialize Sentence Transformer Model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Initialize Groq
GROQ_API_KEY = "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"
groq_client = Groq(api_key=GROQ_API_KEY)

# Store conversation history (in-memory, for simplicity)
conversation_history = {}

# Function to retrieve relevant chunks from Pinecone
def retrieve_context(query: str, top_k: int = 3) -> List[Dict]:
    query_embedding = model.encode(query).tolist()
    results = index.query(vector=query_embedding, top_k=top_k, include_metadata=True)
    contexts = [match["metadata"]["text"] for match in results["matches"]]
    return contexts

# Function to generate response using Groq
def generate_response(query: str, contexts: List[str], history: List[Dict]) -> str:
    context_str = "\n\n".join(contexts)
    
    # Format conversation history
    history_str = "\n".join([f"{msg['role']}: {msg['content']}" for msg in history])
    
    prompt = f"""
    You are a helpful chatbot working for the Indian Government’s Employment Services. Use the provided context and conversation history to answer the user’s query as accurately and concisely as possible. If the context does not fully address the query, supplement it with your general knowledge to provide a complete and up-to-date answer, reflecting information available as of March 14, 2025. Ensure responses are tailored to Indian employment schemes and services and schemes, and avoid extraneous details. If the query involves calculations, provide step-by-step explanations. Do not include any text beyond the answer itself unless explicitly instructed otherwise.

    Conversation History:
    {history_str}

    Context:
    {context_str}

    Query:
    {query}

    Answer:
    """
    
    response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile", 
        messages=[
            {"role": "system", "content": "You are a helpful government assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=500,  
        temperature=0.7
    )
    
    return response.choices[0].message.content.strip()

# Flask endpoint to handle chatbot queries
@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    query = data.get('query')
    user_id = data.get('user_id', 'default_user')  # Use a unique user ID for each session
    
    if not query:
        return jsonify({"error": "No query provided"}), 400
    
    # Retrieve or initialize conversation history for the user
    if user_id not in conversation_history:
        conversation_history[user_id] = []
    
    # Retrieve context from Pinecone
    contexts = retrieve_context(query)
    if not contexts:
        return jsonify({"response": "Sorry, I couldn't find any relevant information."})
    
    try:
        # Generate response using conversation history
        response = generate_response(query, contexts, conversation_history[user_id])
        
        # Update conversation history
        conversation_history[user_id].append({"role": "user", "content": query})
        conversation_history[user_id].append({"role": "bot", "content": response})
        
        # Limit history length to avoid exceeding token limits
        if len(conversation_history[user_id]) > 10:  # Keep last 10 exchanges
            conversation_history[user_id] = conversation_history[user_id][-10:]
        
        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5005)