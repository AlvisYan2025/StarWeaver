from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
import dotenv
from pathlib import Path
import os

Base = declarative_base()
dotenv.load_dotenv(dotenv_path=Path(".env"))
DATABASE_NEON_URL = os.getenv("DATABASE_NEON_URL")

# Convert postgresql:// to postgresql+asyncpg:// for async driver
if DATABASE_NEON_URL and DATABASE_NEON_URL.startswith("postgresql://"):
    DATABASE_NEON_URL = DATABASE_NEON_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

# Create async engine
engine = create_async_engine(
    DATABASE_NEON_URL,
    echo=False,  # Set to True for SQL query logging
    future=True
)

# Create async session factory
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)


async def init_db():
    """Initialize database tables (async)"""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def get_db():
    """Dependency for FastAPI to get async database session"""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
