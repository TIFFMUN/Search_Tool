from flask import Flask, request, jsonify
import requests
import os
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv("OPENSANCTIONS_API_KEY")
BASE_URL = "https://api.opensanctions.org/search/default"  # 👈 correct endpoint

@app.route("/search", methods=["GET"])
def search():
    query = request.args.get("query")
    filter_type = request.args.get("filter")

    if not query:
        return jsonify({"error": "Query is required"}), 400

    params = {
        "q": query,
        "api_key": API_KEY
    }

    response = requests.get(BASE_URL, params=params)

    print("STATUS CODE:", response.status_code)
    print("TEXT:", response.text)

    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch", "details": response.text}), 500

    data = response.json()
    results = data.get("results", [])

    if filter_type == "individual":
        results = [r for r in results if r.get("schema", "").lower() == "person"]
    elif filter_type == "entity":
        results = [r for r in results if r.get("schema", "").lower() == "organization"]

    return jsonify({
        "count": len(results),
        "results": results
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
