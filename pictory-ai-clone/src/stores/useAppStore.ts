import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { User, Project, Asset, UIState, GenerationJob } from '@/types';

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // UI state
  ui: UIState;
  
  // Data state
  projects: Project[];
  assets: Asset[];
  generationJobs: GenerationJob[];
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setUIError: (error: string | null) => void;
  setUILoading: (loading: boolean) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSelectedAssets: (assetIds: string[]) => void;
  addSelectedAsset: (assetId: string) => void;
  removeSelectedAsset: (assetId: string) => void;
  clearSelectedAssets: () => void;
  setFilters: (filters: Partial<UIState['filters']>) => void;
  
  // Project actions
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  removeProject: (projectId: string) => void;
  
  // Asset actions
  setAssets: (assets: Asset[]) => void;
  addAsset: (asset: Asset) => void;
  updateAsset: (assetId: string, updates: Partial<Asset>) => void;
  removeAsset: (assetId: string) => void;
  
  // Generation job actions
  setGenerationJobs: (jobs: GenerationJob[]) => void;
  addGenerationJob: (job: GenerationJob) => void;
  updateGenerationJob: (jobId: string, updates: Partial<GenerationJob>) => void;
  removeGenerationJob: (jobId: string) => void;
  
  // Utility actions
  reset: () => void;
}

const initialUIState: UIState = {
  isLoading: false,
  error: null,
  selectedAssets: [],
  viewMode: 'grid',
  filters: {},
};

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: true,
      ui: initialUIState,
      projects: [],
      assets: [],
      generationJobs: [],
      
      // User actions
      setUser: (user) => set(
        () => ({ 
          user, 
          isAuthenticated: !!user,
          isLoading: false 
        }),
        false,
        'setUser'
      ),
      
      setLoading: (loading) => set(
        { isLoading: loading },
        false,
        'setLoading'
      ),
      
      // UI actions
      setUIError: (error) => set(
        (state) => ({
          ui: { ...state.ui, error }
        }),
        false,
        'setUIError'
      ),
      
      setUILoading: (loading) => set(
        (state) => ({
          ui: { ...state.ui, isLoading: loading }
        }),
        false,
        'setUILoading'
      ),
      
      setViewMode: (mode) => set(
        (state) => ({
          ui: { ...state.ui, viewMode: mode }
        }),
        false,
        'setViewMode'
      ),
      
      setSelectedAssets: (assetIds) => set(
        (state) => ({
          ui: { ...state.ui, selectedAssets: assetIds }
        }),
        false,
        'setSelectedAssets'
      ),
      
      addSelectedAsset: (assetId) => set(
        (state) => ({
          ui: {
            ...state.ui,
            selectedAssets: [...state.ui.selectedAssets, assetId]
          }
        }),
        false,
        'addSelectedAsset'
      ),
      
      removeSelectedAsset: (assetId) => set(
        (state) => ({
          ui: {
            ...state.ui,
            selectedAssets: state.ui.selectedAssets.filter(id => id !== assetId)
          }
        }),
        false,
        'removeSelectedAsset'
      ),
      
      clearSelectedAssets: () => set(
        (state) => ({
          ui: { ...state.ui, selectedAssets: [] }
        }),
        false,
        'clearSelectedAssets'
      ),
      
      setFilters: (filters) => set(
        (state) => ({
          ui: {
            ...state.ui,
            filters: { ...state.ui.filters, ...filters }
          }
        }),
        false,
        'setFilters'
      ),
      
      // Project actions
      setProjects: (projects) => set(
        { projects },
        false,
        'setProjects'
      ),
      
      addProject: (project) => set(
        (state) => ({
          projects: [...state.projects, project]
        }),
        false,
        'addProject'
      ),
      
      updateProject: (projectId, updates) => set(
        (state) => ({
          projects: state.projects.map(project =>
            project.id === projectId ? { ...project, ...updates } : project
          )
        }),
        false,
        'updateProject'
      ),
      
      removeProject: (projectId) => set(
        (state) => ({
          projects: state.projects.filter(project => project.id !== projectId)
        }),
        false,
        'removeProject'
      ),
      
      // Asset actions
      setAssets: (assets) => set(
        { assets },
        false,
        'setAssets'
      ),
      
      addAsset: (asset) => set(
        (state) => ({
          assets: [...state.assets, asset]
        }),
        false,
        'addAsset'
      ),
      
      updateAsset: (assetId, updates) => set(
        (state) => ({
          assets: state.assets.map(asset =>
            asset.id === assetId ? { ...asset, ...updates } : asset
          )
        }),
        false,
        'updateAsset'
      ),
      
      removeAsset: (assetId) => set(
        (state) => ({
          assets: state.assets.filter(asset => asset.id !== assetId),
          ui: {
            ...state.ui,
            selectedAssets: state.ui.selectedAssets.filter(id => id !== assetId)
          }
        }),
        false,
        'removeAsset'
      ),
      
      // Generation job actions
      setGenerationJobs: (jobs) => set(
        { generationJobs: jobs },
        false,
        'setGenerationJobs'
      ),
      
      addGenerationJob: (job) => set(
        (state) => ({
          generationJobs: [...state.generationJobs, job]
        }),
        false,
        'addGenerationJob'
      ),
      
      updateGenerationJob: (jobId, updates) => set(
        (state) => ({
          generationJobs: state.generationJobs.map(job =>
            job.id === jobId ? { ...job, ...updates } : job
          )
        }),
        false,
        'updateGenerationJob'
      ),
      
      removeGenerationJob: (jobId) => set(
        (state) => ({
          generationJobs: state.generationJobs.filter(job => job.id !== jobId)
        }),
        false,
        'removeGenerationJob'
      ),
      
      // Utility actions
      reset: () => set(
        {
          user: null,
          isAuthenticated: false,
          isLoading: false,
          ui: initialUIState,
          projects: [],
          assets: [],
          generationJobs: [],
        },
        false,
        'reset'
      ),
    }),
    {
      name: 'pictory-ai-store',
    }
  )
);

// Selector hooks for better performance
export const useUser = () => useAppStore((state) => state.user);
export const useIsAuthenticated = () => useAppStore((state) => state.isAuthenticated);
export const useIsLoading = () => useAppStore((state) => state.isLoading);
export const useUIState = () => useAppStore((state) => state.ui);
export const useProjects = () => useAppStore((state) => state.projects);
export const useAssets = () => useAppStore((state) => state.assets);
export const useGenerationJobs = () => useAppStore((state) => state.generationJobs);
export const useSelectedAssets = () => useAppStore((state) => state.ui.selectedAssets);