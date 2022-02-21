import json
import os
import pickle
import sys
from sklearn import gaussian_process
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split 
from sklearn.linear_model import LogisticRegression 
from sklearn import metrics

def get_input(local=False):
    if local:
        print("Reading local file.")

        return 'heart.csv'

    dids = os.getenv('DIDS', None)

    if not dids:
        print("No DIDs found in environment. Aborting.")
        return

    dids = json.loads(dids)

    for did in dids:
        filename = f'data/inputs/{did}/0'  # 0 for metadata service
        print(f"Reading asset file {filename}.")

        return filename


def run_prediction(local=False):
    npoints = 15

    filename = get_input(local)
    if not filename:
        print("Could not retrieve filename.")
        return
    
    print(filename)
    new_data=pd.read_csv(filename) #import data csv file
    new_data.info() #information about our data type

    x=new_data[["sex","oldpeak","exang","ca","cp"]]
    y=new_data["target"]
    x.info()

    print("Split data")
    x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.35,random_state=40) #splitting data with test size of 35%

    print("Build model")
    logreg = LogisticRegression()   #build our logistic model
    logreg.fit(x_train, y_train)  #fitting training data

    print("Test model")
    y_pred  = logreg.predict(x_test)    #testing model’s performance
    print("Accuracy={:.2f}".format(logreg.score(x_test, y_test)))

    print("Processing input ...")
    # input 
    d = {'sex': [1, 0], 'oldpeak': [0, 4], 'exang': [1, 0], 'ca': [0, 1],'cp': [1, 3]}
    input = pd.DataFrame(data=d)
    input
    pred  = logreg.predict(input) # make prediction
    print("Print prediction")
    print(pred)
    print("Save prediction")
    output = 'result' if local else "/data/outputs/result"
    f = open(output, "w")
    f.write(str(pred))
    f.close()

if __name__ == "__main__":
    local = (len(sys.argv) == 2 and sys.argv[1] == "local")
    run_prediction(local)