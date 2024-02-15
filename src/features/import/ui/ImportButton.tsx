import { Button, ButtonProps, Modal } from '@mantine/core';
import { useState } from 'react';

import { CustomSchema } from '../../../shared/types/CustomSchema';
import { ExcelDropzone } from './ExcelDropzone';

interface ImportButtonProps extends ButtonProps {
  schema: CustomSchema;
}
export const ImportButton: React.FC<ImportButtonProps> = ({ schema, ...props }) => {
  // const [file, setFile] = useState<FileWithPath>(null);

  // const handleAddFile = (newFile: FileWithPath) => {
  //   setFile(newFile);
  // };

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
        <ExcelDropzone schema={schema} />
      </Modal>
      <Button onClick={handleOpenModal} {...props}>
        Импортировать
      </Button>
    </>
  );
};
