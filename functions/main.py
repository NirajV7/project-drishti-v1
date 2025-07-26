# functions/main.py

# Import necessary libraries
from firebase_functions import https_fn
from firebase_admin import initialize_app, firestore
import datetime

# Initialize the Firebase app
initialize_app()

# This is a simple HTTP-triggered function for testing
@https_fn.on_request()
def test_firestore_connection(req: https_fn.Request) -> https_fn.Response:
    """
    A test function to confirm we can write to Firestore.
    """
    try:
        # Get a reference to the Firestore database
        db = firestore.client()

        # Create a test document in a new collection called "system_status"
        doc_ref = db.collection("system_status").document("backend_heartbeat")
        doc_ref.set({
            "status": "online",
            "timestamp": datetime.datetime.now(datetime.timezone.utc)
        })

        print("Successfully wrote to Firestore.")
        return https_fn.Response("Backend is online. Check your Firestore database.", status=200)

    except Exception as e:
        print(f"Error writing to Firestore: {e}")
        return https_fn.Response("An error occurred.", status=500)