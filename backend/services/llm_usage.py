from groq import Groq
from dotenv import load_dotenv

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

def combine_results(project_details, green_score):
    '''
    Combines the project details and green score and returns a final result.
    '''
    combined_results = project_details + green_score
    return combined_results