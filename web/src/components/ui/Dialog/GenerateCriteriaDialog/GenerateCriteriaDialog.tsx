import { useCallback, useRef, useState } from 'react';

import { Button } from '../../Button/Button';
import { Icons } from '../../Icons/Icons';
import { MultiSelect } from '../../MultiSelect/MultiSelect';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../Dialog';

import { axiosInstance } from '@/helper';
import { useCompanyStore } from '@/store/useCompanyStore';
import { usePositionStore } from '@/store/usePositionStore';
import { CustomError } from '@/types';

interface GenerateCriteriaDialogProps {
  shouldOpen: boolean;
  onClose: () => void;
}

export const GenerateCriteriaDialog = ({
  shouldOpen,
  onClose,
}: GenerateCriteriaDialogProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { repository_names } = useCompanyStore();
  const { selectedPosition } = usePositionStore();
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const handleUnselect = useCallback((framework: string) => {
    setSelected(prev => prev.filter(s => s !== framework));
  }, []);

  const handleGenerateCriteria = async () => {
    if (!selectedPosition || selected.length === 0) {
      console.error('Need to meet requirements');
      return;
    }
    const userData = {
      position_id: selectedPosition.id,
      repository_names: selected,
    };
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        '/checklists/generate',
        userData
      );
      if (response.data.status == 'success') {
        selectedPosition.checklist_status = 'scheduled';
        onClose();
      }
    } catch (error) {
      const err = error as CustomError;
      // setMessageType('error');
      if (err.response.status === 400) {
        console.error(err.response.data.message);
      } else {
        console.error('Something went wrong. Please try again.');
      }
    }
    setIsLoading(false);
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            setSelected(prev => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    []
  );

  const handleAddItem = (item: string) => {
    setSelected((prev: string[]) => [...prev, item]);
  };

  return (
    <Dialog open={shouldOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Criteria</DialogTitle>
          <DialogDescription>Let's get started...</DialogDescription>
        </DialogHeader>
        <div>
          <MultiSelect
            options={repository_names}
            placeholder="Repositories"
            onUnselect={handleUnselect}
            onKeyDown={handleKeyDown}
            selected={selected}
            onAddItem={handleAddItem}
            inputRef={inputRef}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleGenerateCriteria}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
