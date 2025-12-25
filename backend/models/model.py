from pydantic import BaseModel

class ProjectAnalysis(BaseModel):
    # Intermediate model for project analysis step
    green_score: int
    project_title: str
    project_description: str
    project_location: str
    project_type: str
    potential_funding: float

class ProjectSuggestions(BaseModel):
    # Intermediate model for suggestions step
    suggestions: list[str]
    score_impact: list[int]

class FundersRecommendation(BaseModel):
    # Intermediate model for funders recommendation step"
    recommended_funders: list[str]

class GreenAnalysisRequest(BaseModel):
    # Final structured output model

    project_title: str
    project_description: str
    project_location: str
    project_type: str
    green_score: int
    potential_funding: float
    suggestions: list[str]
    score_impact: list[int]
    recommended_funders: list[str]