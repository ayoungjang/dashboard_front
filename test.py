import json

# Load the files
with open('./static/scandinavia.geo.json', 'r') as file:
    scandinavia = json.load(file)

with open('./static/no-all.geo.json', 'r') as file:
    norway = json.load(file)

with open('./static/se-all.geo.json', 'r') as file:
    sweden = json.load(file)

with open('./static/dk-all.geo.json', 'r') as file:
    denmark = json.load(file)

print("Files loaded successfully")

# Combine the regional data into the main Scandinavian file
combined_features = scandinavia['features']

# Create a map to hold country-specific features
country_features_map = {
    'Norway': norway['features'],
    'Sweden': sweden['features'],
    'Denmark': denmark['features']
}

print("Country feature maps created successfully")

# Insert regional features into the appropriate country in the Scandinavian file
for feature in combined_features:
    country_name = feature['properties']['name']
    if country_name in country_features_map:
        print(f"Adding regions for {country_name}")
        combined_features.extend(country_features_map[country_name])

# Create the final combined GeoJSON
combined_geojson = {
    "type": "FeatureCollection",
    "features": combined_features
}

# Save the combined file
combined_path = './static/output/combined_scandinavia.geo.json'
with open(combined_path, 'w') as file:
    json.dump(combined_geojson, file)

print(f"Combined GeoJSON file has been saved as {combined_path}")
