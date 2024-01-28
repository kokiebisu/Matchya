import { Icons, InviteCard, QuestionCard } from '@/components';
import { Assessment } from '@/types';

interface AssessmentDetailPageTemplateProps {
  assessment: Assessment | null;
  isLoading: boolean;
}

const AssessmentDetailPageTemplate = ({
  assessment,
  isLoading,
}: AssessmentDetailPageTemplateProps) => (
  <div className="h-full min-h-[calc(100vh-64px)] overflow-hidden bg-macha-200">
    <div className="w-full h-full mx-auto">
      <div className="w-full h-full mx-auto">
        <div className="justify-between items-center py-12">
          <div className="px-12">
            <div className="mb-4">
              {!isLoading && (
                <h3 className="text-lg font-bold">{assessment?.name}</h3>
              )}
            </div>
            {!isLoading && (
              <div className="flex flex-col-reverse lg:flex-row lg:space-x-6">
                <div className="space-y-6 flex-1">
                  {assessment?.questions?.length === 0 && (
                    <div className="flex flex-col items-center justify-center mt-20">
                      <p className="text-lg font-bold text-gray-500">
                        Matchya AI is generating questions...
                      </p>
                      <Icons.spinner className="w-6 h-6 mt-6 spinner" />
                    </div>
                  )}
                  {assessment?.questions?.map(question => (
                    <QuestionCard
                      key={question.id}
                      text={question.text}
                      keyword={question.topic}
                      difficulty={question.difficulty}
                    />
                  ))}
                </div>
                <div className="mb-6 lg:mb-0">
                  <InviteCard
                    candidates={
                      assessment?.candidates ? assessment?.candidates : []
                    }
                    assessmentId={assessment?.id}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AssessmentDetailPageTemplate;
