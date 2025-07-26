# list_models.py
from google.cloud import aiplatform
from google.api_core import exceptions
from google.auth import default
from google.auth.transport.requests import Request

# --- CONFIGURATION ---
PROJECT_ID = "project-drishti-v1-b22d8"
LOCATION = "us-central1"

def list_publisher_models():
    """Lists available publisher models to find a valid one."""
    try:
        print("Initializing connection to Vertex AI...")

        # Authenticate using Application Default Credentials
        credentials, project_id = default()
        credentials.refresh(Request())

        # We must use the low-level client to list all of Google's models.
        from google.cloud.aiplatform_v1.services import model_service
        from google.cloud.aiplatform_v1.types import model_service as model_service_types

        print(f"Fetching publisher models from Google in '{LOCATION}'...")
        client = model_service.ModelServiceClient(
            credentials=credentials,
            client_options={"api_endpoint": f"{LOCATION}-aiplatform.googleapis.com"}
        )

        # The "parent" for all of Google's publicly available models.
        parent = "publishers/google"
        
        request = model_service_types.ListModelsRequest(parent=parent)
        
        models = client.list_models(request=request)

        print("\n--- Found Publisher Models (filtered for object detection) ---")
        found_models = False
        for model in models:
            # Let's filter for models that seem relevant to object detection
            model_name_lower = model.display_name.lower()
            if "detect" in model_name_lower or "object" in model_name_lower:
                print(f"Model Display Name: {model.display_name}")
                print(f"  - Resource Name: {model.name}")
                # The part we need is the last segment of the resource name
                model_id = model.name.split('/')[-1]
                print(f"  - Usable Model ID: {model_id}")
                print("-" * 20)
                found_models = True
        
        if not found_models:
            print("Could not find any pre-trained object detection models from Google in this region.")
        print("\n--- End of List ---")

    except exceptions.PermissionDenied as e:
        print("\n❌ FAILURE: Received a Permission Denied error.")
        print("This suggests a persistent configuration or billing issue with the project.")
        print(f"Error details: {e}")
        
    except Exception as e:
        print(f"\n❌ FAILURE: An unexpected error occurred.")
        print(e)

if __name__ == "__main__":
    list_publisher_models()