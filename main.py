from replit import db
from flask import Flask, render_template, url_for

app = Flask(__name__)
app.static_folder = 'static'

@app.route('/')
def index():
  return render_template("index.html")

@app.route('/login')
def login():
  return render_template("login.html")

@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)



@app.route('/user/<username>')
def profile(username):
    return f'{username}\'s profile'

with app.test_request_context():
  print(url_for('index'))
  print(url_for('login'))
  print(url_for('login', next='/'))
  print(url_for('profile', username='John Doe'))

app.run(host='0.0.0.0', port=8080)




currentUser = {}

# emails should be unique identifiers
# could use a userID but would be redundant
# email will be the key for the user

def create_account(email, userData):
  db[email] = userData
  print("Account created")

def attempt_login(email, password):
  try:
    if password == db[email]["password"]:
      print("Successful login!")
      login_user(email)
    else:
      print("Incorrect password")
  except:
    print("This email does not exist in the database")

# the key = the user
# only one value per key
# possible values: list, dict, tuple, set
# dict makes most sense to have more labels to use

def create_user(email, password, firstName, lastName, jobTitle):
  user = {
    "email": email,
    "password": password,
    "firstName": firstName,
    "lastName": lastName,
    "jobTitle": jobTitle,
    "recurringEvents": [],
    "singularEvents": []
  }
  print("User created")
  return user

# we need the site to have the accurate data for the user who has successfully logged in

def login_user(email):
  global currentUser
  currentUser = db[email]
  print("User logged in")

# we also need to remove the data once they have logged out

def logout_user():
  global currentUser
  currentUser = {}
  print("User logged out")

# whenever a user changes data, we need to save it to their profile

def update_user_data():
  global currentUser
  db[currentUser["email"]] = currentUser
  print("User info updated")

