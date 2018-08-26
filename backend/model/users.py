from model.connect_db import DatabaseDriver


class Users:
    @staticmethod
    def confirm_account(email, password):
        try:
            query = """select * from users
                        where email = ? and password = ?"""
            args = [email, password]
            result = DatabaseDriver().query_db(query, args, one=True)
        except Exception as e:
            print(e)
            return False
        return result

    @staticmethod
    def get_users():
        try:
            result = DatabaseDriver().query_db("""select * from users""")
        except Exception as e:
            print(e)
            return False
        return result

    @staticmethod
    def find_email(email):
        try:
            query = """select email from users where email = ?"""
            args = [email]
            result = DatabaseDriver().query_db(query, args, one=True)
            if result is not None:
                return True
        except Exception as e:
            print(e)
            return False
        return False

    @staticmethod
    def get_user(user_id):
        try:
            query = """select * from users where user_id = ?"""
            args = [user_id]
            result = DatabaseDriver().query_db(query, args, one=True)
        except Exception as e:
            print(e)
            return False
        return result

    @staticmethod
    def create_user(email, password, name, position):
        try:
            driver = DatabaseDriver()
            args = [email, password, name, position]
            new_id = driver.exec_command("""insert into users(email, password, name, position)
                                            values (?, ?, ?, ?, ?)""", args)
            return new_id
        except Exception as e:
            print(e)
            return False

    @staticmethod
    def edit_user(user_id, email, password, name):
        try:
            driver = DatabaseDriver()
            args = [user_id, email, password, name]
            driver.exec_command("""update users set 
                                    email=?, 
                                    password=?, 
                                    name=?
                                    where user_id=?""", args)
        except Exception as e:
            print(e)
            return False
        return True

    @staticmethod
    def del_user(user_id):
        try:
            driver = DatabaseDriver()
            args = [user_id]
            driver.exec_command("""delete users where user_id=?""", args)
        except Exception as e:
            print(e)
            return False
        return True
