import json

def read_json(filename):
    with open(filename, encoding='utf-8', mode="r") as f:
        data = json.load(f)
    return data

def save_json(filename, data):
    with open(filename, encoding='utf-8', mode="w") as f:
        json.dump(data, f, indent=4, sort_keys=True,
            separators=(',',' : '))
    return data
