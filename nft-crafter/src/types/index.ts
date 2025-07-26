export interface NFT {
  id: string;
  title: string;
  description: string;
  image_url: string;
  ipfs_cid?: string;
  created_at: string;
}

export interface NFTFormData {
  title: string;
  description: string;
  image: File | null;
}

export interface LoadingState {
  isLoading: boolean;
  progress: number;
  message: string;
}

export interface ToastMessage {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}