import pytest
from app.db.database import init_db
from app.main import seed_demo_sales_data

@pytest.fixture(scope="session", autouse=True)
def prepare_sales_test_database():
    init_db()
    seed_demo_sales_data()
