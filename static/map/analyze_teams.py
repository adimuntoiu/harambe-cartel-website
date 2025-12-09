import json

def analyze():
    path = 'static/map/teams.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading {path}: {e}")
        return

    teams = data.get('teams', [])
    print(f"Total teams: {len(teams)}")

    to_remove = []
    missing_coords = []

    for t in teams:
        t_num = t.get('team-number', '0')
        try:
            num = int(t_num)
            if num > 40000:
                to_remove.append(f"{t.get('teamName')} ({t_num})")
        except:
            if t_num != '0': # Assume non-integer might be special, but user said > 40000
                 print(f"Non-integer team number: {t_num}")

        coords = t.get('coordinates', [])
        if not coords or len(coords) != 2:
            school = t.get('schoolName', 'Unknown School')
            name = t.get('teamName', 'Unknown Team')
            missing_coords.append(f"{name} | {school}")

    print(f"\nTeams number > 40000 (to remove): {len(to_remove)}")
    for tr in to_remove:
        print(f" - {tr}")

    print(f"\nTeams missing coordinates (to geocode): {len(missing_coords)}")
    for mc in missing_coords[:20]: # Show first 20
        print(f" - {mc}")
    if len(missing_coords) > 20:
        print(f" ... and {len(missing_coords) - 20} more")

if __name__ == "__main__":
    analyze()
