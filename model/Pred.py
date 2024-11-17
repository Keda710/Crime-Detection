#<--------------------------------------------------------------------------------------------------------------------------------------->
#Importing the libraries
import sys
import os
import cv2
import numpy as np
from keras.models import load_model
#<--------------------------------------------------------------------------------------------------------------------------------------->
#Setting up environment to supress warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
#<--------------------------------------------------------------------------------------------------------------------------------------->
#Function to predict class of given frame (subclass of anomaly)
def predict_image(image,model_class,labels_categories):
    original_stdout = sys.stdout
    sys.stdout = open(os.devnull, 'w')
    image = cv2.resize(image, (50, 50))
    image_cnn = image.reshape((1,) + image.shape + (1,))
    image_lstm = image.reshape((1,) + (-1, 1))
    prediction = model_class.predict([image_cnn, image_lstm])
    label = np.argmax(prediction)
    return labels_categories[label]

#<--------------------------------------------------------------------------------------------------------------------------------------->
#Function to process videos and predicting each frame from predict_image function
def predict_frames(video_path,model_class,labels_categories):
    SEQUENCE_LENGTH = 50
    frames_list = []
    video_reader = cv2.VideoCapture(video_path)
    video_frames_count = int(video_reader.get(cv2.CAP_PROP_FRAME_COUNT))
    skip_frames_window = max(int(video_frames_count/SEQUENCE_LENGTH), 1)
    output=[]
    for frame_counter in range(SEQUENCE_LENGTH):
        video_reader.set(cv2.CAP_PROP_POS_FRAMES, frame_counter * skip_frames_window) 
        success, frame = video_reader.read() 
        if not success:
            break
        frames_list.append(frame)
        resized_frame = cv2.resize(frame,(50,50))
        reshaped_frame = resized_frame.reshape((1, -1, 1))
        result=predict_image(reshaped_frame,model_class,labels_categories)
        output.append(result)
    return output,frames_list

#<--------------------------------------------------------------------------------------------------------------------------------------->
#Function to extract frames of given video
def frames_extraction(video_path):
    IMAGE_HEIGHT , IMAGE_WIDTH = 64,64
    SEQUENCE_LENGTH = 50

    frames_list = []
    video_reader = cv2.VideoCapture(video_path)
    video_frames_count = int(video_reader.get(cv2.CAP_PROP_FRAME_COUNT))
    skip_frames_window = max(int(video_frames_count/SEQUENCE_LENGTH), 1)

    for frame_counter in range(SEQUENCE_LENGTH):
        video_reader.set(cv2.CAP_PROP_POS_FRAMES, frame_counter * skip_frames_window) 
        success, frame = video_reader.read() 
        if not success:
            break
        resized_frame = cv2.resize(frame, (IMAGE_HEIGHT, IMAGE_WIDTH))
        normalized_frame = resized_frame / 255
        frames_list.append(normalized_frame)
    video_reader.release()
    return frames_list

#<--------------------------------------------------------------------------------------------------------------------------------------->
#Function to create output video predicting subclass under anomaly
def create_output_video(frames, categories, output_video_path):
    frame_height, frame_width, _ = frames[0].shape
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_video_path, fourcc, 10.0, (frame_width, frame_height))

    for frame, category in zip(frames, categories):
        text = f'Category: {category}'
        cv2.putText(frame, text, (30, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
        out.write(frame)
    out.release()

#<--------------------------------------------------------------------------------------------------------------------------------------->
"""
Function for Video Classification:
    If Normal: 
        returns Normal and exits
    If Anomaly:
        Subclass Prediction
        Generating output video
        returns Anomaly and video
"""
def predict(video_path):
    bin_model=load_model("C:\\Users\\tosha\\OneDrive\\Desktop\\crime\\model\\model_an_vs_nor.h5")
    features_test=[]
    features_test.append(frames_extraction(video_path))
    features_test=np.array(features_test)
    class_probabilities = bin_model.predict(features_test)

    predicted_class = np.argmax(class_probabilities)
    cat=""
    if predicted_class==0:
        result="Anomaly"
        categories_labels = {'Fighting': 0, 'Shoplifting': 1, 'Abuse': 2, 'Arrest': 3, 'Shooting': 4, 'Robbery': 5, 'Explosion': 6}
        labels_categories = {v: k for k, v in categories_labels.items()} 

        model_class = load_model("C:\\Users\\tosha\\OneDrive\\Desktop\\crime\\model\\model_an_cl.h5")
        categories, frames = predict_frames(video_path,model_class,labels_categories)
        output_video_path = "output_video.mp4"
        create_output_video(frames, categories, output_video_path)
        cat=max(categories)
    else:
        result="Normal"
    return result,cat

#<--------------------------------------------------------------------------------------------------------------------------------------->
#Calling all the functions for video classification
if __name__ == "__main__":
    # Taking input of video
    video_path = sys.argv[1]

    # To supress the internal processing while prediction
    original_stdout = sys.stdout
    sys.stdout = open(os.devnull, 'w')

    # Prediction 
    prediction = predict(video_path)

    #Stopping the supression of output on terminal
    sys.stdout = original_stdout 

    print(prediction)
#<--------------------------------------------------------------------------------------------------------------------------------------->