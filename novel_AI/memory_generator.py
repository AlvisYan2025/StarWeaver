import json
import os
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

class MemoryManager:
    def __init__(self, structured_memory_path, vector_db_path, metadata_path, embedding_model='all-MiniLM-L6-v2'):
        self.structured_memory_path = structured_memory_path
        self.vector_db_path = vector_db_path
        self.metadata_path = metadata_path
        self.embedding_model = SentenceTransformer(embedding_model)
        self.vector_index = None
        self.metadata = []
        self.load_memory()

    def load_structured_memory(self):
        memory = {}
        for file in os.listdir(self.structured_memory_path):
            if file.endswith('.json'):
                with open(os.path.join(self.structured_memory_path, file), 'r') as f:
                    character = json.load(f)
                    memory[character['name']] = character
        return memory

    def load_vector_db(self):
        index = faiss.read_index(os.path.join(self.vector_db_path, 'scene_embeddings.index'))
        with open(self.metadata_path, 'r') as f:
            self.metadata = [json.loads(line.strip()) for line in f]
        return index

    def load_memory(self):
        self.structured_memory = self.load_structured_memory()
        self.vector_index = self.load_vector_db()

    def retrieve_relevant_snippets(self, prompt_text, top_k=5):
        embedding = self.embedding_model.encode([prompt_text])
        D, I = self.vector_index.search(np.array(embedding).astype('float32'), top_k)
        retrieved = [self.metadata[i]['text'] for i in I[0]]
        return retrieved
