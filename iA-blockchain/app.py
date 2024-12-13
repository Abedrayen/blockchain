from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the prediction service!"

@app.route('/salary', methods=['POST'])
def predict_salary():
    try:
        # Get user data from JSON body
        data = request.get_json()
        
        # Check if 'user_data' key exists in the JSON data
        if 'user_data' not in data:
            return jsonify({'error': 'User data is missing'}), 400
        
        # Extract the user data from the JSON data
        user_data = data['user_data']
        
        # Convert the string representation of list to actual list
        user_data_list = eval(user_data)
        
        # Load the trained model
        with open('trained_model.sav', 'rb') as model_file:
            loaded_model = pickle.load(model_file)
        
        # Make prediction using the loaded model
        prediction = loaded_model.predict([user_data_list])
        
        # Convert prediction to a standard Python data type (e.g., int)
        prediction_result = int(prediction[0])
        
        # Import modules from blockchain package
        from blockchain.utils.encryption import generate_encryption_keys
        from blockchain.transaction import Transaction
        
        person_1 = generate_encryption_keys()
        person_2 = generate_encryption_keys()

        tr_1 = Transaction(sender=person_1["public_key"], receiver=person_2["public_key"], assets="SOMETHING")
        tr_1.sign(person_1["private_key"])

        # Return the prediction as JSON
        return jsonify({'prediction': prediction_result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
