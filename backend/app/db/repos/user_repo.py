from schema.user import User  # make sure this path matches your project
from sqlalchemy.orm import Session


class UserRepository:
    def __init__(self, session: Session):
        self.session = session

    def add_user(self, username: str, email: str, password_hash: str) -> User:
        user = User(username=username, email=email, password_hash=password_hash)
        self.session.add(user)
        self.session.commit()
        return user

    def get_user(self, username: str) -> User:
        return self.session.query(User).filter_by(username=username).first()

    def get_user_by_id(self, user_id: int) -> User:
        return self.session.query(User).filter_by(id=user_id).first()

    def delete_user(self, user_id: int) -> bool:
        user = self.get_user_by_id(user_id)
        if user:
            self.session.delete(user)
            self.session.commit()
            return True
        return False

    def list_users(self) -> list[User]:
        return self.session.query(User).all()

    def change_password(self, user_id: int, new_password_hash: str) -> bool:
        user = self.get_user_by_id(user_id)
        if user:
            user.password_hash = new_password_hash
            self.session.commit()
            return True
        return False

    def change_username(self, user_id: int, new_username: str) -> bool:
        user = self.get_user_by_id(user_id)
        if user:
            user.username = new_username
            self.session.commit()
            return True
        return False

    def change_email(self, user_id: int, new_email: str) -> bool:
        user = self.get_user_by_id(user_id)
        if user:
            user.email = new_email
            self.session.commit()
            return True
        return False

    def suspend_user(self, user_id: int) -> bool:
        user = self.get_user_by_id(user_id)
        if user:
            user.is_suspended = True
            self.session.commit()
            return True
        return False
