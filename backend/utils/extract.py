import fitz
import os
import json

def extract_details(file_path: str) -> list:
    '''
    Extracts the details from the PDF file and returns an array of content blocks.
    Each content block follows the format: {"type": "text", "text": "page content"}
    '''
    doc = fitz.open(file_path) 
    content_blocks = []
    for page_i in range(len(doc)):
        page = doc[page_i]
        text = page.get_text()
        content_blocks.append({
            "type": "text",
            "text": f"Page {page_i + 1}:\n{text}"
        })
    return content_blocks