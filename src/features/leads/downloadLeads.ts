import { api } from '../../shared/api';

export const handleDownload = async (resource: string, fileName: string = `${resource}.xlsx`) => {
  try {
    const response = await api.get(`${resource}/export`, {
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error(`Ошибка при скачивании файла ${fileName}:`, error);
  }
};
