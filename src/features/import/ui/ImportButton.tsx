import { Button, ButtonProps, Modal } from '@mantine/core';
import { useState } from 'react';
import { Schema } from 'read-excel-file';

import { ExampleTable } from './ExampleTable';
import { ExcelDropzone } from './ExcelDropzone';

interface ImportButtonProps extends ButtonProps {
  schema: Schema;
  handleSetUserGroupsCount: (groupsCount: number) => void;
}
export const ImportButton: React.FC<ImportButtonProps> = ({
  schema,
  handleSetUserGroupsCount,
  ...props
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal opened={isModalOpen} onClose={handleCloseModal} title="Импорт">
        <ExcelDropzone
          schema={schema}
          handleCloseModal={handleCloseModal}
          handleSetUserGroupsCount={handleSetUserGroupsCount}
        />
        <ExampleTable schema={schema} mt="lg" />
      </Modal>
      <Button onClick={handleOpenModal} {...props} id="import-button">
        Импортировать
      </Button>
    </>
  );
};
