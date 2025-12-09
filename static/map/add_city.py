import json

file_path = 'static/map/teams.json'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    if 'teams' in data:
        for team in data['teams']:
            if 'city' not in team:
                team['city'] = ""

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    
    print("Successfully added 'city' field to teams.")

except Exception as e:
    print(f"Error: {e}")
