from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Union
from dotenv import load_dotenv
from fastapi import UploadFile, File
from utils.helpers import extract_details, combine_results, clean_result_to_json
from services.llm_usage import extract_project_details, analyze_project, suggestions, recommended_funders
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
    },
)

LOCAL_ORIGIN = os.getenv("LOCAL_ORIGIN", "http://localhost:3000")
DOCKER_ORIGIN = os.getenv("DOCKER_ORIGIN")
PRODUCTION_ORIGIN = os.getenv("PRODUCTION_ORIGIN")

# Filter out None values and create list of allowed origins
allowed_origins = [origin for origin in [LOCAL_ORIGIN, DOCKER_ORIGIN, PRODUCTION_ORIGIN] if origin is not None]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
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
        combined_results = combine_results(project_details, green_score)

        #get suggestions for the project to increase the green score
        suggestion_results = suggestions(combined_results)

        partial_result = suggestion_results + combined_results

        #get recommended funders for the project
        recommended_funders_results = recommended_funders(partial_result)

        final_result = recommended_funders_results + partial_result

        #clean the final result to json
        final_result_json = clean_result_to_json(final_result)

        for item in final_result_json:
            green_score = item.get("green_score")

            if green_score is not None and green_score < 20:
                return {
                    "error": "The project is not green enough, please improve the project to increase the green score."
                }
        return final_result_json
    finally:
        if os.path.exists(tmp_file_path):
            os.unlink(tmp_file_path)

