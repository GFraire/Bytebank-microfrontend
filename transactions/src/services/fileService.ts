const UPLOAD_URL = 'http://localhost:3334';

export const fileService = {
  async upload(files: File[]): Promise<string[]> {
    const uploadedFiles: string[] = [];
    
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await fetch(`${UPLOAD_URL}/upload`, {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error(`Erro no upload: ${response.statusText}`);
        }
        
        const result = await response.json();
        uploadedFiles.push(result.filename);
      } catch (error) {
        console.error('Erro no upload:', error);
        // Fallback para desenvolvimento local
        const timestamp = Date.now();
        uploadedFiles.push(`${timestamp}_${file.name}`);
      }
    }
    
    return uploadedFiles;
  },

  getFileUrl(filename: string): string {
    const url = `${UPLOAD_URL}/files/${encodeURIComponent(filename)}`;
    console.log('FileService URL:', url);
    return url;
  },

  async delete(filename: string): Promise<void> {
    try {
      const response = await fetch(`${UPLOAD_URL}/files/${filename}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao excluir arquivo');
    } catch (error) {
      console.error('Erro ao excluir arquivo:', error);
    }
  }
};