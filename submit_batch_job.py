from google.cloud import aiplatform

def submit_batch_prediction_job(
    project: str,
    location: str,
    model_resource_name: str,
    job_display_name: str,
    gcs_source: str,
    gcs_destination: str,
    instances_format: str = "file-list",
    machine_type: str = "n1-standard-2",
):
    """
    Submits a batch prediction job to Vertex AI.
    """
    aiplatform.init(project=project, location=location)

    model = aiplatform.Model(model_resource_name)

    batch_prediction_job = model.batch_predict(
        job_display_name=job_display_name,
        gcs_source=gcs_source,
        gcs_destination_prefix=gcs_destination,
        instances_format=instances_format,
        machine_type=machine_type,
    )

    print(f"Batch prediction job submitted: {batch_prediction_job.resource_name}")
    batch_prediction_job.wait()
    print("Batch prediction job completed.")
    print(f"Output saved to: {batch_prediction_job.output_info.gcs_output_directory}")


if __name__ == "__main__":
    submit_batch_prediction_job(
        project="project-drishti-v1-b22d8",
        location="us-central1",
        model_resource_name="projects/1032095976884/locations/us-central1/models/780799136991313920",
        job_display_name="drishti_batch_prediction",
        gcs_source="gs://project-drishti-v1-b22d8-frames/frames_zone_a/*",
        gcs_destination="gs://project-drishti-v1-b22d8-frames/output/",
    ) 