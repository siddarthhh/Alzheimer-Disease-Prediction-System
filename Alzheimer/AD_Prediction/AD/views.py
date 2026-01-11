from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from PIL import Image
from io import BytesIO
import numpy as np
import tensorflow as tf
from keras.preprocessing import image as img_preprocessing

# Load the pre-trained model
model = tf.keras.models.load_model(r'C:\Users\Siddarth\Alzheimer\AD_Prediction\AD\model.h5')

@csrf_exempt
def predict_image(request):
    if request.method == 'POST' and request.FILES['image']:
        # Assuming image data is posted as form data
        image_file = request.FILES['image']
        
        # Read the image data from the request
        image_data = image_file.read()
        
        # Convert image data to PIL image
        img = Image.open(BytesIO(image_data))
        img = img.convert('RGB')  # Convert image to RGB mode if it's not
        
        # Resize and preprocess the image
        img = img.resize((128, 128))
        img_array = img_preprocessing.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0
        
        # Make prediction
        prediction = model.predict(img_array)
        predicted_class = np.argmax(prediction)
        class_names = ['Mild_Demented', 'Moderate_Demented', 'Non_Demented', 'Very_Mild_Demented']
        predicted_label = class_names[predicted_class]
        
        return JsonResponse({'predicted_label': predicted_label})
    else:
        return JsonResponse({'error': 'No image file found or invalid request'})
