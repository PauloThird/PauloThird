import { createClient } from '@supabase/supabase-js';
import { NFT } from '../types';

// Mock Supabase configuration - replace with real credentials in production
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Mock data storage for offline testing
let mockNFTs: NFT[] = [
  {
    id: '1',
    title: 'Genesis NFT',
    description: 'The first NFT created in our collection',
    image_url: 'https://picsum.photos/400/400?random=1',
    ipfs_cid: 'Qm123abc...',
    created_at: new Date().toISOString(),
  }
];

// Mock IPFS upload function
export const uploadToIPFS = async (file: File): Promise<string> => {
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate mock CID
  const mockCID = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
  
  return mockCID;
};

// Mock Supabase operations
export const nftService = {
  // Create new NFT
  async createNFT(nftData: Omit<NFT, 'id' | 'created_at'>): Promise<NFT> {
    const newNFT: NFT = {
      ...nftData,
      id: Math.random().toString(36).substring(2, 15),
      created_at: new Date().toISOString(),
    };
    
    mockNFTs.push(newNFT);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return newNFT;
  },

  // Get all NFTs
  async getAllNFTs(): Promise<NFT[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [...mockNFTs].reverse(); // Return newest first
  },

  // Get NFT by ID
  async getNFTById(id: string): Promise<NFT | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockNFTs.find(nft => nft.id === id) || null;
  },

  // Delete NFT
  async deleteNFT(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockNFTs.findIndex(nft => nft.id === id);
    if (index > -1) {
      mockNFTs.splice(index, 1);
      return true;
    }
    return false;
  }
};

// Helper function to convert File to data URL for preview
export const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};