import { Button, TestTable } from '@/components';
import { mockedTests } from '@/data/mock';

interface AssessmentsPageTemplateProps {
  onNavigateToAssessment: () => void;
}

const AssessmentsPageTemplate = ({
  onNavigateToAssessment,
}: AssessmentsPageTemplateProps) => (
  <div className="h-full min-h-[calc(100vh-64px)] overflow-hidden bg-macha-200">
    <div className="w-full h-full mx-auto">
      <div>
        <div className="w-full h-full mx-auto">
          <div className="justify-between items-center py-12">
            <div className="px-12">
              <div className="mb-8 flex justify-between items-center">
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold">Assessments</h3>
                </div>
                <Button onClick={onNavigateToAssessment} className='bg-orange-200 text-black shadow hover:bg-orange-300'>
                  Create New
                </Button>
              </div>
              <TestTable tests={mockedTests} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AssessmentsPageTemplate;
