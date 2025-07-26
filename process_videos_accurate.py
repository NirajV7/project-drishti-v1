import cv2
import json
import os
import pandas as pd
from google.cloud import vision

def analyze_video_for_accuracy(video_path, output_json_path):
    """
    Analyzes a local video file by detecting both persons and faces,
    taking the max of the two, and smoothing the final result.
    """
    # --- Check if output already exists ---
    if os.path.exists(output_json_path):
        print(f"Output file found at {output_json_path}. Skipping analysis for {video_path}.")
        return

    print(f"Starting ACCURATE analysis for: {video_path}")
    if not os.path.exists(video_path):
        print(f"ERROR: Video file not found at {video_path}")
        return

    client = vision.ImageAnnotatorClient()
    video_capture = cv2.VideoCapture(video_path)
    fps = video_capture.get(cv2.CAP_PROP_FPS)
    
    results_data = []
    frame_interval = int(fps / 2) if fps > 2 else 1

    current_frame = 0
    while video_capture.isOpened():
        ret, frame = video_capture.read()
        if not ret:
            break
            
        if current_frame % frame_interval == 0:
            success, encoded_image = cv2.imencode('.jpg', frame)
            image_content = encoded_image.tobytes()
            image = vision.Image(content=image_content)
            
            # --- DUAL ANALYSIS ---
            # 1. Detect Persons
            objects = client.object_localization(image=image).localized_object_annotations
            person_count = sum(1 for obj in objects if obj.name == "Person")
            
            # 2. Detect Faces
            faces = client.face_detection(image=image).face_annotations
            face_count = len(faces)
            
            # --- INTELLIGENT SELECTION ---
            # Use the higher of the two counts for better accuracy
            final_count = max(person_count, face_count)
            
            timestamp = round(current_frame / fps, 2)
            results_data.append({"timestamp": timestamp, "count": final_count})
            print(f"  - Timestamp: {timestamp:.2f}s, Persons: {person_count}, Faces: {face_count} -> Using: {final_count}")

        current_frame += 1
        
    video_capture.release()
    
    # --- DATA SMOOTHING ---
    if results_data:
        df = pd.DataFrame(results_data)
        # Apply a simple moving average with a window of 3 data points
        df['smoothed_count'] = df['count'].rolling(window=3, min_periods=1, center=True).mean().round().astype(int)
        
        # Prepare final JSON output
        final_data = [{"timestamp": row.timestamp, "count": row.smoothed_count} for index, row in df.iterrows()]
        
        with open(output_json_path, 'w') as f:
            json.dump(final_data, f, indent=4)
        print(f"\nAnalysis complete and data smoothed. Results saved to {output_json_path}\n")
    else:
        print("No data was generated from the video.")

# --- Main execution ---
if __name__ == "__main__":
    # You will need to install pandas: pip install pandas
    videos_to_process = {
        "zone-a.mp4": "crowd_data_zone_a.json",
        "zone-b.mp4": "crowd_data_zone_b.json",
        "zone-c.mp4": "crowd_data_zone_c.json"
    }
    
    for video_file, output_file in videos_to_process.items():
        analyze_video_for_accuracy(video_file, output_file) 