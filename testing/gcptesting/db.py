from firebase import Firebase

config = {
  "apiKey": "apiKey",
  "authDomain": "projectId.firebaseapp.com",
  "databaseURL": "https://databaseName.firebaseio.com",
  "storageBucket": "projectId.appspot.com"
}

firebase = Firebase(config)

#Authentication
# Get a reference to the auth service
auth = firebase.auth()

# Log the user in
user = auth.sign_in_with_email_and_password("jameswsj@berkeley.edu", password)

# Get a reference to the database service
db = firebase.database()

# data to save
data = {
    "name": "JAmes Jung"
}

# Pass the user's idToken to the push method
results = db.child("users").push(data, user['idToken'])

# building paths to databse
db = firebase.database()
db.child("users").child("James")


#retrieving data
users = db.child("users").get()
print(users.val())
""" above function should return
>>> {"James": {"name": "JAmes Jung"}, "Tarang": {"name": "Tarang Srivastava"}}
"""
