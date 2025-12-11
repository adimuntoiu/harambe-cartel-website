import json
from collections import defaultdict

def check_coords_dupes():
    with open('teams.json', 'r') as f:
        data = json.load(f)
    
    coords_map = defaultdict(list)
    for team in data['teams']:
        if team.get('coordinates'):
            c = tuple(team['coordinates'])
            coords_map[c].append(team['teamName'])
            
    for c, names in coords_map.items():
        if len(names) > 1:
            print(f"Coords {c}: {names}")

if __name__ == "__main__":
    check_coords_dupes()
