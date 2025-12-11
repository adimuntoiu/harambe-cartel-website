import json
from collections import defaultdict

def find_duplicates(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    teams = data['teams']
    
    by_number = defaultdict(list)
    by_name = defaultdict(list)
    
    for team in teams:
        t_num = team.get('team-number')
        t_name = team.get('teamName')
        
        if t_num:
            by_number[t_num].append(team)
        if t_name:
            by_name[t_name.lower()].append(team)
            
    print("--- Duplicates by Team Number ---")
    for num, team_list in by_number.items():
        if len(team_list) > 1:
            print(f"Number {num}: {len(team_list)} entries")
            for t in team_list:
                print(f"  - {t.get('teamName')} (ID: {t.get('id')})")

    print("\n--- Duplicates by Team Name ---")
    for name, team_list in by_name.items():
        if len(team_list) > 1:
            # Check if they have different numbers (strange) or same
            nums = set(t.get('team-number') for t in team_list)
            if len(nums) > 1:
                 print(f"Name '{name}': Multiple numbers {nums}")

if __name__ == "__main__":
    find_duplicates('teams.json')
