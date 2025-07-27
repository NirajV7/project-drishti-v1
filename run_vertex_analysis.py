# run_vertex_analysis.py

from google.cloud import aiplatform

# --- CONFIGURATION ---
PROJECT_ID = "project-drishti-v1-b22d8"
LOCATION = "us-central1"  # Must be a supported Vertex AI location
# The GCS URI for the folder or specific video file you want to analyze
GCS_INPUT_URI = "gs://project-drishti-v1-b22d8.appspot.com/zone-a.mp4" 
# The GCS folder where the results will be saved. MUST end with a '/'
GCS_OUTPUT_URI = "gs://project-drishti-v1-b22d8.appspot.com/analysis-output/"

def run_batch_prediction_job():
    """
    Starts a Vertex AI Batch Prediction job for Occupancy Analytics.
    """
    aiplatform.init(project=PROJECT_ID, location=LOCATION)

    # This is the specific name for the pre-trained Occupancy Analytics model
    model_name = "projects/google/locations/us-central1/models/occupancy-analytics"
    model = aiplatform.Model(model_name=model_name)

    # Configure the job
    batch_prediction_job = model.batch_predict(
        job_display_name="drishti_occupancy_analysis",
        gcs_source=GCS_INPUT_URI,
        gcs_destination_prefix=GCS_OUTPUT_URI,
        # Define the model's parameters
        params={
            "inference_time_segment_end": "Infinity", # Analyze the full video
            "person_detection": "true"
        }
    )
    
    print("Batch prediction job started. See the status in your Google Cloud Console.")
    print(f"Job resource name: {batch_prediction_job.resource_name}")

if __name__ == "__main__":
    run_batch_prediction_job() 