from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
CORS(app, resources={r"/process_data": {"origins": "http://localhost:3000"}})

YELP_API_KEY = 'cnYV5eLpHysMmvW6rE3ODyzLO0K7m_mOgB0AIrJgUnmxAhgSBRMsIpyVhKpRsrIF7aOWUrBOFIw31xbHic9DxBhPNYIl0Ynlp2WofHl2FSsZEJ8TkDYm8LH-sweIZnYx'

@app.route('/process_data', methods=['POST'])
def process_data():
    data = request.get_json()
    location = data.get('location')
    distance = data.get('distance')
    cuisine = data.get('cuisine')
    rating = str(data.get('rating'))
    price = data.get('price').replace("$","1").replace("$$","2").replace("$$$","3")
    numberOfRestaurants = data.get('numberOfRestaurants')
    # Replace with your logic to interact with Yelp API or any other processing
    url = f"https://api.yelp.com/v3/businesses/search?term=restaurant&location={location}&radius={distance}&sort_by=review_count"
    if cuisine !="all":
        url += f"&categories={cuisine}"
    if price !="all":
        url += f"&price={price}"
    # Set the headers for the Yelp API request
    headers = {
        "Authorization": f"Bearer {YELP_API_KEY}",
        "Accept": "application/json",
    }

    # Make the request to the Yelp API
    response = requests.get(url, headers=headers)
    data = response.json()
    sorted_data = filter_and_sort_restaurants(data, numberOfRestaurants, rating)

    return jsonify(sorted_data)

def filter_and_sort_restaurants(data, numberOfRestaurants, min_rating):
    # Parse the JSON data
    restaurants = data['businesses']

    # Filter restaurants based on the minimum rating
    filtered_restaurants = [restaurant for restaurant in restaurants if restaurant['rating'] >= float(min_rating)]

    # Sort the filtered restaurants by rating in descending order
    sorted_restaurants = sorted(filtered_restaurants, key=lambda x: x['rating'], reverse=True)

    # Limit the number of restaurants to the specified numberOfRestaurants
    top_restaurants = sorted_restaurants[:int(numberOfRestaurants)]

    # Create the output JSON
    output = {
        'businesses': top_restaurants
    }

    return output

if __name__ == '__main__':
    app.run(debug=True)