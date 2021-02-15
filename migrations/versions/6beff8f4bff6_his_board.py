"""his board

Revision ID: 6beff8f4bff6
Revises: 0dfa4a9e5589
Create Date: 2020-11-10 22:06:40.708056

"""
from alembic import op
from sqlalchemy import Table, MetaData
import sqlalchemy as sa
from sqlalchemy.sql.schema import Column
from sqlalchemy.sql.sqltypes import Integer, String


# revision identifiers, used by Alembic.
revision = '6beff8f4bff6'
down_revision = '0dfa4a9e5589'
branch_labels = None
depends_on = None


def upgrade():
    conn = op.get_bind()
    meta = MetaData(bind=conn)

    topics_table = Table("topics", meta, Column("name", String))

    op.bulk_insert(
        topics_table,
        [
            { "name": "his" }
        ]
    )


def downgrade():
    pass
