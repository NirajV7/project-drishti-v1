import cv2
import json
import os
from google.cloud import vision

def analyze_video_from_local_path(video_path, output_json_path):
    """
    Analyzes a local video file frame by frame to count people
    and saves the results as a time-series JSON file.
    """
    print(f"Starting analysis for {video_path}")

    # Initialize the Google Cloud Vision client
    client = vision.ImageAnnotatorClient()
    
    video_capture = cv2.VideoCapture(video_path)
    
    fps = video_capture.get(cv2.CAP_PROP_FPS)
    frame_count = int(video_capture.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"Video has {frame_count} frames at {fps:.2f} FPS.")
    
    results_data = []
    frames_to_skip = int(fps / 2) # Analyze 2 frames per second
    if frames_to_skip == 0:
        frames_to_skip = 1
    
    current_frame = 0
    while video_capture.isOpened():
        ret, frame = video_capture.read()
        if not ret:
            break
            
        if current_frame % frames_to_skip == 0:
            success, encoded_image = cv2.imencode('.jpg', frame)
            if not success:
                print(f"Warning: Could not encode frame {current_frame}")
                current_frame += 1
                continue
            image_content = encoded_image.tobytes()
            image = vision.Image(content=image_content)
            response = client.object_localization(image=image)
            
            person_count = sum(1 for obj in response.localized_object_annotations if obj.name == "Person")
            timestamp = round(current_frame / fps, 2)
            
            results_data.append({"timestamp": timestamp, "count": person_count})
            print(f"  - Timestamp: {timestamp:.2f}s, Detected Persons: {person_count}")

        current_frame += 1
        
    video_capture.release()

    with open(output_json_path, 'w') as f:
        json.dump(results_data, f, indent=4)
        
    print(f"\nAnalysis complete. Results saved to {output_json_path}")

# --- Main execution ---
if __name__ == "__main__":
    videos_to_process = {
        "Crowd_Buildup_Video_Generated.mp4": "crowd_data_zone_a.json",
        "Crowd_Flow_Simulation_Video_Ready.mp4": "crowd_data_zone_b.json",
        "Video_Ready_Quiet_Zone_Footage.mp4": "crowd_data_zone_c.json"
    }
    
    for video_file, output_file in videos_to_process.items():
        if os.path.exists(video_file):
            analyze_video_from_local_path(video_file, output_file)
        else:
            print(f"Error: Video file not found at {video_file}") 