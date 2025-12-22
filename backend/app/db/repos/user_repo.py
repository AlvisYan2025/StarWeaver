from schema.user import User
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select


class UserRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def add_user(self, username: str, email: str, password_hash: str) -> User:
        user = User(username=username, email=email, password=password_hash)  # Note: schema uses 'password' not 'password_hash'
        self.session.add(user)
        await self.session.commit()
        await self.session.refresh(user)
        return user

    async def get_user(self, username: str) -> User:
        result = await self.session.execute(
            select(User).where(User.username == username)
        )
        return result.scalar_one_or_none()

    async def get_user_by_id(self, user_id: int) -> User:
        result = await self.session.execute(
            select(User).where(User.id == user_id)
        )
        return result.scalar_one_or_none()

    async def delete_user(self, user_id: int) -> bool:
        user = await self.get_user_by_id(user_id)
        if user:
            await self.session.delete(user)
            await self.session.commit()
            return True
        return False

    async def list_users(self) -> list[User]:
        result = await self.session.execute(select(User))
        return list(result.scalars().all())

    async def change_password(self, user_id: int, new_password_hash: str) -> bool:
        user = await self.get_user_by_id(user_id)
        if user:
            user.password = new_password_hash  # Note: schema uses 'password' not 'password_hash'
            await self.session.commit()
            return True
        return False

    async def change_username(self, user_id: int, new_username: str) -> bool:
        user = await self.get_user_by_id(user_id)
        if user:
            user.username = new_username
            await self.session.commit()
            return True
        return False

    async def change_email(self, user_id: int, new_email: str) -> bool:
        user = await self.get_user_by_id(user_id)
        if user:
            user.email = new_email
            await self.session.commit()
            return True
        return False

    async def suspend_user(self, user_id: int) -> bool:
        user = await self.get_user_by_id(user_id)
        if user:
            user.active = False  # Using 'active' field instead of 'is_suspended'
            await self.session.commit()
            return True
        return False
