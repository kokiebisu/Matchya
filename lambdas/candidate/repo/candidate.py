import os
from typing import List
import uuid

from client.postgres import PostgresDBClient
from entity.candidate import Candidate
from utils.logger import Logger

logger = Logger.configure(os.path.basename(__file__))


class CandidateRepository:
    """
    This class is responsible for all the database operations
    """

    def __init__(self, db_client: PostgresDBClient):
        self.db_client = db_client

    def check_exists_by_email(self, email):
        """
        Checks if a candidate exists in the database.

        :param email: The email of the candidate.
        :return: True if the candidate exists, False otherwise.
        """
        logger.info(f'check_exists_by_email: {email}')
        sql = "SELECT id FROM candidate WHERE email = %s;"
        self.db_client.execute(sql, (email,))
        result = self.db_client.fetchone()
        return result is not None

    def insert(self, name: str, email: str) -> str:
        """
        Creates a new candidate record in the database.

        :param body: The request body containing the candidate data.
        :return: The id of the newly created candidate record.
        """
        logger.info(f'insert: {name}, {email}')
        sql = "INSERT INTO candidate (id, name, email) VALUES (%s, %s, %s);"
        try:
            candidate_id = str(uuid.uuid4())
            self.db_client.execute(sql, (candidate_id, name, email))
            return candidate_id
        except Exception as e:
            raise RuntimeError(f"Error saving to candidate table: {e}")

    def retrieve_by_email(self, email: str):
        """
        Gets the id of a candidate.

        :param email: The email of the candidate.
        :return: The id of the candidate.
        """
        logger.info(f'retrieve_by_email: {email}')
        sql = "SELECT * FROM candidate WHERE email = %s;"
        self.db_client.execute(sql, (email,))
        return self.db_client.fetchone()[0]

    def retrieve_by_id(self, candidate_id: str):
        """
        Retrieves the candidate's email address.
        """
        logger.info(f'retrieve_by_id: {candidate_id}')
        sql = 'SELECT * FROM candidate WHERE id = %s;'
        self.db_client.execute(sql, (candidate_id,))
        result = self.db_client.fetchone()
        candidate = Candidate()
        candidate.id = result[0]
        candidate.email = result[1]
        candidate.name = result[4]
        return candidate

    def retrieve_many_by_company_id(self, company_id: str) -> List[Candidate]:
        """
        Retrieves candidates from the database.

        :param company_id: The id of the company.
        :return: The candidate.
        """
        logger.info(f'retrieve_many_by_company_id: {company_id}')
        sql = """
            SELECT 
                c.id, c.email, c.name, ac.created_at AS added_at,
                i.id AS i, i.total_score, i.created_at, i.status AS interview_status,
                a.id AS assessment_id, a.name AS assessment_name
            FROM candidate AS c 
            LEFT JOIN interview as i ON i.candidate_id = c.id
            LEFT JOIN assessment as a ON a.id = i.assessment_id
            LEFT JOIN assessment_candidate AS ac ON ac.candidate_id = c.id
            WHERE a.company_id = '%s';
            """ % company_id
        self.db_client.execute(sql, (company_id,))
        result = self.db_client.fetchall()
        candidates = []
        for row in result:
            candidate = Candidate()
            candidate.id = row[0]
            candidate.email = row[1]
            candidate.name = row[2]
            candidate.added_at = str(row[3])
            if row[4]:
                candidate.assessment = {
                    'id': row[8],
                    'name': row[9],
                    'interview_id': row[4],
                    'interview_status': row[7],
                    'total_score': row[5],
                    'created_at': str(row[6])
                }
            candidates.append(candidate)
        return candidates
