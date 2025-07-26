# verify_vertex_model.py

from google.cloud import aiplatform
from google.api_core import exceptions

# --- CONFIGURATION ---
PROJECT_ID = "project-drishti-v1-b22d8"
LOCATION = "us-central1"

def verify_model_access():
    """
    A simple test to confirm we can access the pre-trained
    Occupancy Analytics model on Vertex AI.
    """
    try:
        print("Initializing connection to Vertex AI...")
        aiplatform.init(project=PROJECT_ID, location=LOCATION)
        
        # This is the specific name for the pre-trained model
        model_name = "projects/google/locations/us-central1/models/occupancy-analytics"
        
        print(f"Attempting to access model: {model_name}")
        
        # This is the line that was failing before
        model = aiplatform.Model(model_name=model_name)
        
        print("\n✅ SUCCESS! Connection to the Vertex AI model is working.")
        print(f"Successfully retrieved model: {model.display_name}")

    except exceptions.PermissionDenied as e:
        print("\n❌ FAILURE: Still receiving a Permission Denied error.")
        print("This confirms a persistent configuration or billing issue with the project.")
        print(f"Error details: {e}")
        
    except Exception as e:
        print(f"\n❌ FAILURE: An unexpected error occurred.")
        print(e)
            
if __name__ == "__main__":
    verify_model_access() 