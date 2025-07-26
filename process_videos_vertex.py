import cv2
import json
import os
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub

def analyze_video_with_tf_hub(video_path, output_json_path):
    """
    Analyzes a local video file frame by frame using a TensorFlow Hub model.
    """
    print(f"Starting TensorFlow Hub analysis for: {video_path}")
    if not os.path.exists(video_path):
        print(f"ERROR: Video file not found at {video_path}")
        return

    # Load the object detection model from TensorFlow Hub
    model_url = "https://tfhub.dev/tensorflow/ssd_mobilenet_v2/2"
    detector = hub.load(model_url)

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
            # Convert frame to a tensor
            input_tensor = tf.convert_to_tensor(frame)
            input_tensor = input_tensor[tf.newaxis, ...]

            # Run detection
            result = detector(input_tensor)

            # The result is a dictionary of tensors.
            num_detections = int(result.pop('num_detections'))
            
            # Filter for person detections with a score > 0.5
            person_count = 0
            for i in range(num_detections):
                if result['detection_classes'][0, i] == 1 and result['detection_scores'][0, i] > 0.5:
                    person_count += 1
            
            timestamp = round(current_frame / fps, 2)
            results_data.append({"timestamp": timestamp, "count": person_count})
            print(f"  - Timestamp: {timestamp:.2f}s, Detected Persons: {person_count}")

        current_frame += 1
        
    video_capture.release()
    
    with open(output_json_path, 'w') as f:
        json.dump(results_data, f, indent=4)
        
    print(f"\nAnalysis complete. Results saved to {output_json_path}\n")


if __name__ == "__main__":
    # Ensure your video files are in the same folder as this script
    videos_to_process = {
        "zone-a.mp4": "crowd_data_zone_a.json",
        "zone-b.mp4": "crowd_data_zone_b.json",
        "zone-c.mp4": "crowd_data_zone_c.json"
    }
    
    for video_file, output_file in videos_to_process.items():
        analyze_video_with_tf_hub(video_file, output_file) 