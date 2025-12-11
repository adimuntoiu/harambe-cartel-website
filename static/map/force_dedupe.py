import json

def remove_duplicates(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    unique_teams = {}
    duplicates = 0
    
    # Keep the first occurrence of each team number
    # If team number is missing, use teamName as key (fallback)
    
    for team in data['teams']:
        key = team.get('team-number')
        if not key:
            key = team.get('teamName')
            
        if key not in unique_teams:
            unique_teams[key] = team
        else:
            duplicates += 1
            print(f"Removing duplicate: {team.get('teamName')} (#{team.get('team-number')})")
            
    # Convert back to list
    new_team_list = list(unique_teams.values())
    
    # Sort by ID or something stable? Keeping original order mostly.
    # Actually, simpler to just start fresh or sort by int(id) if valid.
    
    data['teams'] = new_team_list
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
        
    print(f"Removed {duplicates} duplicates. Total unique: {len(new_team_list)}")

if __name__ == "__main__":
    remove_duplicates('teams.json')
