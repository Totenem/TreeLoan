from fastapi import FastAPI
from typing import Union
from dotenv import load_dotenv
from fastapi import UploadFile, File
from utils.extract import extract_details
from services.llm_usage import extract_project_details, analyze_project, combine_results
import tempfile
import os

load_dotenv()

app = FastAPI(
    title="TreeLoan",
    description="TreeLoan API",
    version="0.1.0",
    contact={
        "name": "TreeLoan",
        "url": "https://github.com/Totenem/TreeLoan",
        "email": "info@treeloan.com"
    },
)

@app.get("/")
def root():
    return {"message": "working"}

@app.post("/api/v1/green-analysis")
def green_analysis(proposal_file: UploadFile = File(...)):
    #TODO: Implement green analysis

    # Save uploaded file to temporary location
    proposal_file.file.seek(0)  # Reset file pointer to beginning
    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:
        content = proposal_file.file.read()
        tmp_file.write(content)
        tmp_file_path = tmp_file.name
    
    try:
        #extract details from the proposal file
        page_texts = extract_details(tmp_file_path)

        #extract project details from the page texts
        project_details = extract_project_details(page_texts)

        #analyze porject and return the green score
        green_score = analyze_project(project_details)

        #combine the project details and green score and return the final result
        final_result = combine_results(project_details, green_score)
        return final_result
    finally:
        # Clean up temporary file
        if os.path.exists(tmp_file_path):
            os.unlink(tmp_file_path)