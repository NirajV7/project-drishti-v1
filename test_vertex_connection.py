# test_vertex_connection.py

from google.cloud import aiplatform

# --- CONFIGURATION ---
PROJECT_ID = "project-drishti-v1-b22d8"
LOCATION = "us-central1"

def test_connection():
    """A simple test to list models in Vertex AI."""
    try:
        print("Initializing connection to Vertex AI...")
        aiplatform.init(project=PROJECT_ID, location=LOCATION)

        print(f"Attempting to list models in project '{PROJECT_ID}'...")
        models = aiplatform.Model.list()

        print("\nSUCCESS! Connection to Vertex AI is working.")
        if not models:
            print("The list of your models is empty, which is normal for a new project.")
        else:
            print("Found the following models:")
            for model in models:
                print(f"- {model.display_name}")

    except Exception as e:
        print("\nERROR: The connection test failed.")
        print(e)

if __name__ == "__main__":
    test_connection() 