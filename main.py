from replit import db
from flask import Flask, render_template, request, url_for, redirect

app = Flask(__name__)
app.static_folder = 'static'

currentUser = {}

@app.route('/')
def index():
  return render_template("index.html")

@app.route('/db', methods=['POST', 'GET'])
def db_info():
  error = '';
  if request.method == 'GET':
    error = db.keys();
  return render_template('db.html', error=error)
  
# https://flask.palletsprojects.com/en/2.0.x/quickstart/
@app.route('/login', methods=['POST', 'GET'])
def login():
  error = '';
  if request.method == 'POST':
    valid_login = attempt_login(request.form['email'], request.form['password'])
    if valid_login == 'login':
      login_user(request.form['email'])
      return render_template("main.html") # should be redirect instead
    elif valid_login == 'incorrect password':
      error = 'Incorrect password'
    else:
      error = 'This email does not exist in the database'
  return render_template('login.html', error=error)

def attempt_login(email, password):
  try:
    if password == db[email]["password"]:
      print("Successful login!")
      return 'login'
    else:
      print("Incorrect password")
      return 'incorrect password'
  except:
    print("This email does not exist in the database")
    return 'This email does not exist in the database'

def login_user(email):
  global currentUser
  currentUser = db[email]
  print("User logged in")

@app.route('/signup', methods=['POST', 'GET'])
def signup():
  error = '';
  if request.method == 'POST':
    usedEmail = existing_email(request.form['email'])
    if usedEmail == False:
      user = create_user(request.form['email'],
                         request.form['password'],
                         request.form['firstName'],
                         request.form['lastName'],
                         request.form['jobTitle'])
      create_account(request.form['email'], user)
      return render_template("login.html") # should be redirect instead
    else:
      error = "An account with this email already exists"
  return render_template("signup.html", error=error)

def existing_email(email):
  try: 
    email == db[email]["email"]
    return True
  except:
    return False

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

def create_account(email, userData):
  db[email] = userData
  print("Account created")

@app.route('/main')
def main():
  return render_template("main.html")

@app.route('/main/schedule', methods=['POST', 'GET'])
def schedule():
  if request.method == 'POST':
    event = create_event(request.form['eventTitle'],
                        request.form['startDate'],
                        request.form['endDate'],
                        request.form['recurring'],
                        request.form['description'],
                        request.form['mentorAvailability'])
    if request.form['recurring'] == 'no':
      currentUser['singularEvents'].append(event)
    else:
      currentUser['recurringEvents'].append(event)
    update_user_data()
  
  return render_template("main.html")

def create_event(title, start, end, recurring, description, mentor):
  event = {
    "eventTitle": title,
    "startDate": start,
    "endDate": end,
    "recurring": recurring,
    "description": description,
    "mentorAvailability": mentor
  }
  return event
  
def update_user_data():
  global currentUser
  db[currentUser["email"]] = currentUser
  print("User info updated")

@app.route('/logout')
def logout():
  global currentUser
  currentUser = {}
  print("User logged out")
  return render_template("index.html") # should be redirect

@app.route('/topics')
def topics():
  return render_template("topics.html")

@app.route('/mentors')
def mentors():
  return render_template("mentors.html")

@app.route('/profile')
def profile():
  return render_template("profile.html")

@app.route('/reviews')
def reviews():
  return render_template("reviews.html")
  
app.run(host='0.0.0.0', port=8080, debug=True)




# currentUser = {}

# emails should be unique identifiers
# could use a userID but would be redundant
# email will be the key for the user

# def create_account(email, userData):
#   db[email] = userData
#   print("Account created")

# def attempt_login(email, password):
#   try:
#     if password == db[email]["password"]:
#       print("Successful login!")
#       login_user(email)
#     else:
#       print("Incorrect password")
#   except:
#     print("This email does not exist in the database")

# the key = the user
# only one value per key
# possible values: list, dict, tuple, set
# dict makes most sense to have more labels to use

# def create_user(email, password, firstName, lastName, jobTitle):
#   user = {
#     "email": email,
#     "password": password,
#     "firstName": firstName,
#     "lastName": lastName,
#     "jobTitle": jobTitle,
#     "recurringEvents": [],
#     "singularEvents": []
#   }
#   print("User created")
#   return user

# we need the site to have the accurate data for the user who has successfully logged in

# def login_user(email):
#   global currentUser
#   currentUser = db[email]
#   print("User logged in")

# we also need to remove the data once they have logged out

# def logout_user():
#   global currentUser
#   currentUser = {}
#   print("User logged out")

# whenever a user changes data, we need to save it to their profile

# def update_user_data():
#   global currentUser
#   db[currentUser["email"]] = currentUser
#   print("User info updated")

# check to see if when a user is attempting to create an account, the email does not already exist in the database
  
# def existing_email(email):
#   try: 
#     email == db[email]["email"]
#     return True
#   except:
#     return False

