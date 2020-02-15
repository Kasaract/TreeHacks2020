from firebase import Firebase
import time

config = {
  "apiKey": "AIzaSyCBpDzAUiRY8nyiaNadyUIcjLTJxW41dhU",
  "authDomain": 'recap-treehacks.firebaseapp.com',
  "databaseURL": 'https://recap-treehacks.firebaseio.com',
  "storageBucket": 'recap-treehacks.appspot.com'
}

firebase = Firebase(config)

#Authentication
# Get a reference to the auth service
# auth = firebase.auth()

# # Log the user in
# user = auth.sign_in_with_email_and_password("jameswsj@berkeley.edu", password)

# Get a reference to the database service
db = firebase.database()

# data to save
i = 0
data = {
    "name": "James Jung" + str(i)
}

# Pass the user's idToken to the push method
while True:
  db.child("articles").push(data)
  time.sleep(3)
  i += 1
  data = {
      "name": "James Jung" + str(i)
  }

# building paths to databse
# db = firebase.database()
# db.child("users").child("James")


# #retrieving data
# users = db.child("users").get()
# print(users.val())
# """ above function should return
# >>> {"James": {"name": "JAmes Jung"}, "Tarang": {"name": "Tarang Srivastava"}}
# """
