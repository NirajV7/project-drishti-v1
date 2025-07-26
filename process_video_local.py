import cv2
import json
import os
from ultralytics import YOLO

def analyze_video_with_yolo(video_path, output_json_path):
    """
    Analyzes a local video file frame by frame using a local YOLO model
    for object detection and counts the number of people.
    """
    print(f"Starting local AI analysis for: {video_path}")
    if not os.path.exists(video_path):
        print(f"ERROR: Video file not found at {video_path}")
        return

    # Load a pre-trained YOLO model (e.g., yolov8n.pt)
    # The model will be downloaded automatically if not found.
    model = YOLO('yolov8n.pt')
    print("YOLO model loaded successfully.")

    video_capture = cv2.VideoCapture(video_path)
    fps = video_capture.get(cv2.CAP_PROP_FPS)
    
    results_data = []
    # Analyze 2 frames per second for efficiency
    frame_interval = int(fps / 2) if fps > 2 else 1

    current_frame = 0
    while video_capture.isOpened():
        ret, frame = video_capture.read()
        if not ret:
            break
            
        if current_frame % frame_interval == 0:
            # Perform prediction on the frame
            # We are interested in the 'person' class, which is class index 0 in COCO dataset
            results = model.predict(frame, classes=[0], verbose=False)
            
            # The result is a list, we take the first element
            result = results[0]
            
            # Get the number of detected persons
            person_count = len(result.boxes)
            
            timestamp = round(current_frame / fps, 2)
            results_data.append({"timestamp": timestamp, "count": person_count})
            print(f"  - Timestamp: {timestamp:.2f}s, Detected Persons: {person_count}")

        current_frame += 1
        
    video_capture.release()
    
    with open(output_json_path, 'w') as f:
        json.dump(results_data, f, indent=4)
        
    print(f"\nAnalysis complete. Results saved to {output_json_path}\n")


if __name__ == "__main__":
    videos_to_process = {
        "frontend/public/zone-a.mp4": "crowd_data_zone_a.json",
        "frontend/public/zone-b.mp4": "crowd_data_zone_b.json",
        "frontend/public/zone-c.mp4": "crowd_data_zone_c.json",
    }
    
    for video_file, output_file in videos_to_process.items():
        analyze_video_with_yolo(video_file, output_file) 