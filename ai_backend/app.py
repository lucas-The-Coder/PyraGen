from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import cv2
import numpy as np
from PIL import Image
import io
import base64

app = Flask(__name__)
CORS(app)  # Allow frontend to call this API

# Load a pre-trained model (you can replace with a custom one)
model = YOLO('yolov8n.pt')  # nano model, fast but not floor-plan specific

@app.route('/detect', methods=['POST'])
def detect_objects():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    file = request.files['image']
    img_bytes = file.read()
    img = Image.open(io.BytesIO(img_bytes))
    img_np = np.array(img)

    # Run detection
    results = model(img_np)
    
    # Extract boxes, labels, confidences
    detections = []
    for r in results:
        boxes = r.boxes
        if boxes is not None:
            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0].tolist()
                conf = float(box.conf[0])
                cls = int(box.cls[0])
                label = model.names[cls]
                detections.append({
                    'label': label,
                    'confidence': conf,
                    'bbox': [x1, y1, x2, y2]
                })
    
    return jsonify({'detections': detections})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)