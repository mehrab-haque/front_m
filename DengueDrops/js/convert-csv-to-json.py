import pandas as pd
import json

df = pd.read_csv('./bmi_list_for_child.csv')

bmi_dict = {
    "male": {},
    "female": {}
}
for index, row in df.iterrows(): 
    bmi_dict['male'][row['Age']] = row['male']
    bmi_dict['female'][row['Age']] = row['female']
   
json_object = json.dumps(bmi_dict, indent=4)
 
with open("bmi_table_for_child.json", "w") as outfile:
    outfile.write(json_object)