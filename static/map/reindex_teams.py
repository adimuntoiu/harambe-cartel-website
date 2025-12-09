import json

path = 'static/map/teams.json'
with open(path, 'r') as f:
    data = json.load(f)

teams = data.get('teams', [])

# User wants to fill gaps. Safest way is to just re-number everything from 1..N
# However, we should try to preserve the existing order if possible, or sort by id?
# The user said "in my json file i skipped a few ids. try not to skip them please and put them in order"
# This likely means "renumber them sequentially".

# Let's see if there's a logical order. Maybe alphabetical?
# Or just keep current file order and re-assign IDs.
# Current file likely has old teams first, then appended new teams.
# Re-numbering based on current list index is safest to ensure 1..N.

for i, team in enumerate(teams):
    team['id'] = str(i + 1)

with open(path, 'w') as f:
    json.dump({"teams": teams}, f, indent=4)

print(f"Re-indexed {len(teams)} teams.")
