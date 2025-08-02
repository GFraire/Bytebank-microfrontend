const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

export const fileService = {
  async upload(files: File[]): Promise<string[]> {
    // Simulação de upload - retorna nomes dos arquivos com timestamp
    return files.map(file => {
      const timestamp = Date.now();
      const extension = file.name.split('.').pop();
      return `${timestamp}_${file.name}`;
    });
  },

  getFileUrl(filename: string): string {
    // Para arquivos simulados, retorna um placeholder
    if (filename.includes('_')) {
      return `data:text/plain;charset=utf-8,Arquivo simulado: ${filename}`;
    }
    return `${API_URL}/files/${filename}`;
  },

  async delete(filename: string): Promise<void> {
    const response = await fetch(`${API_URL}/files/${filename}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao excluir arquivo');
  }
};