import os

from client.postgres import PostgresDBClient
from utils.logger import Logger


logger = Logger.configure(os.path.basename(__file__))


class AssessmentCandidateRepository:
    """
    This class is responsible for all the database operations
    """

    def __init__(self, db_client: PostgresDBClient):
        self.db_client = db_client

    def insert(self, assessment_id, candidate_id):
        """
        Register the candidate to assessment.

        :param assessment_id: The id of the assessment.
        :param candidate_id: The id of the candidate.
        """
        logger.info(f'insert: {assessment_id}, {candidate_id}')
        sql = "INSERT INTO assessment_candidate (assessment_id, candidate_id) VALUES (%s, %s);"
        try:
            self.db_client.execute(sql, (assessment_id, candidate_id))
        except Exception as e:
            raise RuntimeError(f"Error registering to assessment_candidate table: {e}")
