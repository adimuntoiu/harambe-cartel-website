import json
import difflib

def normalize_school_names(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    teams = data['teams']
    
    # Group teams by county
    county_schools = {}
    for team in teams:
        county = team.get('county', 'Unknown')
        if county not in county_schools:
            county_schools[county] = set()
        
        if team.get('schoolName'):
            county_schools[county].add(team['schoolName'])
    
    # Create a mapping for replacements
    replacements = {}
    
    for county, schools in county_schools.items():
        sorted_schools = sorted(list(schools), key=len) # Sort by length
        
        for i in range(len(sorted_schools)):
            short_name = sorted_schools[i]
            for j in range(i + 1, len(sorted_schools)):
                long_name = sorted_schools[j]
                
                # Logic: If short name is in long name, suggests they are the same.
                # Also check similarity ratio for slight variations (typos, quotes)
                
                # Check 1: Substring match (e.g. "Ion C. Brătianu" in " ... Ion C. Brătianu Pitești")
                # We strip generic words to be safer? Or just direct check
                if short_name in long_name:
                     replacements[long_name] = short_name
                     continue

                # Check 2: Fuzzy match
                ratio = difflib.SequenceMatcher(None, short_name, long_name).ratio()
                if ratio > 0.85: # High similarity threshold
                     # If they are very similar, prefer the one with "Colegiul" or standard casing?
                     # For now, map the one that seems "longer/noisier" to the clean one?
                     # Actually, usually the shorter one is the canonical one if one is just adding city name.
                     if len(long_name) > len(short_name):
                         replacements[long_name] = short_name
    
    # Apply replacements
    count = 0
    for team in teams:
        original = team.get('schoolName')
        if original and original in replacements:
            team['schoolName'] = replacements[original]
            count += 1
            print(f"Renaming: '{original}' -> '{replacements[original]}'")
            
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
        
    print(f"Total updates: {count}")

if __name__ == "__main__":
    normalize_school_names('teams.json', 'teams.json')
