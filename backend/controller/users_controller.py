from model.users import Users
import json


# ========================= User Controller ==================================
# ------------------------- create user --------------------------------------
def do_login(request):
    params = request.get_json()
    email = params['email']
    password = params['password']
    user = Users.confirm_account(email, password)
    return json.dumps({'result': user is not None, 'user': user})


def create_user(request):
    params = request.get_json()
    name = params['name']
    email = params['email']
    password = params['password']
    position = params['position']

    if (name is not None) and (email is not None):
        get_email_ = Users.find_email(email)
        if get_email_ is not None:
            return json.dumps({'result': False, 'mess': 'email is exited'})
        else:
            if Users.create_user(password, name, email, position):
                return json.dumps({'result': True})
            else:
                return json.dumps({'result': False, 'mess': 'can not create user'})
    return json.dumps({'result': False, 'mess': 'Write Information'})


# --------------------------------show all information user---------------------
def show_all_info_user(request):
    result = Users.get_users()
    return json.dumps(result)


# ------------------------- detail user --------------------------------------
def get_user(request):
    params = request.get_json()
    user_id = params['user_id']
    result = Users.get_user(user_id)
    return json.dumps(result)


# ---------------------------------------------delete------------------------
def delete_user(request):
    params = request.get_json()
    user_id = params['user_id']
    result = Users.del_user(user_id)
    return json.dumps({'result': True}) if result else json.dumps({'result': False})


# ------------------------edit -----------------------------------------------
def edit_user(request):
    params = request.get_json()
    user_id = params['user_id']
    password = params['password']
    name = params['name']
    email = params['email']
    result = Users.edit_user(user_id, email, password, name)
    return json.dumps({'result': True}) if result else json.dumps({'result': False})