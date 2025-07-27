import cv2
import os
import base64

def extract_frames(video_path, output_dir):
    """
    Extracts frames from a video file and saves them as images.
    """
    print(f"Extracting frames from: {video_path}")
    if not os.path.exists(video_path):
        print(f"ERROR: Video file not found at {video_path}")
        return

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    video_capture = cv2.VideoCapture(video_path)
    fps = video_capture.get(cv2.CAP_PROP_FPS)
    
    # Analyze 2 frames per second for efficiency
    frame_interval = int(fps / 2) if fps > 2 else 1

    current_frame = 0
    while video_capture.isOpened():
        ret, frame = video_capture.read()
        if not ret:
            break
            
        if current_frame % frame_interval == 0:
            frame_filename = os.path.join(output_dir, f"frame_{current_frame}.jpg")
            cv2.imwrite(frame_filename, frame)
            print(f"  - Saved frame: {frame_filename}")

        current_frame += 1
        
    video_capture.release()
    print(f"\nFrame extraction complete.\n")


if __name__ == "__main__":
    videos_to_process = {
        "zone-a.mp4": "frames_zone_a",
    }
    
    for video_file, output_dir in videos_to_process.items():
        extract_frames(video_file, output_dir) 