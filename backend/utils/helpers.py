import fitz
import os
import json
import re
import pandas as pd

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

def combine_results(project_details, green_score):
    '''
    Combines the project details and green score and returns a final result.
    '''
    combined_results = project_details + green_score
    return combined_results

def get_recommended_funders():
    '''
    fetches the recommended funders from the csv file and returns a list of recommended funders.
    '''
    # Get the directory where this script is located
    current_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(current_dir, 'green_vc_funders.csv')
    recommended_funders = pd.read_csv(csv_path)
    return recommended_funders

def clean_result_to_json(result):
    '''
    Cleans result and sends a proper array of json objects.
    Extracts JSON objects from markdown code blocks and returns them as a list of dictionaries.
    '''
    # If result is a list, join it into a single string
    if isinstance(result, list):
        result = '\n'.join(str(item) for item in result)
    else:
        result = str(result)
    
    json_objects = []
    
    # Split by markdown code block delimiters (```)
    code_blocks = re.split(r'```+', result)
    
    for block in code_blocks:
        block = block.strip()
        if not block:
            continue
        
        # Remove language identifier if present (e.g., "json", "python", etc.)
        lines = block.split('\n')
        if lines and not lines[0].strip().startswith('{'):
            # First line might be a language identifier, skip it
            block = '\n'.join(lines[1:])
        
        block = block.strip()
        
        # Try to find JSON object in the block
        json_match = re.search(r'\{.*\}', block, re.DOTALL)
        if json_match:
            json_str = json_match.group(0)
            try:
                json_obj = json.loads(json_str)
                json_objects.append(json_obj)
            except json.JSONDecodeError:
                # If direct parsing fails, try to extract nested JSON
                continue
    
    # If no JSON found in code blocks, try to find standalone JSON objects
    if not json_objects:
        # Find all potential JSON objects (content between { and })
        brace_count = 0
        start_idx = -1
        for i, char in enumerate(result):
            if char == '{':
                if brace_count == 0:
                    start_idx = i
                brace_count += 1
            elif char == '}':
                brace_count -= 1
                if brace_count == 0 and start_idx != -1:
                    json_str = result[start_idx:i+1]
                    try:
                        json_obj = json.loads(json_str)
                        json_objects.append(json_obj)
                    except json.JSONDecodeError:
                        pass
                    start_idx = -1
    
    return json_objects