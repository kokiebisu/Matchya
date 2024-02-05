import { Button, Icons, TestTable } from '@/components';
import { Assessment } from '@/types';

interface AssessmentsPageTemplateProps {
  assessments: Assessment[];
  isLoading: boolean;
  onNavigateToAssessment: () => void;
  handleNavigateToDetail: (id: string) => void;
  handleDeleteAssessment: (id: string) => void;
}

const AssessmentsPageTemplate = ({
  assessments,
  isLoading,
  onNavigateToAssessment,
  handleNavigateToDetail,
  handleDeleteAssessment,
}: AssessmentsPageTemplateProps) => (
  <div className="h-full min-h-[calc(100vh-64px)] overflow-hidden bg-matcha-30 text-matcha-900">
    <div className="w-full h-full mx-auto">
      <div className="w-full h-full mx-auto">
        <div className="justify-between items-center py-12">
          <div className="px-12">
            <div className="mb-8 flex justify-between items-center">
              <div className="space-y-4">
                <h3 className="text-4xl font-bold">Assessments</h3>
              </div>
              <Button
                onClick={onNavigateToAssessment}
                className="bg-orange-100 text-black shadow hover:bg-orange-200"
              >
                Create New
              </Button>
            </div>

            {isLoading && (
              <div className="flex mt-48 justify-center items-center">
                <Icons.spinner className="spinner h-8 w-8" />
              </div>
            )}
            {!isLoading && (
              <TestTable
                assessments={assessments}
                handleNavigateToDetail={handleNavigateToDetail}
                handleDeleteAssessment={handleDeleteAssessment}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AssessmentsPageTemplate;
