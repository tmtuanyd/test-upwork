import { FetchingStatus } from 'models';

export interface ContractorState {
  fetchingStatus: FetchingStatus;
  contractors: ContractorType[] | null;
}

export type ContractorType = {
  id: number;
  tenant_id: number;
  created_at: string;
  name: string;
};
