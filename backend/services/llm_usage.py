from groq import Groq
from dotenv import load_dotenv
from utils.helpers import get_recommended_funders

load_dotenv()

client = Groq()

def extract_project_details(content_blocks: list) :
    '''
    Extracts the project details from the content blocks (array of content blocks).
    Returns a dictionary of project details.
    '''
    detail_extraction = client.chat.completions.create(
        model="meta-llama/llama-4-scout-17b-16e-instruct",

        messages=[
            {
                "role": "system",
                "content": '''
                You're a helpful assistant that extracts the project details from the page texts. 
                Get the Project Title, Project Description, Project Location. 
                Generate as well the Project Type based on the project description, the potoential funding in range (Example: 1000000 - 10000000). 
                
                Project Type:
                - Renewable Energy
                - Carbon Reduction
                - Sustainable Materials
                - Sustainable Transportation
                - Sustainable Agriculture
                - Sustainable Water Management
                - Sustainable Waste Management
                - Sustainable Energy Efficiency
                
                Return the details in a JSON format.
                {
                    "project_title": "string",
                    "project_description": "string",
                    "project_location": "string",
                    "project_type": "string",
                    "potential_funding": "string"
                }

                Note: No other text should be returned, only the JSON format.
                '''
            },
            {
                "role": "user",
                "content": content_blocks
            }
        ]
    )
    print('Successfully extracted the project details')
    return detail_extraction.choices[0].message.content

def analyze_project(project_details):
    '''
    Analyzes the project details and returns a green score.
    '''
    analysis = client.chat.completions.create(
        model="meta-llama/llama-4-scout-17b-16e-instruct",

        messages=[
            {
                "role": "system",
                "content": 
                '''
                You're a helpful assistant that analyzes the project details and returns a green score.
                The green score is a number between 0 and 100, where 0 is the worst and 100 is the best.
                The green score is calculated based on the project details. 
                Make the scoring stricter, the green score should be low if the project is not green project at all.
                Give a green score of 0 if the project is not green project at all.
                Consider the project type and the project description to give the green score and have it more accurate.

                The project details are:
                - Project Title
                - Project Description
                - Project Location
                - Project Type
                - Potential Funding

                Return the green score in a JSON format.
                {
                    "green_score": "number"
                }

                Note: No other text should be returned, only the JSON format.
                '''
            },
            {
                "role": "user",
                "content": project_details
            }
        ]
    )
    print('Successfully analyzed the project')
    return analysis.choices[0].message.content

def suggestions(combined_results):
    '''
    Returns suggestions for the project.
    '''
    suggestions = client.chat.completions.create(
        model="meta-llama/llama-4-scout-17b-16e-instruct",
        messages=[
            {
                "role": "system",
                "content": '''
                You're a helpful assistant that returns suggestions for the project. to increase their green score.
                Make the suggestions as specific as possible. This is suppose to be a pitch deck for the project to increase the green score.
                The combined results are:
                - Project Title
                - Project Description
                - Project Location
                - Project Type
                - Potential Funding
                - Green Score

                The suggestions should be in a JSON format.
                {
                    "suggestions": [
                        "suggestion 1",
                        "suggestion 2",
                        "suggestion 3"
                    ],
                    "score_impact": [
                        "Number Here",
                        "Number Here",
                        "Number Here"
                    ]
                }
                Note: No other text should be returned, only the JSON format.
                '''
            },
            {
                "role": "user",
                "content": combined_results
            }
        ]
    )
    return suggestions.choices[0].message.content



def recommended_funders(final_result):
    '''
    Returns recommended funders for the project.
    '''
    recommended_funders_list = get_recommended_funders()
    recommended_funders = client.chat.completions.create(
        model="meta-llama/llama-4-scout-17b-16e-instruct",
        messages=[
            {
                "role": "system",
                "content": '''
                You're a helpful assistant that returns recommended funders for the project. 
                Use this csv file to get the recommended funders: 

                list it in a json format.
                {
                    "recommended_funders": [
                        "company name 1",
                        "company name 2",
                        "company name 3"
                    ],
                    "company_website": [
                        "website 1",
                        "website 2",
                        "website 3"
                    ],
                    "company_description": [
                        "description 1",
                        "description 2",
                        "description 3"
                    ],
                    "estimated_investment": [
                        "estimated investment 1",
                        "estimated investment 2",
                        "estimated investment 3"
                    ]

                    Note: No other text should be returned, only the JSON format.
                }
                '''
            },
            {
                "role": "user",
                "content": f'''
                The final result is:
                {final_result}
                CSV file: {recommended_funders_list}
                '''
            }
        ]
    )
    return recommended_funders.choices[0].message.content